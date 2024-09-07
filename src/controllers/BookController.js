const Book = require("../models/Book");

module.exports = {
  create: async (title, publication_year, author_id) => {
    return await Book.create({ title, publication_year, author_id });
  },
  list: async (page, limit) => {
    if (![5, 10, 30].includes(limit)) {
      throw new Error("Limite deve ser 5, 10 ou 30");
    }
    const offset = (page - 1) * limit;
    return await Book.findAll({ limit, offset });
  },
  findById: async (id) => {
    return await Book.findByPk(id, { include: "Author" });
  },
  findByAuthor: async (author_id) => {
    return await Book.findAll({ where: { author_id }, include: "Author" });
  },
  update: async (id, title, publication_year, author_id) => {
    return await Book.update(
      { title, publication_year, author_id },
      { where: { id } }
    );
  },
  delete: async (id) => {
    return await Book.destroy({ where: { id } });
  },
};
