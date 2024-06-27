ARG NODE_VERSION=22.2.0

# Stage 1: Build stage
FROM node:${NODE_VERSION}-alpine AS builder

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

# Stage 2: Run stage
FROM node:${NODE_VERSION}-alpine

WORKDIR /app

COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

COPY wait-for /app/usr/wait-for
RUN chmod +x /app/usr/wait-for

EXPOSE 3000