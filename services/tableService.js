const RestaurantTable = require("../models/restaurantTable");

const findAll = async () => {
  try {
    return await RestaurantTable.findAll();
  } catch (error) {
    throw new Error("");
  }
};

module.exports = findAll;
