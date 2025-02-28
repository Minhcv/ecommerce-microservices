# Sử dụng Node.js để build ứng dụng
FROM node:18 AS build

# Đặt thư mục làm việc
WORKDIR /app

# Copy toàn bộ source code vào container
COPY . .

# Sử dụng Nginx để chạy ứng dụng
FROM nginx:alpine

# Copy file build từ `dist/` vào thư mục phục vụ của Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expose cổng 80
EXPOSE 80

# Chạy Nginx
CMD ["nginx", "-g", "daemon off;"]
