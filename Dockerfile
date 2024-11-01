FROM node:20.9-alpine3.18

WORKDIR /opt/app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

CMD ["npm", "run", "start:dev"]