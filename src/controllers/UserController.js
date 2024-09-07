const User = require("../models/User");

module.exports = {
  init: async (userData) => {
    return await User.create(userData);
  },
  create: async (username, password, email, isAdmin) => {
    return await User.create({ username, password, email, isAdmin });
  },
  findLogin: async (username, password) => {
    return await User.findOne({ where: { username, password } });
  },
  findById: async (id) => {
    return await User.findByPk(id);
  },
  list: async (page, limit) => {
    if (![5, 10, 30].includes(limit)) {
      throw new Error("Limite deve ser 5, 10 ou 30");
    }
    const offset = (page - 1) * limit;
    return await User.findAll({ limit, offset });
  },
  delete: async (id) => {
    return await User.destroy({ where: { id } });
  },
  update: async (id, username, password, email) => {
    return await User.update({ username, password, email }, { where: { id } });
  },
};
