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
    reservationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(ReservationStatus)),
      allowNull: false,
      defaultValue: ReservationStatus.ACTIVE,
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

Table.hasMany(Reservation, {
  foreignKey: "tableNumber",
});

Reservation.belongsTo(User, {
  foreignKey: "userId",
});

User.hasMany(Reservation, {
  foreignKey: "userId",
});

module.exports = Reservation;
