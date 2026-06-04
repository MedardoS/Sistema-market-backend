import pool from "../db/db.js";

export const createProduct = async (req, res) => {
  try {

    const {
      title,
      price,
      image,
      stock,
    } = req.body;

    const query = `
      INSERT INTO products
      (
        title,
        price,
        image_url,
        stock
      )
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;

    const values = [
      title,
      price,
      image,
      stock,
    ];

    const result =
      await pool.query(
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

export const getProducts = async (req, res) => {
  try {

    const result =
      await pool.query(`
        SELECT *
        FROM products
        WHERE active = true
        ORDER BY id DESC
      `);

    res.json(
      result.rows
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error:
        "Error obteniendo productos",
    });

  }
};

export const deactivateProduct = async (req, res) => {
  try {

    const { id } =
      req.params;

    await pool.query(
      `
      UPDATE products
      SET active = false
      WHERE id = $1
      `,
      [id]
    );

    res.json({
      message:
        "Producto agotado",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error:
        "Error agotando producto",
    });

  }
};

export const activateProduct = async (req, res) => {
  try {

    const { id } =
      req.params;

    await pool.query(
      `
      UPDATE products
      SET active = true
      WHERE id = $1
      `,
      [id]
    );

    res.json({
      message:
        "Producto reactivado",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error:
        "Error reactivando producto",
    });

  }
};

export const getAllProducts =
  async (req, res) => {

    try {

      const result =
        await pool.query(`
          SELECT *
          FROM products
          ORDER BY id DESC
        `);

      res.json(
        result.rows
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        error:
          "Error obteniendo productos",
      });

    }

  };