'use client';

import { useStore } from '@/lib/store';
import type { Difficulty } from '@/lib/store';

export default function SettingsPage() {
  const {
    difficulty,
    soundEnabled,
    tipEnabled,
    subscriptionTier,
    setDifficulty,
    setSoundEnabled,
    setTipEnabled,
  } = useStore();

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    if (subscriptionTier === 'free' && newDifficulty !== 'beginner') {
      alert('Please subscribe to access additional difficulty levels!');
      return;
    }
    setDifficulty(newDifficulty);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-purple-100 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Settings</h1>

        {/* Difficulty Settings */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Difficulty</h2>
          <div className="space-y-2">
            <button
              onClick={() => handleDifficultyChange('beginner')}
              className={`w-full text-left p-3 rounded-lg ${
                difficulty === 'beginner'
                  ? 'bg-blue-100 text-blue-800'
                  : 'hover:bg-gray-100'
              }`}
            >
              Beginner (Open Strings)
            </button>
            <button
              onClick={() => handleDifficultyChange('intermediate')}
              className={`w-full text-left p-3 rounded-lg ${
                difficulty === 'intermediate'
                  ? 'bg-blue-100 text-blue-800'
                  : 'hover:bg-gray-100'
              } ${subscriptionTier === 'free' ? 'opacity-50' : ''}`}
            >
              Intermediate (Frets 1-5)
              {subscriptionTier === 'free' && (
                <span className="text-yellow-600 ml-2">🔒</span>
              )}
            </button>
            <button
              onClick={() => handleDifficultyChange('advanced')}
              className={`w-full text-left p-3 rounded-lg ${
                difficulty === 'advanced'
                  ? 'bg-blue-100 text-blue-800'
                  : 'hover:bg-gray-100'
              } ${subscriptionTier === 'free' ? 'opacity-50' : ''}`}
            >
              Advanced (All Frets)
              {subscriptionTier === 'free' && (
                <span className="text-yellow-600 ml-2">🔒</span>
              )}
            </button>
          </div>
        </div>

        {/* Sound Settings */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Sound</h2>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={soundEnabled}
              onChange={(e) => setSoundEnabled(e.target.checked)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span>Enable sound effects</span>
          </label>
        </div>

        {/* Tips Settings */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Tips</h2>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={tipEnabled}
              onChange={(e) => setTipEnabled(e.target.checked)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span>Show helpful tips</span>
          </label>
        </div>

        {subscriptionTier === 'free' && (
          <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-800">
              🌟 Subscribe to unlock all difficulty levels and features!
            </p>
          </div>
        )}
      </div>
    </main>
  );
} 