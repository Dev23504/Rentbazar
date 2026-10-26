
const express = require("express");
const {
  getDashboard,
  getUsers,
  getBookings,
  getBookingById,
  deleteBooking,
  deleteUser,
  getKYCRequests,
  getKYCById,
  reviewKYC,
} = require("./adminController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

router.use(authMiddleware, adminMiddleware);

router.get("/dashboard", getDashboard);

router.get("/users", getUsers);
router.delete("/users/:id", deleteUser);

router.get("/bookings", getBookings);
router.get("/bookings/:id", getBookingById);
router.delete("/bookings/:id", deleteBooking);

router.get("/kyc", getKYCRequests);
router.get("/kyc/:id", getKYCById);
router.patch("/kyc/:id/review", reviewKYC);

module.exports = router;
