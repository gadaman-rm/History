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
  const match = /^(\d{1,2})-([a-z]{3})-(\d{4})$/i.exec(slug);
  if (!match) return null;

  const day = Number(match[1]);
  const month = MONTHS.indexOf(match[2].toLowerCase() as (typeof MONTHS)[number]) + 1;
  const year = Number(match[3]);
  if (!month || year < 1) return null;

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

  const canonicalSlug = `${day}-${MONTHS[month - 1]}-${String(year).padStart(4, "0")}`;

  return {
    day,
    month,
    year,
    slug: canonicalSlug,
    isoDate: `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
  };
}

export async function getDayData(route: DayRoute): Promise<HistoryData | null> {
  const fileName = `${route.day}_${MONTHS[route.month - 1]}_${route.year}.json`;
  const filePath = path.join(process.cwd(), "data", fileName);

  try {
    const contents = await readFile(filePath, "utf8");
    return JSON.parse(contents) as HistoryData;
  } catch (error) {
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
