const RestaurantTable = require("../models/restaurantTable");
const Reservation = require("../models/reservation");
const AppError = require("../exceptions/AppError");
const ReservationStatus = require("../enums/reservationStatus");
const TableStatus = require("../enums/tableStatus");

const registerReservationService = async (
  tableNumber,
  requestedReservationDate,
  requestedDuration,
  numberOfPeople,
  userId
) => {
  const requestedReservationEnd = new Date(
    requestedReservationDate.getTime() + requestedDuration * 60000
  );

  try {
    const table = await RestaurantTable.findOne({
      where: { number: tableNumber },
    });
    if (!table) {
      throw new AppError("Provided table number does not exist", 400);
    }
    if (numberOfPeople > table.capacity) {
      throw new AppError(
        "The table capacity does not support this amount of people",
        400
      );
    }
    if (table.status == TableStatus.UNAVAILABLE) {
      throw new AppError("The table is not available for reservations", 400);
    }
    const reservations = await Reservation.findAll({
      where: {
        tableNumber: tableNumber,
      },
    });
    const isReserved = reservations.some((r) => {
      if (r.status == ReservationStatus.CANCELED) {
        return false;
      }
      const currentReservationStart = new Date(r.date);
      const currentReservationEnd = new Date(
        currentReservationStart.getTime() + r.duration * 60000
      );
      return (
        requestedReservationDate < currentReservationEnd &&
        requestedReservationEnd > currentReservationStart
      );
    });

    if (isReserved) {
      throw new AppError(
        "The table is not available for reservation at the selected time.",
        400
      );
    }

    const reservation = await Reservation.create({
      date: requestedReservationDate,
      duration: requestedDuration,
      status: ReservationStatus.ACTIVE,
      tableNumber: tableNumber,
      userId: userId,
    });

    return reservation;
  } catch (err) {
    throw err;
  }
};

const getReservationsOfUser = async (user) => {
  try {
    const reservations = await Reservation.findAll({
      where: { userId: user.id },
    });
    return reservations;
  } catch (err) {
    throw err;
  }
};

const cancelReservationService = async (reservationId, user) => {
  try {
    const reservation = await Reservation.findOne({
      where: { userId: user.id, id: reservationId },
    });
    if (!reservation) {
      throw new AppError("Invalid reservation id", 400);
    }
    reservation.status = ReservationStatus.CANCELED;
    await reservation.save();
  } catch (err) {
    throw err;
  }
};

module.exports = {
  registerReservationService,
  getReservationsOfUser,
  cancelReservationService,
};
