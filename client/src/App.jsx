import React, { useState, useEffect } from 'react';
import Booking from './Booking';
import ExportBookings from './ExportsBooking';

// Main App component for the booking system
function App() {
  // State to hold the list of available numbers fetched from the backend
  return (
    <>
  

  <Booking />
  <ExportBookings />
  </>
  )
}

export default App;
