const {
  registerReservationService,
  getReservationsOfUser,
} = require("../services/reservationService");
const { parseDateToUTC, parseHourToInteger } = require("../utils/parseDate");

const registerReservation = async (req, res, next) => {
  const { tableNumber, date, hour, duration, numberOfPeople } = req.body;
  const dateUTC = parseDateToUTC(date, hour);
  const durationInt = parseHourToInteger(duration);
  //console.log(durationInt);
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
    const reservations = await getReservationsOfUser(user);
    return res.status(200).json({ reservations });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = { registerReservation, getReservations };
