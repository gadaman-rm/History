import type { HistoryMetadata } from "../lib/history";

export default function EditorialNotes({
  metadata,
}: {
  metadata?: HistoryMetadata;
}) {
  if (!metadata) return null;

  const notes = metadata.editorial_notes ?? [];
  if (!notes.length && !metadata.note) return null;

  return (
    <div className="note-card">
      <div className="note-icon">📌</div>
      <div>
        <p>
          <strong>یادداشت تحریریه:</strong>
        </p>
        {metadata.note && (
          <p className="editorial-note">{metadata.note}</p>
        )}
        {notes.length > 0 && (
          <ul>
            {notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
