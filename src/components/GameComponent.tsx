import React, { useEffect, useState, useRef, useCallback } from 'react';
import { PitchDetector, noteFromPitch, isNoteMatch } from '@/utils/pitchDetector';
import { useStore } from '@/lib/store';

const GameComponent: React.FC = () => {
  const {
    score,
    streak,
    currentNote,
    difficulty,
    subscriptionTier,
    soundEnabled,
    tipEnabled,
    incrementScore,
    incrementStreak,
    resetStreak,
    setCurrentNote,
  } = useStore();

  const [isInitialized, setIsInitialized] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const pitchDetectorRef = useRef<PitchDetector | null>(null);

  // Available notes based on difficulty and subscription
  const getNotePool = useCallback(() => {
    if (subscriptionTier === 'free') {
      return ['E4', 'B3', 'G3']; // Free tier: Only 3 notes
    }

    switch (difficulty) {
      case 'beginner':
        return ['E4', 'B3', 'G3', 'D3', 'A2', 'E2']; // Open strings
      case 'intermediate':
        return [
          'E4', 'F4', 'F#4', 'G4', 'G#4',
          'B3', 'C4', 'C#4', 'D4', 'D#4',
          'G3', 'G#3', 'A3', 'A#3',
          'D3', 'D#3', 'E3', 'F3', 'F#3',
          'A2', 'A#2', 'B2', 'C3', 'C#3',
          'E2', 'F2', 'F#2', 'G2', 'G#2',
        ];
      case 'advanced':
        return [
          'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 'C5',
          'B3', 'C4', 'C#4', 'D4', 'D#4',
          'G3', 'G#3', 'A3', 'A#3',
          'D3', 'D#3', 'E3', 'F3', 'F#3',
          'A2', 'A#2', 'B2', 'C3', 'C#3',
          'E2', 'F2', 'F#2', 'G2', 'G#2',
        ];
      default:
        return ['E4', 'B3', 'G3'];
    }
  }, [difficulty, subscriptionTier]);

  const generateNewNote = useCallback(() => {
    const notePool = getNotePool();
    const newNote = notePool[Math.floor(Math.random() * notePool.length)];
    setCurrentNote(newNote);
  }, [getNotePool, setCurrentNote]);

  const handlePitchDetected = useCallback((frequency: number | null) => {
    if (!frequency || !currentNote) return;

    const detectedNote = noteFromPitch(frequency);
    if (isNoteMatch(detectedNote, currentNote)) {
      if (soundEnabled) {
        const audio = new Audio('/sounds/success.mp3');
        audio.play();
      }
      setIsCorrect(true);
      incrementScore();
      incrementStreak();
      generateNewNote();
      setMessage('Correct! 🎸');
      setTimeout(() => setIsCorrect(null), 1000);
    } else {
      setIsCorrect(false);
      resetStreak();
      setMessage('Try again! 🎵');
      if (soundEnabled) {
        const audio = new Audio('/sounds/error.mp3');
        audio.play();
      }
      setTimeout(() => setIsCorrect(null), 1000);
    }
  }, [currentNote, soundEnabled, incrementScore, incrementStreak, resetStreak, generateNewNote]);

  useEffect(() => {
    const initializePitchDetector = async () => {
      try {
        pitchDetectorRef.current = new PitchDetector();
        await pitchDetectorRef.current.init();
        pitchDetectorRef.current.start(handlePitchDetected);
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize pitch detector:', error);
        setMessage('Please allow microphone access to play');
      }
    };

    initializePitchDetector();

    return () => {
      if (pitchDetectorRef.current) {
        pitchDetectorRef.current.stop();
      }
    };
  }, [handlePitchDetected]);

  useEffect(() => {
    if (isInitialized && !currentNote) {
      generateNewNote();
    }
  }, [isInitialized, currentNote, generateNewNote]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fef6e4] p-4">
      <div className="neo-brutalism-card bg-[#f3d2c1] max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="neo-brutalism-header">Play this note:</h2>
          <div className={`text-6xl font-black mb-4 transition-colors ${
            isCorrect === true ? 'text-green-600' :
            isCorrect === false ? 'text-red-600' :
            'text-black'
          }`}>
            {currentNote}
          </div>
          <p className="text-lg font-bold text-black">{message}</p>
        </div>

        <div className="flex justify-between text-lg mb-6">
          <div className="neo-brutalism-badge bg-[#8bd3dd]">
            Score: <span className="font-black">{score}</span>
          </div>
          <div className="neo-brutalism-badge bg-[#f582ae]">
            Streak: <span className="font-black">{streak}</span>
          </div>
        </div>

        {tipEnabled && (
          <div className="neo-brutalism bg-yellow-300 p-4 mt-4">
            <p className="text-sm font-bold text-black">
              Tip: {currentNote} can be found on the {
                currentNote?.includes('E4') ? '1st string (thinnest)' :
                currentNote?.includes('B3') ? '2nd string' :
                currentNote?.includes('G3') ? '3rd string' :
                currentNote?.includes('D3') ? '4th string' :
                currentNote?.includes('A2') ? '5th string' :
                '6th string (thickest)'
              }
            </p>
          </div>
        )}

        {subscriptionTier === 'free' && score >= 10 && (
          <div className="neo-brutalism bg-[#8bd3dd] p-4 mt-4">
            <p className="text-sm font-bold text-black">
              🌟 Unlock all notes and features with a subscription! 🌟
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameComponent; 