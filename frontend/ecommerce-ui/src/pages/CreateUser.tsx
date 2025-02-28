import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            await axios.post("http://localhost:8082/api/v1/customer/create", formData);
            setMessage("Tạo user thành công!");
            navigate("/list-customer");
            setFormData({ name: "", email: "", phone: "", address: "" }); // Reset form
        } catch (error) {
            setMessage("Lỗi khi tạo user!");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ width: "300px", margin: "50px auto", textAlign: "center" }}>
            <h2>Đăng ký customer</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Tên"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px" }}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px" }}
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Số điện thoại"
                    value={formData.phone}
                    onChange={handleChange}
                    style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px" }}
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Địa chỉ"
                    value={formData.address}
                    onChange={handleChange}
                    style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px" }}
                />
                <button type="submit" disabled={loading} style={{ padding: "8px 15px", cursor: "pointer" }}>
                    {loading ? "Đang đăng ký..." : "Đăng ký customer"}
                </button>
            </form>
        </div>
    );
}
