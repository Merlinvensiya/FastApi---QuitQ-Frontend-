import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-500 text-white p-4">
      <h1 className="text-2xl font-bold">QuitQ - Ecommerce Cart </h1>
      <nav>
        
        <br>
        
        
        </br>

        <Link to="/"> Home </Link>
        <br>
        
        </br>
        <Link to="/create-user"> Create User </Link>

      </nav>
    </header>
  );
};

export default Header;
