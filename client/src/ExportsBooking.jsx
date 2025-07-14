import React from 'react';

function ExportBookings() {
  const handleExport = () => {
    window.open('http://localhost:5000/api/bookings/excel', '_blank');
  };

  return (
    <div className="text-center my-4">
      <button
        onClick={handleExport}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-700"
      >
        📥 Export All Bookings (Excel)
      </button>
    </div>
  );
}


export default ExportBookings;