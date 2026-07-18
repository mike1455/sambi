import { isAuthed, unauthorized } from '@/lib/auth';
import { deleteFeedback, getFeedback, updateFeedback } from '@/lib/content';

export const runtime = 'nodejs';

export async function GET() {
  if (!(await isAuthed())) return unauthorized();
  return Response.json({ ok: true, feedback: await getFeedback() });
}

export async function PATCH(req: Request) {
  if (!(await isAuthed())) return unauthorized();
  let body: any;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: 'Некорректный запрос.' }, { status: 400 });
  }
  const id = String(body?.id || '');
  const status = body?.status === 'done' ? 'done' : 'new';
  const ok = await updateFeedback(id, { status });
  return Response.json({ ok }, { status: ok ? 200 : 404 });
}

export async function DELETE(req: Request) {
  if (!(await isAuthed())) return unauthorized();
  const id = new URL(req.url).searchParams.get('id') || '';
  const ok = await deleteFeedback(id);
  return Response.json({ ok }, { status: ok ? 200 : 404 });
}
