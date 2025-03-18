import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Admin = () => {
    const [products, setProducts] = useState([]);
    const [editProduct, setEditProduct] = useState(null);
    const [productData, setProductData] = useState({
        id: "",
        name: "",
        category: "",
        price: "",
        quantity: "",
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        axios.get("http://127.0.0.1:8000/products/")
            .then(response => setProducts(response.data))
            .catch(error => console.error("Error fetching products:", error));
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://127.0.0.1:8000/products/", productData);
            alert("✅ Product added successfully!");
            fetchProducts();
            setProductData({ id: "", name: "", category: "", price: "", quantity: "" });
        } catch (error) {
            alert("❌ Failed to add product.");
        }
    };

    const handleEdit = (product) => {
        setEditProduct(product.id);
        setProductData({
            id: product.id,
            name: product.name || "",
            category: product.category || "",
            price: product.price || 0,
            quantity: product.quantity || 0,
        });
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        if (!editProduct) {
            alert("❌ No product selected for update.");
            return;
        }
        try {
            await axios.put(`http://127.0.0.1:8000/products/${editProduct}`, productData);
            alert("✅ Product updated successfully!");
            setEditProduct(null);
            setProductData({ id: "", name: "", category: "", price: "", quantity: "" });
            fetchProducts();
        } catch (error) {
            alert("❌ Failed to update product.");
        }
    };

    const handleDelete = async (productId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/products/${productId}`);
                alert("✅ Product deleted successfully!");
                fetchProducts();
            } catch (error) {
                alert("❌ Failed to delete product.");
            }
        }
    };

    return (
        <div className="container py-5">
            <h2 className="text-center mb-4">Admin Panel - Manage Products</h2>
            <div className="card p-4 mb-4">
                <h3>{editProduct ? "Edit Product" : "Add Product"}</h3>
                <form onSubmit={editProduct ? handleUpdateProduct : handleAddProduct}>
                    <div className="mb-3">
                        <input type="number" className="form-control" placeholder="Product ID" value={productData.id} onChange={(e) => setProductData({ ...productData, id: Number(e.target.value) })} required disabled={!!editProduct} />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" placeholder="Product Name" value={productData.name} onChange={(e) => setProductData({ ...productData, name: e.target.value })} required />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" placeholder="Category" value={productData.category} onChange={(e) => setProductData({ ...productData, category: e.target.value })} required />
                    </div>
                    <div className="mb-3">
                        <input type="number" className="form-control" placeholder="Price" value={productData.price} onChange={(e) => setProductData({ ...productData, price: Number(e.target.value) })} required />
                    </div>
                    <div className="mb-3">
                        <input type="number" className="form-control" placeholder="Quantity" value={productData.quantity} onChange={(e) => setProductData({ ...productData, quantity: Number(e.target.value) })} required />
                    </div>
                    <button type="submit" className="btn btn-success w-100">{editProduct ? "Update Product" : "Add Product"}</button>
                    {editProduct && <button onClick={() => setEditProduct(null)} className="btn btn-secondary w-100 mt-2">Cancel</button>}
                </form>
            </div>
            <h3>Product List</h3>
            <table className="table table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>₹{product.price}</td>
                            <td>{product.quantity}</td>
                            <td>
                                <button onClick={() => handleEdit(product)} className="btn btn-primary btn-sm me-2">Update</button>
                                <button onClick={() => handleDelete(product.id)} className="btn btn-danger btn-sm">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Admin;