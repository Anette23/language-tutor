export default function CorrectionsCard({ corrections }) {
  if (!corrections || corrections.length === 0) return null;

  return (
    <div className="feedback-card">
      <div className="card-header">
        <span className="card-icon">✏️</span>
        <h3>Corrections</h3>
      </div>
      {corrections.map((c, i) => (
        <div key={i} className="correction-item flash-new">
          <div className="correction-original">✗ {c.original}</div>
          <div className="correction-corrected">✓ {c.corrected}</div>
          <div className="correction-explanation">{c.explanation}</div>
        </div>
      ))}
    </div>
  );
}
