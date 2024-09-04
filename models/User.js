const { User } = require("./db");

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
    return User.findAll();
  },
};
