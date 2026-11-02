ARG NODE_VERSION=24.13.1
FROM node:${NODE_VERSION}-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME/bin:$PATH"
WORKDIR /app
RUN corepack enable

# ---
FROM base AS builder
# Install dependencies first (they change less often than the sources)
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
# Build the project
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

# ---
FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app
# Don't run production as root for security reasons
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/app/api-reference/config/next-config-js/output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

EXPOSE 3000
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000
CMD ["node", "server.js"]
