FROM node:24-alpine

WORKDIR /opt/nextjs

COPY ./client/package.json .
COPY ./yarn.lock .
COPY ./client/.env.production.local .

RUN mkdir node_modules
COPY ./node_modules ./node_modules

RUN mkdir .next
COPY ./client/.next ./.next

RUN mkdir public
COPY ./client/public ./public

EXPOSE 3001

CMD ["yarn", "start"]
