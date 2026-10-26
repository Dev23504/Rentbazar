const express = require("express");
const Booking = require("../models/Booking");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    console.log("BOOKING API HIT");
    console.log("BODY:", req.body);
    console.log("USER:", req.user);

    const {
      product,
      productName,
      productImage,
      startDate,
      endDate,
      amount,
      paymentId,
      orderId,
      bookingId,
    } = req.body;

    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "Start date and end date are required",
      });
    }

    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: "Booking ID is required",
      });
    }

    const booking = await Booking.create({
      user: req.user.id,
      product,
      productName,
      productImage: productImage || "",
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      amount: Number(amount),
      paymentId: paymentId || "",
      orderId: orderId || "",
      bookingId,
      paymentStatus: "paid",
      status: "Confirmed",
    });

    console.log("BOOKING SAVED:", booking._id);

    res.status(201).json({
      success: true,
      message: "Booking saved successfully",
      booking,
    });
  } catch (error) {
    console.log("BOOKING ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/my-bookings", authMiddleware, async (req, res) => {
  try {
    console.log("=================================");
    console.log("MY BOOKINGS API HIT");
    console.log("CURRENT USER ID:", req.user.id);
    console.log("CURRENT USER ROLE:", req.user.role);

    const bookings = await Booking.find({
      user: req.user.id,
    })
      .populate("user", "name email role")
      .sort({ createdAt: -1 })
      .lean();

    console.log("BOOKINGS FOUND:", bookings.length);

    bookings.forEach((booking, index) => {
      console.log(`BOOKING ${index + 1}:`, {
        id: booking._id,
        bookingId: booking.bookingId,
        product: booking.productName,
        startDate: booking.startDate,
        endDate: booking.endDate,
        createdAt: booking.createdAt,
        user: booking.user,
      });
    });

    console.log("=================================");

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.log("MY BOOKINGS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;