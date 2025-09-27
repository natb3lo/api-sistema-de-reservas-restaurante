const {
  findAll,
  createTable,
  updateTable,
} = require("../services/tableService");

const getTables = async (req, res) => {
  try {
    const tables = await findAll();
    return res.status(200).json({ tables });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Ooops...something went wrong" });
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
  //console.log(capacity);
  try {
    const table = await updateTable(number, capacity, status);
    return res.status(200).json({ table });
  } catch (err) {
    console.log(err);
    next(err);
  }
  //return res.status(201).json({});
};

module.exports = { getTables, createRestaurantTable, updateRestaurantTable };
