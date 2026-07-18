import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import { getContent } from '@/lib/content';
import { formatDate } from '@/lib/format';

export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const news = await getContent<any[]>('news');
  const item = news.find((n) => n.slug === slug && n.published);
  if (!item) return { title: 'Новость не найдена' };
  return { title: item.title, description: item.excerpt };
}

export default async function NewsItemPage({ params }: Props) {
  const { slug } = await params;
  const news = await getContent<any[]>('news');
  const item = news.find((n) => n.slug === slug && n.published);
  if (!item) notFound();

  return (
    <>
      <PageHero crumb="Новости" title={item.title} subtitle={formatDate(item.date)} />
      <section className="section">
        <div className="container">
          <div className="prose reveal">
            {item.body.map((p: string) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
          <div style={{ marginTop: 30 }}>
            <Link href="/news" className="btn btn-outline">
              ← Все новости
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
