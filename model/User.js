const { UserModel } = require("./bd");

module.exports = {
  novo: async (nome, senha, tipo) => {
    return await UserModel.create({ nome, senha, tipo });
  },
  buscarPorId: async (id) => {
    return await UserModel.findByPk(id);
  },
};
