import { formatDistance, parseISO } from "date-fns";
import { differenceInDays } from "date-fns";

// Works for both Date objects and strings
export const subtractDates = (
  date1: string | Date,
  date2: string | Date
): number => {
  return differenceInDays(parseISO(String(date1)), parseISO(String(date2)));
};

export const formatDistanceFromNow = (dateStr: string): string =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");

interface GetTodayOptions {
  end?: boolean;
}

// Returns an ISO date string set either to start or end of today
export const getToday = (options: GetTodayOptions = {}): string => {
  const today = new Date();

  if (options.end) {
    // Last millisecond of the day
    today.setUTCHours(23, 59, 59, 999);
  } else {
    // Start of the day
    today.setUTCHours(0, 0, 0, 0);
  }

  return today.toISOString();
};

export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );
