import { useCallback, useEffect, useRef } from 'react';
import { useStore } from '@/lib/store';

interface AudioFiles {
  success: string;
  error: string;
}

const AUDIO_FILES: AudioFiles = {
  success: '/sounds/success.mp3',
  error: '/sounds/error.mp3',
};

export const useAudioFeedback = () => {
  const { soundEnabled } = useStore();
  const audioRefs = useRef<{ [K in keyof AudioFiles]?: HTMLAudioElement }>({});

  useEffect(() => {
    // Preload audio files
    Object.entries(AUDIO_FILES).forEach(([key, src]) => {
      const audio = new Audio(src);
      audio.preload = 'auto';
      audioRefs.current[key as keyof AudioFiles] = audio;
    });

    return () => {
      // Cleanup audio elements
      Object.values(audioRefs.current).forEach(audio => {
        if (audio) {
          audio.pause();
          audio.src = '';
        }
      });
      audioRefs.current = {};
    };
  }, []);

  const playSound = useCallback((type: keyof AudioFiles) => {
    if (!soundEnabled) return;

    const audio = audioRefs.current[type];
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(error => {
        console.error('Error playing audio:', error);
      });
    }
  }, [soundEnabled]);

  return {
    playSuccess: () => playSound('success'),
    playError: () => playSound('error'),
  };
}; 