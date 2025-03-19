import React, { useState, useEffect } from "react";
import axios from "axios";
import {Button, Card} from "react-bootstrap";


interface Product {
    id: number;
    name: string;
    price: number;
}

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [newProduct, setNewProduct] = useState({ name: "", price: "" });

    // Gọi API để lấy danh sách sản phẩm
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:30001/api/v1/product/list");
            setProducts(res.data);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách sản phẩm:", error);
        }
    };

    // Xử lý khi thêm sản phẩm
    const handleAddProduct = async () => {
        if (!newProduct.name || !newProduct.price) return;

        try {
            const res = await axios.post("http://localhost:30001/api/v1/product/create", {
                name: newProduct.name,
                price: parseFloat(newProduct.price),
            });

            // Thêm sản phẩm mới vào danh sách
            setProducts([...products, res.data]);

            // Reset form
            setNewProduct({ name: "", price: "" });
        } catch (error) {
            console.error("Lỗi khi thêm sản phẩm:", error);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Danh sách sản phẩm</h2>

            {/* Form thêm sản phẩm */}
            <div className="mb-4 flex gap-2">
                <input
                    type="text"
                    placeholder="Tên sản phẩm"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Giá sản phẩm"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                />
                <Button onClick={handleAddProduct}>Thêm</Button>
            </div>

            {/* Danh sách sản phẩm */}
            <div className="grid grid-cols-3 gap-4">
                {products.map((product) => (
                    <Card key={product.id}>
                        <div className="p-4">
                            <h3 className="font-bold">{product.name}</h3>
                            <p className="text-gray-500">{product.price} VND</p>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
