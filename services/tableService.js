const RestaurantTable = require("../models/restaurantTable");
const AppError = require("../exceptions/AppError");

const findAll = async () => {
  try {
    const tables = await RestaurantTable.findAll({
      order: [["number", "ASC"]],
    });
    return tables;
  } catch (err) {
    console.log(err);
    throw new AppError("Error fetching tables");
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
  } catch (err) {
    throw err;
  }
};

const updateTable = async (number, capacity, status) => {
  try {
    const table = await RestaurantTable.findOne({ where: { number: number } });
    if (!table) {
      throw new AppError("Provided table number does not exist", 400);
    }
    table.capacity = capacity;
    table.status = status;
    await table.save();
    return table;
  } catch (err) {
    throw err;
  }
};

const deleteTable = async (number) => {
  try {
    const table = await RestaurantTable.findOne({ where: { number: number } });
    if (!table) {
      throw new AppError("Provided table number does not exist", 400);
    }
    await table.destroy();
  } catch (err) {
    throw err;
  }
};

module.exports = { findAll, createTable, updateTable, deleteTable };
