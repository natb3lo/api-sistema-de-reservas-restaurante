"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Reservation", "reservationHour", {
      type: Sequelize.TIME,
      allowNull: false,
      defaultValue: "19:00:00",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Reservation", "reservationHour");
  },
};
