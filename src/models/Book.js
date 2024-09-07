const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Author = require("./Author");

const Book = sequelize.define("Book", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  publication_year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  author_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Author,
      key: "id",
    },
  },
});

Author.hasMany(Book, { foreignKey: "author_id" });
Book.belongsTo(Author, { foreignKey: "author_id" });

module.exports = Book;
