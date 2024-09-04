var express = require("express");
var router = express.Router();
const authenticateToken = require("../middleware/auth");

const { sequelize } = require("../models/db");
const UserService = require("../models/User");

router.get("/", authenticateToken, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ error: "Accesso negado" });
  }

  res.json({ lista: await UserService.list() });
});

router.post("/", async (req, res) => {
  res.json({ lista: await UserService.list() });
});

router.get("/install", async function (req, res, next) {
  await sequelize.sync({ force: true });

  let user = await UserService.create(
    "Pedro Carvalho",
    "1234",
    "pedro@gmail.com",
    true
  );
  user = await UserService.findById(user.id);

  let user1 = await UserService.create(
    "Joao sla",
    "1234",
    "pedro@gmail.com",
    false
  );
  user1 = await UserService.findById(user1.id);

  res.json({ msg: "Instalado com sucesso!", user, user1 });
});

module.exports = router;
