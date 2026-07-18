import { isAuthed, unauthorized, isDefaultPassword } from '@/lib/auth';
import { getAllContent, isSection, saveContent } from '@/lib/content';

export const runtime = 'nodejs';

export async function GET() {
  if (!(await isAuthed())) return unauthorized();
  const content = await getAllContent();
  return Response.json({ ok: true, content, defaultPassword: isDefaultPassword() });
}

export async function PUT(req: Request) {
  if (!(await isAuthed())) return unauthorized();
  let body: any;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: 'Некорректный запрос.' }, { status: 400 });
  }
  const section = String(body?.section || '');
  if (!isSection(section) || body?.data === undefined) {
    return Response.json({ ok: false, error: 'Неизвестный раздел.' }, { status: 400 });
  }
  try {
    await saveContent(section, body.data);
  } catch {
    return Response.json(
      {
        ok: false,
        error:
          'Не удалось записать файл. Похоже, хостинг не разрешает запись на диск (например, Vercel) — используйте сервер с постоянным диском.',
      },
      { status: 500 },
    );
  }
  return Response.json({ ok: true });
}
