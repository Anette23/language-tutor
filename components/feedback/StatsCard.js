import { formatTime } from '../../lib/utils';

export default function StatsCard({ elapsedSeconds, vocabCount, correctionCount, messageCount }) {
  return (
    <div className="feedback-card">
      <div className="card-header">
        <span className="card-icon">📊</span>
        <h3>Session Progress</h3>
      </div>
      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-value">{formatTime(elapsedSeconds)}</span>
          <span className="stat-label">Time</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{vocabCount}</span>
          <span className="stat-label">Words</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{correctionCount}</span>
          <span className="stat-label">Fixed</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{messageCount}</span>
          <span className="stat-label">Msgs</span>
        </div>
      </div>
    </div>
  );
}
