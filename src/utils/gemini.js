// Gemini Vision & Multimodal API Integration for CAT/XAT/GMAT Question Extraction & 4-Tier Solutions

const API_KEY_STORAGE = 'CATPREP_GEMINI_API_KEY';

export const getGeminiApiKey = () => {
  return localStorage.getItem(API_KEY_STORAGE) || '';
};

export const saveGeminiApiKey = (key) => {
  if (!key) {
    localStorage.removeItem(API_KEY_STORAGE);
  } else {
    localStorage.setItem(API_KEY_STORAGE, key.trim());
  }
};

export const testGeminiApiKey = async (apiKey) => {
  if (!apiKey) throw new Error('API key is empty');

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: 'Reply with the word "PONG" if you can hear me.' }]
        }
      ]
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error?.message || `HTTP ${response.status}: Failed to authenticate Gemini API`
    );
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  return text.trim();
};

export const analyzeQuestionScreenshot = async ({
  imageBase64,
  mimeType = 'image/png',
  questionHint = '',
  examId = 'cat'
}) => {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    throw new Error(
      'Gemini API key is not configured. Please open AI Settings to add your free key.'
    );
  }

  // Strip prefix if present in base64 data url
  const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z+]+;base64,/, '');

  const promptText = `
You are an expert 99.9+ percentile mentor for competitive management exams (CAT, XAT, GMAT Focus).
Analyze this question screenshot from an aptitude test mock or past paper.

Return a STRICT, RAW JSON object (no markdown code blocks, no backticks, no preamble) matching this schema:
{
  "sectionId": "qa" | "dilr" | "varc" | "xat-dm" | "xat-val" | "xat-qadi" | "gmat-qr" | "gmat-vr" | "gmat-di",
  "topicId": "matching topic id like qa-percentages, qa-timework, qa-algebra, dilr-arrangements, varc-parajumbles, etc.",
  "topicName": "Human readable topic name",
  "difficulty": "Easy" | "Moderate" | "Challenging",
  "type": "MCQ" | "TITA",
  "question": "The complete question statement with LaTeX math formatted inside single dollar signs for inline ($x^2$) and double dollar signs ($$\\\\frac{a}{b}$$) for block equations.",
  "options": ["Option A text", "Option B text", "Option C text", "Option D text"], // empty array if TITA
  "correctAnswer": 0, // 0-based index for MCQ, or string/number value if TITA
  "solution": {
    "coreConcept": "First principles, fundamental theorems, or core rules used.",
    "stepByStep": "Rigorous step-by-step mathematical or logical solution with KaTeX equations.",
    "shortcut": "Exam speed pro-shortcut: option elimination, extreme value substitutions, symmetry, or boundary checks.",
    "pitfalls": "Common misreadings, arithmetic trap options, or flawed assumptions to watch out for."
  }
}

Exam target context: ${examId.toUpperCase()}.
${questionHint ? `User notes/hints: ${questionHint}` : ''}
`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const requestBody = {
    contents: [
      {
        parts: [
          { text: promptText },
          {
            inlineData: {
              mimeType,
              data: cleanBase64
            }
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.1,
      responseMimeType: 'application/json'
    }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Gemini API Error (HTTP ${response.status})`);
  }

  const responseJson = await response.json();
  const rawContent = responseJson.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawContent) {
    throw new Error('Gemini returned an empty response. Please check image clarity.');
  }

  // Parse JSON, cleaning any stray markdown fences
  const cleanedText = rawContent
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/, '')
    .replace(/\s*```$/, '')
    .trim();

  try {
    const parsed = JSON.parse(cleanedText);
    return parsed;
  } catch (err) {
    console.error('Failed to parse Gemini output:', err, rawContent);
    throw new Error(
      'Failed to parse AI solution into structured question format. Raw response: ' +
        rawContent.slice(0, 150)
    );
  }
};
