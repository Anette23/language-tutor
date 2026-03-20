import ProficiencyCard from './ProficiencyCard';
import StatsCard from './StatsCard';
import GoalsCard from './GoalsCard';
import CorrectionsCard from './CorrectionsCard';
import VocabularyCard from './VocabularyCard';
import GrammarCard from './GrammarCard';
import EncouragementCard from './EncouragementCard';

export default function FeedbackPanel({ proficiency, stats, elapsedSeconds, feedback, language }) {
  return (
    <div className="feedback-panel">
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
