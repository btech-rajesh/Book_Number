import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Booking from './Booking';
import ExportBookings from './ExportsBooking';
import Footer from './layout/Footer';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/admin/export" element={<ExportBookings />} />
    </Routes>
    
  );
}

export default App;
