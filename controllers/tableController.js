const { findAll, createTable } = require("../services/tableService");

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
  console.log(number);
  try {
    const table = await createTable(number, capacity);
    return res.status(201).json({ table });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = { getTables, createRestaurantTable };
