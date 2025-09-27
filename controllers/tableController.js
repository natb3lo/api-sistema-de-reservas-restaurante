const findAll = require("../services/tableService");

const getTables = async (req, res) => {
  try {
    const tables = await findAll();
    return res.status(200).json({ tables });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Ooops...something went wrong" });
  }
};

module.exports = getTables;
