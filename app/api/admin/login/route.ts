import { cookies } from 'next/headers';
import { checkPassword, isDefaultPassword, sessionToken, COOKIE_NAME } from '@/lib/auth';

export const runtime = 'nodejs';

const attempts = new Map<string, number[]>();

export async function POST(req: Request) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown';
  const now = Date.now();
  const recent = (attempts.get(ip) || []).filter((t) => now - t < 10 * 60_000);
  if (recent.length >= 10) {
    return Response.json(
      { ok: false, error: 'Слишком много попыток входа. Подождите 10 минут.' },
      { status: 429 },
    );
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: 'Некорректный запрос.' }, { status: 400 });
  }

  if (!checkPassword(String(body?.password ?? ''))) {
    recent.push(now);
    attempts.set(ip, recent);
    return Response.json({ ok: false, error: 'Неверный пароль.' }, { status: 401 });
  }

  attempts.delete(ip);
  const secure =
    req.headers.get('x-forwarded-proto') === 'https' ||
    new URL(req.url).protocol === 'https:';
  const jar = await cookies();
  jar.set(COOKIE_NAME, sessionToken(), {
    httpOnly: true,
    sameSite: 'lax',
    secure,
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
  return Response.json({ ok: true, defaultPassword: isDefaultPassword() });
}
