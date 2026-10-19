export type HistoryDate = {
  day?: number;
  month?: string | number;
  year?: number;
};

export type HistoryItem = {
  id?: string;
  year?: number | null;
  title?: string;
  title_en?: string;
  category?: string;
  importance?: string;
  description?: string;
  official_status?: string;
};

export type HistoryMetadata = {
  title?: string;
  source?: string;
  description?: string;
  note?: string;
  editorial_notes?: string[];
};

export type HistoryData = {
  metadata?: HistoryMetadata;
  gregorian_date?: HistoryDate;
  solar_hijri_date?: HistoryDate;
  weekday?: string;
  events?: HistoryItem[];
  births?: HistoryItem[];
  deaths?: HistoryItem[];
  observances?: HistoryItem[];
};

const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

export function toPersianDigits(value: string | number | null | undefined) {
  if (value === null || value === undefined) return "";
  return String(value).replace(/\d/g, (digit) => PERSIAN_DIGITS[Number(digit)]);
}

export const WEEKDAY_FA: Record<string, string> = {
  Sunday: "یکشنبه",
  Monday: "دوشنبه",
  Tuesday: "سه‌شنبه",
  Wednesday: "چهارشنبه",
  Thursday: "پنجشنبه",
  Friday: "جمعه",
  Saturday: "شنبه",
};

export const MONTH_FA: Record<string, string> = {
  Farvardin: "فروردین",
  Ordibehesht: "اردیبهشت",
  Khordad: "خرداد",
  Tir: "تیر",
  Mordad: "مرداد",
  Shahrivar: "شهریور",
  Mehr: "مهر",
  Aban: "آبان",
  Azar: "آذر",
  Dey: "دی",
  Bahman: "بهمن",
  Esfand: "اسفند",
};

export const IMPORTANCE_FA: Record<string, string> = {
  low: "اهمیت پایین",
  medium: "اهمیت متوسط",
  high: "اهمیت بالا",
  very_high: "اهمیت بسیار بالا",
};

export const CATEGORY_FA: Record<string, string> = {
  ancient_history: "تاریخ باستان",
  medieval_history: "تاریخ قرون وسطی",
  religious_history: "تاریخ مذهبی",
  art_history: "تاریخ هنر",
  exploration_history: "تاریخ اکتشافات",
  natural_disaster: "بلای طبیعی",
  disaster: "فاجعه",
  political_history: "تاریخ سیاسی",
  political_thought: "اندیشه سیاسی",
  social_history: "تاریخ اجتماعی",
  military_history: "تاریخ نظامی",
  science_history: "تاریخ علم",
  sports_history: "تاریخ ورزش",
  engineering_history: "تاریخ مهندسی",
  cultural_history: "تاریخ فرهنگی",
  economic_history: "تاریخ اقتصادی",
  birth: "زادروز",
  death: "درگذشت",
  religious_observance: "مناسبت مذهبی",
  cultural_observance: "مناسبت فرهنگی",
  national_observance: "مناسبت ملی",
  regional_observance: "مناسبت منطقه‌ای",
  international_observance: "مناسبت بین‌المللی",
};

export const CATEGORY_CLASS: Record<string, string> = {
  ancient_history: "tag-cyan",
  medieval_history: "tag-blue",
  religious_history: "tag-purple",
  art_history: "tag-gold",
  exploration_history: "tag-cyan",
  natural_disaster: "tag-rose",
  disaster: "tag-rose",
  political_history: "tag-blue",
  political_thought: "tag-blue",
  social_history: "tag-green",
  military_history: "tag-rose",
  science_history: "tag-cyan",
  sports_history: "tag-green",
  engineering_history: "tag-cyan",
  cultural_history: "tag-gold",
  economic_history: "tag-green",
  religious_observance: "tag-purple",
  cultural_observance: "tag-gold",
  national_observance: "tag-blue",
  regional_observance: "tag-green",
  international_observance: "tag-cyan",
};
