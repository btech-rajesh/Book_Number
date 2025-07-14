// routes/bookingRoutes.js
import express from 'express';
import { bookNumber, getAvailableNumbers, getAllBookings ,exportBookingsToExcel} from '../controllers/bookingController.js';

const router = express.Router();

// Public routes
// POST /api/bookings - Route to book a number
router.post('/', bookNumber);

// GET /api/bookings/available - Route to get available numbers for today
router.get('/available', getAvailableNumbers);

// Admin/Reward routes
// GET /api/bookings/all - Route to get all bookings
// In a real application, this route should be protected with authentication middleware
router.get('/all', getAllBookings);


router.get('/excel', exportBookingsToExcel);
export default router;