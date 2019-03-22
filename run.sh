#!/usr/bin/env sh
printenv | more | grep ^VILOVEUL_ > /app/.env
npm run build --prefix=/app
exec nginx -g 'daemon off;'