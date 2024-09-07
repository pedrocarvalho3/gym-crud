const Loan = require("../models/Loan");

module.exports = {
  init: async (loanData) => {
    return await Loan.create(loanData);
  },
  create: async (book_id, user_id, date_loan) => {
    return await Loan.create({ book_id, user_id, date_loan });
  },
  list: async (page, limit) => {
    if (![5, 10, 30].includes(limit)) {
      throw new Error("Limite deve ser 5, 10 ou 30");
    }
    const offset = (page - 1) * limit;
    return await Loan.findAll({ limit, offset });
  },
  findById: async (id) => {
    return await Loan.findByPk(id, { include: ["Book", "User"] });
  },
  findByUser: async (user_id) => {
    return await Loan.findAll({ where: { user_id }, include: "Book" });
  },
  update: async (id, date_return) => {
    return await Loan.update({ date_return }, { where: { id } });
  },
  delete: async (id) => {
    return await Loan.destroy({ where: { id } });
  },
};
