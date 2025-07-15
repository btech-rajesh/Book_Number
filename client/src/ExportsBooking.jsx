import React from 'react';
import axios from 'axios';
import Navbar from './layout/Navbar';
function ExportBookings() {
  const handleExport = async () => {
    const password = prompt('🔐 Enter admin password to download Excel:');
    if (!password) return;
// https://book-number.onrender.com
    try {
      const response = await axios.post(
        'https://book-number.onrender.com/api/bookings/excel',
        { password },
        { responseType: 'blob' } // Needed to receive file as binary
      );

      // Create a blob URL and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'bookings.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert('❌ Invalid password or failed to export. Try again.');
      console.error('Export error:', error);
    }
  };

 return (
  <>
  <Navbar/>
  <div className="p-6 max-w-xl mx-auto">
    <p className="text-red-600 text-lg font-medium text-center mb-4">
      ⚠️ This section is strictly for admins only. Users looking for rewards are not allowed here.
    </p>
   
    <div className="text-center">
      <button
        onClick={handleExport}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-300"
      >
        📥 Export All Bookings (Excel)
      </button>
    </div>
  </div>
  </>
);

}

export default ExportBookings;
