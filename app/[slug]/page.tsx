import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EditorialNotes from "../../components/EditorialNotes";
import HistorySection from "../../components/HistorySection";
import PageFooter from "../../components/PageFooter";
import TimelineHero from "../../components/TimelineHero";
import {
  getDayCalendar,
  getDayData,
  parseDaySlug,
} from "../../lib/day";
import {
  GREGORIAN_MONTH_FA,
  type HistoryData,
} from "../../lib/history";
import PendingDayNotice from "../../components/PendingDayNotice";

type DayPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

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

export async function generateMetadata({
  params,
}: DayPageProps): Promise<Metadata> {
  const { slug } = await params;
  const route = parseDaySlug(slug);
  if (!route) return { title: "تاریخ نامعتبر | تاریخ‌نگار" };

  const data = await getDayData(route);
  return {
    title:
      data?.metadata?.title ??
      `رویدادهای تاریخی ${route.day} ${GREGORIAN_MONTH_FA[route.month]} ${route.year} | تاریخ‌نگار`,
    description:
      data?.metadata?.description ??
      `رویدادها، زادروزها، درگذشت‌ها و مناسبت‌های ${route.isoDate}.`,
  };
}

export default async function DayPage({ params }: DayPageProps) {
  const { slug } = await params;
  const route = parseDaySlug(slug);
  if (!route) notFound();

  const data = await getDayData(route);
  const calendar = getDayCalendar(route);
  const pageData: HistoryData = data ?? {
    metadata: {
      date: route.isoDate,
      description: "رویدادها، زادروزها، درگذشت‌ها و مناسبت‌های این روز.",
    },
    gregorian_date: {
      day: route.day,
      month: route.month,
      year: route.year,
    },
    ...calendar,
  };

  return (
    <>
      <main>
        <TimelineHero data={pageData} />
        {!data && <PendingDayNotice />}
        {sectionDetails.map((section) => (
          <HistorySection
            key={section.key}
            sectionKey={section.key}
            title={section.title}
            subtitle={section.subtitle}
            icon={section.icon}
            items={pageData[section.key] ?? []}
          />
        ))}
        <EditorialNotes metadata={pageData.metadata} />
      </main>
      <PageFooter
        date={pageData.gregorian_date}
        source={pageData.metadata?.source}
      />
    </>
  );
}
