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
      throw new AppError(
        "Provided table number does not exist",
        400,
        "RESERVATION_ERROR",
        [{ field: "tableNumber", message: "No table found with this number" }]
      );
    }
    if (numberOfPeople > table.capacity) {
      throw new AppError(
        "The table capacity does not support this amount of people",
        400,
        "RESERVATION_ERROR",
        [
          {
            field: "numberOfPeople",
            message: "Number of people exceeds table capacity",
          },
        ]
      );
    }
    if (table.status == TableStatus.UNAVAILABLE) {
      throw new AppError(
        "The table is not available for reservations",
        400,
        "RESERVATION_ERROR",
        [{ field: "tableNumber", message: "Table is currently unavailable" }]
      );
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
        400,
        "RESERVATION_ERROR",
        [
          {
            field: "date/hour",
            message: "Selected table is already reserved at this time",
          },
        ]
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
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(
      "Reservation creation failed",
      500,
      "RESERVATION_ERROR",
      [
        {
          field: null,
          message: "An unexpected error occurred while creating reservation",
        },
      ]
    );
  }
};

const getReservationsOfUser = async (user) => {
  try {
    const reservations = await Reservation.findAll({
      where: { userId: user.id },
    });
    return reservations;
  } catch (error) {
    throw new AppError(
      "Failed to fetch user reservations",
      500,
      "RESERVATION_ERROR",
      [
        {
          field: null,
          message: "An unexpected error occurred while fetching reservations",
        },
      ]
    );
  }
};

const cancelReservationService = async (reservationId, user) => {
  try {
    const reservation = await Reservation.findOne({
      where: { userId: user.id, id: reservationId },
    });
    if (!reservation) {
      throw new AppError("Invalid reservation id", 400, "RESERVATION_ERROR", [
        {
          field: "reservationId",
          message: "No reservation found with this id for the user",
        },
      ]);
    }
    reservation.status = ReservationStatus.CANCELED;
    await reservation.save();
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(
      "Reservation cancellation failed",
      500,
      "RESERVATION_ERROR",
      [
        {
          field: null,
          message: "An unexpected error occurred while canceling reservation",
        },
      ]
    );
  }
};

module.exports = {
  registerReservationService,
  getReservationsOfUser,
  cancelReservationService,
};
