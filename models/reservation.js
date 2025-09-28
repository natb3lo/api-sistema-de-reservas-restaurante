const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/db");
const ReservationStatus = require("../enums/reservationStatus");
const RestaurantTable = require("./restaurantTable");
const User = require("./user");

class Reservation extends Model {}

Reservation.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(ReservationStatus)),
      allowNull: false,
      defaultValue: ReservationStatus.ACTIVE,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 60,
    },
  },
  {
    sequelize,
    modelName: "Reservation",
    freezeTableName: true,
    timestamps: false,
  }
);

Reservation.belongsTo(RestaurantTable, {
  foreignKey: "tableNumber",
});

RestaurantTable.hasMany(Reservation, {
  foreignKey: "tableNumber",
});

Reservation.belongsTo(User, {
  foreignKey: "userId",
});

User.hasMany(Reservation, {
  foreignKey: "userId",
});

module.exports = Reservation;
