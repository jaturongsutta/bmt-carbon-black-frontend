// import moment from "moment";
import moment from "moment";

export function formatDate(inputDate) {
  // const date = moment(inputDate).utc().format("YYYY/MM/DD, HH.mm.ss");
  const date = moment(inputDate).utc().format("DD/MM/YYYY HH:mm:ss");
  return date;
}

export function formatDateTypeTwo(dateString) {
  // console.log("dateString --------------->", dateString);

  const regex = /([A-Za-z]+) (\d{1,2}) (\d{4})\s+(\d{1,2}):(\d{2})(AM|PM)/;
  const match = dateString.match(regex);

  if (match) {
    const [_, month, day, year, hours, minutes, period] = match;

    // Convert the month name to a number (0-11)
    const monthNumber = new Date(`${month} 1, ${year}`).getMonth();

    // Convert hours based on AM/PM
    let hoursNumber = parseInt(hours, 10);
    if (period === "PM" && hoursNumber !== 12) {
      hoursNumber += 12;
    }
    if (period === "AM" && hoursNumber === 12) {
      hoursNumber = 0;
    }

    // Create the Date object
    const formattedDate = `${parseInt(day, 10)}/${
      monthNumber + 1
    }/${year} ${hoursNumber.toString().padStart(2, "0")}:${minutes.padStart(
      2,
      "0"
    )}:00`;
    // console.log("formattedDate --------------->", formattedDate);

    return formattedDate;
  } else {
    return new Date(NaN); // Invalid Date
  }
}

// export function formatDate(input) {
//   // Parse the input date string
//   const date = moment.utc(input);

//   // Format the output string
//   const result = date.format("DD MMM YYYY, HH.mm.ss");

//   return result;
// }

export function formatDatePeriod(dateString) {
  const formattedDate = moment(dateString).format("MMMM YYYY");

  return formattedDate;
}

export function convertToDateObject(dateString) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const parts = dateString.split("-");
  const day = parseInt(parts[0], 10);
  const monthIndex = months.findIndex(
    (month) => month.toLowerCase() === parts[1].toLowerCase()
  );
  const year = parseInt(parts[2], 10);

  if (monthIndex !== -1 && !isNaN(day) && !isNaN(year)) {
    return new Date(year, monthIndex, day);
  } else {
    throw new Error("Invalid date format");
  }
}

export function formatDateDto(date) {
  const inputDate = new Date(date);
  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed, so we add 1
  const day = String(inputDate.getDate()).padStart(2, "0");

  // Format the extracted year, month, and day into the desired string format 'YYYY-MM-DD'
  const formattedDateString = `${year}-${month}-${day}`;

  // console.log(formattedDateString);
  return formattedDateString;
}

export function getToday() {
  const today = moment().utc().format("YYYY-MM-DD");
  return today;
}

export function getDateAgo(days) {
  const date = moment().utc().subtract(days, "days").format("YYYY-MM-DD");
  return date;
}

export function getFirstDateOfMonth(dateString) {
  let currentYear;
  let currentMonth;
  if (dateString === null || dateString === undefined) {
    currentYear = moment().utc().year();
    currentMonth = moment().utc().month() + 1;
  } else {
    currentYear = moment(dateString).utc().year();
    currentMonth = moment(dateString).utc().month() + 1;
  }
  return currentYear + "-" + currentMonth.toString().padStart(2, "0") + "-01";
}

export function getLastDateOfMonth(dateString) {
  let currentYear;
  let currentMonth;
  if (dateString === null || dateString === undefined) {
    currentYear = moment().utc().year();
    currentMonth = moment().utc().month() + 1;
  } else {
    currentYear = moment(dateString).utc().year();
    currentMonth = moment(dateString).utc().month() + 1;
  }

  const date1 =
    currentYear + "-" + currentMonth.toString().padStart(2, "0") + "-01";
  let date = new Date(date1);
  date.setMonth(date.getMonth() + 1);
  date.setDate(0);
  return moment(date).format("YYYY-MM-DD");
}

export function getCurrentYear() {
  const currentYear = moment().utc().year();
  return currentYear;
}
