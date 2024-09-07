const express = require("express");
const router = express.Router();

const LoanService = require("../controllers/LoanController");
const { authenticateToken, isAdminMiddleware } = require("../middlewares/auth");

router.post(
  "/create",
  authenticateToken,
  isAdminMiddleware,
  async (req, res) => {
    const { book_id, user_id, date_loan } = req.body;

    if (!book_id || !user_id || !date_loan) {
      return res.status(400).json({
        message:
          "ID do livro, ID do usuário e date do empréstimo são obrigatórios",
      });
    }

    try {
      const loan = await LoanService.create(book_id, user_id, date_loan);
      res
        .status(201)
        .json({ message: "Empréstimo registrado com sucesso", loan });
    } catch (error) {
      res.status(500).json({
        message: "Erro ao registrar empréstimo",
        error: error.message,
      });
    }
  }
);

router.get("/", authenticateToken, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  try {
    const loans = await LoanService.list(page, limit);

    res.json({
      page,
      limit,
      loans,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const loan = await LoanService.findById(req.params.id);
    if (!loan) {
      return res.status(404).json({ message: "Empréstimo não encontrado" });
    }
    res.json(loan);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar empréstimo", error: error.message });
  }
});

router.get("/user/:user_id", authenticateToken, async (req, res) => {
  try {
    const loans = await LoanService.findByUser(req.params.user_id);
    if (loans.length === 0) {
      return res
        .status(404)
        .json({ message: "Nenhum empréstimo encontrado para este usuário" });
    }
    res.json({ lista: loans });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar empréstimos", error: error.message });
  }
});

router.put("/:id", authenticateToken, async (req, res) => {
  const { date_return } = req.body;

  if (!date_return) {
    return res.status(400).json({ message: "Date de devolução é obrigatória" });
  }

  try {
    const loan = await LoanService.update(req.params.id, date_return);
    if (!loan) {
      return res.status(404).json({ message: "Empréstimo não encontrado" });
    }
    res.json({ message: "Empréstimo atualizado com sucesso", loan });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao atualizar empréstimo", error: error.message });
  }
});

router.delete(
  "/:id",
  authenticateToken,
  isAdminMiddleware,
  async (req, res) => {
    try {
      const loan = await LoanService.delete(req.params.id);
      if (!loan) {
        return res.status(404).json({ message: "Empréstimo não encontrado" });
      }
      res.json({ message: "Empréstimo excluído com sucesso" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao excluir empréstimo", error: error.message });
    }
  }
);

module.exports = router;
