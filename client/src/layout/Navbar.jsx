import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg'
function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-md py-4 px-8 flex justify-between items-center">
      <Link to="/" className="flex items-center space-x-2 hover:underline">
        <img src={logo} alt="Basera Logo" className="h-8 w-8 rounded-full" />
        <span className="text-2xl font-bold">Basera Games</span>
      </Link>
      <div className="space-x-4 text-sm md:text-base">
        <Link to="/admin/export" className="hover:underline">
          Admin Export
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
