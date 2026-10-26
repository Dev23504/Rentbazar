
const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const Kyc = require("../models/Kyc");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "application/pdf",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, PNG, WEBP or PDF files are allowed."));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

const uploadToCloudinary = (buffer, filename, folder) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: `rentbazar/kyc/${folder}`,
        public_id: `${Date.now()}_${filename.replace(/\.[^/.]+$/, "")}`,
        resource_type: "auto",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );

    stream.end(buffer);
  });

const getUserId = (req) => req.user?._id || req.user?.id;

router.post(
  "/submit",
  authMiddleware,
  upload.fields([
    { name: "drivingLicense", maxCount: 1 },
    { name: "addressProof", maxCount: 1 },
    { name: "selfie", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const userId = getUserId(req);

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "User authentication required.",
        });
      }

      const { name, phone, email, address, productId } = req.body;

      if (
        !name?.trim() ||
        !phone?.trim() ||
        !email?.trim() ||
        !address?.trim() ||
        !productId?.trim()
      ) {
        return res.status(400).json({
          success: false,
          message: "All fields are required.",
        });
      }

      if (!/^[6-9]\d{9}$/.test(phone.trim())) {
        return res.status(400).json({
          success: false,
          message: "Enter a valid 10-digit Indian mobile number.",
        });
      }

      const files = req.files || {};

      if (
        !files.drivingLicense?.[0] ||
        !files.addressProof?.[0] ||
        !files.selfie?.[0]
      ) {
        return res.status(400).json({
          success: false,
          message: "Driving license, address proof and selfie are required.",
        });
      }

      const existingKyc = await Kyc.findOne({
        user: userId,
        status: { $in: ["pending", "verified"] },
      });

      if (existingKyc) {
        return res.status(409).json({
          success: false,
          message:
            existingKyc.status === "verified"
              ? "Your KYC is already verified."
              : "Your KYC is already pending review.",
          verificationId: existingKyc._id,
          status: existingKyc.status,
        });
      }

      const [drivingLicenseUrl, addressProofUrl, selfieUrl] =
        await Promise.all([
          uploadToCloudinary(
            files.drivingLicense[0].buffer,
            files.drivingLicense[0].originalname,
            "driving-license"
          ),
          uploadToCloudinary(
            files.addressProof[0].buffer,
            files.addressProof[0].originalname,
            "address-proof"
          ),
          uploadToCloudinary(
            files.selfie[0].buffer,
            files.selfie[0].originalname,
            "selfie"
          ),
        ]);

      const kyc = await Kyc.create({
        user: userId,
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        address: address.trim(),
        productId: productId.trim(),
        drivingLicenseUrl,
        addressProofUrl,
        selfieUrl,
        status: "pending",
        rejectionReason: "",
      });

      return res.status(201).json({
        success: true,
        message: "KYC submitted successfully. Verification is pending.",
        verificationId: kyc._id,
        status: kyc.status,
      });
    } catch (error) {
      console.error("KYC submission error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to submit KYC.",
      });
    }
  }
);

router.get("/status/:id", authMiddleware, async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User authentication required.",
      });
    }

    const kyc = await Kyc.findOne({
      _id: req.params.id,
      user: userId,
    }).select("status rejectionReason createdAt reviewedAt");

    if (!kyc) {
      return res.status(404).json({
        success: false,
        message: "KYC request not found.",
      });
    }

    return res.json({
      success: true,
      verificationId: kyc._id,
      status: kyc.status,
      rejectionReason: kyc.rejectionReason,
      submittedAt: kyc.createdAt,
      reviewedAt: kyc.reviewedAt,
    });
  } catch (error) {
    console.error("KYC status error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch KYC status.",
    });
  }
});

router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message:
        error.code === "LIMIT_FILE_SIZE"
          ? "Each file must be 5 MB or smaller."
          : error.message,
    });
  }

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "File upload failed.",
    });
  }

  next();
});

module.exports = router;
