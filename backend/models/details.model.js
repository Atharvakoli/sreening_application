const { dataTypes, sequelize } = require("../lib/index.lib");
const { masterModel } = require("./master.model");

const detailsModel = sequelize.define(
  "details",
  {
    question_text: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    master_id: {
      type: dataTypes.INTEGER,
      references: {
        model: "masters",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

// association
detailsModel.belongsTo(masterModel, {
  foreignKey: "master_id",
});

masterModel.hasMany(detailsModel, {
  foreignKey: "master_id",
});

module.exports = { detailsModel };
