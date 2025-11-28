FROM node:24-alpine

WORKDIR /opt/nextjs

COPY ./server/.env.production.local .
COPY ./server/package.json .
COPY ./yarn.lock .

RUN mkdir node_modules
COPY ./node_modules ./node_modules

RUN mkdir dist

COPY ./server/dist ./dist

CMD ["yarn", "start:prod"]
