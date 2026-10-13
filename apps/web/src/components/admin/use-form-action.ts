'use client';

import { startTransition, useActionState, type FormEvent } from 'react';
import type { ActionState } from '@/app/admin/actions';

/**
 * useActionState sans la réinitialisation automatique du formulaire de React 19 :
 * en cas d'erreur de validation, la saisie est conservée.
 */
export function useFormAction(action: (state: ActionState, data: FormData) => Promise<ActionState>) {
  const [state, dispatch, pending] = useActionState<ActionState, FormData>(action, {});
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    startTransition(() => dispatch(data));
  };
  return { state, onSubmit, pending };
}
