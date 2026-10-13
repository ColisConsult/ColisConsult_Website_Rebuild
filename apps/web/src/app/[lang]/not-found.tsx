import Link from 'next/link';
import { href } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';

export default async function NotFound() {
  const { t, locale } = await getDictionary();
  return (
    <div className="container-site py-28 md:py-40">
      <p className="figure text-5xl text-coral-600">404</p>
      <h1 className="mt-6 max-w-[18ch] text-headline">{t.notFound.title}</h1>
      <p className="mt-5 max-w-xl text-lg text-ink-soft">{t.notFound.text}</p>
      <Link href={href(locale, 'home')} className="btn btn-dark mt-10">
        {t.notFound.cta}
      </Link>
    </div>
  );
}
