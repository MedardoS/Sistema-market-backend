import pool from "../db/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
    } = req.body;

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users
      (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, name, email
    `;

    const values = [
      name,
      email,
      hashedPassword,
    ];

    const result =
      await pool.query(query, values);

    res.status(201).json({
      message: "Usuario registrado",
      user: result.rows[0],
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Error al registrar",
    });

  }

};

export const loginUser = async (req, res) => {

  try {

    const {
      email,
      password,
    } = req.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Usuario no existe",
      });
    }

    const user = result.rows[0];

    const validPassword =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!validPassword) {
      return res.status(401).json({
        error: "Contraseña incorrecta",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      "secreto",
      {
        expiresIn: "1h",
      }
    );

    res.json({
      message: "Login exitoso",
      token,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Error login",
    });

  }

};