import pool from "../db/db.js";

export const createPurchase = async (req, res) => {
  try {
    const { cart } = req.body;

    const user_id = req.user.id;

    const total = cart.reduce((acc, item) => acc + Number(item.price), 0);

    const purchaseResult = await pool.query(
      `
        INSERT INTO purchases
        (user_id, total)
        VALUES ($1, $2)
        RETURNING *
        `,
      [user_id, total],
    );

    const purchase = purchaseResult.rows[0];

    for (const item of cart) {
      await pool.query(
        `
        INSERT INTO purchase_items
        (
          purchase_id,
          product_name,
          size,
          price
        )
        VALUES ($1,$2,$3,$4)
        `,
        [purchase.id, item.title, item.size, Number(item.price),],
      );
    }

    res.status(201).json({
      message: "Compra realizada",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Error al comprar",
    });
  }
};

export const getPurchases = async (req, res) => {
  try {
    const result = await pool.query(
      `
        SELECT *
        FROM purchases
        WHERE user_id = $1
        ORDER BY created_at DESC
        `,
      [req.user.id],
    );

    res.json(result.rows);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Error al obtener compras",
    });
  }
};
