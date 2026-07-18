import { addFeedback } from '@/lib/content';

export const runtime = 'nodejs';

// Простейшее ограничение частоты: не более 5 заявок в минуту с одного IP.
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60_000;
  const list = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  if (list.length >= 5) {
    hits.set(ip, list);
    return true;
  }
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 1000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= windowMs)) hits.delete(key);
    }
  }
  return false;
}

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: 'Некорректный запрос.' }, { status: 400 });
  }

  // honeypot: поле заполняют только боты
  if (typeof body?.company === 'string' && body.company.trim() !== '') {
    return Response.json({ ok: true });
  }

  const name = String(body?.name || '').trim().slice(0, 120);
  const contact = String(body?.contact || '').trim().slice(0, 160);
  const message = String(body?.message || '').trim().slice(0, 2000);

  if (name.length < 2 || contact.length < 5) {
    return Response.json(
      { ok: false, error: 'Укажите имя и контакт для связи.' },
      { status: 400 },
    );
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown';
  if (rateLimited(ip)) {
    return Response.json(
      { ok: false, error: 'Слишком много заявок. Попробуйте через минуту.' },
      { status: 429 },
    );
  }

  try {
    await addFeedback({ name, contact, message });
  } catch {
    return Response.json(
      {
        ok: false,
        error:
          'Не удалось сохранить заявку. Позвоните нам по телефону — будем рады помочь.',
      },
      { status: 500 },
    );
  }
  return Response.json({ ok: true });
}
