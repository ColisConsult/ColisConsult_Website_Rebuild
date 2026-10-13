import { publicApiUrl } from '@/lib/site';
import type { Dictionary } from '@/i18n/get-dictionary';
import type { SubmitState } from './fields';

/** Envoie un formulaire à l'API NestJS et traduit les erreurs en message lisible. */
export async function submitLead(
  path: string,
  body: FormData | Record<string, unknown>,
  t: Dictionary['forms'],
): Promise<SubmitState> {
  try {
    const isForm = body instanceof FormData;
    const res = await fetch(`${publicApiUrl}${path}`, {
      method: 'POST',
      body: isForm ? body : JSON.stringify(body),
      headers: isForm ? undefined : { 'Content-Type': 'application/json' },
    });
    if (res.ok) return { status: 'success' };
    if (res.status === 429) return { status: 'error', message: t.tooMany };
    const data = (await res.json().catch(() => null)) as { message?: string | string[] } | null;
    const message = Array.isArray(data?.message) ? data.message.join(' · ') : data?.message;
    return { status: 'error', message: message ? `${t.error} (${message})` : t.error };
  } catch {
    return { status: 'error', message: t.error };
  }
}

export function formToObject(form: HTMLFormElement) {
  const data = new FormData(form);
  const out: Record<string, unknown> = {};
  for (const [key, value] of data.entries()) if (typeof value === 'string') out[key] = value;
  out.consent = data.get('consent') === 'true';
  return out;
}
