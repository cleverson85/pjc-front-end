FROM node:12-alpine as build

WORKDIR /app

COPY package.json /app

RUN npm install --silent

COPY . .

RUN npm run build --prod

FROM nginx:alpine

VOLUME /var/cache/nginx

COPY --from=build app/dist/pjc-front-end /usr/share/nginx/html

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
