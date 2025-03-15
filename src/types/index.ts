export interface User {
  id: string;
  username: string;
  coins: number;
  treeProgress: number;
  completedQuizzes: string[];
  completedArticles: string[];
  joinedSessions: string[];
}

export interface TreeState {
  health: number;
  level: number;
  color: string;
  size: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  reward: number;
  questions: Array<{
    question: string;
    options: string[];
    correctAnswer: number;
  }>;
}