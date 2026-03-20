export default function VocabularyCard({ vocab }) {
  if (!vocab || vocab.length === 0) return null;

  return (
    <div className="feedback-card">
      <div className="card-header">
        <span className="card-icon">📚</span>
        <h3>New Vocabulary</h3>
      </div>
      {vocab.map((v, i) => (
        <div key={i} className="vocab-item flash-new">
          <div className="vocab-word">{v.word}</div>
          <div className="vocab-translation">{v.translation}</div>
          {v.example && <div className="vocab-example">{v.example}</div>}
        </div>
      ))}
    </div>
  );
}
