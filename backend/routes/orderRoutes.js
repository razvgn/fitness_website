import express from "express";
const router = express.Router();
import {
  authentication,
  authorizedAdmin,
} from "../middlewares/authMiddleware.js";
import {
  createOrder,
  getAllOrders,
  getUserOrders,
  countTotalOrders,
  calculateTotalSales,
  calcualteTotalSalesByDate,
  findOrderById,
  markOrderAsPaid,
  markOrderAsDelivered,
} from "../controllers/orderController.js";

router
  .route("/")
  .post(authentication, createOrder)
  .get(authentication, authorizedAdmin, getAllOrders);

router.route("/mine").get(authentication, getUserOrders);
router.route("/total-orders").get(countTotalOrders);
router.route("/total-sales").get(calculateTotalSales);
router.route("/total-sales-by-date").get(calcualteTotalSalesByDate);
router.route("/:id").get(authentication, findOrderById);
router.route("/:id/pay").put(authentication, markOrderAsPaid);
router
  .route("/:id/deliver")
  .put(authentication, authorizedAdmin, markOrderAsDelivered);

export default router;
