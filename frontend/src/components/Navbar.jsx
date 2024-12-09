import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
    <div>
      <Link to="/" className="text-lg font-bold">E-Commerce</Link>
    </div>
    <div>
      <Link to="/cart" className="mx-2">Cart</Link>
      <Link to="/orders" className="mx-2">Orders</Link>
      <Link to="/profile" className="mx-2">Profile</Link>
      <Link to="/login" className="mx-2">Login</Link>
    </div>
  </nav>
);

export default Navbar;
