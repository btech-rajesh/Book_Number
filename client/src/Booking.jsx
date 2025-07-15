
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './layout/Navbar';
function Booking() {
  const navigate=useNavigate();
  


  const [availableNumbers, setAvailableNumbers] = useState([]);
  // State to store the number currently selected by the user for booking
  const [selectedNumber, setSelectedNumber] = useState(null);
  // State to manage the form data (name, phone, email)
  const [formData, setFormData] = useState({
    userName: '',
    phoneNumber: ''
   
  });
  // State for displaying messages to the user (success or error)
  const [message, setMessage] = useState({ type: '', text: '' });
  // State to indicate if an API call is in progress
  const [isLoading, setIsLoading] = useState(false);
  // State to control the visibility of the booking form
  const [showBookingForm, setShowBookingForm] = useState(false);

  // Define the base URL for your backend API
  // In a production environment, you would use an environment variable here (e.g., process.env.REACT_APP_API_URL)
  const API_BASE_URL = 'http://localhost:5000/api/bookings';
// https://book-number.onrender.com
  // useEffect hook to fetch available numbers when the component mounts
  // and whenever a booking is successfully made (to refresh the list)
  useEffect(() => {
    fetchAvailableNumbers();
  }, []); // Empty dependency array means this runs once on mount

  /**
   * Fetches the list of available numbers from the backend API.
   * Updates the `availableNumbers` state.
   * Handles loading and error states.
   */
  const fetchAvailableNumbers = async () => {
    setIsLoading(true); // Set loading state to true
    setMessage({ type: '', text: '' }); // Clear any previous messages
    try {
      const response = await fetch(`${API_BASE_URL}/available`);
      const data = await response.json();

      if (response.ok) {
        setAvailableNumbers(data.availableNumbers);
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to fetch available numbers.' });
      }
    } catch (error) {
      console.error('Error fetching available numbers:', error);
      setMessage({ type: 'error', text: 'Network error. Could not connect to the server.' });
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  /**
   * Handles the click event when a user selects a number.
   * Sets the `selectedNumber` and shows the booking form.
   * @param {number} number - The number clicked by the user.
   */
  const handleNumberClick = (number) => {
    setSelectedNumber(number);
    setShowBookingForm(true); // Show the form when a number is selected
    setMessage({ type: '', text: '' }); // Clear messages
  };

  /**
   * Handles changes in the form input fields.
   * Updates the `formData` state.
   * @param {object} e - The event object from the input field.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  /**
   * Handles the submission of the booking form.
   * Sends the booking data to the backend API.
   * Handles success/error responses and updates UI accordingly.
   * @param {object} e - The event object from the form submission.
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsLoading(true); // Set loading state to true

    // Client-side validation for form fields
    if (!formData.userName || !formData.phoneNumber) {
      setMessage({ type: 'error', text: 'Please fill in all details (Name, Phone).' });
      setIsLoading(false);
      return;
    }
   

    // Basic 10-digit phone number validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
        setMessage({ type: 'error', text: 'Please enter a valid 10-digit phone number.' });
        setIsLoading(false);
        return;
    }

    // --- NEW DEBUGGING LINE ---
    const requestBody = {
      number: selectedNumber,
      userName: formData.userName,
      phoneNumber: formData.phoneNumber,
     
    };
    console.log('Sending request body:', requestBody); // Log the exact data being sent

    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody), // Use the logged requestBody
      });

      const data = await response.json();
      console.log('Backend response data:', data); // This line is already helpful

      if (response.ok) {
          alert(data.message);
        setMessage({ type: 'success', text: data.message });
        // After successful booking, refresh the available numbers list
        fetchAvailableNumbers();
        resetFormAndMessages(); // Reset form and hide it
      } else {
        // Display error message from the backend
        setMessage({ type: 'error', text: data.message || 'Booking failed. Please try again.' });
      }
    } catch (error) {
      console.error('Error booking number:', error);
      setMessage({ type: 'error', text: 'Network error. Could not connect to the server.' });
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  /**
   * Resets the form fields, selected number, and hides the booking form.
   * Clears messages after a short delay for better user experience.
   */
  const resetFormAndMessages = () => {
    setFormData({ userName: '', phoneNumber: '' });
    setSelectedNumber(null);
    setShowBookingForm(false);
    setTimeout(() => {
      setMessage({ type: '', text: '' });
    }, 3000); // Clear messages after 3 seconds
  };

  // Generate an array of all numbers from 1 to 100
  const allNumbers = Array.from({ length: 100 }, (_, i) => i + 1);

  return (
    <div>
      <Navbar/>
      
   
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-xl shadow-2xl p-8 md:p-12 w-full max-w-4xl border border-gray-200">
        <h1 className="text-4xl font-extrabold text-center text-indigo-800 mb-4 animate-fade-in-down">
          Lucky Number Booking
        </h1>
        <p className="text-center text-gray-600 mb-8 text-lg">
          Select a number from 1 to 100. Each number can only be booked once per day!
        </p>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="text-center text-indigo-600 font-semibold mb-4">
            Loading...
          </div>
        )}

        {/* Message Display */}
        {message.text && (
          <div
            className={`p-4 mb-6 rounded-lg text-center font-medium ${
              message.type === 'success'
                ? 'bg-green-100 text-green-700 border border-green-200'
                : 'bg-red-100 text-red-700 border border-red-200'
            }`}
            role="alert"
          >
            {message.text}
          </div>
        )}

        {/* Number Grid */}
        <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-3 mb-8 max-h-96 overflow-y-auto p-2 rounded-lg bg-gray-50 border border-gray-100 shadow-inner">
          {allNumbers.map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num)}
              // Determine button style based on availability
              className={`
                p-3 rounded-lg font-bold text-lg transition-all duration-200 ease-in-out
                ${availableNumbers.includes(num)
                  ? 'bg-green-500 text-white hover:bg-green-600 hover:scale-105 active:scale-95 cursor-pointer shadow-md'
                  : 'bg-gray-300 text-gray-600 cursor-not-allowed opacity-70'
                }
                ${selectedNumber === num ? 'ring-4 ring-indigo-400 ring-offset-2' : ''}
              `}
              disabled={!availableNumbers.includes(num) || isLoading} // Disable if not available or loading
            >
              {num}
            </button>
          ))}
        </div>

        {/* Booking Form (conditionally rendered) */}
        {showBookingForm && selectedNumber && (
          <div className="bg-indigo-50 p-6 rounded-lg shadow-inner border border-indigo-100 animate-fade-in-up">
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
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-150"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-semibold mb-1">
                  Phone Number
                </label>
                <input
                  type="tel" // Use type="tel" for phone numbers
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-150"
                  placeholder="e.g., 9876543210"
                  required
                  pattern="\d{10}" // HTML5 pattern for 10 digits
                  title="Please enter a 10-digit phone number"
                />
              </div>
             
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={resetFormAndMessages}
                  className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition duration-200 shadow-sm"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? 'Booking...' : 'Confirm Booking'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

export default Booking