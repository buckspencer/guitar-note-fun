'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';

export default function SubscribePage() {
  const router = useRouter();
  const { setSubscriptionTier } = useStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (plan: 'monthly' | 'yearly') => {
    setIsLoading(true);
    try {
      // Here we would normally create a checkout session with Stripe
      // For demo purposes, we'll just simulate the subscription
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubscriptionTier('paid');
      console.log(`Selected plan: ${plan}`);
      router.push('/game');
    } catch (error) {
      console.error('Subscription error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <section className="neo-brutalism-card mb-12 bg-[#f3d2c1]">
        <h1 className="text-4xl font-bold text-black mb-4">
          Choose Your Plan 🎸
        </h1>
        <p className="text-xl text-black mb-6">
          Unlock full access to all features and start mastering guitar notation today!
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Monthly Plan */}
        <div className="neo-brutalism-card bg-[#8bd3dd]">
          <h2 className="text-2xl font-bold text-black mb-4">Monthly</h2>
          <div className="text-4xl font-bold text-black mb-4">
            $2.99
            <span className="text-lg text-black/70">/month</span>
          </div>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center text-black">
              <span className="text-green-500 mr-2">✓</span>
              All guitar notes and frets
            </li>
            <li className="flex items-center text-black">
              <span className="text-green-500 mr-2">✓</span>
              Multiple difficulty levels
            </li>
            <li className="flex items-center text-black">
              <span className="text-green-500 mr-2">✓</span>
              Progress tracking
            </li>
            <li className="flex items-center text-black">
              <span className="text-green-500 mr-2">✓</span>
              Customizable settings
            </li>
          </ul>
          <button
            onClick={() => handleSubscribe('monthly')}
            disabled={isLoading}
            className="neo-brutalism-button bg-[#f582ae] w-full"
          >
            {isLoading ? 'Processing...' : 'Subscribe Monthly'}
          </button>
        </div>

        {/* Yearly Plan */}
        <div className="neo-brutalism-card bg-[#f582ae] relative">
          <div className="absolute -top-4 -right-4">
            <span className="neo-brutalism bg-yellow-300 px-4 py-1 text-black font-bold">
              BEST VALUE
            </span>
          </div>
          <h2 className="text-2xl font-bold text-black mb-4">Yearly</h2>
          <div className="text-4xl font-bold text-black mb-4">
            $29.99
            <span className="text-lg text-black/70">/year</span>
          </div>
          <div className="text-green-800 text-sm mb-4 font-bold">Save 17%</div>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center text-black">
              <span className="text-green-500 mr-2">✓</span>
              Everything in monthly
            </li>
            <li className="flex items-center text-black">
              <span className="text-green-500 mr-2">✓</span>
              Priority support
            </li>
            <li className="flex items-center text-black">
              <span className="text-green-500 mr-2">✓</span>
              Early access to new features
            </li>
          </ul>
          <button
            onClick={() => handleSubscribe('yearly')}
            disabled={isLoading}
            className="neo-brutalism-button bg-yellow-300 w-full"
          >
            {isLoading ? 'Processing...' : 'Subscribe Yearly'}
          </button>
        </div>
      </div>

      <footer className="mt-8 text-center">
        <p className="neo-brutalism-card bg-[#f3d2c1] inline-block text-black px-8">
          30-day money-back guarantee • Cancel anytime • Secure payment
        </p>
      </footer>
    </div>
  );
} 