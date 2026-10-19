export default function PendingDayNotice() {
  return (
    <aside className="note-card" role="status">
      <div className="note-icon">📚</div>
      <p>
        هنوز داده‌ای برای این روز اضافه نشده است. پس از افزودن فایل روزانه به
        پوشهٔ <code dir="ltr">data</code>، این صفحه به‌طور خودکار نمایش داده
        خواهد شد.
      </p>
    </aside>
  );
}
