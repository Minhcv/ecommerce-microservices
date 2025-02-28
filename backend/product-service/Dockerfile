FROM php:8.3-fpm
WORKDIR /var/www/productservice
COPY . .
RUN apt-get update && apt-get install -y libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql
CMD ["php", "-S", "0.0.0.0:8080", "-t", "web"]
