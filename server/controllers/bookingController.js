// controllers/bookingController.js
import Booking from '../models/Booking.js'; // Import the Mongoose Booking model
import ExcelJS from 'exceljs'; // Import ExcelJS for Excel file generation
// Helper function to normalize date to the start of the day (UTC)
// This is crucial for ensuring that a number is uniquely booked per day,
// regardless of the exact time the booking was made.
const getStartOfDayUTC = (date) => {
  const d = new Date(date);
  d.setUTCHours(0, 0, 0, 0); // Set hours, minutes, seconds, milliseconds to 0 UTC
  return d;
};


export const bookNumber = async (req, res) => {
  const { number, userName, phoneNumber } = req.body;

  // 1. Basic input validation
  if (!number || !userName || !phoneNumber) {
    return res.status(400).json({ message: 'Please provide all required fields: number, name, and phone number.' });
  }
 
  // Validate the number range (1-100)
  if (number < 1 || number > 100) {
    return res.status(400).json({ message: 'The number must be between 1 and 100.' });
  }

  try {
    // 2. Normalize the current date to the start of the day (UTC)
    // This date will be used for the unique index check in MongoDB.
    const todayStartUTC = getStartOfDayUTC(new Date());

    // 3. Check if the number is already booked for the current normalized day
    const existingBookingNumber = await Booking.findOne({
      number,
      bookingDate: todayStartUTC,
    });

    if (existingBookingNumber) {
      // If a booking exists for this number on this day, return a conflict error
      return res.status(409).json({ message: 'This number is already booked for today. Please choose another.' });
    }
    const existingBookingPhone = await Booking.findOne({
      phoneNumber,
      bookingDate: todayStartUTC,
    });

    if (existingBookingPhone) {
      return res.status(409).json({ message: 'You have already booked a number using this Phone Number, Please choose another!' });
    }

    // 4. Create a new booking record in the database
    const booking = await Booking.create({
      number,
      userName,
      phoneNumber,
      bookingDate: todayStartUTC, // Store the normalized date
    });
  

    // 5. Send a success response
    res.status(201).json({
      message: 'Number booked successfully!',
      booking,
    });
  } catch (error) {
    // 6. Handle various types of errors
    // Mongoose validation errors (e.g., if phone number or email format is wrong based on schema regex)
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    // MongoDB duplicate key error (code 11000) - this catches cases where the unique index prevents insertion
    // It's a fallback if the `findOne` check above somehow misses a race condition, but the `findOne`
    // is generally sufficient for this logic.
    if (error.code === 11000) {
      return res.status(409).json({ message: 'This number is already booked for today. Please choose another.' });
    }
    // General server errors
    console.error('Error booking number:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};


export const getAvailableNumbers = async (req, res) => {
  try {
    // 1. Create a full list of numbers from 1 to 100
    const allNumbers = Array.from({ length: 100 }, (_, i) => i + 1);

    // 2. Normalize the current date to the start of the day (UTC)
    // const todayStartUTC = getStartOfDayUTC(new Date());

    // 3. Find all numbers that are already booked for today
    // const bookedNumbersToday = await Booking.find({
    //   bookingDate: todayStartUTC,
    // }).select('number -_id'); // Project only the 'number' field and exclude '_id' for efficiency

    const todayStartUTC = getStartOfDayUTC(new Date());
const bookedNumbersToday = await Booking.find({
  bookingDate: todayStartUTC, // It specifically looks for TODAY's bookings
}).select('number -_id');
    // 4. Convert the array of booked number objects into a Set for quick lookup
    const bookedNumbersSet = new Set(bookedNumbersToday.map(booking => booking.number));

    // 5. Filter the complete list of numbers to get only the available ones
    const availableNumbers = allNumbers.filter(num => !bookedNumbersSet.has(num));

    // 6. Send the list of available numbers as a response
    res.status(200).json({ availableNumbers });
  } catch (error) {
    console.error('Error fetching available numbers:', error);
    res.status(500).json({ message: 'Server error fetching available numbers.' });
  }
};


export const getAllBookings = async (req, res) => {
  try {
    // IMPORTANT: In a real-world application, you MUST implement authentication and authorization
    // middleware before this controller function to ensure only authorized users (e.g., admins)
    // can access all booking data.
    // Example placeholder:
    // if (!req.user || !req.user.isAdmin) {
    //   return res.status(401).json({ message: 'Not authorized to access this resource.' });
    // }

    // Find all booking records and sort them by creation date (most recent first)
    const bookings = await Booking.find({}).sort({ createdAt: -1 });

    // Send the retrieved bookings as a response
    res.status(200).json({ bookings });
  } catch (error) {
    console.error('Error fetching all bookings:', error);
    res.status(500).json({ message: 'Server error fetching all bookings.' });
  }
};



