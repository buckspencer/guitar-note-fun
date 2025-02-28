'use client';

import Link from 'next/link';
import { useState } from 'react';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "How do I tune my guitar?",
    answer: "Standard guitar tuning from thickest to thinnest string is: E2, A2, D3, G3, B3, E4. You can use a clip-on tuner or a tuning app to help you tune your guitar accurately."
  },
  {
    question: "Why isn't the microphone working?",
    answer: "Make sure you&apos;ve allowed microphone access in your browser settings. Click the lock icon in your browser\'s address bar and ensure microphone access is enabled for this site."
  },
  {
    question: "How do I read the note display?",
    answer: "The note name shows both the letter (A-G) and the octave number. For example, &apos;E4&apos; is the high E string (thinnest), while &apos;E2&apos; is the low E string (thickest)."
  },
  {
    question: "What's included in the free tier?",
    answer: "The free tier includes access to 3 basic notes (E4, B3, G3) and basic gameplay features. Subscribe to unlock all notes, difficulty levels, and additional features!"
  },
  {
    question: "Can I cancel my subscription?",
      answer: "Yes! You can cancel your subscription at any time from your profile page. You&apos;ll continue to have access until the end of your current billing period."
  }
];

export default function HelpPage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-purple-100 p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Help Center</h1>

        {/* Quick Start Guide */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quick Start Guide</h2>
          <div className="prose">
            <ol className="list-decimal list-inside space-y-2">
              <li>Allow microphone access when prompted</li>
              <li>Make sure your guitar is tuned</li>
              <li>Play the note shown on the screen</li>
              <li>Get instant feedback on your playing</li>
              <li>Build streaks and improve your skills!</li>
            </ol>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
                >
                  <span className="font-medium">{faq.question}</span>
                  <span className="text-xl">
                    {expandedIndex === index ? '−' : '+'}
                  </span>
                </button>
                {expandedIndex === index && (
                  <div className="p-4 bg-white">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Contact Support */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Still Need Help?</h2>
          <p className="text-gray-600 mb-4">
            We&apos;re here to help! Send us an email at support@guitarnotefun.com
          </p>
          <div className="flex space-x-4">
            <Link
              href="mailto:support@guitarnotefun.com"
              className="inline-block bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Email Support
            </Link>
            <Link
              href="/game"
              className="inline-block bg-gray-200 text-gray-800 font-semibold px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Back to Game
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
} 