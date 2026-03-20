import { LANGUAGES } from '../lib/constants';

export default function Header({ language, mode, onLanguageChange, onModeChange }) {
  return (
    <header className="header">
      <div className="header-brand">
        <span className="logo">🌐</span>
        <div>
          <h1 className="brand-name">LinguaAI</h1>
          <p className="brand-subtitle">Your Personal Language Tutor</p>
        </div>
      </div>
      <div className="header-controls">
        <select
          className="language-select"
          value={language}
          onChange={e => onLanguageChange(e.target.value)}
        >
          {Object.entries(LANGUAGES).map(([code, { flag, name }]) => (
            <option key={code} value={code}>{flag} {name}</option>
          ))}
        </select>
        <div className="mode-toggle">
          <button
            className={`mode-btn${mode === 'casual' ? ' active' : ''}`}
            onClick={() => onModeChange('casual')}
          >
            💬 Casual
          </button>
          <button
            className={`mode-btn${mode === 'lesson' ? ' active' : ''}`}
            onClick={() => onModeChange('lesson')}
          >
            📚 Lesson
          </button>
        </div>
      </div>
    </header>
  );
}
