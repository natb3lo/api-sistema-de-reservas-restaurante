"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Reservation", "reservationHour");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("Reservation", "reservationHour", {
      type: Sequelize.DATE,
      //allowNull: false,
    });
  },
};
