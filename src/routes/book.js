const express = require("express");
const router = express.Router();

const BookService = require("../controllers/BookController");
const { authenticateToken, isAdminMiddleware } = require("../middlewares/auth");

router.post(
  "/create",
  authenticateToken,
  isAdminMiddleware,
  async (req, res) => {
    const { title, publication_year, author_id } = req.body;

    if (!title || !publication_year || !author_id) {
      return res.status(400).json({
        message: "Título, ano de publicação e ID do autor são obrigatórios",
      });
    }

    try {
      const book = await BookService.create(title, publication_year, author_id);
      res.status(201).json({ message: "Livro criado com sucesso", book });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao criar livro", error: error.message });
    }
  }
);

router.get("/", authenticateToken, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  try {
    const books = await BookService.list(page, limit);

    res.json({
      page,
      limit,
      books,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/author/:author_id", authenticateToken, async (req, res) => {
  try {
    const books = await BookService.findByAuthor(req.params.author_id);
    if (books.length === 0) {
      return res
        .status(404)
        .json({ message: "Nenhum livro encontrado para esse autor" });
    }
    res.json({ lista: books });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar livros", error: error.message });
  }
});

router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const book = await BookService.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Livro não encontrado" });
    }
    res.json(book);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar livro", error: error.message });
  }
});

router.put("/:id", authenticateToken, isAdminMiddleware, async (req, res) => {
  const { title, publication_year, author_id } = req.body;

  if (!title || !publication_year || !author_id) {
    return res.status(400).json({
      message: "Título, ano de publicação e ID do autor são obrigatórios",
    });
  }

  try {
    const book = await BookService.update(
      req.params.id,
      title,
      publication_year,
      author_id
    );
    if (!book) {
      return res.status(404).json({ message: "Livro não encontrado" });
    }
    res.json({ message: "Livro atualizado com sucesso", book });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao atualizar livro", error: error.message });
  }
});

router.delete(
  "/:id",
  authenticateToken,
  isAdminMiddleware,
  async (req, res) => {
    try {
      const book = await BookService.delete(req.params.id);
      if (!book) {
        return res.status(404).json({ message: "Livro não encontrado" });
      }
      res.json({ message: "Livro excluído com sucesso" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao excluir livro", error: error.message });
    }
  }
);

module.exports = router;
