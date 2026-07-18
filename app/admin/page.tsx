'use client';

import { useCallback, useEffect, useState } from 'react';
import { formatDateTime } from '@/lib/format';

/* ============================================================
   Схемы разделов: по ним автоматически строятся формы редактора
   ============================================================ */

type Field = {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'lines' | 'paras' | 'check' | 'list' | 'group';
  hint?: string;
  rows?: number;
  fields?: Field[];
  titleKey?: string;
};

type SectionSchema = {
  id: string;
  title: string;
  hint?: string;
  kind: 'object' | 'array';
  fields: Field[];
  itemLabel?: string;
  titleKey?: string;
};

const SCHEMAS: SectionSchema[] = [
  {
    id: 'site',
    title: 'Настройки сайта',
    hint: 'Название, контакты и реквизиты, которые показываются в шапке, подвале и на страницах.',
    kind: 'object',
    fields: [
      { key: 'name', label: 'Название академии', type: 'text' },
      { key: 'shortName', label: 'Короткое название', type: 'text' },
      { key: 'phone', label: 'Телефон', type: 'text' },
      { key: 'email', label: 'E-mail', type: 'text' },
      { key: 'address', label: 'Адрес', type: 'text' },
      { key: 'hours', label: 'Часы работы приёмной комиссии', type: 'text' },
      { key: 'footerNote', label: 'Подпись в подвале (полное наименование)', type: 'textarea', rows: 2 },
    ],
  },
  {
    id: 'home',
    title: 'Главная страница',
    hint: 'Тексты первого экрана, преимущества, цифры и призыв к действию.',
    kind: 'object',
    fields: [
      { key: 'heroBadge', label: 'Бейдж над заголовком', type: 'text' },
      { key: 'heroTitle', label: 'Главный заголовок', type: 'textarea', rows: 2 },
      { key: 'heroSubtitle', label: 'Подзаголовок', type: 'textarea', rows: 3 },
      { key: 'heroCta1', label: 'Кнопка 1', type: 'text' },
      { key: 'heroCta2', label: 'Кнопка 2', type: 'text' },
      { key: 'heroChips', label: 'Плашки под кнопками (по одной в строке)', type: 'lines' },
      {
        key: 'benefits',
        label: 'Преимущества',
        type: 'list',
        titleKey: 'title',
        fields: [
          { key: 'title', label: 'Заголовок', type: 'text' },
          { key: 'text', label: 'Текст', type: 'textarea', rows: 3 },
          { key: 'icon', label: 'Иконка (calendar, briefcase, academy, route, chart, people, store, megaphone)', type: 'text' },
        ],
      },
      {
        key: 'stats',
        label: 'Цифры',
        type: 'list',
        titleKey: 'value',
        fields: [
          { key: 'value', label: 'Значение', type: 'text' },
          { key: 'label', label: 'Подпись', type: 'text' },
        ],
      },
      { key: 'aboutTitle', label: 'Заголовок блока «Об академии»', type: 'text' },
      { key: 'aboutText', label: 'Текст блока «Об академии»', type: 'textarea', rows: 4 },
      { key: 'ctaTitle', label: 'Заголовок блока с формой', type: 'text' },
      { key: 'ctaText', label: 'Текст блока с формой', type: 'textarea', rows: 3 },
    ],
  },
  {
    id: 'programs',
    title: 'Направления',
    hint: 'Карточки направлений обучения и их страницы.',
    kind: 'array',
    itemLabel: 'направление',
    titleKey: 'title',
    fields: [
      { key: 'title', label: 'Название', type: 'text' },
      { key: 'slug', label: 'Адрес страницы (латиницей, например ekonomika)', type: 'text' },
      { key: 'icon', label: 'Иконка (chart, people, store, megaphone)', type: 'text' },
      { key: 'short', label: 'Краткое описание (для карточки)', type: 'textarea', rows: 2 },
      { key: 'lead', label: 'Куратор / ведущий преподаватель', type: 'text' },
      { key: 'forms', label: 'Формы обучения (по одной в строке)', type: 'lines' },
      { key: 'description', label: 'Описание (абзацы через пустую строку)', type: 'paras', rows: 6 },
      { key: 'skills', label: 'Чему научитесь (по одному пункту в строке)', type: 'lines' },
      { key: 'careers', label: 'Кем работать', type: 'textarea', rows: 2 },
    ],
  },
  {
    id: 'news',
    title: 'Новости',
    hint: 'Новости появляются на главной (последние три) и на странице «Новости».',
    kind: 'array',
    itemLabel: 'новость',
    titleKey: 'title',
    fields: [
      { key: 'title', label: 'Заголовок', type: 'text' },
      { key: 'slug', label: 'Адрес страницы (латиницей)', type: 'text' },
      { key: 'date', label: 'Дата (ГГГГ-ММ-ДД)', type: 'text' },
      { key: 'published', label: 'Опубликована', type: 'check' },
      { key: 'excerpt', label: 'Анонс', type: 'textarea', rows: 2 },
      { key: 'body', label: 'Текст (абзацы через пустую строку)', type: 'paras', rows: 6 },
    ],
  },
  {
    id: 'reviews',
    title: 'Отзывы',
    kind: 'array',
    itemLabel: 'отзыв',
    titleKey: 'name',
    fields: [
      { key: 'name', label: 'Имя', type: 'text' },
      { key: 'role', label: 'Кто это (курс, направление)', type: 'text' },
      { key: 'text', label: 'Текст отзыва', type: 'textarea', rows: 4 },
    ],
  },
  {
    id: 'faq',
    title: 'Вопросы и ответы',
    kind: 'array',
    itemLabel: 'вопрос',
    titleKey: 'q',
    fields: [
      { key: 'q', label: 'Вопрос', type: 'text' },
      { key: 'a', label: 'Ответ', type: 'textarea', rows: 3 },
    ],
  },
  {
    id: 'admissions',
    title: 'Абитуриентам',
    kind: 'object',
    fields: [
      { key: 'intro', label: 'Вступительный текст', type: 'textarea', rows: 3 },
      {
        key: 'steps',
        label: 'Шаги поступления',
        type: 'list',
        titleKey: 'title',
        fields: [
          { key: 'title', label: 'Заголовок', type: 'text' },
          { key: 'text', label: 'Текст', type: 'textarea', rows: 3 },
        ],
      },
      { key: 'docs', label: 'Документы (по одному в строке)', type: 'lines' },
      {
        key: 'pricing',
        label: 'Стоимость обучения',
        type: 'list',
        titleKey: 'program',
        fields: [
          { key: 'program', label: 'Направление', type: 'text' },
          { key: 'price', label: 'Стоимость', type: 'text' },
          { key: 'note', label: 'Примечание', type: 'text' },
        ],
      },
      { key: 'pricingNote', label: 'Примечание к стоимости', type: 'textarea', rows: 3 },
      { key: 'scheduleNote', label: 'Текст про расписание', type: 'textarea', rows: 3 },
    ],
  },
  {
    id: 'about',
    title: 'Об академии',
    kind: 'object',
    fields: [
      { key: 'mission', label: 'Миссия', type: 'textarea', rows: 3 },
      { key: 'history', label: 'История (абзацы через пустую строку)', type: 'paras', rows: 8 },
      {
        key: 'rector',
        label: 'Ректор',
        type: 'group',
        fields: [
          { key: 'name', label: 'ФИО', type: 'text' },
          { key: 'title', label: 'Должность', type: 'text' },
          { key: 'text', label: 'Описание', type: 'textarea', rows: 3 },
        ],
      },
      {
        key: 'team',
        label: 'Преподаватели',
        type: 'list',
        titleKey: 'name',
        fields: [
          { key: 'name', label: 'ФИО', type: 'text' },
          { key: 'role', label: 'Роль / дисциплины', type: 'text' },
        ],
      },
      {
        key: 'requisites',
        label: 'Официальные сведения',
        type: 'group',
        fields: [
          { key: 'fullName', label: 'Полное наименование', type: 'textarea', rows: 2 },
          { key: 'shortName', label: 'Сокращённое наименование', type: 'text' },
          { key: 'engName', label: 'Название на английском', type: 'text' },
          { key: 'founded', label: 'Дата основания', type: 'text' },
          { key: 'founder', label: 'Учредитель', type: 'text' },
        ],
      },
    ],
  },
  {
    id: 'docsPage',
    title: 'Документы',
    hint: 'Раздел «Сведения об образовательной организации». Ссылку на файл можно вставить в поле «Ссылка».',
    kind: 'object',
    fields: [
      { key: 'intro', label: 'Вступительный текст', type: 'textarea', rows: 3 },
      {
        key: 'items',
        label: 'Список документов',
        type: 'list',
        titleKey: 'title',
        fields: [
          { key: 'title', label: 'Название', type: 'text' },
          { key: 'note', label: 'Примечание', type: 'text' },
          { key: 'url', label: 'Ссылка на файл (необязательно)', type: 'text' },
        ],
      },
    ],
  },
];

