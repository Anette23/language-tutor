import { STARTER_GOALS } from '../../lib/constants';

export default function GoalsCard({ goals, language }) {
  const displayGoals = goals && goals.length > 0 ? goals : null;

  return (
    <div className="feedback-card">
      <div className="card-header">
        <span className="card-icon">✅</span>
        <h3>Learning Goals</h3>
      </div>
      <ul className="goals-list">
        {displayGoals
          ? displayGoals.map((goal, i) => (
              <li key={i} className="goal-item">{goal}</li>
            ))
          : <li className="goal-placeholder">Goals will appear after your first message…</li>
        }
      </ul>
    </div>
  );
}
