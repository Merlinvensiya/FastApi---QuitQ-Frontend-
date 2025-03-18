import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CreateUser from "./pages/Createusers";
import Products from "./pages/Products";
import Cart from "./services/Cart";
import Admin from "./pages/Admin"; // ✅ Import Admin Page
import { CartProvider } from "./pages/CartContext"; // Import Cart Context

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow p-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create-user" element={<CreateUser />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/admin" element={<Admin />} /> {/* ✅ Add Admin Route */}
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
