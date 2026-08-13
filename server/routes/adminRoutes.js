const express = require("express");
const User = require("../models/User");
const Booking = require("../models/Booking");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

router.get(
  "/dashboard",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const users = await User.find()
        .select("-password")
        .sort({ createdAt: -1 })
        .lean();

      const bookings = await Booking.find()
        .populate("user", "name email role")
        .sort({ createdAt: -1 })
        .lean();

      const totalUsers = users.length;
      const totalBookings = bookings.length;

      const confirmedBookings = bookings.filter(
        (booking) => booking.status === "Confirmed"
      ).length;

      const paidBookings = bookings.filter(
        (booking) => booking.paymentStatus === "paid"
      ).length;

      const totalRevenue = bookings
        .filter((booking) => booking.paymentStatus === "paid")
        .reduce(
          (total, booking) =>
            total + Number(booking.amount || 0),
          0
        );

      res.status(200).json({
        success: true,
        users,
        bookings,
        totalUsers,
        totalBookings,
        totalRevenue,
        confirmedBookings,
        paidBookings,
      });
    } catch (error) {
      console.log("ADMIN DASHBOARD ERROR:", error);

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

router.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const users = await User.find()
        .select("-password")
        .sort({ createdAt: -1 })
        .lean();

      res.status(200).json({
        success: true,
        count: users.length,
        users,
      });
    } catch (error) {
      console.log("ADMIN USERS ERROR:", error);

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

router.get(
  "/bookings",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const bookings = await Booking.find()
        .populate("user", "name email role")
        .sort({ createdAt: -1 })
        .lean();

      res.status(200).json({
        success: true,
        count: bookings.length,
        bookings,
      });
    } catch (error) {
      console.log("ADMIN BOOKINGS ERROR:", error);

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

router.get(
  "/bookings/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const booking = await Booking.findById(req.params.id)
        .populate("user", "name email role")
        .lean();

      if (!booking) {
        return res.status(404).json({
          success: false,
          message: "Booking not found",
        });
      }

      res.status(200).json({
        success: true,
        booking,
      });
    } catch (error) {
      console.log("ADMIN BOOKING DETAILS ERROR:", error);

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

router.delete(
  "/bookings/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const booking = await Booking.findByIdAndDelete(
        req.params.id
      );

      if (!booking) {
        return res.status(404).json({
          success: false,
          message: "Booking not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Booking deleted successfully",
      });
    } catch (error) {
      console.log("ADMIN DELETE BOOKING ERROR:", error);

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

router.delete(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(
        req.params.id
      );

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      await Booking.deleteMany({
        user: req.params.id,
      });

      res.status(200).json({
        success: true,
        message: "User and related bookings deleted successfully",
      });
    } catch (error) {
      console.log("ADMIN DELETE USER ERROR:", error);

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

module.exports = router;