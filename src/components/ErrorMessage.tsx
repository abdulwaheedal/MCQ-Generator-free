import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onDismiss: () => void;
}

export function ErrorMessage({ message, onDismiss }: ErrorMessageProps) {
  return (
    <div className="w-full max-w-2xl bg-red-50 border border-red-200 rounded-lg p-4">
      <div className="flex">
        <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
        <div className="flex-1">
          <p className="text-sm text-red-800">{message}</p>
        </div>
        <button
          onClick={onDismiss}
          className="text-red-500 hover:text-red-600"
        >
          ×
        </button>
      </div>
    </div>
  );
}