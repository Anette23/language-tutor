import { formatText } from '../lib/utils';

export default function MessageBubble({ role, text }) {
  return (
    <div className={`message ${role}`}>
      <div className="message-avatar">{role === 'assistant' ? '🤖' : '👤'}</div>
      {/* formatText escapes HTML before adding <strong>/<em>/<br> — XSS-safe */}
      <div
        className="message-bubble"
        dangerouslySetInnerHTML={{ __html: formatText(text) }}
      />
    </div>
  );
}
