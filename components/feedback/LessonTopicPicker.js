const TOPICS = [
  { emoji: '👋', label: 'Greetings' },
  { emoji: '👨‍👩‍👧', label: 'Family' },
  { emoji: '🍕', label: 'Food & Dining' },
  { emoji: '✈️', label: 'Travel' },
  { emoji: '🛍️', label: 'Shopping' },
  { emoji: '💼', label: 'Work & Jobs' },
  { emoji: '🏠', label: 'Home & Living' },
  { emoji: '⏰', label: 'Time & Dates' },
  { emoji: '🌤️', label: 'Weather' },
  { emoji: '🔢', label: 'Numbers' },
  { emoji: '📖', label: 'Past Tense' },
  { emoji: '🔮', label: 'Future Tense' },
];

export default function LessonTopicPicker({ activeTopic, onTopicSelect }) {
  return (
    <div className="feedback-card">
      <div className="card-header">
        <span className="card-icon">🗂️</span>
        <h3>Lesson Topics</h3>
      </div>
      <div className="lesson-topics-grid">
        {TOPICS.map(({ emoji, label }) => (
          <button
            key={label}
            className={`topic-btn${activeTopic === label ? ' active' : ''}`}
            onClick={() => onTopicSelect(label)}
          >
            {emoji} {label}
          </button>
        ))}
      </div>
    </div>
  );
}
