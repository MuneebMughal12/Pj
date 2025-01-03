const express = require("express");
const router = express.Router();
const ShopRoutes =require("../model/ShopRoutes") // Ensure correct import
const mail = require("../utils/mail");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isAuthenticated, isAdmin } = require("../middleware/auth");

// Approve or Reject Shop Endpoint
router.put(
  "/approve-shop/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;

    // Find the shop by ID
    const shop = await Shop.findById(id);
    if (!shop) {
      return next(new ErrorHandler("Shop not found", 404));
    }

    // Update the shop status
    shop.status = status;

    // Send email notification on status update
    try {
      const emailSubject =
        status === "Approved"
          ? "Shop Approval Notification"
          : "Shop Request Rejected";

      const emailMessage =
        status === "Approved"
          ? `Hello ${shop.name}, your shop has been approved. You can now log in and start using your account.`
          : `Hello ${shop.name}, unfortunately, your shop request has been rejected. Please contact support for further assistance.`;

      await mail({
        email: shop.email,
        subject: emailSubject,
        message: emailMessage,
      });
    } catch (error) {
      console.error("Email sending failed:", error.message);
      return next(new ErrorHandler("Failed to send notification email", 500));
    }

    // Save the updated shop status
    await shop.save();

    res.status(200).json({
      success: true,
      message:
        status === "Approved"
          ? "Shop approved and email sent to the seller."
          : "Shop request has been rejected and email sent to the seller.",
    });
  })
);

module.exports = router;


// routes/sellers.js
// const express = require("express");
// const Seller = require("../models/seller");
// const router = express.Router();

// // Get all sellers
// router.get("/", async (req, res) => {
//   try {
//     const sellers = await Seller.find();
//     res.json(sellers);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// // Update seller status (Approve/Block/Activate)
// router.put("/update-status/:id", async (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;

//   try {
//     const seller = await Seller.findById(id);

//     if (!seller) {
//       return res.status(404).json({ message: "Seller not found" });
//     }

//     // Update seller status
//     seller.status = status;

//     await seller.save();
//     res.json({ message: "Seller status updated successfully", seller });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// module.exports = router;
