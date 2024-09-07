const { Sequelize } = require("sequelize");
require("dotenv").config();

const database = process.env.DB_STORAGE;

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: database,
});

module.exports = sequelize;
