const Loan = require("../models/Loan");

module.exports = {
  init: async (loanData) => {
    return await Loan.create(loanData);
  },
  create: async (book_id, user_id, date_loan) => {
    return await Loan.create({ book_id, user_id, date_loan });
  },
  list: async () => {
    return await Loan.findAll({ include: ["Book", "User"] });
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
