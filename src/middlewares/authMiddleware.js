import jwt from "jsonwebtoken";

const authMiddleware = (
  req,
  res,
  next
) => {

  try {

    const token =
      req.header("Authorization");

    if (!token) {
      return res.status(401).json({
        error: "Token requerido",
      });
    }

    const decoded = jwt.verify(
      token,
      "secreto"
    );

    req.user = decoded;

    next();

  } catch (error) {

    res.status(401).json({
      error: "Token inválido",
    });

  }

};

export default authMiddleware;