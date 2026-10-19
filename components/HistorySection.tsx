import HistoryCard from "./HistoryCard";
import { toPersianDigits, type HistoryItem } from "../lib/history";

type HistorySectionProps = {
  sectionKey: string;
  title: string;
  subtitle: string;
  icon: string;
  items: HistoryItem[];
};

export default function HistorySection({
  sectionKey,
  title,
  subtitle,
  icon,
  items,
}: HistorySectionProps) {
  const sortedItems = [...items].sort((left, right) => {
    const leftYear = left.year ?? 99999;
    const rightYear = right.year ?? 99999;
    return leftYear - rightYear;
  });

  return (
    <section className="section" id={sectionKey}>
      <div className="section-header">
        <div className={`section-icon ${sectionKey}`}>{icon}</div>
        <div className="section-title">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <span className="section-count">
          {toPersianDigits(items.length)} مورد
        </span>
      </div>
      {sortedItems.length === 0 ? (
        <div className="empty-state">
          <div className="icon">{icon}</div>
          <p>در این بخش برای این روز داده‌ای ثبت نشده است.</p>
        </div>
      ) : (
        <div className="grid">
          {sortedItems.map((item, index) => (
            <HistoryCard
              key={item.id ?? `${sectionKey}-${index}`}
              item={item}
              sectionKey={sectionKey}
              sectionIcon={icon}
            />
          ))}
        </div>
      )}
    </section>
  );
}
