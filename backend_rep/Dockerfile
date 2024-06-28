ARG NODE_VERSION=22.2.0

# Stage 1: Build stage
FROM node:${NODE_VERSION}-alpine AS builder

WORKDIR /app

COPY package.json .

RUN apk update && apk add bash

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
COPY --from=builder /app/wait-for-it.sh /app/usr/wait-for-it.sh
RUN apk update && apk add bash
RUN chmod +x ./usr/wait-for-it.sh

# CMD ["/app/wait-for", "db:3306", "--", 'npm', 'run', 'start:pushdb:prod']

EXPOSE 3000