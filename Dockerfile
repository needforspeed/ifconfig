# Build the source code
FROM node:lts-slim AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Install dependencies only when needed
FROM node:lts-slim AS runner
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm install --production

RUN addgroup --gid 1001 nodejs
RUN useradd --uid 1001 --gid 1001 nextjs

# You only need to copy next.config.js if you are NOT using the default configuration
# COPY --from=builder /app/next.config.js ./
# COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next

USER nextjs
EXPOSE 5000
ENV PORT 5000

ENV NEXT_TELEMETRY_DISABLED 1
CMD ["npm", "start"]
