const express = require("express");
const Razorpay = require("razorpay");

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.get("/key", (req, res) => {
  const key = process.env.RAZORPAY_KEY_ID;

  if (!key) {
    return res.status(500).json({
      success: false,
      message: "Razorpay Key ID is not configured on server",
    });
  }

  res.json({
    success: true,
    key,
  });
});

router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid amount is required",
      });
    }

    if (
      !process.env.RAZORPAY_KEY_ID ||
      !process.env.RAZORPAY_KEY_SECRET
    ) {
      return res.status(500).json({
        success: false,
        message: "Razorpay configuration is missing on server",
      });
    }

    const options = {
      amount: Math.round(Number(amount) * 100),
      currency: "INR",
      receipt: `rentbazar_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Razorpay Error:", error);

    res.status(500).json({
      success: false,
      message: error?.error?.description || "Failed to create Razorpay order",
    });
  }
});

module.exports = router;  