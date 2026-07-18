import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { IconCheck } from '@/components/Icons';
import { getContent } from '@/lib/content';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Абитуриентам',
  description:
    'Правила приёма в САМБи: документы, вступительные испытания, стоимость обучения. Поступление — круглый год.',
};

export default async function AdmissionsPage() {
  const [adm, site] = await Promise.all([
    getContent<any>('admissions'),
    getContent<any>('site'),
  ]);
  return (
    <>
      <PageHero crumb="Абитуриентам" title="Поступление в САМБи" subtitle={adm.intro} />

      <section className="section" id="steps">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Как поступить</span>
            <h2>Четыре шага до зачисления</h2>
          </div>
          <div className="steps-grid">
            {adm.steps.map((s: any, i: number) => (
              <article className={`step reveal d${i % 4}`} key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section tint" id="docs">
        <div className="container two-col">
          <div className="reveal">
            <span className="eyebrow">Документы</span>
            <h2>Что взять с собой</h2>
            <div className="info-card">
              <ul>
                {adm.docs.map((d: string) => (
                  <li key={d}>
                    <IconCheck size={18} /> {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="reveal d1">
            <span className="eyebrow">Расписание</span>
            <h2>Организация занятий</h2>
            <div className="prose">
              <p>{adm.scheduleNote}</p>
            </div>
            <Link href="/contacts#form" className="btn btn-outline">
              Задать вопрос приёмной комиссии
            </Link>
          </div>
        </div>
      </section>

      <section className="section" id="pricing">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Стоимость</span>
            <h2>Стоимость обучения</h2>
            <p>{adm.pricingNote}</p>
          </div>
          <div className="table-scroll reveal">
            <table className="price-table">
              <thead>
                <tr>
                  <th>Направление</th>
                  <th>Стоимость</th>
                  <th>Примечание</th>
                </tr>
              </thead>
              <tbody>
                {adm.pricing.map((row: any) => (
                  <tr key={row.program}>
                    <td>
                      <b>{row.program}</b>
                    </td>
                    <td>{row.price}</td>
                    <td>{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="section-foot reveal">
            <Link href="/contacts#form" className="btn btn-gold btn-lg">
              Узнать стоимость и условия
            </Link>
            <p style={{ marginTop: 14, color: 'var(--muted)', fontSize: 14.5 }}>
              Приёмная комиссия: {site.phone} · {site.hours}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
