import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';

/**
 * Простая сессия администратора: cookie с HMAC-токеном, производным от пароля.
 * Пароль задаётся переменной окружения ADMIN_PASSWORD.
 * Если переменная не задана, действует стартовый пароль (см. DEFAULT_PASSWORD) —
 * админка при этом показывает предупреждение, что пароль нужно сменить.
 */

export const DEFAULT_PASSWORD = 'sambi2026';
export const COOKIE_NAME = 'sambi_admin';

export function adminPassword(): string {
  return process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD;
}

export function isDefaultPassword(): boolean {
  return adminPassword() === DEFAULT_PASSWORD;
}

export function sessionToken(): string {
  return createHmac('sha256', `sambi-admin-secret::${adminPassword()}`)
    .update('sambi-admin-session-v1')
    .digest('hex');
}

function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

export function checkPassword(password: string): boolean {
  return typeof password === 'string' && safeEqual(password, adminPassword());
}

export async function isAuthed(): Promise<boolean> {
  const jar = await cookies();
  const value = jar.get(COOKIE_NAME)?.value;
  return !!value && safeEqual(value, sessionToken());
}

export function unauthorized(): Response {
  return Response.json({ ok: false, error: 'unauthorized' }, { status: 401 });
}
