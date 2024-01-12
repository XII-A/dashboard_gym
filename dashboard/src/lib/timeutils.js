import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getCurrentUserTime() {
  const currentDate = new Date();
  // Extract individual components
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getUTCHours()).padStart(2, "0");
  const minutes = String(currentDate.getUTCMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getUTCSeconds()).padStart(2, "0");
  const milliseconds = String(currentDate.getUTCMilliseconds()).padStart(
    3,
    "0"
  );

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    fractionalSecondDigits: 3,
  };
  // Format the date string
  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const formattedDate5 = currentDate.toLocaleString(
    "en-GB",
    { timeZone: timezone },
    options
  );

  const [date, time] = formattedDate5.split(",");

  const [dayF, monthF, yearF] = date.split("/");

  const [hour, minute, sec] = time.trim().split(":");

  const finalformat = `${yearF}-${monthF}-${dayF}T${hour}:${minute}:${sec.slice(
    0,
    6
  )}Z`;

  return finalformat;
}

export function getDate() {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function convert24to12(time24) {
  let ts = time24;
  const H = +ts.substr(0, 2);
  const h = H % 12 || 12;
  const ampm = H < 12 || H === 24 ? " AM" : " PM";
  ts = String(h).padStart(2, 0) + ts.substr(2, 3) + ampm;
  return ts;
}

export function getWeek() {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    fractionalSecondDigits: 3,
  };
  const today = new Date();

  // ✅ Get the first day of the current week (Sunday)
  const firstDay = new Date(today.setDate(today.getDate() - today.getDay() + 1))
    .toISOString()
    .split("T")[0];

  // ✅ Get the last day of the current week (Saturday)
  const lastDay = new Date(today.setDate(today.getDate() - today.getDay() + 7))
    .toISOString()
    .split("T")[0];

  return [firstDay, lastDay];
}

export function getDayFromDate(date) {
  const d = new Date(date);
  return daysOfWeek[d.getDay()];
}
