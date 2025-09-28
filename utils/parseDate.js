//const { parse, format } = require("date-fns");

const parseReservationDateTime = (dateStr, hourStr) => {
  // dateStr: "27-09-2025"
  // hourStr: "19:30"
  console.log("parseReservationDateTime input:", dateStr, hourStr);

  const [day, month, year] = dateStr.split("-").map(Number); // separa dia, mês, ano
  const [hour, minute] = hourStr.split(":").map(Number); // separa hora, minuto

  // cria objeto Date: new Date(year, monthIndex, day, hour, minute, second)
  // OBS: mês começa do 0 em JS, então subtraímos 1
  const dateObj = new Date(year, month - 1, day, hour, minute, 0);

  return dateObj;
};

const parseBrazilianDate = (dateStr) => {
  console.log("parseBrazilianDate input:", dateStr);
  const parsedDate = parse(dateStr, "dd-MM-yyyy", new Date()); // "27-09-2025" → Date
  return format(parsedDate, "yyyy-MM-dd"); // → "2025-09-27"
};

// Converte uma data UTC para horário local de acordo com o fuso passado
function toLocalTime(date, timeZoneOffsetHours) {
  // date: Date ou string ISO
  // timeZoneOffsetHours: diferença para UTC (ex: -3 para BRT)
  const d = new Date(date);
  // obtém timestamp em ms e aplica o offset
  const localTime = new Date(
    d.getTime() + timeZoneOffsetHours * 60 * 60 * 1000
  );
  return localTime;
}

const parseDateToUTC = (rawDate, rawHour) => {
  //const [year, month, day] = req.body.reservationDate.split("-");
  const [year, month, day] = rawDate.split("-");
  const [hour, minute] = rawHour.split(":");

  const dateUTC = new Date(year, month - 1, day, hour, minute);
  //onsole.log(dateUTC);
  return dateUTC;
};

const parseToLocalDate = (utcDate, time_zone = -3) => {
  const localDate = new Date(utcDate.getTime() + time_zone * 60 * 60 * 1000);
  //console.log(localDate);
  return localDate;
};

const parseHourToInteger = (rawString) => {
  const [hours, minutes] = rawString.split(":").map(Number);
  return hours * 60 + minutes;
};

module.exports = {
  parseReservationDateTime,
  parseBrazilianDate,
  toLocalTime,
  parseDateToUTC,
  parseToLocalDate,
  parseHourToInteger,
};
