FROM node:24.13-alpine3.22

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm i -g serve

COPY . .

RUN npm run build

CMD [ "serve", "-s", "dist", "-l", "3000" ]