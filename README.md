# LinguaAI — Interactive Language Learning Tutor

An AI-powered language tutor built with a plain HTML/CSS/JS frontend and a Vercel serverless function as a secure API proxy.

#URL : https://language-tutor-beryl.vercel.app/

## Features

- **6 languages**: English, Spanish, French, German, Japanese, Italian
- **Real-time AI tutor** powered by Claude Opus 4.6
- **Grammar & vocabulary feedback** in a live side panel
- **Proficiency detection**: beginner / intermediate / advanced
- **3–5 learning goals** that evolve with the conversation
- **Session progress tracking**: time, vocabulary learned, corrections, messages
- **Two modes**: Casual Chat and Structured Lesson
- **Mobile responsive** layout

## Project Structure

```
language_tutor/
├── index.html        # Frontend (all CSS and JS inline)
├── api/
│   └── chat.js       # Vercel serverless function (API proxy)
├── package.json      # Node.js dependencies
├── .env              # Local env variables (never commit!)
├── .gitignore
└── README.md
```

## Local Development

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or higher
- [Vercel CLI](https://vercel.com/docs/cli): `npm i -g vercel`
- An [Anthropic API key](https://console.anthropic.com/)

### Setup

1. Clone or download this repository.

2. Install dependencies:
   ```bash
   npm install
   ```

3. Add your API key to `.env`:
   ```
   ANTHROPIC_API_KEY=sk-ant-...your-key-here...
   ```

4. Start the local dev server with Vercel CLI:
   ```bash
   vercel dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Note:** `vercel dev` is required because it emulates the serverless function runtime locally. A plain static server won't run `api/chat.js`.

## Deployment to Vercel


## How It Works

```
Browser (index.html)
       │
       │  POST /api/chat
       │  { messages, language, mode }
       ▼
Vercel Serverless (api/chat.js)
       │
       │  Uses ANTHROPIC_API_KEY (secret)
       │  Calls Anthropic API (claude-opus-4-6)
       ▼
Response JSON:
  { reply, feedback, proficiency_level, learning_goals, encouragement }
       │
       ▼
Browser updates chat + feedback panel
```

The API key is **never exposed to the browser**. All Anthropic calls go through the serverless function.

## Security Notes

- `.env` is in `.gitignore` — never commit it.
- The serverless function validates that `ANTHROPIC_API_KEY` exists before making any API call.
- CORS headers are set to `*` for development convenience; restrict in production if needed.
