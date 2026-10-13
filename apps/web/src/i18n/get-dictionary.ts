import { notFound } from 'next/navigation';
import { lang } from 'next/root-params';
import { hasLocale, type Locale } from './config';
import en from './dictionaries/en';
import fr, { type Dictionary } from './dictionaries/fr';

const dictionaries: Record<Locale, Dictionary> = { fr, en };

/** Langue de la page en cours (segment racine app/[lang]) */
export async function getLocale(): Promise<Locale> {
  const value = await lang();
  if (!value || !hasLocale(value)) notFound();
  return value;
}

export async function getDictionary() {
  const locale = await getLocale();
  return { t: dictionaries[locale], locale };
}

export function dictionaryFor(locale: Locale) {
  return dictionaries[locale];
}

export type { Dictionary };
