FROM php:8.3-fpm

# Đặt thư mục làm việc
WORKDIR /var/www/productservice

# Copy source code vào container
COPY . .

# Cài đặt các thư viện cần thiết
RUN apt-get update && apt-get install -y libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql

# Cấp quyền thực thi cho script migrate
RUN chmod +x /var/www/productservice/db_migrate.sh

# Chạy migrate trước khi khởi động server
ENTRYPOINT ["/bin/bash", "-c", "/var/www/productservice/db_migrate.sh up && php -S 0.0.0.0:8080 -t web"]
