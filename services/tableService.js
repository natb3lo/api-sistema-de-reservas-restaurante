const RestaurantTable = require("../models/restaurantTable");
const AppError = require("../exceptions/AppError");

const findAll = async () => {
  try {
    const tables = await RestaurantTable.findAll({
      order: [["number", "ASC"]],
    });
    return tables;
  } catch (error) {
    throw new AppError("Failed to fetch tables", 500, "TABLE_ERROR", [
      {
        field: null,
        message: "An unexpected error occurred while fetching tables",
      },
    ]);
  }
};

const createTable = async (number, capacity) => {
  try {
    const tableExist = await RestaurantTable.findOne({
      where: { number: number },
    });
    if (tableExist) {
      throw new AppError("Table already registered.", 400, "USER_ERROR", [
        {
          field: "number",
          message: `Table ${number} already registered.`,
        },
      ]);
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

const updateTable = async (number, capacity, status) => {
  try {
    const table = await RestaurantTable.findOne({ where: { number: number } });
    if (!table) {
      throw new AppError("Table does not exist", 400, "USER_ERROR", [
        {
          field: "number",
          message: "Provided table number does not exist.",
        },
      ]);
    }
    table.capacity = capacity;
    table.status = status;
    await table.save();
    return table;
  } catch (error) {
    throw error;
  }
};

const deleteTable = async (number) => {
  try {
    const table = await RestaurantTable.findOne({ where: { number: number } });
    if (!table) {
      throw new AppError("Table does not exist", 400, "USER_ERROR", [
        {
          field: "number",
          message: "Provided table number does not exist.",
        },
      ]);
    }
    await table.destroy();
  } catch (error) {
    throw error;
  }
};

module.exports = { findAll, createTable, updateTable, deleteTable };
