import { readFile } from "node:fs/promises";
import path from "node:path";
import type { HistoryData } from "./history";

const MONTHS = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
] as const;

export type DayRoute = {
  day: number;
  month: number;
  year: number;
  slug: string;
  isoDate: string;
};

export function parseDaySlug(slug: string): DayRoute | null {
  // Accept day-month slugs and normalize them to the current year's date.
  const match = /^(\d{1,2})-([a-z]{3})$/i.exec(slug);
  if (!match) return null;

  const day = Number(match[1]);
  const month =
    MONTHS.indexOf(match[2].toLowerCase() as (typeof MONTHS)[number]) + 1;
  const year = new Date().getFullYear();
  if (!month) return null;

  // Validate the day against the Gregorian month length for this year.
  const isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const daysInMonth = [
    31,
    isLeapYear ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ][month - 1];
  if (day < 1 || day > daysInMonth) return null;

  const canonicalSlug = `${day}-${MONTHS[month - 1]}`;

  return {
    day,
    month,
    year,
    slug: canonicalSlug,
    isoDate: `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
  };
}

export function getDayCalendar(route: DayRoute) {
  // Use UTC so calendar fields are stable across server time zones.
  const date = new Date(`${route.isoDate}T00:00:00Z`);
  const weekday = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    timeZone: "UTC",
  }).format(date);
  const solarParts = new Intl.DateTimeFormat("en-u-ca-persian-nu-latn", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).formatToParts(date);
  const solarDate = Object.fromEntries(
    solarParts
      .filter((part) => part.type === "day" || part.type === "month" || part.type === "year")
      .map((part) => [part.type, part.value]),
  );

  return {
    weekday,
    solar_hijri_date: {
      day: Number(solarDate.day),
      month: solarDate.month,
      year: Number(solarDate.year),
    },
  };
}

export async function getDayData(route: DayRoute): Promise<HistoryData | null> {
  // Daily history files use a numeric day and three-letter month filename.
  const fileName = `${route.day}_${MONTHS[route.month - 1]}.json`;
  const filePath = path.join(process.cwd(), "data", fileName);

  try {
    const contents = await readFile(filePath, "utf8");
    const data = JSON.parse(contents) as HistoryData;
    const calendar = getDayCalendar(route);

    return {
      ...data,
      metadata: {
        ...data.metadata,
        date: route.isoDate,
      },
      gregorian_date: {
        day: route.day,
        month: route.month,
        year: route.year,
      },
      ...calendar,
    };
  } catch (error) {
    // A missing daily file means there is no data for this route.
    if (
      error instanceof Error &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      return null;
    }
    throw error;
  }
}
