const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/db");
const TableStatus = require("../enums/tableStatus");

class RestaurantTable extends Model {}

RestaurantTable.init(
  {
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(TableStatus)),
      allowNull: false,
      defaultValue: TableStatus.AVAILABLE,
    },
  },
  {
    sequelize,
    modelName: "RestaurantTable",
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = RestaurantTable;
