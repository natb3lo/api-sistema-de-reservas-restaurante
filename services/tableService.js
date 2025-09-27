const RestaurantTable = require("../models/restaurantTable");

const findAll = async () => {
  try {
    return await RestaurantTable.findAll({ order: [["number", "ASC"]] });
  } catch (error) {
    throw new Error("");
  }
};

const createTable = async (number, capacity) => {
  try {
    const tableExist = await RestaurantTable.findOne({
      where: { number: number },
    });
    if (tableExist) {
      throw new Error("Restaurant Table number already registered");
    }
    const table = await RestaurantTable.create({
      number,
      capacity,
    });
    return table;
  } catch (error) {
    throw error;
  }
};

module.exports = { findAll, createTable };
