import { Router } from "express";

import authMiddleware from "../middlewares/authMiddleware.js";

import {
  createPurchase,
  getPurchases,
} from "../controllers/purchaseController.js";

const router = Router();

router.post("/", authMiddleware, createPurchase);

router.get("/", authMiddleware, getPurchases);

export default router;
