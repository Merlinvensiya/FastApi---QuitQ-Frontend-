import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../pages/CartContext";
import { useNavigate } from "react-router-dom";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); 
    const [sortOrder, setSortOrder] = useState(""); 
    const { addToCart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/products/")
            .then(response => setProducts(response.data))
            .catch(error => console.error("Error fetching products:", error));
    }, []);

    const handleSearch = async () => {
        if (searchQuery.trim() === "") {
            axios.get("http://127.0.0.1:8000/products/")
                .then(response => setProducts(response.data))
                .catch(error => console.error("Error fetching products:", error));
        } else {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/products/search`, {
                    params: { product_name: searchQuery }
                });
                setProducts([response.data]);
            } catch (error) {
                console.error("Product not found:", error);
                setProducts([]);
            }
        }
    };

    const handleSort = (order) => {
        setSortOrder(order);
        let sortedProducts = [...products];
        if (order === "low-to-high") {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (order === "high-to-low") {
            sortedProducts.sort((a, b) => b.price - a.price);
        }
        setProducts(sortedProducts);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 flex flex-col items-center p-6">
            <h2 className="text-5xl font-extrabold text-gray-900 mb-6 font-serif">🛍️ Our Products</h2>

            <div className="flex flex-col sm:flex-row justify-center items-center w-full max-w-4xl mb-8 gap-4 p-4 bg-white shadow-lg rounded-lg">
                <input
                    type="text"
                    placeholder="🔍 Search for a product..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border p-3 rounded w-full sm:w-2/3 text-lg focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all shadow-md"
                >
                    🔍 Search
                </button>
                <select
                    value={sortOrder}
                    onChange={(e) => handleSort(e.target.value)}
                    className="border p-3 rounded bg-white shadow-md text-lg focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Sort by Price</option>
                    <option value="low-to-high">Low to High</option>
                    <option value="high-to-low">High to Low</option>
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-6xl">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.id} className="bg-white p-6 shadow-lg rounded-lg border-2 border-gray-200 transition-transform transform hover:scale-105">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-2 font-mono">{product.name}</h3>
                            <p className="text-gray-700 text-lg mb-4 font-sans">
                                Price: <span className="font-bold text-green-600">₹{product.price}</span>
                            </p>
                            <button
                                onClick={() => addToCart(product)}
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 w-full transition-all shadow-md"
                            >
                                ➕ Add to Cart
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-700 text-xl font-semibold">⚠️ No products found.</p>
                )}
            </div>

            <button
                onClick={() => navigate("/cart")}
                className="mt-8 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all text-xl shadow-lg"
            >
                🛒 Go to Cart
            </button>
        </div>
    );
};

export default Products;
