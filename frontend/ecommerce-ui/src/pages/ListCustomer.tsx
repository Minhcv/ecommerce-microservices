import { useEffect, useState } from "react";
import axios from "axios";

interface Customer {
    id: number;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    created_at: string;
}

export default function ListCustomer() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get("http://localhost:30002/api/v1/customer/list");
                if (response.status == 200) {
                    setCustomers(response.data);
                } else {
                    setError("Không thể lấy danh sách khách hàng");
                }
            } catch (error) {
                setError("Lỗi khi gọi API!");
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, []);

    return (
        <div style={{ width: "75%", margin: "50px auto", textAlign: "center" }}>
            <h2>Danh Sách Khách Hàng</h2>
            {loading && <p>Đang tải...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!loading && !error && customers.length === 0 && <p>Không có khách hàng nào.</p>}

            {!loading && !error && customers.length > 0 && (
                <table border={1} style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                    <tr style={{ background: "#f0f0f0" }}>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Điện thoại</th>
                        <th>Địa chỉ</th>
                        <th>Ngày tạo</th>
                    </tr>
                    </thead>
                    <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.id}>
                            <td>{customer.id}</td>
                            <td>{customer.name}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phone || "-"}</td>
                            <td>{customer.address || "-"}</td>
                            <td>{new Date(customer.created_at).toLocaleString()}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
