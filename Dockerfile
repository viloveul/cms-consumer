FROM debian:stretch-slim

MAINTAINER Fajrul Akbar Zuhdi<fajrulaz@gmail.com>

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y --no-install-recommends --no-install-suggests \
    apt-utils \
    lsb-release \
    gnupg \
    autoconf \
    apt-transport-https \
    ca-certificates \
    dpkg-dev \
    file \
    g++ \
    gcc \
    libc-dev \
    make \
    pkg-config \
    re2c \
    curl \
    nano \
    wget \
    zip \
    unzip \
    cron \
    supervisor

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -

RUN apt-get update && apt-get install -y --no-install-recommends --no-install-suggests nodejs nginx

ADD . /app

# WORK
RUN npm install --prefix /app && \
    npm cache clean --force && \
    apt-get autoremove -y && \
    rm -f /etc/nginx/sites-enabled/* && \
    rm -rf /var/lib/apt/lists/* && \
    rm -rf /tmp/* && \
    mkdir -p /app/dist && \
    touch /app/dist/index.html && \
    cp /app/nginx.conf  /etc/nginx/conf.d/default.conf

WORKDIR /app

EXPOSE 19913

CMD ["sh", "/app/run.sh"]