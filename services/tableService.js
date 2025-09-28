const RestaurantTable = require("../models/restaurantTable");
const AppError = require("../exceptions/AppError");
const Reservation = require("../models/reservation");
const { add } = require("date-fns");
const TableStatus = require("../enums/tableStatus");
const { check } = require("express-validator");
const { Op } = require("sequelize");
const { utcToZonedTime } = require("date-fns-tz");
const { toLocalTime } = require("../utils/parseDate");

const TIME_ZONE_OFFSET = -3; // fuso horário local

const findAll = async (reservationDate = null, reservationHour = null) => {
  //console.log(reservationDate);
  //console.log(reservationHour);
  try {
    const tables = await RestaurantTable.findAll({
      order: [["number", "ASC"]],
      include: [
        {
          model: Reservation,
          attributes: ["reservationDate", "duration", "status"],
          required: false,
        },
      ],
      attributes: { exclude: ["status"] },
    });

    //Scenario 1: If no reservation date provided --> returns the tables
    if (!reservationDate) {
      return tables;
    }

    //Scenario 2: If no reservation hour provided --> returns existing reservation status for the provided date
    if (!reservationHour) {
      return tables.map((table) => ({
        ...table.toJSON(),
        status:
          table.Reservations && table.Reservations.length > 0
            ? TableStatus.RESERVED
            : TableStatus.AVAILABLE,
      }));
    }

    //Scenario 3: If date and hour provided
    const [hour, minute] = reservationHour.split(":").map(Number);
    return tables.map((table) => {
      let isReserved = false;
      if (table.Reservations && table.Reservations.length > 0) {
        isReserved = table.Reservations.some((res) => {
          if (!res.reservationDate) {
            return false;
          }
          const startDate = new Date(res.reservationDate); //new Date(res.reservationDate);
          const endDate = new Date(startDate.getTime() + res.duration * 60000);
          const checkDate = new Date(
            Date.UTC(...reservationDate.split("-").map(Number), hour, minute)
          );
          return checkDate >= startDate && checkDate < endDate;
        });
      }
      console.log("Tabela:", table.number);
      console.log("Reservas:", table.Reservations);
      return {
        ...table.toJSON(),
        status: isReserved ? TableStatus.RESERVED : TableStatus.AVAILABLE,
      };
    });
  } catch (err) {
    console.error("Erro real:", err);
    throw new Error("Error fetching tables");
  }
};

const createTable = async (number, capacity) => {
  try {
    const tableExist = await RestaurantTable.findOne({
      where: { number: number },
    });
    if (tableExist) {
      throw new Error("Restaurant Table number already registered");
    }
    const table = await RestaurantTable.create({
      number,
      capacity,
    });
    return table;
  } catch (err) {
    throw err;
  }
};

const updateTable = async (number, capacity, status) => {
  try {
    const table = await RestaurantTable.findOne({ where: { number: number } });
    if (!table) {
      throw new AppError("Provided table number does not exist", 400);
    }
    table.capacity = capacity;
    table.status = status;
    await table.save();
    return table;
  } catch (err) {
    throw err;
  }
};

const deleteTable = async (number) => {
  try {
    const table = await RestaurantTable.findOne({ where: { number: number } });
    if (!table) {
      throw new AppError("Provided table number does not exist", 400);
    }
    await table.destroy();
  } catch (err) {
    throw err;
  }
};

module.exports = { findAll, createTable, updateTable, deleteTable };
