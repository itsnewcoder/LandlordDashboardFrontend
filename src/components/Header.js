import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-dark text-white py-3">
      <div className="container d-flex justify-content-between align-items-center">
        <h1 className="mb-0">RentEase</h1>
        <nav>
          <Link to="/" className="text-white me-3">Home</Link>
          <Link to="/add" className="btn btn-primary">Add Property</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;