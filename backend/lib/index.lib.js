const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db/database.sqlite",
});

module.exports = { dataTypes: DataTypes, sequelize };
