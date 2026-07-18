import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { IconArrow, ProgramIcon } from '@/components/Icons';
import { getContent } from '@/lib/content';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Направления обучения',
  description:
    'Направления подготовки САМБи: экономика, управление персоналом, торговое дело, реклама и связи с общественностью.',
};

export default async function ProgramsPage() {
  const programs = await getContent<any[]>('programs');
  return (
    <>
      <PageHero
        crumb="Направления"
        title="Направления обучения"
        subtitle="Бакалавриат по ключевым для предпринимателя направлениям. Очная, очно-заочная, заочная и дистанционная формы."
      />
      <section className="section">
        <div className="container">
          <div className="programs-grid">
            {programs.map((p: any, i: number) => (
              <article className={`program-card reveal d${i % 2}`} key={p.slug}>
                <div className="program-top">
                  <div className="icon-bubble">
                    <ProgramIcon name={p.icon} size={28} />
                  </div>
                  <div>
                    <h3>{p.title}</h3>
                    <span className="lead">{p.lead}</span>
                  </div>
                </div>
                <p className="short">{p.short}</p>
                <div className="program-forms">
                  {p.forms.map((f: string) => (
                    <span key={f}>{f}</span>
                  ))}
                </div>
                <Link href={`/programs/${p.slug}`} className="program-link">
                  Подробнее о направлении <IconArrow size={18} />
                </Link>
              </article>
            ))}
          </div>
          <div className="section-foot reveal">
            <Link href="/contacts#form" className="btn btn-gold btn-lg">
              Получить консультацию
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
