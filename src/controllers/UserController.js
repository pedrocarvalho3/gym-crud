const User = require("../models/User");

module.exports = {
  create: async (username, password, email, isAdmin) => {
    return await User.create({ username, password, email, isAdmin });
  },
  findLogin: async (username, password) => {
    return await User.findOne({ where: { username, password } });
  },
  findById: async (id) => {
    return await User.findByPk(id);
  },
  list: async () => {
    return await User.findAll();
  },
  delete: async (id) => {
    return await User.destroy({ where: { id } });
  },
  update: async (id, username, password, email) => {
    return await User.update({ username, password, email }, { where: { id } });
  },
};