/* ============================================================
   Вспомогательные функции
   ============================================================ */

function emptyItem(fields: Field[]): Record<string, unknown> {
  const obj: Record<string, unknown> = {};
  for (const f of fields) {
    if (f.type === 'lines' || f.type === 'paras') obj[f.key] = [];
    else if (f.type === 'check') obj[f.key] = true;
    else if (f.type === 'list') obj[f.key] = [];
    else if (f.type === 'group') obj[f.key] = emptyItem(f.fields || []);
    else obj[f.key] = '';
  }
  return obj;
}

function move<T>(arr: T[], from: number, to: number): T[] {
  if (to < 0 || to >= arr.length) return arr;
  const next = arr.slice();
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

/* ============================================================
   Универсальные поля формы
   ============================================================ */

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: any;
  onChange: (v: any) => void;
}) {
  if (field.type === 'text') {
    return (
      <label className="field">
        <span>{field.label}</span>
        <input type="text" value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
      </label>
    );
  }
  if (field.type === 'textarea') {
    return (
      <label className="field">
        <span>{field.label}</span>
        <textarea
          rows={field.rows || 3}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    );
  }
  if (field.type === 'lines') {
    return (
      <label className="field">
        <span>
          {field.label} <em className="subhint">— каждый пункт с новой строки</em>
        </span>
        <textarea
          rows={field.rows || 4}
          value={Array.isArray(value) ? value.join('\n') : ''}
          onChange={(e) =>
            onChange(
              e.target.value
                .split('\n')
                .map((s) => s.trim())
                .filter(Boolean),
            )
          }
        />
      </label>
    );
  }
  if (field.type === 'paras') {
    return (
      <label className="field">
        <span>
          {field.label} <em className="subhint">— абзацы разделяются пустой строкой</em>
        </span>
        <textarea
          rows={field.rows || 6}
          value={Array.isArray(value) ? value.join('\n\n') : ''}
          onChange={(e) =>
            onChange(
              e.target.value
                .split(/\n\s*\n/)
                .map((s) => s.trim())
                .filter(Boolean),
            )
          }
        />
      </label>
    );
  }
  if (field.type === 'check') {
    return (
      <label className="field" style={{ gridTemplateColumns: 'auto 1fr', alignItems: 'center', display: 'flex', gap: 10 }}>
        <input
          type="checkbox"
          checked={!!value}
          onChange={(e) => onChange(e.target.checked)}
          style={{ width: 17, height: 17, accentColor: 'var(--brand-soft)' }}
        />
        <span style={{ textTransform: 'none', letterSpacing: 0 }}>{field.label}</span>
      </label>
    );
  }
  if (field.type === 'group') {
    const group = value || {};
    return (
      <div className="item-card">
        <div className="item-card-head">
          <b>{field.label}</b>
        </div>
        {(field.fields || []).map((sub) => (
          <FieldInput
            key={sub.key}
            field={sub}
            value={group[sub.key]}
            onChange={(v) => onChange({ ...group, [sub.key]: v })}
          />
        ))}
      </div>
    );
  }
  if (field.type === 'list') {
    const list: any[] = Array.isArray(value) ? value : [];
    return (
      <div className="field">
        <span>{field.label}</span>
        {list.map((item, i) => (
          <div className="item-card" key={i}>
            <div className="item-card-head">
              <b>{String(item?.[field.titleKey || ''] || `Элемент ${i + 1}`)}</b>
              <div className="item-actions">
                <button type="button" className="mini-btn" onClick={() => onChange(move(list, i, i - 1))}>
                  ↑
                </button>
                <button type="button" className="mini-btn" onClick={() => onChange(move(list, i, i + 1))}>
                  ↓
                </button>
                <button
                  type="button"
                  className="mini-btn danger"
                  onClick={() => onChange(list.filter((_, j) => j !== i))}
                >
                  Удалить
                </button>
              </div>
            </div>
            {(field.fields || []).map((sub) => (
              <FieldInput
                key={sub.key}
                field={sub}
                value={item?.[sub.key]}
                onChange={(v) => {
                  const next = list.slice();
                  next[i] = { ...next[i], [sub.key]: v };
                  onChange(next);
                }}
              />
            ))}
          </div>
        ))}
        <div>
          <button
            type="button"
            className="mini-btn"
            onClick={() => onChange([...list, emptyItem(field.fields || [])])}
          >
            + Добавить
          </button>
        </div>
      </div>
    );
  }
  return null;
}

