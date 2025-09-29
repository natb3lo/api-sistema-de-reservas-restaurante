const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/db");
const Roles = require("../enums/roles");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(Roles)),
      defaultValue: Roles.USER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = User;
