import { create } from 'zustand';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type SubscriptionTier = 'free' | 'paid';

interface GameState {
  score: number;
  streak: number;
  currentNote: string;
  difficulty: Difficulty;
  subscriptionTier: SubscriptionTier;
  isPlaying: boolean;
  soundEnabled: boolean;
  tipEnabled: boolean;
  
  // Actions
  incrementScore: () => void;
  incrementStreak: () => void;
  resetStreak: () => void;
  setCurrentNote: (note: string) => void;
  setDifficulty: (difficulty: Difficulty) => void;
  setSubscriptionTier: (tier: SubscriptionTier) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setTipEnabled: (enabled: boolean) => void;
  resetGame: () => void;
}

export const useStore = create<GameState>((set) => ({
  score: 0,
  streak: 0,
  currentNote: 'E4', // Default to high E string
  difficulty: 'beginner',
  subscriptionTier: 'free',
  isPlaying: false,
  soundEnabled: true,
  tipEnabled: true,

  incrementScore: () => set((state) => ({ score: state.score + 1 })),
  incrementStreak: () => set((state) => ({ streak: state.streak + 1 })),
  resetStreak: () => set({ streak: 0 }),
  setCurrentNote: (note: string) => set({ currentNote: note }),
  setDifficulty: (difficulty: Difficulty) => set({ difficulty }),
  setSubscriptionTier: (tier: SubscriptionTier) => set({ subscriptionTier: tier }),
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
  setSoundEnabled: (enabled: boolean) => set({ soundEnabled: enabled }),
  setTipEnabled: (enabled: boolean) => set({ tipEnabled: enabled }),
  resetGame: () => set({ score: 0, streak: 0, isPlaying: false }),
})); 