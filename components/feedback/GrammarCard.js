export default function GrammarCard({ grammarNotes }) {
  if (!grammarNotes || grammarNotes.length === 0) return null;

  return (
    <div className="feedback-card">
      <div className="card-header">
        <span className="card-icon">📖</span>
        <h3>Grammar Notes</h3>
      </div>
      {grammarNotes.map((note, i) => (
        <div key={i} className="grammar-note flash-new">{note}</div>
      ))}
    </div>
  );
}
