/**
 * Formats a date, timestamp, or string into a "HH:mm" time format.
 * @param dateOrTimestamp - A Date object, timestamp (number), or ISO date string.
 * @returns A formatted string in "HH:mm" format, or a message if invalid.
 */
export default function formatTime(
  dateOrTimestamp: Date | number | string | null
): string {
  if (!dateOrTimestamp) {
    return "Date not informed";
  }

  const date =
    typeof dateOrTimestamp === "number"
      ? new Date(dateOrTimestamp) // Handle timestamp
      : typeof dateOrTimestamp === "string"
      ? new Date(dateOrTimestamp) // Handle string
      : dateOrTimestamp; // Assume it's a Date object

  // Validate if the resulting Date object is valid
  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Format the time as HH:mm
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}`;
}
