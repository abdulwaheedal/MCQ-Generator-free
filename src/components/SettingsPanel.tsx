import React from 'react';
import { Settings } from 'lucide-react';
import type { MCQSettings } from '../types';

interface SettingsPanelProps {
  settings: MCQSettings;
  onSettingsChange: (settings: MCQSettings) => void;
}

export function SettingsPanel({ settings, onSettingsChange }: SettingsPanelProps) {
  return (
    <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6 mt-6">
      <div className="flex items-center mb-4">
        <Settings className="w-5 h-5 mr-2 text-gray-600" />
        <h2 className="text-lg font-semibold">Generation Settings</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of Questions
          </label>
          <input
            type="number"
            min="5"
            max="20"
            value={settings.questionCount}
            onChange={(e) =>
              onSettingsChange({
                ...settings,
                questionCount: parseInt(e.target.value),
              })
            }
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Difficulty Level
          </label>
          <select
            value={settings.difficulty}
            onChange={(e) =>
              onSettingsChange({
                ...settings,
                difficulty: e.target.value as MCQSettings['difficulty'],
              })
            }
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="include-explanations"
            checked={settings.includeExplanations}
            onChange={(e) =>
              onSettingsChange({
                ...settings,
                includeExplanations: e.target.checked,
              })
            }
            className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            htmlFor="include-explanations"
            className="ml-2 block text-sm text-gray-700"
          >
            Include answer explanations
          </label>
        </div>
      </div>
    </div>
  );
}