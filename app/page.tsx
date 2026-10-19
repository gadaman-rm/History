import EditorialNotes from "../components/EditorialNotes";
import HistorySection from "../components/HistorySection";
import PageFooter from "../components/PageFooter";
import TimelineHero from "../components/TimelineHero";
import historyData from "../data/1_nov.json";
import type { HistoryData } from "../lib/history";

const data = historyData as HistoryData;

const sectionDetails = [
  {
    key: "events",
    title: "رویدادها",
    subtitle: "رویدادهای تاریخی ثبت‌شده برای این روز",
    icon: "📅",
  },
  {
    key: "births",
    title: "زادروزها",
    subtitle: "شخصیت‌هایی که در این روز متولد شده‌اند",
    icon: "🎂",
  },
  {
    key: "deaths",
    title: "درگذشت‌ها",
    subtitle: "شخصیت‌هایی که در این روز درگذشته‌اند",
    icon: "🕯️",
  },
  {
    key: "observances",
    title: "مناسبت‌ها",
    subtitle: "مناسبت‌ها، تعطیلات و یادبودهای این روز",
    icon: "🏛️",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <main>
        <TimelineHero data={data} />
        {sectionDetails.map((section) => (
          <HistorySection
            key={section.key}
            sectionKey={section.key}
            title={section.title}
            subtitle={section.subtitle}
            icon={section.icon}
            items={data[section.key] ?? []}
          />
        ))}
        <EditorialNotes metadata={data.metadata} />
      </main>
      <PageFooter
        date={data.gregorian_date}
        source={data.metadata?.source}
      />
    </>
  );
}
