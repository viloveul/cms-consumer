FROM debian:stretch-slim

MAINTAINER Fajrul Akbar Zuhdi<fajrulaz@gmail.com>

ENV DEBIAN_FRONTEND=noninteractive

ENV BASICDEP \
    apt-transport-https \
    ca-certificates \
    curl \
    nano \
    wget \
    zip \
    unzip \
    cron \
    supervisor

RUN apt-get update && \
    apt-get install -y --no-install-recommends --no-install-suggests $BASICDEP && \
    rm -rf /var/lib/apt/lists/*

ADD . /viloveul

WORKDIR /viloveul

RUN apt-get update && \
    apt-get install -y --no-install-recommends --no-install-suggests nginx && \
    rm -rf /var/lib/apt/lists/* && \
    rm -f /etc/nginx/sites-enabled/* && \
    cp /viloveul/config/nginx.conf /etc/nginx/conf.d/default.conf && \
    mkdir -p /var/log/supervisor && \
    touch /viloveul/.env

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - && \
    apt-get update && \
    apt-get install -y --no-install-recommends --no-install-suggests nodejs && \
    rm -rf /var/lib/apt/lists/*

# WORK
RUN apt-get autoremove -y && \
    rm -rf /tmp/* && \
    mkdir -p /viloveul/build && \
    touch /viloveul/build/index.html

EXPOSE 19913

CMD ["sh", "/viloveul/sbin/dockerc"]