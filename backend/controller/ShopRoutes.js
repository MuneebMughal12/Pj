
const express = require("express");
const router = express.Router();
const Withdraw = require("../model/withdraw"); 
const sendMail = require("../utils/sendMail");
const ErrorHandler = require("../utils/ErrorHandler");

// Update Seller Status Endpoint
router.put(
  "/update-status/:id",
  async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
      const seller = await Seller.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );

      if (!seller) {
        return res.status(404).json({ message: "Seller not found" });
      }

      // Send email notification
      try {
        await sendMail({
          email: seller.email,
          subject: "Account Status Updated",
          message: `Hello ${seller.name}, your account status has been updated to "${status}". Please contact support if you have any questions.`,
        });
      } catch (error) {
        return next(new ErrorHandler("Email notification failed", 500));
      }

      res.status(200).json({
        message: "Status updated successfully and email sent to the seller",
      });
    } catch (error) {
      res.status(500).json({ message: "Error updating status", error });
    }
  }
);

module.exports = router;
