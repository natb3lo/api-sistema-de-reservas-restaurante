const parseDateToUTC = (rawDate, rawHour) => {
  const [year, month, day] = rawDate.split("-");
  const [hour, minute] = rawHour.split(":");

  const dateUTC = new Date(year, month - 1, day, hour, minute);
  return dateUTC;
};

const parseToLocalDate = (utcDate, time_zone = -3) => {
  const localDate = new Date(utcDate.getTime() + time_zone * 60 * 60 * 1000);
  return localDate;
};

const parseHourToInteger = (rawString) => {
  const [hours, minutes] = rawString.split(":").map(Number);
  return hours * 60 + minutes;
};

module.exports = {
  parseDateToUTC,
  parseToLocalDate,
  parseHourToInteger,
};
