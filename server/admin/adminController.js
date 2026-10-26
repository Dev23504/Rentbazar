
const mongoose = require("mongoose");
const User = require("../models/User");
const Booking = require("../models/Booking");
const KYC = require("../models/KYC");

const getDashboard = async (req, res) => {
  try {
    const [
      totalUsers,
      totalBookings,
      pendingKYC,
      approvedKYC,
      rejectedKYC,
      bookings,
    ] = await Promise.all([
      User.countDocuments({ role: "user" }),
      Booking.countDocuments(),
      KYC.countDocuments({ status: "pending" }),
      KYC.countDocuments({ status: "approved" }),
      KYC.countDocuments({ status: "rejected" }),
      Booking.find()
        .populate("user", "name email role")
        .sort({ createdAt: -1 })
        .lean(),
    ]);

    const confirmedBookings = bookings.filter(
      (b) => b.status === "Confirmed"
    ).length;

    const paidBookings = bookings.filter(
      (b) => b.paymentStatus === "paid"
    ).length;

    const totalRevenue = bookings
      .filter((b) => b.paymentStatus === "paid")
      .reduce((sum, b) => sum + Number(b.amount || 0), 0);

    return res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalBookings,
        confirmedBookings,
        paidBookings,
        totalRevenue,
        pendingKYC,
        approvedKYC,
        rejectedKYC,
      },
      bookings,
    });
  } catch (error) {
    console.error("ADMIN DASHBOARD ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to load dashboard",
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("ADMIN USERS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch users",
    });
  }
};

const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email role")
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error("ADMIN BOOKINGS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch bookings",
    });
  }
};

const getBookingById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    const booking = await Booking.findById(req.params.id)
      .populate("user", "name email role")
      .lean();

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error("ADMIN BOOKING DETAILS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch booking",
    });
  }
};

const deleteBooking = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    console.error("ADMIN DELETE BOOKING ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to delete booking",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const userId = String(req.params.id);
    const currentAdminId = String(req.user?._id || req.user?.id || "");

    if (userId === currentAdminId) {
      return res.status(400).json({
        success: false,
        message: "You cannot delete your own account",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin accounts cannot be deleted here",
      });
    }

    await Promise.all([
      User.findByIdAndDelete(userId),
      Booking.deleteMany({ user: userId }),
    ]);

    return res.status(200).json({
      success: true,
      message: "User and related bookings deleted successfully",
    });
  } catch (error) {
    console.error("ADMIN DELETE USER ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to delete user",
    });
  }
};

const getKYCRequests = async (req, res) => {
  try {
    const { status } = req.query;
    const allowedStatuses = ["pending", "approved", "rejected"];

    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid KYC status",
      });
    }

    const filter = status ? { status } : {};

    const requests = await KYC.find(filter)
      .select("-drivingLicense -addressProof -selfie")
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: requests.length,
      requests,
    });
  } catch (error) {
    console.error("ADMIN KYC LIST ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch KYC requests",
    });
  }
};

const getKYCById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid KYC ID",
      });
    }

    const request = await KYC.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "KYC request not found",
      });
    }

    return res.status(200).json({
      success: true,
      request,
    });
  } catch (error) {
    console.error("ADMIN KYC DETAILS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch KYC details",
    });
  }
};

const reviewKYC = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid KYC ID",
      });
    }

    const { status, rejectionReason } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be approved or rejected",
      });
    }

    if (
      status === "rejected" &&
      !String(rejectionReason || "").trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Rejection reason is required",
      });
    }

    const request = await KYC.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "KYC request not found",
      });
    }

    if (request.status !== "pending") {
      return res.status(409).json({
        success: false,
        message: "This KYC request has already been reviewed",
      });
    }

    request.status = status;
    request.rejectionReason =
      status === "rejected"
        ? String(rejectionReason).trim()
        : "";

    request.reviewedAt = new Date();
    request.reviewedBy = req.user?._id || req.user?.id;

    await request.save();

    return res.status(200).json({
      success: true,
      message: `KYC ${status} successfully`,
      request: {
        _id: request._id,
        status: request.status,
        rejectionReason: request.rejectionReason,
        reviewedAt: request.reviewedAt,
      },
    });
  } catch (error) {
    console.error("ADMIN KYC REVIEW ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to review KYC",
    });
  }
};

module.exports = {
  getDashboard,
  getUsers,
  getBookings,
  getBookingById,
  deleteBooking,
  deleteUser,
  getKYCRequests,
  getKYCById,
  reviewKYC,
};
