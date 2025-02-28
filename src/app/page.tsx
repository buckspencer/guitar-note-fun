'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <section className="neo-brutalism-card mb-12 bg-[#f3d2c1]">
        <h1 className="text-4xl font-bold text-black mb-4">
          Learn Guitar Notes the Fun Way! 🎸
        </h1>
        <p className="text-xl text-black mb-6">
          Master guitar notation through interactive games and instant feedback.
          Perfect for young musicians aged 6-12!
        </p>
        <Link
          href="/game"
          className="neo-brutalism-primary bg-[#f582ae] inline-block"
        >
          Start Playing Now!
        </Link>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="neo-brutalism-card bg-[#8bd3dd]">
          <h3 className="text-xl font-bold text-black mb-2">
            Instant Feedback
          </h3>
          <p className="text-black">
            Play a note and get immediate feedback with fun sounds and visuals
          </p>
        </div>

        <div className="neo-brutalism-card bg-[#f582ae]">
          <h3 className="text-xl font-bold text-black mb-2">
            Progress Tracking
          </h3>
          <p className="text-black">
            Track your scores and earn badges as you improve
          </p>
        </div>

        <div className="neo-brutalism-card bg-[#f3d2c1]">
          <h3 className="text-xl font-bold text-black mb-2">
            Multiple Levels
          </h3>
          <p className="text-black">
            Start with open strings and progress to full fretboard mastery
          </p>
        </div>
      </div>

      <footer className="mt-16 text-center">
        <p className="text-black">
          Need help? Check out our{" "}
          <Link href="/help" className="neo-brutalism-button bg-[#8bd3dd] inline-block">
            Help Center
          </Link>
        </p>
      </footer>
    </div>
  );
}
