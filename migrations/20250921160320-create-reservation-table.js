"use strict";

const ReservationStatus = require("../enums/reservationStatus");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Reservation", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      reservationDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM(...Object.values(ReservationStatus)),
        allowNull: false,
        defaultValue: ReservationStatus.ACTIVE,
      },
      tableNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "RestaurantTable",
          key: "number",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Reservation");
  },
};
