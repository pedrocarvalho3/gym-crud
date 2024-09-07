const Loan = require("../models/Loan");

module.exports = {
  init: async (loanData) => {
    return await Loan.create(loanData);
  },
};
