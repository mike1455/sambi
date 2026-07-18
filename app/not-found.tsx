import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section">
      <div className="container" style={{ textAlign: 'center', padding: '80px 20px' }}>
        <span className="eyebrow">Ошибка 404</span>
        <h1 style={{ fontSize: 'clamp(30px, 4vw, 44px)' }}>Страница не найдена</h1>
        <p style={{ color: 'var(--muted)', maxWidth: 480, margin: '0 auto 26px' }}>
          Возможно, страница была перемещена или удалена. Вернитесь на главную — там всё на
          месте.
        </p>
        <Link href="/" className="btn btn-gold">
          На главную
        </Link>
      </div>
    </section>
  );
}
