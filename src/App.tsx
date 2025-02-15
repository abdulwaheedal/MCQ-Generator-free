import React, { useState } from 'react';
import { Brain } from 'lucide-react';
import { InputSection } from './components/InputSection';
import { SettingsPanel } from './components/SettingsPanel';
import { MCQDisplay } from './components/MCQDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { generateMCQs } from './lib/openai';
import { processFile, fetchUrlContent } from './lib/fileProcessor';
import type { InputMethod, MCQSettings, MCQQuestion } from './types';

function App() {
  const [settings, setSettings] = useState<MCQSettings>({
    questionCount: 10,
    difficulty: 'Medium',
    includeExplanations: true,
  });

  const [questions, setQuestions] = useState<MCQQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastInput, setLastInput] = useState<InputMethod | null>(null);

  const handleInputSubmit = async (input: InputMethod) => {
    setError(null);
    setLoading(true);
    setLastInput(input);

    try {
      let content = '';

      // Process input based on type
      switch (input.type) {
        case 'text':
          if (input.content.length < 100) {
            throw new Error('Please provide at least 100 characters of text.');
          }
          content = input.content;
          break;

        case 'file':
          const file = (document.getElementById('file-upload') as HTMLInputElement)
            ?.files?.[0];
          if (!file) throw new Error('No file selected');
          content = await processFile(file);
          break;

        case 'url':
          if (!input.content) throw new Error('Please enter a valid URL');
          content = await fetchUrlContent(input.content);
          break;

        default:
          throw new Error('Invalid input type');
      }

      const generatedQuestions = await generateMCQs(
        content,
        settings.questionCount,
        settings.difficulty,
        settings.includeExplanations
      );

      setQuestions(generatedQuestions);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = () => {
    if (lastInput) {
      handleInputSubmit(lastInput);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Brain className="w-8 h-8 text-blue-500 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">AI MCQ Generator</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Generate Multiple Choice Questions
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Transform any text into a set of multiple-choice questions using AI.
              Perfect for teachers, students, and content creators.
            </p>
          </div>

          {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}

          <InputSection onInputSubmit={handleInputSubmit} />
          <SettingsPanel settings={settings} onSettingsChange={setSettings} />

          {loading && <LoadingSpinner />}

          {!loading && questions.length > 0 && (
            <MCQDisplay questions={questions} onRegenerate={handleRegenerate} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;