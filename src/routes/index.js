var express = require("express");
var router = express.Router();

const sequelize = require("../config/db");

const User = require("../controllers/UserController");
const Author = require("../controllers/AuthorController");

const users = require("../../mock/mockUsers");
const authors = require("../../mock/mockAuthors");

router.get("/", function (req, res, next) {
  res.json("Hello index!");
});

router.get("/install", async function (req, res, next) {
  try {
    await sequelize.sync({ force: true });

    for (const user of users) {
      await User.init(user);
    }

    for (const author of authors) {
      await Author.init(author);
    }

    const admin = await User.findById(1);

    res.json({
      message: "Usuários e autores criados com sucesso",
      admin: admin,
    });
  } catch (error) {
    console.error("Erro ao criar usuários/autores:", error);
    res.status(500).json({ error: "Erro ao criar usuários/autores" });
  }
});

module.exports = router;
