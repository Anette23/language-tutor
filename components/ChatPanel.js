import { useEffect } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import ChatInput from './ChatInput';

export default function ChatPanel({ messages, isTyping, isLoading, mode, onSend, chatEndRef, textareaRef }) {
  // Scroll to bottom whenever messages change or typing indicator appears
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, chatEndRef]);

  return (
    <div className="chat-panel">
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <MessageBubble key={i} role={msg.role} text={msg.text} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={chatEndRef} />
      </div>
      <ChatInput
        isLoading={isLoading}
        mode={mode}
        onSend={onSend}
        textareaRef={textareaRef}
      />
    </div>
  );
}
