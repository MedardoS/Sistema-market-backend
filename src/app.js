import express from "express";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import purchaseRoutes from "./routes/purchaseRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/users", userRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/purchases", purchaseRoutes);

app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

export default app;
