import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Import `createRoot` from ReactDOM
import App from "./App";
import "./index.css"; // Ensure Tailwind or other styles are properly imported
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root")); // ✅ Correct way in React 18
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
