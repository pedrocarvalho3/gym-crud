const Author = require("../models/Author");

module.exports = {
  create: async (name, nationality) => {
    return await Author.create({ name, nationality });
  },
  list: async (page, limit) => {
    if (![5, 10, 30].includes(limit)) {
      throw new Error("Limite deve ser 5, 10 ou 30");
    }
    const offset = (page - 1) * limit;
    return await Author.findAll({ limit, offset });
  },
  findById: async (id) => {
    return await Author.findByPk(id);
  },
  findByNationality: async (nationality) => {
    return await Author.findAll({ where: { nationality } });
  },
  update: async (id, name, nationality) => {
    return await Author.update({ name, nationality }, { where: { id } });
  },
  delete: async (id) => {
    return await Author.destroy({ where: { id } });
  },
};
