const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.ACCESS_TOKEN_SECRET;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Acesso negado. Token não fornecido." });
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Acesso negado. Token inválido." });
    }
    req.user = user;
    next();
  });
};

const isAdminMiddleware = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res
      .status(403)
      .json({
        message: "Acesso negado. Permissão de administrador necessária.",
      });
  }
};

module.exports = { authenticateToken, isAdminMiddleware };
