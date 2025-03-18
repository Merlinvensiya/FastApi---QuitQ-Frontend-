import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

//  Cart Context that provides cart-related state and functions.
const CartContext = createContext();

// Custom hook to use the cart
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const userId = 1; 

    // Fetch Cart Items from FastAPI on Load
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/cart/${userId}`)
            .then(response => setCart(response.data))
            .catch(error => console.error("Error fetching cart:", error));
    }, []);

    // Add Product to Cart
    const addToCart = async (product) => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/cart/", {
                user_id: userId,
                product_id: product.id,
                quantity: 1
            });
            setCart([...cart, { ...product, quantity: 1 }]); 
            alert(response.data.message);
        } catch (error) {
            alert(error.response?.data.detail || "Failed to add to cart");
        }
    };

    // Remove Product from Cart
    const removeFromCart = async (cartId) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/cart/{cart_id}`);
            
            if (response.status === 200) {
                setCart(cart.filter(item => item.cart_id !== cartId)); // ✅ Remove from state
            } else {
                console.error("Failed to delete item:", response);
                alert("Could not delete item. Please try again.");
            }
        } catch (error) {
            console.error("Error removing item:", error);
            alert("Error removing item. Item may not exist.");
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart,setCart }}>
            {children}
        </CartContext.Provider>
    );
};
