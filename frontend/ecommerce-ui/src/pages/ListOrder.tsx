import { useEffect, useState } from "react";
import axios from "axios";

interface Order {
    id: number;
    customer_name: string;
    product_name: string;
    quantity: number;
    created_at: string;
}

export default function ListOrder() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get("http://localhost:8083/api/v1/order/list");
                if (response.status === 200) {
                    setOrders(response.data);
                } else {
                    setError("Không thể lấy danh sách đơn hàng.");
                }
            } catch (error) {
                setError("Lỗi khi gọi API!");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div style={{ width: "75%", margin: "50px auto", textAlign: "center" }}>
            <h2>Danh Sách Đơn Hàng</h2>
            {loading && <p>Đang tải...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!loading && !error && orders.length === 0 && <p>Không có đơn hàng nào.</p>}

            {!loading && !error && orders.length > 0 && (
                <table border={1} style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                    <tr style={{ background: "#f0f0f0" }}>
                        <th>ID</th>
                        <th>ID Khách Hàng</th>
                        <th>ID Sản Phẩm</th>
                        <th>Số Lượng</th>
                        <th>Ngày Tạo</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.customer_name}</td>
                            <td>{order.product_name}</td>
                            <td>{order.quantity}</td>
                            <td>{new Date(order.created_at).toLocaleString()}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
