import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import { getContent } from '@/lib/content';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Об академии',
  description:
    'История, миссия и руководство Столичной академии малого бизнеса (института). Работаем с 2007 года.',
};

function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0] || '')
    .join('')
    .toUpperCase();
}

export default async function AboutPage() {
  const about = await getContent<any>('about');
  return (
    <>
      <PageHero
        crumb="Об академии"
        title="Об академии"
        subtitle="Частный московский институт практического бизнес-образования — с 2007 года."
      />

      <section className="section">
        <div className="container two-col">
          <div className="reveal">
            <span className="eyebrow">Миссия</span>
            <h2>Зачем мы работаем</h2>
            <div className="prose">
              <p>{about.mission}</p>
              {about.history.map((p: string) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </div>
          <div className="reveal d1">
            <div className="person-card" style={{ marginBottom: 16 }}>
              <div className="person-avatar">{initials(about.rector.name)}</div>
              <div>
                <b>{about.rector.name}</b>
                <span>{about.rector.title}</span>
                <p style={{ margin: '8px 0 0', fontSize: 14, color: 'var(--muted)' }}>
                  {about.rector.text}
                </p>
              </div>
            </div>
            <div className="info-card">
              <h3>Преподаватели</h3>
              <ul>
                {about.team.map((t: any) => (
                  <li key={t.name}>
                    <span
                      className="person-avatar"
                      style={{ width: 38, height: 38, fontSize: 13, flex: 'none' }}
                    >
                      {initials(t.name)}
                    </span>
                    <span>
                      <b style={{ display: 'block', color: 'var(--navy-900)' }}>{t.name}</b>
                      {t.role}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section tint">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Официально</span>
            <h2>Сведения об организации</h2>
          </div>
          <div className="requisites reveal">
            <div className="row">
              <b>Полное наименование</b>
              <span>{about.requisites.fullName}</span>
            </div>
            <div className="row">
              <b>Сокращённое наименование</b>
              <span>{about.requisites.shortName}</span>
            </div>
            <div className="row">
              <b>Наименование на английском</b>
              <span>{about.requisites.engName}</span>
            </div>
            <div className="row">
              <b>Дата основания</b>
              <span>{about.requisites.founded}</span>
            </div>
            <div className="row">
              <b>Учредитель</b>
              <span>{about.requisites.founder}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
