import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

export default function CountdownBanner() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 text-black py-4 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 animate-pulse" />
            <span className="font-bold text-lg">Limited Time Offer!</span>
          </div>
          <span className="hidden sm:inline">•</span>
          <span className="font-semibold">Special discount ends in:</span>
          <div className="flex gap-2 font-mono font-bold text-xl">
            <span className="bg-black text-emerald-400 px-3 py-1 rounded">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span>:</span>
            <span className="bg-black text-emerald-400 px-3 py-1 rounded">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span>:</span>
            <span className="bg-black text-emerald-400 px-3 py-1 rounded">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
