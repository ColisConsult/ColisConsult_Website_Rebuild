'use client';

import { useFormAction } from '@/components/admin/use-form-action';
import { marked } from 'marked';
import { useMemo, useState } from 'react';
import { cn } from '@/lib/cn';
import { isoToParisInput } from '@/lib/paris-time';
import type { Post } from '@/lib/types';
import { savePost } from '../../actions';

const slugify = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120);

export function PostEditor({ post }: { post: Post | null }) {
  const { state, onSubmit, pending } = useFormAction(savePost.bind(null, post?.id ?? null));
  const [title, setTitle] = useState(post?.title ?? '');
  const [slug, setSlug] = useState(post?.slug ?? '');
  const [slugTouched, setSlugTouched] = useState(!!post);
  const [content, setContent] = useState(post?.content ?? '');
  const [tab, setTab] = useState<'write' | 'preview'>('write');
  // Aperçu local (contenu saisi par l'équipe) ; le site public assainit le HTML côté serveur
  const preview = useMemo(() => (tab === 'preview' ? (marked.parse(content, { async: false }) as string) : ''), [tab, content]);

  return (
    <form onSubmit={onSubmit} className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-5 lg:col-span-2">
        <div>
          <label htmlFor="title" className="label">Titre</label>
          <input
            id="title"
            name="title"
            required
            minLength={3}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (!slugTouched) setSlug(slugify(e.target.value));
            }}
            className="field text-lg"
          />
        </div>
        <div>
          <label htmlFor="excerpt" className="label">Chapô <span className="font-normal text-ink-faint">(résumé affiché dans les listes, 600 caractères max.)</span></label>
          <textarea id="excerpt" name="excerpt" rows={2} maxLength={600} defaultValue={post?.excerpt ?? ''} className="field" />
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <span className="label !mb-0">Contenu <span className="font-normal text-ink-faint">(Markdown)</span></span>
            <div className="flex rounded-sm border border-line-strong text-sm">
              {(['write', 'preview'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={cn('px-3 py-1', tab === t ? 'bg-teal text-white' : 'hover:bg-paper')}
                >
                  {t === 'write' ? 'Rédiger' : 'Aperçu'}
                </button>
              ))}
            </div>
          </div>
          <textarea
            name="content"
            rows={22}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={cn('field num text-[0.9rem] leading-relaxed', tab === 'preview' && 'hidden')}
            placeholder={'## Intertitre\n\nVotre texte… **gras**, *italique*, [lien](https://…)\n\n- liste\n- à puces'}
          />
          {tab === 'preview' && (
            <div className="prose-cc min-h-80 rounded-md border border-line bg-white p-6" dangerouslySetInnerHTML={{ __html: preview }} />
          )}
        </div>
      </div>

      <div className="space-y-5">
        <div className="space-y-5 rounded-md border border-line bg-white p-5">
          <div>
            <label htmlFor="status" className="label">Statut</label>
            <select id="status" name="status" defaultValue={post?.status ?? 'draft'} className="field field-select">
              <option value="draft">Brouillon</option>
              <option value="published">Publié</option>
            </select>
          </div>
          <div>
            <label htmlFor="kind" className="label">Type</label>
            <select id="kind" name="kind" defaultValue={post?.kind ?? 'article'} className="field field-select">
              <option value="article">Article (conseils, analyses)</option>
              <option value="news">Actualité ou webinar</option>
            </select>
            <p className="mt-1 text-xs text-ink-faint">Les actualités et annonces de webinars sont présentées à part des articles.</p>
          </div>
          <div>
            <label htmlFor="publishedAt" className="label">Date de publication</label>
            <input id="publishedAt" name="publishedAt" type="datetime-local" defaultValue={isoToParisInput(post?.publishedAt)} className="field" />
            <p className="mt-1 text-xs text-ink-faint">Vide : date du jour à la publication.</p>
          </div>
          <div>
            <label htmlFor="locale" className="label">Langue</label>
            <select id="locale" name="locale" defaultValue={post?.locale ?? 'fr'} className="field field-select">
              <option value="fr">Français</option>
              <option value="en">Anglais</option>
            </select>
          </div>
          <div>
            <label htmlFor="slug" className="label">Adresse (slug)</label>
            <input
              id="slug"
              name="slug"
              required
              pattern="[a-z0-9]+(-[a-z0-9]+)*"
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
                setSlugTouched(true);
              }}
              className="field num text-sm"
            />
            <p className="mt-1 truncate text-xs text-ink-faint">/blog/{slug || '…'}</p>
          </div>
          <div>
            <label htmlFor="coverImageUrl" className="label">Image de couverture <span className="font-normal text-ink-faint">(URL, facultatif)</span></label>
            <input id="coverImageUrl" name="coverImageUrl" defaultValue={post?.coverImageUrl ?? ''} className="field text-sm" placeholder="/uploads/blog/image.jpg" />
          </div>
        </div>
        {state.error && (
          <p role="alert" className="rounded-md bg-coral-soft/60 p-3 text-sm">
            {state.error}
          </p>
        )}
        <button type="submit" disabled={pending} className="btn btn-dark w-full justify-center disabled:opacity-60">
          {pending ? 'Enregistrement…' : 'Enregistrer'}
        </button>
      </div>
    </form>
  );
}
