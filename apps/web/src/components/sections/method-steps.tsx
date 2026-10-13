import type { Dictionary } from '@/i18n/get-dictionary';
import { AiMark } from '../ui/icons';

/** Les six étapes en version courte (accueil). */
export function MethodSteps({ steps, aiLabel }: { steps: Dictionary['method']['steps']; aiLabel: string }) {
  return (
    <div>
      <ol className="grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, i) => (
          <li key={step.title} className="flex flex-col bg-paper p-6 md:p-7">
            <div className="flex items-center justify-between">
              <span className="num text-sm text-ink-faint">0{i + 1}</span>
              {step.ai && (
                <span className="flex items-center gap-1.5 text-xs font-medium text-coral-ink">
                  <AiMark className="size-1.5" />
                  {aiLabel}
                </span>
              )}
            </div>
            <h3 className="mt-8 text-xl">{step.title}</h3>
            <p className="mt-2 text-[0.97rem] leading-relaxed text-ink-soft">{step.short}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
