import Link from 'next/link';
import FeedbackForm from '@/components/FeedbackForm';
import {
  IconArrow,
  IconMail,
  IconPhone,
  IconPin,
  IconClock,
  ProgramIcon,
} from '@/components/Icons';
import { getContent } from '@/lib/content';
import { formatDate } from '@/lib/format';

export const dynamic = 'force-dynamic';

function Skyline() {
  return (
    <svg
      className="hero-skyline"
      viewBox="0 0 560 300"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMaxYMax meet"
    >
      <g opacity="0.9">
        <rect x="40" y="150" width="58" height="150" rx="4" fill="#79ccf2" opacity="0.22" />
        <rect x="112" y="96" width="70" height="204" rx="4" fill="#79ccf2" opacity="0.34" />
        <rect x="196" y="30" width="84" height="270" rx="4" fill="#9fdbf7" opacity="0.5" />
        <rect x="294" y="80" width="72" height="220" rx="4" fill="#79ccf2" opacity="0.36" />
        <rect x="380" y="130" width="62" height="170" rx="4" fill="#79ccf2" opacity="0.26" />
        <rect x="456" y="170" width="52" height="130" rx="4" fill="#79ccf2" opacity="0.18" />
        <rect x="232" y="6" width="12" height="24" rx="3" fill="#9fdbf7" opacity="0.6" />
      </g>
      {[
        [40, 58, 150],
        [112, 70, 96],
        [196, 84, 30],
        [294, 72, 80],
        [380, 62, 130],
        [456, 52, 170],
      ].map(([x, w, top], i) => {
        const rows = [];
        for (let y = top + 14; y < 288; y += 22) {
          rows.push(
            <rect
              key={`${i}-${y}`}
              x={x + 8}
              y={y}
              width={w - 16}
              height={7}
              rx={2}
              fill="#0b2149"
              opacity={0.5}
            />,
          );
        }
        return <g key={i}>{rows}</g>;
      })}
    </svg>
  );
}

function Wave() {
  return (
    <svg className="hero-wave" viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden="true">
      <path
        d="M0 70h1440V32c-114 22-292 38-480 38-236 0-396-44-624-44C204 26 76 40 0 56v14z"
        fill="currentColor"
      />
    </svg>
  );
}

export default async function HomePage() {
  const [site, home, programs, news, reviews, faq] = await Promise.all([
    getContent<any>('site'),
    getContent<any>('home'),
    getContent<any[]>('programs'),
    getContent<any[]>('news'),
    getContent<any[]>('reviews'),
    getContent<any[]>('faq'),
  ]);

  const published = news.filter((n) => n.published).slice(0, 3);
  const phoneHref = `tel:${site.phone.replace(/[^+\d]/g, '')}`;

  return (
    <>
      {/* ===== Hero ===== */}
      <section className="hero">
        <div className="container">
          <div className="hero-inner">
            <span className="hero-badge">{home.heroBadge}</span>
            <h1>
              {home.heroTitle.split('своё дело').length === 2 ? (
                <>
                  {home.heroTitle.split('своё дело')[0]}
                  <em>своё дело</em>
                  {home.heroTitle.split('своё дело')[1]}
                </>
              ) : (
                home.heroTitle
              )}
            </h1>
            <p className="hero-sub">{home.heroSubtitle}</p>
            <div className="hero-cta">
              <Link href="/contacts#form" className="btn btn-gold btn-lg">
                {home.heroCta1}
              </Link>
              <Link href="/programs" className="btn btn-ghost-light btn-lg">
                {home.heroCta2}
              </Link>
            </div>
            <ul className="hero-chips">
              {home.heroChips.map((chip: string) => (
                <li key={chip}>{chip}</li>
              ))}
            </ul>
          </div>
        </div>
        <Skyline />
        <Wave />
      </section>

      {/* ===== Преимущества ===== */}
      <section className="section" id="benefits">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Почему САМБи</span>
            <h2>Образование, которое подстраивается под вашу жизнь</h2>
          </div>
          <div className="benefits-grid">
            {home.benefits.map((b: any, i: number) => (
              <article className={`benefit reveal d${i % 4}`} key={b.title}>
                <div className="icon-bubble">
                  <ProgramIcon name={b.icon} size={26} />
                </div>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Направления ===== */}
      <section className="section tint" id="programs">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Направления обучения</span>
            <h2>Четыре пути в собственное дело</h2>
            <p>
              Бакалавриат по ключевым для предпринимателя направлениям — очно, очно-заочно,
              заочно или дистанционно.
            </p>
          </div>
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
        </div>
      </section>

      {/* ===== Цифры ===== */}
      <section className="section">
        <div className="container">
          <div className="stats-band reveal">
            {home.stats.map((s: any) => (
              <div className="stat" key={s.label}>
                <b>{s.value}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Об академии ===== */}
      <section className="section" id="about">
        <div className="container two-col">
          <div className="reveal">
            <span className="eyebrow">Об академии</span>
            <h2>{home.aboutTitle}</h2>
            <div className="prose">
              <p>{home.aboutText}</p>
            </div>
            <Link href="/about" className="btn btn-outline">
              Подробнее об академии
            </Link>
          </div>
          <div className="info-card reveal d1">
            <h3>Коротко о главном</h3>
            <ul>
              <li>
                <IconPin size={18} /> {site.address}
              </li>
              <li>
                <IconClock size={18} /> {site.hours}
              </li>
              <li>
                <IconPhone size={18} /> {site.phone}
              </li>
              <li>
                <IconMail size={18} /> {site.email}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===== Новости ===== */}
      {published.length > 0 && (
        <section className="section tint" id="news">
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow">Новости</span>
              <h2>Жизнь академии</h2>
            </div>
            <div className="news-grid">
              {published.map((n: any, i: number) => (
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
            <div className="section-foot reveal">
              <Link href="/news" className="btn btn-outline">
                Все новости
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ===== Отзывы ===== */}
      <section className="section" id="reviews">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Отзывы</span>
            <h2>Что говорят наши студенты</h2>
          </div>
          <div className="reviews-grid">
            {reviews.slice(0, 3).map((r: any, i: number) => (
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
            <Link href="/reviews" className="btn btn-outline">
              Все отзывы
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="section tint" id="faq">
        <div className="container">
          <div className="section-head center reveal">
            <span className="eyebrow">Вопросы и ответы</span>
            <h2>Частые вопросы абитуриентов</h2>
          </div>
          <div className="faq-list reveal">
            {faq.map((item: any) => (
              <details className="faq-item" key={item.q}>
                <summary>{item.q}</summary>
                <div className="faq-a">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA + форма ===== */}
      <section className="section" id="feedback">
        <div className="container">
          <div className="cta-band reveal">
            <div className="cta-copy">
              <h2>{home.ctaTitle}</h2>
              <p>{home.ctaText}</p>
              <div className="cta-contacts">
                <a href={phoneHref}>
                  <IconPhone size={18} /> {site.phone}
                </a>
                <a href={`mailto:${site.email}`}>
                  <IconMail size={18} /> {site.email}
                </a>
                <span>
                  <IconPin size={18} /> {site.address}
                </span>
                <span>
                  <IconClock size={18} /> {site.hours}
                </span>
              </div>
            </div>
            <div className="cta-form">
              <h3>Заявка на поступление и вопросы</h3>
              <FeedbackForm compact />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
