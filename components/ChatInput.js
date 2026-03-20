import { useState, useEffect } from 'react';

export default function ChatInput({ isLoading, mode, onSend, textareaRef }) {
  const [value, setValue] = useState('');

  // Auto-resize textarea whenever value changes
  useEffect(() => {
    const el = textareaRef?.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 120) + 'px';
  }, [value, textareaRef]);

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  function submit() {
    const text = value.trim();
    if (!text || isLoading) return;
    setValue('');
    onSend(text);
  }

  const placeholder = mode === 'lesson'
    ? 'Ask for a lesson, exercise, or practice drill…'
    : 'Type your message… (Enter to send)';

  return (
    <div className="chat-input-area">
      <textarea
        ref={textareaRef}
        className="chat-input"
        placeholder={placeholder}
        rows={1}
        value={value}
        disabled={isLoading}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className="send-btn"
        disabled={isLoading || !value.trim()}
        onClick={submit}
        title="Send message"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 2L11 13" /><path d="M22 2L15 22L11 13L2 9L22 2z" />
        </svg>
      </button>
    </div>
  );
}
