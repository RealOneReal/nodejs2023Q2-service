FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY ./prisma/schema.prisma ./prisma/
COPY ./.env ./
RUN npx prisma generate

COPY . .

FROM node:lts-alpine
WORKDIR /app

COPY --from=builder /app .

EXPOSE ${APP_PORT}

CMD ["npm", "start"]