import { Router } from "express";

import authMiddleware from "../middlewares/authMiddleware.js";

import {
  registerUser,
  loginUser,
} from "../controllers/userController.js";

const router = Router();


// REGISTER

router.post(
  "/register",
  registerUser
);


// LOGIN

router.post(
  "/login",
  loginUser
);


// RUTA PROTEGIDA

router.get(
  "/profile",
  authMiddleware,
  (req, res) => {

    res.json({
      message: "Ruta protegida",
      user: req.user,
    });

  }
);

export default router;