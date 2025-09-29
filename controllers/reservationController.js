const {
  registerReservationService,
  getReservationsOfUser,
  cancelReservationService,
} = require("../services/reservationService");
const {
  parseDateToUTC,
  parseHourToInteger,
  parseToLocalDate,
} = require("../utils/parseDate");

const registerReservation = async (req, res, next) => {
  const { tableNumber, date, hour, duration, numberOfPeople } = req.body;
  const dateUTC = parseDateToUTC(date, hour);
  const durationInt = parseHourToInteger(duration);
  try {
    const reservation = await registerReservationService(
      tableNumber,
      dateUTC,
      durationInt,
      numberOfPeople,
      req.user.id
    );
    return res.status(201).json({ reservation });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getReservations = async (req, res, next) => {
  const user = req.user;
  try {
    const rawReservations = await getReservationsOfUser(user);

    // Transforms the date from UTC to Local Time
    const reservations = rawReservations.map((r) => {
      const localDate = parseToLocalDate(new Date(r.dataValues.date));
      return {
        ...r.dataValues,
        date: localDate,
      };
    });
    return res.status(200).json({ reservations });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const cancelReservation = async (req, res, next) => {
  const user = req.user;
  const reservationId = req.params.id;
  try {
    await cancelReservationService(reservationId, user);
    return res.status(200).json({ msg: "Reservation canceled" });
  } catch (err) {
    next(err);
  }
};

module.exports = { registerReservation, getReservations, cancelReservation };
