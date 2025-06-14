# Base image with Node.js and Alpine
FROM node:18-alpine AS base

# ========== DEPS ==========
FROM base AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json package-lock.json* ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci

# ========== BUILDER ==========
FROM base AS builder

# Define build-time ARGs used for env validation
ARG DATABASE_URL
ARG DIRECT_URL
ARG NEXTAUTH_SECRET
ARG NEXTAUTH_URL
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG EMAIL_SERVER
ARG EMAIL_FROM
ARG SUPABASE_ANON_KEY
ARG SUPABASE_PROJECT_URL
ARG IMAGE_PROXY_HOSTNAME
ARG NEXT_PUBLIC_BASE_URL

WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/prisma ./prisma
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the Next.js app
RUN \
  if [ -f yarn.lock ]; then yarn build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "No lockfile found. Cannot build." && exit 1; \
  fi

# ========== RUNNER ==========
FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user for better security
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# Copy built assets and static files
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Prisma client
COPY --from=builder /app/node_modules/.prisma /app/node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma /app/node_modules/@prisma

# Set to non-root user
USER nextjs

EXPOSE 3000
ENV PORT=3000

# Run the standalone Next.js server
CMD ["node", "server.js"]