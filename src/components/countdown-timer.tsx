"use client";

import { useState, useEffect } from 'react';
import { weddingDate } from '@/lib/constants';

export function CountdownTimer() {
  const calculateTimeLeft = () => {
    const difference = +new Date(weddingDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft as { days: number; hours: number; minutes: number; seconds: number };
  };

  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    // Set initial value on client mount to avoid hydration mismatch
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) {
    return (
      <div className="text-center text-muted-foreground">
        Loading countdown...
      </div>
    );
  }

  return (
    <div className="text-center">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-6">
        Countdown to the Big Day!
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-2xl mx-auto">
        {Object.entries(timeLeft).map(([interval, value]) => (
          <div key={interval} className="p-4 bg-secondary rounded-lg shadow-inner">
            <div className="text-4xl md:text-6xl font-bold text-secondary-foreground">
              {String(value).padStart(2, '0')}
            </div>
            <div className="text-sm uppercase tracking-widest text-secondary-foreground/80">
              {interval}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
