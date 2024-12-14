export default function currentDate(): string {
  const date = new Date();

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

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let dayOfWeek = daysOfWeek[date.getDay()];
  let currentDay = date.getDate();
  let currentMonth = months[date.getMonth()];

  return `${dayOfWeek}, ${currentMonth} ${currentDay}`;
}
