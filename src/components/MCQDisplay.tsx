import React, { useState, useEffect } from 'react';
import { Download, Copy, RefreshCw } from 'lucide-react';
import type { MCQQuestion } from '../types';

interface MCQDisplayProps {
  questions: MCQQuestion[];
  onRegenerate: () => void;
}

export function MCQDisplay({ questions, onRegenerate }: MCQDisplayProps) {
  // Track selected answers (key: question index, value: option index)
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});

  // Reset selections when new questions are loaded
  useEffect(() => {
    setSelectedAnswers({});
  }, [questions]);

  const handleExport = () => {
    const content = questions
      .map(
        (q, i) => `
Question ${i + 1}: ${q.question}

${q.options.map((opt, j) => `${String.fromCharCode(65 + j)}) ${opt}`).join('\n')}

Correct Answer: ${String.fromCharCode(65 + q.correctAnswer)}
${q.explanation ? `Explanation: ${q.explanation}` : ''}
`
      )
      .join('\n\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mcq-questions.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    const content = questions
      .map(
        (q, i) => `
Question ${i + 1}: ${q.question}

${q.options.map((opt, j) => `${String.fromCharCode(65 + j)}) ${opt}`).join('\n')}

Correct Answer: ${String.fromCharCode(65 + q.correctAnswer)}
${q.explanation ? `Explanation: ${q.explanation}` : ''}
`
      )
      .join('\n\n');
    navigator.clipboard.writeText(content);
  };

  // Determine CSS class for each option
  const getOptionClass = (qIndex: number, oIndex: number, correctAnswer: number): string => {
    const selected = selectedAnswers[qIndex];
    if (selected === undefined) {
      // No answer selected yet: neutral style
      return 'bg-gray-50 border border-gray-200 hover:bg-gray-100 cursor-pointer';
    }
    // If this option is the one selected by the user:
    if (selected === oIndex) {
      // If selected answer is correct, make it green; if wrong, make it red.
      return selected === correctAnswer
        ? 'bg-green-50 border-2 border-green-500'
        : 'bg-red-50 border-2 border-red-500';
    }
    // For other options:
    // If the user selected an incorrect answer and this is the correct one, highlight it in green.
    if (selected !== correctAnswer && oIndex === correctAnswer) {
      return 'bg-green-50 border-2 border-green-500';
    }
    // Otherwise, remain neutral.
    return 'bg-gray-50 border border-gray-200';
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Generated Questions</h2>
        <div className="flex space-x-2">
          <button
            onClick={handleCopy}
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </button>
          <button
            onClick={handleExport}
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button
            onClick={onRegenerate}
            className="flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Regenerate
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {qIndex + 1}. {q.question}
            </h3>
            <div className="space-y-2">
              {q.options.map((option, oIndex) => (
                <div
                  key={oIndex}
                  onClick={() => {
                    // Allow click only if no answer has been selected yet for this question.
                    if (selectedAnswers[qIndex] === undefined) {
                      setSelectedAnswers((prev) => ({ ...prev, [qIndex]: oIndex }));
                    }
                  }}
                  className={`p-3 rounded-lg ${getOptionClass(qIndex, oIndex, q.correctAnswer)}`}
                >
                  <span className="font-medium mr-2">{String.fromCharCode(65 + oIndex)}.</span>
                  {option}
                </div>
              ))}
            </div>
            {/* Show explanation only after an answer is selected */}
            {selectedAnswers[qIndex] !== undefined && q.explanation && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <span className="font-medium">Explanation: </span>
                  {q.explanation}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
