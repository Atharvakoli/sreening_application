const { dataTypes, sequelize } = require("../lib/index.lib");

const masterModel = sequelize.define(
  "masters",
  {
    category_name: {
      type: dataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "masters",
    timestamps: true,
  }
);

module.exports = { masterModel };
