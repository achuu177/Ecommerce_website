const express = require("express");
const { userAuth } = require("../middlewares/userAuth.js");
const {
  createCheckoutSession,
  getSessionStatus,
  handlePaymentIncomplete,
  handlePaymentComplete,
} = require("../controllers/paymentControllers.js");

// Configure router
const paymentRouter = express.Router();

// Create checkout session
paymentRouter.post("/create-checkout-session", userAuth, createCheckoutSession);

// Handle payment complete
paymentRouter.put("/payment-completed", userAuth, handlePaymentComplete);

// Handle payment incomplete
paymentRouter.put("/payment-cancelled", userAuth, handlePaymentIncomplete);

// Get session status
paymentRouter.get("/session-status", userAuth, getSessionStatus);

module.exports = {paymentRouter};
