# API ColisConsult — à construire depuis la racine du dépôt :
#   docker build -f apps/api/Dockerfile -t colisconsult-api .
FROM node:22-alpine AS build
RUN npm install -g npm@11
WORKDIR /repo
COPY package.json package-lock.json ./
COPY apps/api/package.json apps/api/
COPY apps/web/package.json apps/web/
RUN npm ci --workspace api --include-workspace-root
COPY apps/api apps/api
RUN npm run build --workspace api && npm prune --omit=dev --workspace api --include-workspace-root

FROM node:22-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /repo/node_modules ./node_modules
COPY --from=build /repo/apps/api/package.json ./
COPY --from=build /repo/apps/api/dist ./dist
COPY --from=build /repo/apps/api/drizzle ./drizzle
RUN mkdir -p /app/storage/uploads /app/storage/media/blog && chown -R node:node /app/storage
USER node
EXPOSE 4000
# Applique les migrations puis démarre l'API
CMD ["sh", "-c", "node dist/db/migrate.js && node dist/main.js"]
