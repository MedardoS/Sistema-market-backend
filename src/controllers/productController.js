import pool from "../db/db.js";

export const createProduct = async (req, res) => {
  try {

    const {
      title,
      price,
      image,
    } = req.body;

    const query = `
      INSERT INTO products
      (title, price, image_url)
      VALUES ($1, $2, $3)
      RETURNING *
    `;

    const values = [
      title,
      price,
      image,
    ];

    const result = await pool.query(
      query,
      values
    );

    res.status(201).json({
      message:
        "Producto creado correctamente",
      product:
        result.rows[0],
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error:
        "Error al crear producto",
    });

  }
};