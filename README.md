# E-commerce Microservices

This project contains three microservices for an e-commerce application: Product, Customer, and Order services.

## Setup Instructions

1. Clone this repository:
   ```sh
   git clone https://github.com/Minhcv/ecommerce-microservices.git
   ```
2. Navigate into the project directory:
   ```sh
   cd ecommerce-microservices
   ```
3. Start the services using Docker Compose:
   ```sh
   docker-compose up --build
   ```
4. Deploy to Kubernetes:
   ```sh
   kubectl apply -f k8s/
   ```

## Endpoints
- Product Service: http://localhost:8081
- Customer Service: http://localhost:8082
- Order Service: http://localhost:8083