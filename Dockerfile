FROM node:20.9-alpine3.18

ARG PORT
ARG DATABASE_USER
ARG DATABASE_PASSWORD
ARG DATABASE_DATABASE
ARG DATABASE_HOST
ARG DATABASE_PORT
ARG FINNHUB_API
ARG REDIS_URL

WORKDIR /opt/app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

CMD ["npm", "run", "start"]
