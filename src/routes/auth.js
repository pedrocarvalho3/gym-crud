const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const UserService = require("../controllers/UserController");
require("dotenv").config();

const secret = process.env.ACCESS_TOKEN_SECRET;

router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const isAdmin = false;
    const user = await UserService.create(username, password, email, isAdmin);
    res.status(201).json({ message: "Usuário criado com sucesso", user });
  } catch (err) {
    res.status(400).json({ error: "Erro na criação do usuário", details: err });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  console.log(req.body);
  try {
    const user = await UserService.findLogin(username, password);
    if (!user) {
      return res.status(401).json({ error: "Usuário ou senha inválido" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, isAdmin: user.isAdmin },
      secret,
      { expiresIn: "30min" }
    );
    res.json({ message: "Login realizado com sucesso", token });
  } catch (err) {
    res.status(500).json({ error: "Erro durante o login", details: err });
  }
});

module.exports = router;
