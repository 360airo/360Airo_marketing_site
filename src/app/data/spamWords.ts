export type SpamWord = {
  word: string;
  category: string;
  severity: 'high' | 'medium' | 'low';
  score?: number;
};

export const SPAM_WORDS: SpamWord[] = [
  { word: 'free', category: 'promotional', severity: 'high', score: 5 },
  { word: 'winner', category: 'promotional', severity: 'high', score: 5 },
  { word: 'click here', category: 'call to action', severity: 'medium', score: 3 },
  { word: 'act now', category: 'urgency', severity: 'medium', score: 3 },
  { word: 'limited time', category: 'urgency', severity: 'low', score: 2 },
];
