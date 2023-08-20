FROM node:16.20.2-slim as angular
WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
RUN npm install --silent
COPY . /app
RUN npm run build

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/* && rm -rf /etc/nginx/conf.d/default.conf
VOLUME /var/cache/nginx
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=angular app/dist/financiatrackr /usr/share/nginx/html
