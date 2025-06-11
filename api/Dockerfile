# syntax=docker/dockerfile:1

# bcrypt is a native addon and needs a toolchain to compile on alpine
FROM node:18-alpine AS deps
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

FROM node:18-alpine AS builder
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY package.json package-lock.json ./
RUN npm ci
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

FROM node:18-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/build ./build
COPY --from=builder /app/src/migrations ./src/migrations
COPY package.json package-lock.json .sequelizerc ./
COPY config ./config

EXPOSE 3001
CMD ["node", "build/index.js"]
