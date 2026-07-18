import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { getContent } from '@/lib/content';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Отзывы студентов',
  description: 'Отзывы студентов и выпускников Столичной академии малого бизнеса.',
};

export default async function ReviewsPage() {
  const reviews = await getContent<any[]>('reviews');
  return (
    <>
      <PageHero
        crumb="Отзывы"
        title="Отзывы студентов"
        subtitle="Нам доверяют более 6000 студентов. Вот что они говорят об учёбе в САМБи."
      />
      <section className="section">
        <div className="container">
          <div className="reviews-grid">
            {reviews.map((r: any, i: number) => (
              <article className={`review reveal d${i % 3}`} key={r.name + i}>
                <p>{r.text}</p>
                <footer>
                  <b>{r.name}</b>
                  <span>{r.role}</span>
                </footer>
              </article>
            ))}
          </div>
          <div className="section-foot reveal">
            <Link href="/contacts#form" className="btn btn-gold btn-lg">
              Стать нашим студентом
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
