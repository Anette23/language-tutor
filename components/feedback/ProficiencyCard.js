const LABELS = { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' };
const WIDTHS  = { beginner: '33%',      intermediate: '66%',          advanced: '100%' };

export default function ProficiencyCard({ proficiency }) {
  const label = proficiency ? (LABELS[proficiency] || proficiency) : 'Assessing…';
  const width = proficiency ? (WIDTHS[proficiency] || '33%') : '33%';
  const badgeClass = `proficiency-badge${proficiency ? ` ${proficiency}` : ''}`;

  return (
    <div className="feedback-card">
      <div className="card-header">
        <span className="card-icon">🎯</span>
        <h3>Proficiency Level</h3>
      </div>
      <div className="proficiency-display">
        <span className={badgeClass}>{label}</span>
        <div className="proficiency-bar">
          <div className="proficiency-fill" style={{ width }} />
        </div>
      </div>
    </div>
  );
}
