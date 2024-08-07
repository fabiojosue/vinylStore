import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-title">Fabio's Vinyls</div>
      <div className="navbar-buttons">
        <Link to="/login">
          <button>Log In</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
