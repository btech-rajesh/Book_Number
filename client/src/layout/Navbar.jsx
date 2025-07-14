import React from 'react';
function Navbar()   {
  return (
    <nav className="bg-blue-600 text-white shadow-md py-4 px-8 flex justify-between items-center">
      <h1 className="text-2xl font-bold">🎯 Number Book</h1>
      <div className="space-x-4 text-sm md:text-base">
        <a href="#how" className="hover:underline">How It Works</a>
        <a href="#grid" className="hover:underline">Book Now</a>
      </div>
    </nav>
  );
};

export default Navbar;
