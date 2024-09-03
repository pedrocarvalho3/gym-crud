var express = require("express");
var router = express.Router();

const { sequelize } = require("../model/bd");
const UserService = require("../model/User");

router.get("/", function (req, res, next) {
  res.json("Hello World!");
});

router.get("/install", async function (req, res, next) {
  await sequelize.sync({ force: true });

  let user = await UserService.novo("Pedro Carvalho", "1234", "admin");
  user = await UserService.buscarPorId(user.id);

  res.json({ msg: "Instalado com sucesso!", user });
});

module.exports = router;
