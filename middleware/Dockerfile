FROM node:18-bullseye
RUN apt-get update
RUN apt-get -y install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
COPY . .

RUN useradd -ms /bin/bash rentify-deployer
WORKDIR /srv/app
RUN chmod -R g+rwX /srv/app