import Link from 'next/link';
import Image from 'next/image';
import { IconMail, IconPhone, IconPin, IconClock } from './Icons';

type SiteSettings = {
  name: string;
  shortName: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
  footerNote: string;
};

export default function Footer({ site }: { site: SiteSettings }) {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">
            <Image src="/images/logo.png" alt="Логотип САМБи" width={52} height={52} />
            <div>
              <b>{site.shortName}</b>
              <span>{site.name}</span>
            </div>
          </div>
          <p>{site.footerNote}</p>
        </div>

        <nav className="footer-col" aria-label="Разделы сайта">
          <h4>Академия</h4>
          <Link href="/about">Об академии</Link>
          <Link href="/programs">Направления обучения</Link>
          <Link href="/news">Новости</Link>
          <Link href="/reviews">Отзывы студентов</Link>
          <Link href="/docs">Документы</Link>
        </nav>

        <nav className="footer-col" aria-label="Поступающим">
          <h4>Абитуриентам</h4>
          <Link href="/admissions">Правила приёма</Link>
          <Link href="/admissions#pricing">Стоимость обучения</Link>
          <Link href="/admissions#docs">Документы для поступления</Link>
          <Link href="/contacts#form">Оставить заявку</Link>
        </nav>

        <div className="footer-col footer-contacts">
          <h4>Контакты</h4>
          <a href={`tel:${site.phone.replace(/[^+\d]/g, '')}`}>
            <IconPhone size={17} /> {site.phone}
          </a>
          <a href={`mailto:${site.email}`}>
            <IconMail size={17} /> {site.email}
          </a>
          <span>
            <IconPin size={17} /> {site.address}
          </span>
          <span>
            <IconClock size={17} /> {site.hours}
          </span>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>
          © 2007–{year} {site.shortName} — {site.name}. Все права защищены.
        </span>
        <Link href="/privacy">Политика обработки персональных данных</Link>
      </div>
    </footer>
  );
}
