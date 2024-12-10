// /src/utils/dateUtils.ts

export const showTime = (timestamp: string): string => {
  const date = new Date(timestamp);

  return date.toLocaleString("en-US", {
    weekday: "long", // Example: "Monday"
    year: "numeric", // Example: "2024"
    month: "long", // Example: "December"
    day: "numeric", // Example: "9"
    hour: "numeric", // Example: "2"
    minute: "numeric", // Example: "30"
    hour12: true, // Example: "PM"
  });
};
