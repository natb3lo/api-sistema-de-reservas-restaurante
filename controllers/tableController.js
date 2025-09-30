const {
  findAll,
  createTable,
  updateTable,
  deleteTable,
} = require("../services/tableService");

const getTables = async (req, res, next) => {
  try {
    const tables = await findAll();
    return res.status(200).json({ tables });
  } catch (error) {
    next(error);
  }
};

const createRestaurantTable = async (req, res, next) => {
  const { number, capacity } = req.body;
  try {
    const table = await createTable(number, capacity);
    return res.status(201).json({ table });
  } catch (error) {
    next(error);
  }
};

const updateRestaurantTable = async (req, res, next) => {
  const { number } = req.params;
  const { capacity, status } = req.body;
  try {
    const table = await updateTable(number, capacity, status);
    return res.status(200).json({ table });
  } catch (error) {
    next(error);
  }
};

const deleteRestauranteTable = async (req, res, next) => {
  const { number } = req.params;
  try {
    await deleteTable(number);
    return res.status(204).json({});
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTables,
  createRestaurantTable,
  updateRestaurantTable,
  deleteRestauranteTable,
};
