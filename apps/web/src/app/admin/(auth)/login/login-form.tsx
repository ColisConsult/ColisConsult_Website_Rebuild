'use client';

import { useFormAction } from '@/components/admin/use-form-action';
import { login } from '../../actions';

export function LoginForm({ next, expired }: { next: string; expired: boolean }) {
  const { state, onSubmit, pending } = useFormAction(login);
  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      {expired && !state.error && (
        <p className="rounded-sm bg-coral-soft/60 p-3 text-sm">Votre session a expiré. Reconnectez-vous.</p>
      )}
      <input type="hidden" name="next" value={next} />
      <div>
        <label htmlFor="email" className="label">E-mail</label>
        <input id="email" name="email" type="email" autoComplete="username" required className="field" />
      </div>
      <div>
        <label htmlFor="password" className="label">Mot de passe</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required className="field" />
      </div>
      {state.error && (
        <p role="alert" className="text-sm text-coral-ink">
          {state.error}
        </p>
      )}
      <button type="submit" disabled={pending} className="btn btn-dark w-full justify-center disabled:opacity-60">
        {pending ? 'Connexion…' : 'Se connecter'}
      </button>
    </form>
  );
}