/* ============================================================
   Панель раздела контента
   ============================================================ */

function SectionEditor({
  schema,
  data,
  onSaved,
}: {
  schema: SectionSchema;
  data: any;
  onSaved: (data: any) => void;
}) {
  const [draft, setDraft] = useState<any>(data);
  const [status, setStatus] = useState<'idle' | 'saving' | 'ok' | 'err'>('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    setDraft(data);
    setStatus('idle');
  }, [data, schema.id]);

  async function save() {
    setStatus('saving');
    setError('');
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: schema.id, data: draft }),
      });
      const out = await res.json().catch(() => ({}));
      if (!res.ok || !out.ok) throw new Error(out.error || 'Не удалось сохранить.');
      setStatus('ok');
      onSaved(draft);
    } catch (e) {
      setStatus('err');
      setError(e instanceof Error ? e.message : 'Не удалось сохранить.');
    }
  }

  return (
    <div>
      <h2>{schema.title}</h2>
      {schema.hint && <p className="hint">{schema.hint}</p>}
      <div className="admin-toolbar">
        <button type="button" className="btn btn-gold" onClick={save} disabled={status === 'saving'}>
          {status === 'saving' ? 'Сохраняем…' : 'Сохранить изменения'}
        </button>
        {status === 'ok' && <span className="status ok">✓ Сохранено — изменения уже на сайте</span>}
        {status === 'err' && <span className="status err">{error}</span>}
      </div>

      {schema.kind === 'object' ? (
        schema.fields.map((f) => (
          <FieldInput
            key={f.key}
            field={f}
            value={draft?.[f.key]}
            onChange={(v) => setDraft({ ...draft, [f.key]: v })}
          />
        ))
      ) : (
        <FieldInput
          field={{
            key: '__root',
            label: `Список (${schema.itemLabel || 'элементы'})`,
            type: 'list',
            fields: schema.fields,
            titleKey: schema.titleKey,
          }}
          value={draft}
          onChange={(v) => setDraft(v)}
        />
      )}

      <div className="admin-toolbar" style={{ marginTop: 10 }}>
        <button type="button" className="btn btn-gold" onClick={save} disabled={status === 'saving'}>
          {status === 'saving' ? 'Сохраняем…' : 'Сохранить изменения'}
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   Заявки
   ============================================================ */

function Inbox({
  items,
  reload,
}: {
  items: any[];
  reload: () => void;
}) {
  async function setStatus(id: string, status: 'new' | 'done') {
    await fetch('/api/admin/feedback', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    reload();
  }
  async function remove(id: string) {
    if (!window.confirm('Удалить заявку безвозвратно?')) return;
    await fetch(`/api/admin/feedback?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    reload();
  }

  return (
    <div>
      <h2>Заявки с сайта</h2>
      <p className="hint">
        Сюда попадают все обращения из формы обратной связи. Новые — с голубой полоской.
      </p>
      {items.length === 0 ? (
        <p className="empty-state">Заявок пока нет.</p>
      ) : (
        items.map((f) => (
          <article className={`inbox-item${f.status === 'done' ? ' done' : ''}`} key={f.id}>
            <div className="inbox-head">
              <b>{f.name}</b>
              <time>{formatDateTime(f.date)}</time>
            </div>
            <div className="inbox-contact">{f.contact}</div>
            {f.message && <p className="inbox-msg">{f.message}</p>}
            <div className="item-actions">
              {f.status === 'done' ? (
                <button type="button" className="mini-btn" onClick={() => setStatus(f.id, 'new')}>
                  Вернуть в новые
                </button>
              ) : (
                <button type="button" className="mini-btn" onClick={() => setStatus(f.id, 'done')}>
                  ✓ Обработана
                </button>
              )}
              <button type="button" className="mini-btn danger" onClick={() => remove(f.id)}>
                Удалить
              </button>
            </div>
          </article>
        ))
      )}
    </div>
  );
}

/* ============================================================
   Главный компонент админки
   ============================================================ */

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [content, setContent] = useState<Record<string, any> | null>(null);
  const [feedback, setFeedback] = useState<any[]>([]);
  const [tab, setTab] = useState('inbox');
  const [defaultPassword, setDefaultPassword] = useState(false);

  const loadAll = useCallback(async () => {
    const [c, f] = await Promise.all([
      fetch('/api/admin/content').then((r) => (r.ok ? r.json() : null)),
      fetch('/api/admin/feedback').then((r) => (r.ok ? r.json() : null)),
    ]);
    if (!c || !f) {
      setAuthed(false);
      return;
    }
    setContent(c.content);
    setDefaultPassword(!!c.defaultPassword);
    setFeedback(f.feedback || []);
    setAuthed(true);
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const reloadFeedback = useCallback(async () => {
    const f = await fetch('/api/admin/feedback').then((r) => (r.ok ? r.json() : null));
    if (f) setFeedback(f.feedback || []);
  }, []);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoginError('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    const out = await res.json().catch(() => ({}));
    if (!res.ok || !out.ok) {
      setLoginError(out.error || 'Неверный пароль.');
      return;
    }
    setPassword('');
    await loadAll();
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    setAuthed(false);
    setContent(null);
  }

  if (authed === null) {
    return (
      <div className="admin-shell container">
        <p className="empty-state">Загрузка…</p>
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="admin-shell container">
        <form className="admin-login" onSubmit={login}>
          <h1>Вход в админку</h1>
          <p>
            Панель управления сайтом САМБи: контент, новости и заявки. Введите пароль
            администратора.
          </p>
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          {loginError && <p className="form-error">{loginError}</p>}
          <button type="submit" className="btn btn-gold">
            Войти
          </button>
        </form>
      </div>
    );
  }

  const newCount = feedback.filter((f) => f.status === 'new').length;

  return (
    <div className="admin-shell">
      <div className="container">
        {defaultPassword && (
          <div className="admin-warning">
            ⚠ Используется стартовый пароль. Задайте свой через переменную окружения{' '}
            <b>ADMIN_PASSWORD</b> на сервере (см. README) — и перезапустите сайт.
          </div>
        )}
        <div className="admin-layout">
          <nav className="admin-nav" aria-label="Разделы админки">
            <button
              type="button"
              className={tab === 'inbox' ? 'active' : undefined}
              onClick={() => setTab('inbox')}
            >
              Заявки {newCount > 0 && <span className="count">{newCount}</span>}
            </button>
            {SCHEMAS.map((s) => (
              <button
                key={s.id}
                type="button"
                className={tab === s.id ? 'active' : undefined}
                onClick={() => setTab(s.id)}
              >
                {s.title}
              </button>
            ))}
            <button type="button" onClick={logout} style={{ color: '#c0392b' }}>
              Выйти
            </button>
          </nav>

          <div className="admin-panel">
            {tab === 'inbox' ? (
              <Inbox items={feedback} reload={reloadFeedback} />
            ) : (
              content && (
                <SectionEditor
                  key={tab}
                  schema={SCHEMAS.find((s) => s.id === tab)!}
                  data={content[tab]}
                  onSaved={(d) => setContent({ ...content, [tab]: d })}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
