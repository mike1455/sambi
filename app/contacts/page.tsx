import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import FeedbackForm from '@/components/FeedbackForm';
import { IconClock, IconMail, IconPhone, IconPin } from '@/components/Icons';
import { getContent } from '@/lib/content';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Контакты',
  description:
    'Контакты приёмной комиссии САМБи: телефон, e-mail, адрес и форма обратной связи.',
};

export default async function ContactsPage() {
  const site = await getContent<any>('site');
  const phoneHref = `tel:${site.phone.replace(/[^+\d]/g, '')}`;
  const mapHref = `https://yandex.ru/maps/?text=${encodeURIComponent(site.address)}`;
  return (
    <>
      <PageHero
        crumb="Контакты"
        title="Контакты"
        subtitle="Приёмная комиссия отвечает на вопросы по будням — приходите, звоните или оставьте заявку."
      />
      <section className="section" id="form">
        <div className="container two-col">
          <div className="reveal">
            <span className="eyebrow">Форма обратной связи</span>
            <h2>Оставьте заявку</h2>
            <p style={{ color: 'var(--muted)', maxWidth: 520 }}>
              Расскажите, какое направление и формат обучения вас интересуют, — приёмная
              комиссия перезвонит, ответит на вопросы и поможет с документами.
            </p>
            <FeedbackForm />
          </div>
          <div className="reveal d1">
            <div className="info-card" style={{ marginBottom: 16 }}>
              <h3>Приёмная комиссия</h3>
              <ul>
                <li>
                  <IconPhone size={18} />
                  <a href={phoneHref}>{site.phone}</a>
                </li>
                <li>
                  <IconMail size={18} />
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </li>
                <li>
                  <IconPin size={18} />
                  <span>
                    {site.address}
                    <br />
                    <a href={mapHref} target="_blank" rel="noopener noreferrer">
                      Открыть на карте →
                    </a>
                  </span>
                </li>
                <li>
                  <IconClock size={18} /> {site.hours}
                </li>
              </ul>
            </div>
            <div className="info-card">
              <h3>Как добраться</h3>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: 15 }}>
                Здание академии находится в центре Москвы, в пешей доступности от станций
                метро «Чеховская», «Пушкинская» и «Театральная». Вход — со стороны улицы
                Большая Дмитровка.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
