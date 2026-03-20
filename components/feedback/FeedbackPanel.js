import ProficiencyCard from './ProficiencyCard';
import StatsCard from './StatsCard';
import GoalsCard from './GoalsCard';
import CorrectionsCard from './CorrectionsCard';
import VocabularyCard from './VocabularyCard';
import GrammarCard from './GrammarCard';
import EncouragementCard from './EncouragementCard';
import LessonTopicPicker from './LessonTopicPicker';

export default function FeedbackPanel({ proficiency, stats, elapsedSeconds, feedback, language, mode, activeTopic, onTopicSelect }) {
  return (
    <div className="feedback-panel">
      {mode === 'lesson' && (
        <LessonTopicPicker activeTopic={activeTopic} onTopicSelect={onTopicSelect} />
      )}
      <ProficiencyCard proficiency={proficiency} />
      <StatsCard
        elapsedSeconds={elapsedSeconds}
        vocabCount={stats.vocabLearned.size}
        correctionCount={stats.corrections}
        messageCount={stats.messages}
      />
      <GoalsCard goals={feedback.goals} language={language} />
      <CorrectionsCard corrections={feedback.corrections} />
      <VocabularyCard vocab={feedback.vocab} />
      <GrammarCard grammarNotes={feedback.grammarNotes} />
      <EncouragementCard encouragement={feedback.encouragement} />
    </div>
  );
}
