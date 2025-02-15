import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
  dangerouslyAllowBrowser: true,
  defaultHeaders: {
    'HTTP-Referer': window.location.href,
    'X-Title': 'AI MCQ Generator',
  },
});

// Helper function to replace smart quotes with standard quotes
function normalizeQuotes(str: string): string {
  return str.replace(/“/g, '"').replace(/”/g, '"').replace(/‘/g, "'").replace(/’/g, "'");
}

export async function generateMCQs(
  text: string,
  count: number,
  difficulty: string,
  includeExplanations: boolean
) {
  if (!text || text.length < 100) {
    throw new Error('Please provide at least 100 characters of text.');
  }
  if (count < 1 || count > 20) {
    throw new Error('Please select between 1 and 20 questions.');
  }

  const prompt = `Generate ${count} multiple choice questions from the following text:
${text}

Requirements:
- Difficulty level: ${difficulty}
- Each question must have exactly 4 options.
- Output exactly a valid JSON array. Each element in the array must be an object with exactly the following keys and no others:
  "question": string,
  "options": array of exactly 4 strings,
  "correctAnswer": a number between 0 and 3 (randomly chosen for each question)${includeExplanations ? ', "explanation": string' : ''}
- Do not output any additional text, comments, or formatting. The output must start with [ and end with ].
`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'deepseek/deepseek-r1:free',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 2000,
      presence_penalty: 0.2,
      frequency_penalty: 0.3,
    });

    console.log('Full AI Response:', completion);
    if (completion.error) {
      console.error('AI Service returned an error:', completion.error);
      throw new Error(
        `AI service error: ${completion.error.message || JSON.stringify(completion.error)}`
      );
    }

    const choices = completion.choices || completion.data?.choices;
    if (!choices || choices.length === 0) {
      console.error('AI response does not contain choices:', JSON.stringify(completion));
      throw new Error('No valid response from AI service');
    }

    let content = choices[0].message?.content;
    if (!content) {
      throw new Error('No response received from AI service');
    }

    // Remove markdown formatting (triple backticks) if present
    content = content.trim();
    if (content.startsWith('```')) {
      content = content.replace(/^```(json)?\s*/, '').replace(/```$/, '').trim();
    }

    // Normalize any smart quotes
    content = normalizeQuotes(content);

    try {
      const parsedContent = JSON.parse(content);
      if (!Array.isArray(parsedContent)) {
        throw new Error('Invalid response format: not an array');
      }
      // Validate each question
      parsedContent.forEach((question, index) => {
        if (
          typeof question.question !== 'string' ||
          !Array.isArray(question.options) ||
          question.options.length !== 4 ||
          typeof question.correctAnswer !== 'number' ||
          question.correctAnswer < 0 ||
          question.correctAnswer > 3 ||
          (includeExplanations && typeof question.explanation !== 'string')
        ) {
          throw new Error(`Invalid question format at index ${index}`);
        }
      });
      return parsedContent;
    } catch (parseError) {
      console.error('Failed to parse AI response:', content);
      throw new Error('Failed to parse AI response. Please try again.');
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('401')) {
        throw new Error('Authentication failed. Please check your API key.');
      }
      if (error.message.includes('429')) {
        throw new Error('Rate limit exceeded. Please try again in a few moments.');
      }
      throw new Error(error.message);
    }
    throw new Error('An unexpected error occurred. Please try again.');
  }
}
