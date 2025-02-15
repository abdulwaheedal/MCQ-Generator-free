import React, { useState } from 'react';
import { FileText, Link, Type } from 'lucide-react';
import type { InputMethod } from '../types';

interface InputSectionProps {
  onInputSubmit: (input: InputMethod) => void;
}

export function InputSection({ onInputSubmit }: InputSectionProps) {
  const [activeTab, setActiveTab] = useState<'text' | 'file' | 'url'>('text');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onInputSubmit({ type: activeTab, content });
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setActiveTab('text')}
          className={`flex items-center px-4 py-2 rounded-lg ${
            activeTab === 'text'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Type className="w-4 h-4 mr-2" />
          Text
        </button>
        <button
          onClick={() => setActiveTab('file')}
          className={`flex items-center px-4 py-2 rounded-lg ${
            activeTab === 'file'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <FileText className="w-4 h-4 mr-2" />
          File
        </button>
        <button
          onClick={() => setActiveTab('url')}
          className={`flex items-center px-4 py-2 rounded-lg ${
            activeTab === 'url'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Link className="w-4 h-4 mr-2" />
          URL
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {activeTab === 'text' && (
          <textarea
            className="w-full h-40 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Paste your text here (500-5000 characters)..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        )}

        {activeTab === 'file' && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              accept=".txt,.pdf,.docx"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  // TODO: Implement file processing
                  setContent(file.name);
                }
              }}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer text-blue-500 hover:text-blue-600"
            >
              <FileText className="w-8 h-8 mx-auto mb-2" />
              <p>Click to upload or drag and drop</p>
              <p className="text-sm text-gray-500">PDF, DOCX, TXT (max 10MB)</p>
            </label>
          </div>
        )}

        {activeTab === 'url' && (
          <input
            type="url"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter URL to extract content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Generate MCQs
          </button>
        </div>
      </form>
    </div>
  );
}