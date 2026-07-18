import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import { IconCheck, ProgramIcon } from '@/components/Icons';
import { getContent } from '@/lib/content';

export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const programs = await getContent<any[]>('programs');
  const program = programs.find((p) => p.slug === slug);
  if (!program) return { title: 'Направление не найдено' };
  return { title: program.title, description: program.short };
}

export default async function ProgramPage({ params }: Props) {
  const { slug } = await params;
  const programs = await getContent<any[]>('programs');
  const program = programs.find((p) => p.slug === slug);
  if (!program) notFound();

  return (
    <>
      <PageHero crumb={program.title} title={program.title} subtitle={program.short} />
      <section className="section">
        <div className="container two-col">
          <div className="reveal">
            <span className="eyebrow">О направлении</span>
            <h2>Чему учат на программе</h2>
            <div className="prose">
              {program.description.map((p: string) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
              <p>
                <b>Кем работать после выпуска.</b> {program.careers}
              </p>
            </div>
            <div className="program-forms" style={{ margin: '10px 0 26px' }}>
              {program.forms.map((f: string) => (
                <span key={f}>{f} форма</span>
              ))}
            </div>
            <Link href="/contacts#form" className="btn btn-gold">
              Поступить на направление
            </Link>
          </div>
          <div className="reveal d1">
            <div className="info-card" style={{ marginBottom: 16 }}>
              <h3>Чему вы научитесь</h3>
              <ul>
                {program.skills.map((s: string) => (
                  <li key={s}>
                    <IconCheck size={18} /> {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="info-card">
              <div
                className="icon-bubble"
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  display: 'grid',
                  placeItems: 'center',
                  background: 'linear-gradient(135deg, var(--brand), var(--brand-soft))',
                  color: '#cfeafd',
                  marginBottom: 12,
                }}
              >
                <ProgramIcon name={program.icon} size={26} />
              </div>
              <h3>Куратор направления</h3>
              <p style={{ margin: 0, color: 'var(--muted)' }}>{program.lead}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
