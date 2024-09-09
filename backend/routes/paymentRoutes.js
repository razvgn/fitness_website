import express from "express";
import {
  createCheckoutSession,
  getStripePublicKey,
} from "../controllers/paymentController.js";
import { authentication } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create-checkout-session", authentication, createCheckoutSession);
router.get("/public-key", getStripePublicKey);

export default router;
