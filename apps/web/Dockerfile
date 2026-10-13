# Site ColisConsult — à construire depuis la racine du dépôt :
#   docker build -f apps/web/Dockerfile -t colisconsult-web \
#     --build-arg NEXT_PUBLIC_API_URL=https://www.colisconsult.com/api \
#     --build-arg NEXT_PUBLIC_SITE_URL=https://www.colisconsult.com .
FROM node:22-alpine AS build
RUN npm install -g npm@11
WORKDIR /repo
COPY package.json package-lock.json ./
COPY apps/api/package.json apps/api/
COPY apps/web/package.json apps/web/
RUN npm ci --workspace web --include-workspace-root
COPY apps/web apps/web
# Variables publiques : intégrées au code client au moment du build
ARG NEXT_PUBLIC_API_URL=http://localhost:4000/api
ARG NEXT_PUBLIC_SITE_URL=http://localhost:3000
# API joignable pendant le build (facultatif : sans elle, le contenu se charge à la première visite)
ARG API_URL=http://localhost:4000/api
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL API_URL=$API_URL NEXT_TELEMETRY_DISABLED=1
RUN npm run build --workspace web

FROM node:22-alpine
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
WORKDIR /app
COPY --from=build /repo/apps/web/.next/standalone ./
COPY --from=build /repo/apps/web/.next/static ./apps/web/.next/static
COPY --from=build /repo/apps/web/public ./apps/web/public
# Volume « media » partagé avec l'API (images du blog importées depuis WordPress)
RUN mkdir -p /app/media/blog && chown -R node:node /app/media
USER node
EXPOSE 3000
CMD ["node", "apps/web/server.js"]
