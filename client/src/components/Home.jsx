import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import logo from '../assets/logo.jpg'; // Adjust if path differs

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-6 bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-gray-800 dark:to-gray-900 text-gray-900 dark:text-white">
        <div className="text-center bg-white dark:bg-gray-700 p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 w-full max-w-3xl">
          
          {/* Logo */}
          <img
            src={logo}
            alt="Basera Restaurant Logo"
            className="mx-auto mb-6 h-24 w-24 object-cover rounded-full ring-4 ring-white dark:ring-gray-800 shadow-lg"
          />

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-red-500 dark:from-yellow-300 dark:to-red-400">
            Welcome to Lucky Number Booking 🎯
          </h1>

          {/* Subtext */}
          <p className="text-md md:text-xl mb-8 leading-relaxed text-gray-700 dark:text-gray-300">
            Reserve your lucky number today! Each number from 1 to 100 can only be booked once per day. Claim yours now!
          </p>

          {/* Booking Button */}
          <button
            onClick={() => navigate('/booking')}
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold rounded-full shadow-lg hover:from-green-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            Book Your Lucky Number Now
          </button>

          {/* Feature Highlights */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 dark:bg-green-900 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-2 text-green-800 dark:text-green-200">Real-Time Availability 📊</h3>
              <p className="text-gray-600 dark:text-gray-400">See which numbers are available instantly. No duplicates allowed.</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-2 text-blue-800 dark:text-blue-200">Easy Booking Form ✍️</h3>
              <p className="text-gray-600 dark:text-gray-400">Enter your name and phone number to reserve your lucky number in seconds.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
