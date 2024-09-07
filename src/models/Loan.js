const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Book = require("./Book");
const User = require("./User");

const Loan = sequelize.define("Loan", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  book_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Book,
      key: "id",
    },
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  date_loan: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  date_return: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

Book.hasMany(Loan, { foreignKey: "book_id" });
Loan.belongsTo(Book, { foreignKey: "book_id" });

User.hasMany(Loan, { foreignKey: "user_id" });
Loan.belongsTo(User, { foreignKey: "user_id" });

module.exports = Loan;
