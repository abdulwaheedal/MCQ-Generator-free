export interface MCQSettings {
  questionCount: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  includeExplanations: boolean;
}

export interface MCQQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface InputMethod {
  type: 'text' | 'file' | 'url';
  content: string;
}