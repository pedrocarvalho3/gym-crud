var express = require("express");
var router = express.Router();

const { authenticateToken, isAdminMiddleware } = require("../middlewares/auth");
const UserService = require("../controllers/UserController");

router.get("/", authenticateToken, isAdminMiddleware, async (req, res) => {
  res.json({ lista: await UserService.list() });
});

router.post(
  "/create-admin",
  authenticateToken,
  isAdminMiddleware,
  async (req, res) => {
    const { username, password, email } = req.body;

    try {
      const admin = await UserService.create(username, password, email, true);
      res.status(201).json({ message: "Admin criado com sucesso", admin });
    } catch (err) {
      res.status(400).json({ error: "Erro ao criar Admin", details: err });
    }
  }
);

router.delete(
  "/delete/:id",
  authenticateToken,
  isAdminMiddleware,
  async (req, res) => {
    try {
      const user = await UserService.findById(req.params.id);
      if (!user || user.isAdmin) {
        return res
          .status(404)
          .json({ error: "Usuário nao encontrado ou Admin" });
      }

      await UserService.delete(req.params.id);
      res.json({ message: "Usuário deletado com sucesso" });
    } catch (err) {
      res.status(500).json({ error: "Erro ao deletar usuario", details: err });
    }
  }
);

router.put("/update/:id", authenticateToken, async (req, res) => {
  try {
    const user = await UserService.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    if (req.user.id !== user.id && !req.user.isAdmin) {
      return res.status(403).json({ error: "Acesso negado" });
    }

    const { username, password, email } = req.body;

    await UserService.update(req.params.id, username, password, email);
    res.json({ message: "Usuário atualizado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar usuário", details: err });
  }
});

module.exports = router;
