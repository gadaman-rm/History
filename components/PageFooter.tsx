import { toPersianDigits, type HistoryDate } from "../lib/history";

export default function PageFooter({
  date,
  source,
}: {
  date?: HistoryDate;
  source?: string;
}) {
  return (
    <footer>
      <div className="line" />
      <p>
        تاریخ‌نگار — {toPersianDigits(date?.day)} نوامبر{" "}
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
