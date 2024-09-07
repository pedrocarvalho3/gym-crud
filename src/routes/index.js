var express = require("express");
var router = express.Router();

const sequelize = require("../config/db");

const User = require("../controllers/UserController");
const Author = require("../controllers/AuthorController");
const Book = require("../controllers/BookController");
const Loan = require("../controllers/LoanController");

const users = require("../../mock/mockUsers");
const authors = require("../../mock/mockAuthors");
const books = require("../../mock/mockBooks");
const loans = require("../../mock/mockLoans");

router.get("/", function (req, res, next) {
  res.json(
    "Bem vindo ao meu crud de livraria! Chame a rota /install para inicializar o banco e acessar o usuario admin"
  );
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

    for (const book of books) {
      await Book.init(book);
    }

    for (const loan of loans) {
      await Loan.init(loan);
    }

    const admin = await User.findById(1);

    res.json({
      message: "Banco de dados instalado com sucesso",
      admin: admin,
    });
  } catch (error) {
    console.error("Erro ao criar usuários/autores:", error);
    res.status(500).json({ error: "Erro ao criar usuários/autores" });
  }
});

module.exports = router;
