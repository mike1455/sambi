'use client';

import Link from 'next/link';
import { useState } from 'react';

type Status = 'idle' | 'sending' | 'ok' | 'error';

export default function FeedbackForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get('name') || '').trim(),
      contact: String(fd.get('contact') || '').trim(),
      message: String(fd.get('message') || '').trim(),
      company: String(fd.get('company') || ''), // honeypot
    };
    if (!payload.name || !payload.contact) {
      setStatus('error');
      setError('Заполните имя и контакт для связи.');
      return;
    }
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Не удалось отправить заявку.');
      }
      setStatus('ok');
      form.reset();
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Не удалось отправить заявку.');
    }
  }

  if (status === 'ok') {
    return (
      <div className="form-success" role="status">
        <b>Заявка отправлена!</b>
        <p>
          Спасибо! Приёмная комиссия свяжется с вами в рабочее время — по будням с 10:00
          до 14:00.
        </p>
        <button type="button" className="btn btn-outline" onClick={() => setStatus('idle')}>
          Отправить ещё одну
        </button>
      </div>
    );
  }

  return (
    <form className={`feedback-form${compact ? ' compact' : ''}`} onSubmit={onSubmit}>
      <div className="form-row">
        <label>
          <span>Ваше имя *</span>
          <input name="name" type="text" required maxLength={120} placeholder="Иван Иванов" />
        </label>
        <label>
          <span>Телефон или e-mail *</span>
          <input
            name="contact"
            type="text"
            required
            maxLength={160}
            placeholder="+7 (___) ___-__-__"
          />
        </label>
      </div>
      <label>
        <span>Сообщение</span>
        <textarea
          name="message"
          rows={compact ? 3 : 4}
          maxLength={2000}
          placeholder="Какое направление и формат обучения вас интересуют?"
        />
      </label>
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hp-field"
        aria-hidden="true"
      />
      <label className="agree">
        <input type="checkbox" required name="agree" />
        <span>
          Отправляя форму, я соглашаюсь с{' '}
          <Link href="/privacy" target="_blank">
            политикой обработки персональных данных
          </Link>
        </span>
      </label>
      {status === 'error' && <p className="form-error" role="alert">{error}</p>}
      <button type="submit" className="btn btn-gold btn-lg" disabled={status === 'sending'}>
        {status === 'sending' ? 'Отправляем…' : 'Отправить заявку'}
      </button>
    </form>
  );
}
