import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const CreateUsers = () => {
    // State to store user input
    const [userData, setUserData] = useState({ id: "", name: "", role: "" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    // Submit user data to FastAPI
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(""); // Clear previous messages

        try {
            const response = await fetch("http://127.0.0.1:8000/users/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: parseInt(userData.id), // Ensure ID is an integer
                    name: userData.name,
                    role: userData.role
                }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage(`User Created: ${data.name} (${data.role})`);
                setUserData({ id: "", name: "", role: "" });
                navigate("/products");  // Reset form
            } else {
                setMessage(`Error: ${data.detail}`);
            }
        } catch (error) {
            setMessage("Server Error. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
                    Create User
                </h2>
                {message && <p className="text-red-500 text-center mb-2">{message}</p>}

                <form onSubmit={handleSubmit}>
                    <input
                        type="number"
                        name="id"
                        placeholder="User ID"
                        value={userData.id}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 mb-3 border rounded"
                    />
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={userData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 mb-3 border rounded"
                    />
                    <input
                        type="text"
                        name="role"
                        placeholder="Role"
                        value={userData.role}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 mb-3 border rounded"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                        Create User
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateUsers;
