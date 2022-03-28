import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  return (
    <div className="navbar">
      <p className="navbar__text">APP for getting books</p>
      <div>
        <Link className="navbar__link" to="/books">
          Books
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
