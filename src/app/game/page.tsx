'use client';

import dynamic from 'next/dynamic';

// Dynamically import GameComponent with no SSR since it uses browser APIs
const GameComponent = dynamic(
  () => import('@/components/GameComponent'),
  { ssr: false }
);

export default function GamePage() {
  return <GameComponent />;
} 