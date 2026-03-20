import { useState, useEffect, useRef } from 'react';
import Header from './Header';
import ChatPanel from './ChatPanel';
import FeedbackPanel from './feedback/FeedbackPanel';
import { WELCOME_MESSAGES } from '../lib/constants';

const EMPTY_FEEDBACK = { corrections: [], vocab: [], grammarNotes: [], goals: [], encouragement: '' };
const EMPTY_STATS = () => ({ vocabLearned: new Set(), corrections: 0, messages: 0 });

export default function TutorApp() {
  const [language, setLanguage] = useState('es');
  const [mode, setMode] = useState('casual');
  const [messages, setMessages] = useState([{ role: 'assistant', text: WELCOME_MESSAGES['es'] }]);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [proficiency, setProficiency] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [feedback, setFeedback] = useState(EMPTY_FEEDBACK);
  const [stats, setStats] = useState(EMPTY_STATS());
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [activeTopic, setActiveTopic] = useState(null);

  const sessionStartRef = useRef(Date.now());
  const timerRef = useRef(null);
  const chatEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Start timer on mount
  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  function startTimer() {
    sessionStartRef.current = Date.now();
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - sessionStartRef.current) / 1000));
    }, 1000);
  }

  function handleLanguageChange(lang) {
    if (lang === language) return;
    setLanguage(lang);
    setMessages([{ role: 'assistant', text: WELCOME_MESSAGES[lang] || WELCOME_MESSAGES.en }]);
    setConversationHistory([]);
    setProficiency(null);
    setFeedback(EMPTY_FEEDBACK);
    setStats(EMPTY_STATS());
    setElapsedSeconds(0);
    setActiveTopic(null);
    sessionStartRef.current = Date.now();
  }

  function handleTopicSelect(topic) {
    setActiveTopic(topic);
    handleSend(`Let's do a lesson on "${topic}". Please start with the basics and give me some exercises.`);
  }

  async function handleSend(text) {
    if (!text || isLoading) return;

    const newHistory = [...conversationHistory, { role: 'user', content: text }];

    setMessages(prev => [...prev, { role: 'user', text }]);
    setConversationHistory(newHistory);
    setStats(prev => ({ ...prev, messages: prev.messages + 1 }));
    setIsLoading(true);
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newHistory, language, mode }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || `HTTP ${response.status}`);
      }

      const data = await response.json();

      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'assistant', text: data.reply || "Let's keep practicing!" }]);
      setConversationHistory(prev => [...prev, { role: 'assistant', content: data.reply || '' }]);

      if (data.proficiency_level) {
        setProficiency(data.proficiency_level.toLowerCase().trim());
      }

      const newVocab = data.feedback?.new_vocabulary || [];
      const newCorrections = data.feedback?.corrections || [];

      setFeedback({
        corrections: newCorrections,
        vocab: newVocab,
        grammarNotes: data.feedback?.grammar_notes || [],
        goals: data.learning_goals || [],
        encouragement: data.encouragement || '',
      });

      setStats(prev => {
        const vocabLearned = new Set(prev.vocabLearned);
        newVocab.forEach(v => v.word && vocabLearned.add(v.word));
        return {
          ...prev,
          vocabLearned,
          corrections: prev.corrections + newCorrections.length,
        };
      });

    } catch (err) {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: `⚠️ Something went wrong: ${err.message}. Please try again.`,
      }]);
      console.error('API error:', err);
    } finally {
      setIsLoading(false);
      textareaRef.current?.focus();
    }
  }

  return (
    <div className="app">
      <Header
        language={language}
        mode={mode}
        onLanguageChange={handleLanguageChange}
        onModeChange={setMode}
      />
      <main className="main">
        <ChatPanel
          messages={messages}
          isTyping={isTyping}
          isLoading={isLoading}
          mode={mode}
          onSend={handleSend}
          chatEndRef={chatEndRef}
          textareaRef={textareaRef}
        />
        <FeedbackPanel
          proficiency={proficiency}
          stats={stats}
          elapsedSeconds={elapsedSeconds}
          feedback={feedback}
          language={language}
          mode={mode}
          activeTopic={activeTopic}
          onTopicSelect={handleTopicSelect}
        />
      </main>
    </div>
  );
}
