import Head from 'next/head';
import TutorApp from '../components/TutorApp';

export default function Home() {
  return (
    <>
      <Head>
        <title>LinguaAI — Interactive Language Tutor</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
      </Head>
      <TutorApp />
    </>
  );
}
