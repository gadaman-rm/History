import { NextResponse } from "next/server";
import { getDayData, parseDaySlug } from "../../../../lib/day";

type DayApiContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, { params }: DayApiContext) {
  const { slug } = await params;
  const route = parseDaySlug(slug);

  if (!route) {
    return NextResponse.json(
      { error: "Invalid day slug. Use the format d-mmm-yyyy." },
      { status: 400 },
    );
  }

  const data = await getDayData(route);
  if (!data) {
    return NextResponse.json(
      { error: "No data has been added for this day yet.", date: route.isoDate },
      { status: 404 },
    );
  }

  return NextResponse.json(data);
}
