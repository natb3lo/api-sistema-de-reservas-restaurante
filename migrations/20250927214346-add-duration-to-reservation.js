"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Reservation", "duration", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 60,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Reservation", "duration");
  },
};
