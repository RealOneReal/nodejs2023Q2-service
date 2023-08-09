FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY ./prisma/schema.prisma ./prisma/
COPY ./.env ./

RUN npx prisma generate

COPY . .

EXPOSE ${APP_PORT}

CMD ["npm", "start"]