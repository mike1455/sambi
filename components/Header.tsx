'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const NAV = [
  { href: '/', label: 'Главная' },
  { href: '/about', label: 'Об академии' },
  { href: '/programs', label: 'Направления' },
  { href: '/admissions', label: 'Абитуриентам' },
  { href: '/news', label: 'Новости' },
  { href: '/contacts', label: 'Контакты' },
];

export default function Header({ phone }: { phone: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle('nav-open', open);
    return () => document.documentElement.classList.remove('nav-open');
  }, [open]);

  const phoneHref = `tel:${phone.replace(/[^+\d]/g, '')}`;

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container header-row">
        <Link href="/" className="brand" aria-label="САМБи — на главную">
          <Image src="/images/logo.png" alt="Логотип САМБи" width={44} height={44} priority />
          <span className="brand-text">
            <b>САМБи</b>
            <i>Столичная академия малого бизнеса</i>
          </span>
        </Link>

        <nav className={`main-nav${open ? ' open' : ''}`} aria-label="Основная навигация">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                pathname === item.href ||
                (item.href !== '/' && pathname?.startsWith(item.href))
                  ? 'active'
                  : undefined
              }
            >
              {item.label}
            </Link>
          ))}
          <a href={phoneHref} className="nav-phone">
            {phone}
          </a>
          <Link href="/contacts#form" className="btn btn-gold nav-cta">
            Оставить заявку
          </Link>
        </nav>

        <div className="header-actions">
          <a href={phoneHref} className="header-phone">
            {phone}
          </a>
          <Link href="/contacts#form" className="btn btn-gold header-cta">
            Оставить заявку
          </Link>
          <button
            type="button"
            className={`burger${open ? ' active' : ''}`}
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
