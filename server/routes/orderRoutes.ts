import express from "express";
import {
  createOrders,
  getAllOrders,
  getOrder,
  getOrderLocation,
  getUserOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import admin from "../middleware/admin.js";
import auth from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post("/", auth, createOrders);
orderRouter.get("/", auth, getUserOrders);
orderRouter.get("/all", auth, admin, getAllOrders);
orderRouter.get("/:id", auth, getOrder);
orderRouter.put("/:id/status", auth, admin, updateOrderStatus);
orderRouter.get("/:id/location", auth, getOrderLocation);

export default orderRouter;
