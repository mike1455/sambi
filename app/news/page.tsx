import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { IconArrow } from '@/components/Icons';
import { getContent } from '@/lib/content';
import { formatDate } from '@/lib/format';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Новости',
  description: 'Новости и события Столичной академии малого бизнеса.',
};

export default async function NewsPage() {
  const news = (await getContent<any[]>('news')).filter((n) => n.published);
  return (
    <>
      <PageHero
        crumb="Новости"
        title="Новости академии"
        subtitle="События, объявления и жизнь САМБи."
      />
      <section className="section">
        <div className="container">
          {news.length === 0 ? (
            <p className="empty-state">Новостей пока нет — загляните позже.</p>
          ) : (
            <div className="news-grid">
              {news.map((n: any, i: number) => (
                <article className={`news-card reveal d${i % 3}`} key={n.slug}>
                  <time className="news-date" dateTime={n.date}>
                    {formatDate(n.date)}
                  </time>
                  <h3>
                    <Link href={`/news/${n.slug}`}>{n.title}</Link>
                  </h3>
                  <p>{n.excerpt}</p>
                  <Link href={`/news/${n.slug}`} className="program-link">
                    Читать <IconArrow size={18} />
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
