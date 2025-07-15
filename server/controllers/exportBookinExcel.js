import bcrypt from 'bcrypt'; // ⬅️ Add this
import ExcelJS from 'exceljs';
import Booking from '../models/Booking.js';

//  ✅ Add missing function
const getStartOfDayUTC = (date) => {
  const d = new Date(date);
  d.setUTCHours(0, 0, 0, 0);
  return d;
};


export const exportBookingsToExcel = async (req, res) => {
  const { password } = req.body; // ⬅️ Frontend will send this

  // ✅ Check password first
  const isValid = await bcrypt.compare(password, process.env.EXCEL_PASSWORD_HASH);
  if (!isValid) {
    return res.status(403).json({ message: 'Invalid password. Access denied.' });
  }

  console.log("📊 Exporting bookings to Excel...");
  try {
   const todayStartUTC = getStartOfDayUTC(new Date());
const endOfDayUTC = new Date(todayStartUTC);
endOfDayUTC.setUTCHours(23, 59, 59, 999);

const bookings = await Booking.find({
  bookingDate: {
    $gte: todayStartUTC,
    $lte: endOfDayUTC
  }
}).sort({ createdAt: -1 });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Bookings');

    worksheet.columns = [
      { header: 'Number', key: 'number', width: 10 },
      { header: 'User Name', key: 'userName', width: 20 },
      { header: 'Phone Number', key: 'phoneNumber', width: 15 },
      { header: 'Booking Date', key: 'bookingDate', width: 20 },
      { header: 'Created At', key: 'createdAt', width: 20 },
    ];

    bookings.forEach((booking) => {
      worksheet.addRow({
        number: booking?.number ?? '',
        userName: booking?.userName ?? '',
        phoneNumber: booking?.phoneNumber ?? '',
        bookingDate: booking?.bookingDate ? new Date(booking.bookingDate).toISOString().split('T')[0] : '',
        createdAt: booking?.createdAt ? new Date(booking.createdAt).toISOString() : '',
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="bookings.xlsx"');
    res.send(buffer);
  } catch (error) {
    console.error('❌ Error exporting bookings:', error);
    res.status(500).json({ message: 'Failed to export bookings.' });
  }
};
