# ARG NODE_VERSION=22.2.0

# FROM node:${NODE_VERSION}-alpine

# WORKDIR /app

# COPY package.json .

# RUN npm install

# COPY . .

# RUN npm run build

# COPY wait-for /app/usr/wait-for
# RUN chmod +x /app/usr/wait-for

# EXPOSE 3001

# Stage 1: Base stage for installing dependencies
ARG NODE_VERSION=22.2.0
FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# Stage 2: Builder stage to build the Next.js app
FROM base AS builder
COPY . .
RUN npm run build
COPY wait-for-it.sh /app/usr/wait-for-it.sh

# Stage 3: Runner stage for the production environment
FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/usr/wait-for-it.sh /app/usr/wait-for-it.sh
RUN apk update && apk add bash
RUN chmod +x /app/usr/wait-for-it.sh

EXPOSE 3001