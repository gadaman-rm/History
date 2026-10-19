import {
  CATEGORY_CLASS,
  CATEGORY_FA,
  IMPORTANCE_FA,
  toPersianDigits,
  type HistoryItem,
} from "../lib/history";

type HistoryCardProps = {
  item: HistoryItem;
  sectionKey: string;
  sectionIcon: string;
};

export default function HistoryCard({
  item,
  sectionKey,
  sectionIcon,
}: HistoryCardProps) {
  const yearLabel =
    item.year === null || item.year === undefined
      ? "سالانه"
      : toPersianDigits(item.year);
  const categoryLabel =
    CATEGORY_FA[item.category ?? ""] ?? item.category ?? "";
  const importanceLabel = IMPORTANCE_FA[item.importance ?? ""] ?? "";

  let importanceClass = "tag-blue";
  if (item.importance === "very_high" || item.importance === "high") {
    importanceClass = "tag-gold";
  } else if (item.importance === "low") {
    importanceClass = "tag-cyan";
  }

  return (
    <article className={`card ${sectionKey}`}>
      <div className="card-meta">
        <span className="year-badge">{yearLabel}</span>
        {categoryLabel && (
          <span
            className={`tag ${CATEGORY_CLASS[item.category ?? ""] ?? "tag-blue"}`}
          >
            {categoryLabel}
          </span>
        )}
        {importanceLabel && (
          <span className={`tag ${importanceClass}`}>{importanceLabel}</span>
        )}
      </div>
      <h3 className="card-title">
        {sectionIcon} {item.title ?? ""}
        {item.title_en && (
          <span className="card-title-en">{item.title_en}</span>
        )}
      </h3>
      {item.description && <p className="card-desc">{item.description}</p>}
      {item.official_status && (
        <div className="card-extra">
          <strong>وضعیت رسمی:</strong> {item.official_status}
        </div>
      )}
    </article>
  );
}
