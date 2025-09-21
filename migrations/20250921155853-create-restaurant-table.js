"use strict";

const TableStatus = require("../enums/tableStatus");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("RestaurantTable", {
      number: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      capacity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM(...Object.values(TableStatus)),
        allowNull: false,
        defaultValue: TableStatus.AVAILABLE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("RestaurantTable");
  },
};
