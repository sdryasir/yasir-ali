// app/api/generate-quiz/route.ts
import { NextResponse } from 'next/server';
import openai from '@/lib/openai';

export async function POST(req) {
  const { transcript, questionCount = 5 } = await req.json();

  if (!transcript) {
    return NextResponse.json({ error: 'Transcript is required' }, { status: 400 });
  }

  const prompt = `
    You are an AI tutor. Based on the following transcript, generate ${questionCount} multiple choice questions.
    Each question should have:
    - the question text,
    - 4 answer options (labeled A, B, C, D),
    - the correct option (e.g., "B").

    Format it as a JSON array like:
    [
      {
        "question": "What is...",
        "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
        "answer": "B"
      }
    ]

    Transcript:
    ${transcript}
  `;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });

  const quizText = response.choices[0].message.content;

  console.log("+++++++++++++++++++++", quizText);
  

  try {
    const quiz = JSON.parse(quizText);
    return NextResponse.json({ quiz });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to parse quiz JSON', raw: quizText }, { status: 500 });
  }
}
