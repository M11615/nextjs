FROM node:24-alpine

WORKDIR /opt/nextjs

COPY ./server/package.json .
COPY ./yarn.lock .
COPY ./server/.env.production.local .

RUN mkdir node_modules
COPY ./node_modules ./node_modules

RUN mkdir dist
COPY ./server/dist ./dist

EXPOSE 3000

CMD ["yarn", "start:prod"]
