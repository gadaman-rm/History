import {
  GREGORIAN_MONTH_FA,
  toPersianDigits,
  type HistoryDate,
} from "../lib/history";

export default function PageFooter({
  date,
  source,
}: {
  date?: HistoryDate;
  source?: string;
}) {
  const month =
    typeof date?.month === "number" ? GREGORIAN_MONTH_FA[date.month] : "";

  return (
    <footer>
      <div className="line" />
      <p>
        تاریخ‌نگار — {toPersianDigits(date?.day)} {month}{" "}
        {toPersianDigits(date?.year)}
        {source && (
          <>
            {" "}
            | منبع:{" "}
            <a href={source} target="_blank" rel="noopener noreferrer">
              {source}
            </a>
          </>
        )}
      </p>
    </footer>
  );
}
