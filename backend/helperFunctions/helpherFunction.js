const { detailsModel } = require("../models/details.model");
const { masterModel } = require("../models/master.model");

async function details(id) {
  const master = await masterModel.findAll({
    where: id,
  });

  let detailsData;
  for (let mast of master) {
    detailsData = await detailsModel.findOne({
      where: { id: mast.id },
    });
  }
  console.log(detailsData);

  return detailsData;
}

async function getDetails(masterData) {
  let detail = await details(masterData.id);
  console.log(masterData);
  return {
    detail,
    ...masterData,
  };
}

module.exports = { details, getDetails };
