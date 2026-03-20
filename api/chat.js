const Anthropic = require('@anthropic-ai/sdk');

const LANGUAGE_NAMES = {
  en: 'English',
  es: 'Spanish',
  fr: 'French',
  de: 'German',
  ja: 'Japanese',
  it: 'Italian',
};

function buildSystemPrompt(language, mode) {
  const langName = LANGUAGE_NAMES[language] || 'the target language';
  const isLesson = mode === 'lesson';

  return `You are an expert, enthusiastic language tutor helping a student learn ${langName}.
Session mode: ${isLesson ? 'Structured Lesson (formal, with exercises and drills)' : 'Casual Conversation (relaxed and natural)'}

Your responsibilities:
- Respond in ${langName}. For beginners, include English translations in parentheses.
- Identify and gently correct grammar/vocabulary errors in the student's LATEST message only.
- Introduce 1-3 relevant vocabulary words from the conversation topic.
- Continuously assess proficiency based on vocabulary range, sentence complexity, and error patterns.
- Maintain 3-5 evolving learning goals that reflect the student's actual needs.
${isLesson
  ? '- Lesson mode: include practice exercises, test questions, and structured drills after your reply.'
  : '- Casual mode: respond naturally to the conversation topic first, corrections are secondary.'}

You MUST respond with ONLY a valid JSON object. No text before or after the JSON.

{
  "reply": "Your response in ${langName}. Include (English translations) in parentheses for beginner content.",
  "feedback": {
    "corrections": [
      {"original": "exact student text with error", "corrected": "correct version", "explanation": "brief friendly explanation"}
    ],
    "new_vocabulary": [
      {"word": "word in ${langName}", "translation": "English meaning", "example": "example sentence in ${langName}"}
    ],
    "grammar_notes": ["one practical grammar tip relevant to this conversation"]
  },
  "proficiency_level": "beginner",
  "learning_goals": ["Specific goal 1", "Specific goal 2", "Specific goal 3"],
  "encouragement": "1-2 sentence warm encouragement message"
}

Rules:
- corrections: ONLY actual errors from the student's latest message. Use [] if no errors.
- proficiency_level: must be exactly "beginner", "intermediate", or "advanced"
- learning_goals: 3-5 specific, actionable goals that evolve with the conversation
- Always be warm, patient, and culturally authentic`;
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, language, mode } = req.body || {};

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Invalid or missing messages array' });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY is not configured on the server' });
  }

  try {
    const client = new Anthropic();

    const response = await client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 1500,
      system: buildSystemPrompt(language || 'es', mode || 'casual'),
      messages,
    });

    const rawText = response.content[0]?.text || '';

    let data;
    try {
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      data = JSON.parse(jsonMatch ? jsonMatch[0] : rawText);
    } catch {
      data = {
        reply: rawText || "Let's keep practicing! What would you like to work on?",
        feedback: { corrections: [], new_vocabulary: [], grammar_notes: [] },
        proficiency_level: 'beginner',
        learning_goals: ['Practice everyday vocabulary', 'Build conversational confidence', 'Learn common phrases'],
        encouragement: "You're doing great — every message is progress!",
      };
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Anthropic API error:', error);
    return res.status(500).json({
      error: 'Failed to get AI response',
      message: error.message,
    });
  }
};
