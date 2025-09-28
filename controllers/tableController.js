const {
  findAll,
  createTable,
  updateTable,
  deleteTable,
} = require("../services/tableService");
const { parseDateToUTC } = require("../utils/parseDate");

const getTables = async (req, res, next) => {
  try {
    const tables = await findAll();
    return res.status(200).json({ tables });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const createRestaurantTable = async (req, res) => {
  const { number, capacity } = req.body;
  try {
    const table = await createTable(number, capacity);
    return res.status(201).json({ table });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
};

const updateRestaurantTable = async (req, res, next) => {
  const { number } = req.params;
  const { capacity, status } = req.body;
  try {
    const table = await updateTable(number, capacity, status);
    return res.status(200).json({ table });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const deleteRestauranteTable = async (req, res, next) => {
  const { number } = req.params;
  try {
    await deleteTable(number);
    return res.status(204).json({});
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  getTables,
  createRestaurantTable,
  updateRestaurantTable,
  deleteRestauranteTable,
};
