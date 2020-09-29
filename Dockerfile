FROM node:12.18

WORKDIR /api

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 1337

ENV NODE_ENV=production

RUN yarn build

CMD [ "yarn", "start" ]