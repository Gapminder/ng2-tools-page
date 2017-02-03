FROM nginx:1.10

RUN apt-get update
RUN apt-get install -y apt-utils git build-essential curl sudo

RUN curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
RUN apt-get install -y nodejs

RUN mkdir /home/tools-page
WORKDIR /home/tools-page

COPY ./ ./

RUN npm i 
RUN npm run build:docker
RUN cp docker-nginx.conf /etc/nginx/nginx.conf && cp -R dist /var/www

EXPOSE 8080
