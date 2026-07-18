import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import { IconDoc } from '@/components/Icons';
import { getContent } from '@/lib/content';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Документы',
  description:
    'Официальные документы Столичной академии малого бизнеса: устав, лицензия, сведения об образовательной организации.',
};

export default async function DocsPage() {
  const docs = await getContent<any>('docsPage');
  return (
    <>
      <PageHero
        crumb="Документы"
        title="Сведения об образовательной организации"
        subtitle={docs.intro}
      />
      <section className="section">
        <div className="container">
          <div className="doc-list" style={{ maxWidth: 820 }}>
            {docs.items.map((d: any) => (
              <article className="doc-item reveal" key={d.title}>
                <div className="icon-bubble">
                  <IconDoc size={22} />
                </div>
                <div>
                  <b>{d.title}</b>
                  <span>{d.note}</span>
                  {d.url ? (
                    <div>
                      <a href={d.url} target="_blank" rel="noopener noreferrer">
                        Открыть документ →
                      </a>
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
