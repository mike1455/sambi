import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import { getContent } from '@/lib/content';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const site = await getContent<any>('site');
  return {
    title: {
      default: `${site.name} — САМБи`,
      template: `%s — ${site.shortName}`,
    },
    description:
      'Столичная академия малого бизнеса (институт): высшее образование по направлениям «Экономика», «Управление персоналом», «Торговое дело», «Реклама и связи с общественностью». Поступление круглый год.',
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const site = await getContent<any>('site');
  return (
    <html lang="ru">
      <body>
        <Header phone={site.phone} />
        <main>{children}</main>
        <Footer site={site} />
        <Reveal />
      </body>
    </html>
  );
}
