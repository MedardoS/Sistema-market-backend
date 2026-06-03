import pool from "../db/db.js";

export const addToCart = async (req, res) => {
  try {
    const {
      product_name,
      size,
      price,
    } = req.body;

    const user_id = req.user.id;

    const result =
      await pool.query(
        `
        INSERT INTO cart_items
        (
          user_id,
          product_name,
          size,
          price
        )
        VALUES
        ($1,$2,$3,$4)
        RETURNING *
        `,
        [
          user_id,
          product_name,
          size,
          price,
        ]
      );

    res.status(201).json(
      result.rows[0]
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error:
        "Error al agregar producto",
    });

  }
};

export const getCart = async (
  req,
  res
) => {

  try {

    const result =
      await pool.query(
        `
        SELECT *
        FROM cart_items
        WHERE user_id = $1
        `,
        [req.user.id]
      );

    res.json(
      result.rows
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error:
        "Error al obtener carrito",
    });

  }
};

export const deleteCartItem =
  async (req, res) => {

    try {

      await pool.query(
        `
        DELETE FROM cart_items
        WHERE id = $1
        `,
        [req.params.id]
      );

      res.json({
        message:
          "Producto eliminado",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        error:
          "Error al eliminar",
      });

    }

};