import { Router } from "express";

import authMiddleware from "../middlewares/authMiddleware.js";

import {
  addToCart,
  getCart,
  deleteCartItem,
} from "../controllers/cartController.js";

const router = Router();

router.post("/", authMiddleware, addToCart);

router.get("/", authMiddleware, getCart);

router.delete(
  "/:id",
  authMiddleware,
  deleteCartItem
);

export default router;