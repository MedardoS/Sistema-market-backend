import pool from "../db/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const query = `
      INSERT INTO users
      (name, phone, email, password)
      VALUES ($1, $2, $3, $4)
      RETURNING
      id,
      name,
      phone,
      email,
      role
    `;

    const values = [
      name,
      phone,
      email,
      hashedPassword,
    ];

    const result = await pool.query(
      query,
      values
    );

    res.status(201).json({
      message: "Usuario registrado",
      user: result.rows[0],
    });

  } catch (error) {

    console.log("ERROR REGISTER:");
    console.log(error);

    res.status(500).json({
      error: error.message,
    });

  }
};

export const loginUser = async (req, res) => {
  try {

    const { email, password } =
      req.body;

    const result = await pool.query(
      `
      SELECT *
      FROM users
      WHERE email = $1
      `,
      [email]
    );

    const user =
      result.rows[0];

    if (!user) {

      return res.status(404).json({
        error:
          "Usuario no encontrado",
      });

    }

    const validPassword =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!validPassword) {

      return res.status(401).json({
        error:
          "Contraseña incorrecta",
      });

    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      "secreto",
      {
        expiresIn: "24h",
      }
    );

    res.json({
      message:
        "Login exitoso",
      token,
      role:
        user.role,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error:
        "Error en login",
    });

  }
};