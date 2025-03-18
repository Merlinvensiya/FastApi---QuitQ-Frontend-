import React, { useState } from "react";
import { useCart } from "../pages/CartContext";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti"; // 🎉 Celebration effect

const Cart = () => {
    const { cart, userId, removeFromCart, setCart } = useCart(); // ✅ Added setCart to clear the cart
    const navigate = useNavigate();
    const deliveryCharge = 50; // ✅ Fixed delivery charge of ₹50

    // ✅ Order Form State
    const [showForm, setShowForm] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        email: "",
        phone: "",
    });

    // ✅ Calculate Total Price
    const totalPrice = cart.reduce((sum, item) => (sum + (parseFloat(item.price) || 0) * (parseInt(item.quantity) || 0)), 0);
    const finalTotal = totalPrice + deliveryCharge;

    // ✅ Handle Order Form Submission
    const handleOrderSubmit = (e) => {
        e.preventDefault();
        setOrderPlaced(true); // ✅ Show celebration effect

        setTimeout(() => {
            alert(`🎉 Order placed successfully!`);
            setCart([]); // ✅ Clear cart after order placement
            setOrderPlaced(false);
            setShowForm(false);
        }, 5000); // ✅ Hide celebration & alert after 5 seconds
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 relative">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h2>

            {/* 🎉 Full-Screen Celebration Animation */}
            {orderPlaced && <Confetti width={window.innerWidth} height={window.innerHeight} />}

            {userId && <p className="text-gray-700 mb-4">User ID: <strong>{userId}</strong></p>}

            {cart.length > 0 && !showForm ? (
                <div className="w-full max-w-2xl">
                    {cart.map((item) => (
                        <div key={item.product_id} className="bg-white p-4 shadow-md rounded-lg mb-4 border border-gray-300">
                            <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                            <p className="text-gray-600">Price: ₹{parseFloat(item.price).toFixed(2)}</p>
                            <p className="text-gray-600">Quantity: {parseInt(item.quantity)}</p>
                            <button
                                onClick={() => removeFromCart(item.product_id)}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-2"
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                    {/* ✅ Show Total Price & Delivery Charge */}
                    <div className="bg-gray-200 p-4 mt-4 rounded-lg text-gray-800 font-semibold">
                        <p>Subtotal: ₹{totalPrice.toFixed(2)}</p>
                        <p>Delivery Charge: ₹{deliveryCharge.toFixed(2)}</p>
                        <hr className="my-2" />
                        <p className="text-xl">Total: ₹{finalTotal.toFixed(2)}</p>
                    </div>

                    {/* ✅ Place Order Button (Opens Form) */}
                    <button
                        onClick={() => setShowForm(true)}
                        className="mt-6 bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 w-full"
                    >
                        Place Order
                    </button>
                </div>
            ) : null}

            {/* ✅ Order Form */}
            {showForm && (
                <div className="w-full max-w-lg bg-white p-6 shadow-lg rounded-lg mt-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Enter Your Details</h2>
                    <form onSubmit={handleOrderSubmit} className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            className="border p-2 rounded"
                        />
                        <input
                            type="text"
                            placeholder="Address"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            required
                            className="border p-2 rounded"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            className="border p-2 rounded"
                        />
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            required
                            className="border p-2 rounded"
                        />

                        {/* ✅ Submit Order */}
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
                        >
                            Confirm Order
                        </button>
                    </form>
                </div>
            )}

            {/* ✅ "Back to Products" button */}
            {!showForm && (
                <button
                    onClick={() => navigate("/products")}
                    className="mt-6 bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
                >
                    Back to Products
                </button>
            )}
        </div>
    );
};

export default Cart;
