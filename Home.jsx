import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center text-center" 
             style={{ background: "linear-gradient(to right, #141E30, #243B55)", color: "white" }}>
            
            {/* ✅ Welcome Text */}
            <h2 className="display-4 fw-bold text-warning mb-3">
                🎉 Welcome to
            </h2>

            {/* ✅ App Title */}
            <h1 className="display-1 fw-bold text-light shadow-sm">
                ✨ QuitQ <span className="fst-italic text-info">Shopping App 🛍️</span>
            </h1>

            {/* ✅ Buttons */}
            <div className="mt-5 d-flex flex-column flex-sm-row gap-4">
                {/* ✅ View Products Button */}
                <button
                    onClick={() => navigate("/products")}
                    className="btn btn-lg btn-warning fw-bold px-5 py-3 shadow-lg"
                    style={{ fontSize: "1.5rem" }}
                >
                    🛒 View Products
                </button>

                {/* ✅ Admin Button */}
                <button
                    onClick={() => navigate("/admin")}
                    className="btn btn-lg btn-danger fw-bold px-5 py-3 shadow-lg"
                    style={{ fontSize: "1.5rem" }}
                >
                    🔐 Admin Panel
                </button>
            </div>
        </div>
    );
};

export default Home;
