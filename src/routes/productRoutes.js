import { Router } from "express";

import {
  createProduct,
  getProducts,
  getAllProducts,
  deactivateProduct,
  activateProduct,
} from "../controllers/productController.js";

const router = Router();

router.get(
  "/all",
  getAllProducts
);

router.get(
  "/",
  getProducts
);

router.post(
  "/",
  createProduct
);

router.patch(
  "/:id/deactivate",
  deactivateProduct
);

router.patch(
  "/:id/activate",
  activateProduct
);

export default router;