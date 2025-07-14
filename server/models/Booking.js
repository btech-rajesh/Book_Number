import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: [true, 'Please select a number to book.'],
    min: [1, 'Number must be between 1 and 100.'],
    max: [100, 'Number must be between 1 and 100.'],
  },
  userName: { // Matches frontend App.jsx
    type: String,
    required: [true, 'Please enter your name.'],
    trim: true,
  },
  phoneNumber: { // Matches frontend App.jsx
    type: String,
    required: [true, 'Please enter your phone number.'],
    trim: true,
    match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number.'] // Basic 10-digit validation
  },
  email: {
    type: String,
    required: [true, 'Please enter your email.'],
    unique: false,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address.']
  },
  bookingDate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
BookingSchema.index({ number: 1, bookingDate: 1 }, { unique: true });

const Booking = mongoose.model('Booking', BookingSchema);

export default Booking;
