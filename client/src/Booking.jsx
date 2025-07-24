import React, { useState, useEffect } from 'react';
import Navbar from './layout/Navbar';

function Booking() {
  const [availableNumbers, setAvailableNumbers] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [hasFollowed, setHasFollowed] = useState(false);
  const [formData, setFormData] = useState({
    userName: '',
    phoneNumber: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);

  const API_BASE_URL = 'https://book-number.onrender.com/api/bookings';

  useEffect(() => {
    fetchAvailableNumbers();
  }, []);

  const fetchAvailableNumbers = async () => {
    setIsLoading(true);
    setMessage({ type: '', text: '' });
    try {
      const response = await fetch(`${API_BASE_URL}/available`);
      const data = await response.json();

      if (response.ok) {
        setAvailableNumbers(data.availableNumbers);
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to fetch available numbers.' });
      }
    } catch (error) {
      console.error('Error fetching numbers:', error);
      setMessage({ type: 'error', text: 'Network error. Could not connect to the server.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNumberClick = (number) => {
    setSelectedNumber(number);
    setShowBookingForm(true);
    setMessage({ type: '', text: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.userName || !formData.phoneNumber) {
      setMessage({ type: 'error', text: 'Please fill in all details (Name, Phone).' });
      setIsLoading(false);
      return;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      setMessage({ type: 'error', text: 'Please enter a valid 10-digit phone number.' });
      setIsLoading(false);
      return;
    }

    const requestBody = {
      number: selectedNumber,
      userName: formData.userName,
      phoneNumber: formData.phoneNumber
    };

    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        setMessage({ type: 'success', text: data.message });
        fetchAvailableNumbers();
        resetFormAndMessages();
      } else {
        setMessage({ type: 'error', text: data.message || 'Booking failed. Please try again.' });
      }
    } catch (error) {
      console.error('Error booking number:', error);
      setMessage({ type: 'error', text: 'Network error. Could not connect to the server.' });
    } finally {
      setIsLoading(false);
    }
  };

  const resetFormAndMessages = () => {
    setFormData({ userName: '', phoneNumber: '' });
    setSelectedNumber(null);
    setShowBookingForm(false);
    setTimeout(() => {
      setMessage({ type: '', text: '' });
    }, 3000);
  };

  const allNumbers = Array.from({ length: 100 }, (_, i) => i + 1);

  return (
    <div>
      <Navbar />

      {!hasFollowed ? (
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-xl mx-auto mt-10">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">
            Follow Us on Instagram 📸
          </h2>
          <p className="text-gray-600 mb-6">
            To book your lucky number, please follow our official Instagram account first.
          </p>

          <a
            href="https://instagram.com/__sanjeev__76"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mb-4 text-white bg-pink-600 px-6 py-3 rounded-lg font-semibold shadow hover:bg-pink-700 transition"
          >
            👉 Follow @your_username on Instagram
          </a>

          <p className="text-gray-500 mt-2 mb-4 text-sm">
            After following, click the button below to proceed.
          </p>

          <button
            onClick={() => setHasFollowed(true)}
            className="bg-indigo-600 text-white px-6 py-2 rounded-md font-semibold shadow-md hover:bg-indigo-700"
          >
            ✅ I Have Followed — Continue
          </button>
        </div>
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-start py-10 px-4 font-sans">
          <h1 className="text-4xl font-extrabold text-indigo-800 mb-4">Lucky Number Booking</h1>
          <p className="text-center text-gray-600 mb-6 text-lg">
            Select a number from 1 to 100. Each number can only be booked once per day!
          </p>

          {/* Share Button */}
          <button
            onClick={() => {
              const shareData = {
                title: 'Lucky Number Booking',
                text: 'Book your lucky number today!',
                url: window.location.href,
              };
              if (navigator.share) {
                navigator.share(shareData).catch(console.error);
              } else {
                alert('Sharing not supported on this browser.');
              }
            }}
            className="mb-6 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700"
          >
            🔗 Share This Website
          </button>

          {isLoading && <div className="text-indigo-600 font-semibold mb-4">Loading...</div>}

          {message.text && (
            <div
              className={`p-4 mb-6 rounded-lg text-center font-medium ${
                message.type === 'success'
                  ? 'bg-green-100 text-green-700 border border-green-200'
                  : 'bg-red-100 text-red-700 border border-red-200'
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-3 mb-8 max-h-96 overflow-y-auto p-2 rounded-lg bg-gray-50 border border-gray-100 shadow-inner">
            {allNumbers.map((num) => (
              <button
                key={num}
                onClick={() => handleNumberClick(num)}
                className={`
                  p-3 rounded-lg font-bold text-lg transition-all duration-200 ease-in-out
                  ${availableNumbers.includes(num)
                    ? 'bg-green-500 text-white hover:bg-green-600 hover:scale-105 active:scale-95 cursor-pointer shadow-md'
                    : 'bg-gray-300 text-gray-600 cursor-not-allowed opacity-70'}
                  ${selectedNumber === num ? 'ring-4 ring-indigo-400 ring-offset-2' : ''}
                `}
                disabled={!availableNumbers.includes(num) || isLoading}
              >
                {num}
              </button>
            ))}
          </div>

          {showBookingForm && selectedNumber && (
            <div className="bg-white p-6 rounded-lg shadow-lg border border-indigo-100 w-full max-w-md">
              <h2 className="text-2xl font-bold text-indigo-700 mb-4 text-center">
                Book Number: <span className="text-indigo-900">{selectedNumber}</span>
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="userName" className="block text-gray-700 text-sm font-semibold mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="userName"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-semibold mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                    placeholder="e.g., 9990xxxxxx"
                    required
                    pattern="\d{10}"
                    title="Please enter a 10-digit phone number"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={resetFormAndMessages}
                    className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Booking...' : 'Confirm Booking'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Booking;
