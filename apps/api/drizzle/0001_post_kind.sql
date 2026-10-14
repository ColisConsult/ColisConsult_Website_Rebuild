CREATE TYPE "public"."post_kind" AS ENUM('article', 'news');--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "kind" "post_kind" DEFAULT 'article' NOT NULL;--> statement-breakpoint
-- Classement des articles déjà en base : annonces de webinars et actualités du cabinet
UPDATE "posts" SET "kind" = 'news' WHERE "title" ILIKE '%webinar%' OR "slug" IN ('recueils-des-recommandations-linkedin-deposees-par-les-clients-colisconsult', 'quest-ce-que-la-medaille-meilleure-livraison-colisconsult', 'palmares-meilleure-livraison-e-commerce-2021-by-colisconsult', 'savoir-donner-sans-rien-attendre-en-retour');
