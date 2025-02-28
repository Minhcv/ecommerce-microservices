import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Customer {
    id: number;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    created_at: string;
}

interface Product {
    id: number;
    name: string;
    price: number;
}

export default function CreateOrder() {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [formData, setFormData] = useState({
        customer_id: "",
        product_id: "",
        quantity: 1,
    });
    const [error, setError] = useState("");

    // Lấy danh sách khách hàng và sản phẩm từ API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [customerRes, productRes] = await Promise.all([
                    axios.get("http://localhost:8082/api/v1/customer/list"),
                    axios.get("http://localhost:8084/api/v1/product/list"),
                ]);
                setCustomers(customerRes.data);
                setProducts(productRes.data);
            } catch (error) {
                setError("Không thể tải dữ liệu.");
            }
        };

        fetchData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post("http://localhost:8083/api/v1/order/create", formData);
            if (response.data.status === "success") {
                navigate("/list-order"); // Chuyển hướng sau khi tạo đơn hàng
            } else {
                setError("Tạo đơn hàng thất bại, vui lòng thử lại.");
            }
        } catch (error) {
            setError("Lỗi khi gửi yêu cầu.");
        }
    };

    return (
        <div style={{ width: "400px", margin: "50px auto", textAlign: "center" }}>
            <h2>Tạo Đơn Hàng</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <select name="customer_id" value={formData.customer_id} onChange={handleChange} required>
                    <option value="">Chọn khách hàng</option>
                    {customers.map((customer) => (
                        <option key={customer.id} value={customer.id}>
                            {customer.name}
                        </option>
                    ))}
                </select>
                <br /><br />

                <select name="product_id" value={formData.product_id} onChange={handleChange} required>
                    <option value="">Chọn sản phẩm</option>
                    {products.map((product) => (
                        <option key={product.id} value={product.id}>
                            {product.name}
                        </option>
                    ))}
                </select>
                <br /><br />

                <input type="number" name="quantity" placeholder="Số lượng" required min={1} value={formData.quantity} onChange={handleChange} />
                <br /><br />

                <button type="submit">Tạo Đơn Hàng</button>
            </form>
        </div>
    );
}
