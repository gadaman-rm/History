import {
  MONTH_FA,
  WEEKDAY_FA,
  toPersianDigits,
  type HistoryData,
} from "../lib/history";

export default function TimelineHero({ data }: { data: HistoryData }) {
  const gregorianDate = data.gregorian_date ?? {};
  const solarDate = data.solar_hijri_date ?? {};
  const weekday = WEEKDAY_FA[data.weekday ?? ""] ?? data.weekday ?? "";
  const solarMonthKey = String(solarDate.month ?? "");
  const solarMonth = MONTH_FA[solarMonthKey] ?? solarMonthKey;

  return (
    <header className="hero">
      <div className="hero-badge">
        <span className="dot" />
        تقویم تاریخی | یک روز
      </div>
      <h1>
        {toPersianDigits(gregorianDate.day)} نوامبر{" "}
        {toPersianDigits(gregorianDate.year)}
      </h1>
      <div className="hero-dates">
        {weekday && (
          <span className="date-chip">
            {weekday}
            <small>روز هفته</small>
          </span>
        )}
        <span className="date-chip">
          {toPersianDigits(gregorianDate.day)} نوامبر{" "}
          {toPersianDigits(gregorianDate.year)}
          <small>میلادی</small>
        </span>
        <span className="date-chip">
          {toPersianDigits(solarDate.day)} {solarMonth}{" "}
          {toPersianDigits(solarDate.year)}
          <small>شمسی</small>
        </span>
      </div>
      <p>
        {data.metadata?.description ??
          "رویدادها، زادروزها، درگذشت‌ها و مناسبت‌های این روز."}
      </p>
    </header>
  );
}
