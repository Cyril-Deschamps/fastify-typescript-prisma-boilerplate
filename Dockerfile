FROM node:16-alpine
RUN apk add --no-cache --virtual .build-deps libc6-compat build-base python3
WORKDIR /app

COPY package.json ./package.json
COPY yarn.lock ./yarn.lock 
RUN yarn install --frozen-lockfile

COPY .env ./.env
COPY src ./src
COPY prisma ./prisma
COPY storage ./storage
COPY tsconfig.json ./tsconfig.json

RUN yarn run prisma generate

RUN yarn run build

RUN rm -rf node_modules \
    && yarn install --production --frozen-lockfile

CMD yarn start
EXPOSE 80
