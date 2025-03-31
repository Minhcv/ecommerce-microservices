# E-commerce Microservices

## Mô tả Dự án
Dự án bao gồm các thành phần:
- **Database**: PostgreSQL
- **Backend**: Gồm 3 service: Products, Customers, Orders được xây dựng bằng Yii2
- **Frontend**: ReactJS

## Các bước chạy demo

### 1. Chuyển vào thư mục dự án
```sh
cd ecommerce-microservices
```

### 2. Triển khai Kubernetes
```sh
kubectl create -f k8s
```

### 3. Truy cập giao diện UI
Mở trình duyệt và truy cập:
```
http://localhost:30004/
```

## Ghi chú
- Yêu cầu cài đặt **Kubernetes** và **Docker Desktop**.
- Đảm bảo các cổng Kubernetes được thiết lập đúng trong file YAML.
- Có thể kiểm tra trạng thái các pod với lệnh:
```sh
kubectl get pods
```