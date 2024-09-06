const express = require("express");
const router = express.Router();

const AuthorService = require("../controllers/AuthorController");
const { authenticateToken, isAdminMiddleware } = require("../middlewares/auth");

router.get("/", authenticateToken, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  try {
    const authors = await AuthorService.list(page, limit);

    res.json({
      page,
      limit,
      authors,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const autor = await AuthorService.findById(req.params.id);
    if (!autor) {
      return res.status(404).json({ message: "Autor não encontrado" });
    }
    res.json(autor);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar autor", error: error.message });
  }
});

router.get("/nationality/:nationality", authenticateToken, async (req, res) => {
  try {
    const authors = await AuthorService.findByNationality(
      req.params.nationality
    );
    if (authors.length === 0) {
      return res
        .status(404)
        .json({ message: "Nenhum autor encontrado com essa nacionalidade" });
    }
    res.json({ lista: authors });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar autores", error: error.message });
  }
});

router.post(
  "/create",
  authenticateToken,
  isAdminMiddleware,
  async (req, res) => {
    const autor = await AuthorService.create(
      req.body.name,
      req.body.nationality
    );
    res.status(201).json({ message: "Autor criado com sucesso", autor });
  }
);

router.put("/:id", authenticateToken, isAdminMiddleware, async (req, res) => {
  const { name, nationality } = req.body;

  if (!name || !nationality) {
    return res
      .status(400)
      .json({ message: "Nome e nacionalidade são obrigatórios" });
  }

  try {
    const autor = await AuthorService.update(req.params.id, name, nationality);
    if (!autor) {
      return res.status(404).json({ message: "Autor não encontrado" });
    }
    res.json({ message: "Autor atualizado com sucesso", autor });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao atualizar autor", error: error.message });
  }
});

router.delete(
  "/:id",
  authenticateToken,
  isAdminMiddleware,
  async (req, res) => {
    try {
      const autor = await AuthorService.delete(req.params.id);
      if (!autor) {
        return res.status(404).json({ message: "Autor não encontrado" });
      }
      res.json({ message: "Autor excluído com sucesso" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao excluir autor", error: error.message });
    }
  }
);

module.exports = router;
