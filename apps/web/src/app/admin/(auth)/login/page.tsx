import { Suspense } from 'react';
import { Logo } from '@/components/ui/logo';
import { LoginForm } from './login-form';

export const metadata = { title: 'Connexion' };

export default function LoginPage({ searchParams }: PageProps<'/admin/login'>) {
  return (
    <div className="flex min-h-dvh items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <Logo />
        <div className="mt-8 rounded-md border border-line bg-white p-7">
          <h1 className="text-xl">Back-office</h1>
          <p className="mt-1 text-sm text-ink-soft">Accès réservé à l’équipe ColisConsult.</p>
          <Suspense>
            <LoginFields searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

async function LoginFields({ searchParams }: { searchParams: PageProps<'/admin/login'>['searchParams'] }) {
  const sp = await searchParams;
  const next = typeof sp.next === 'string' ? sp.next : '/admin';
  return <LoginForm next={next} expired={sp.expired === '1'} />;
}
