export default function EncouragementCard({ encouragement }) {
  if (!encouragement) return null;

  return (
    <div className="feedback-card encouragement-card">
      <div className="encouragement-text">{encouragement}</div>
    </div>
  );
}
