import React, { useEffect, useState } from 'react';

export default function WelcomeSplashScreen() {
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem('hasSeenSplash');
    if (!seen) {
      setShow(true);
      const timer = setTimeout(() => setVisible(true), 50);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setLeaving(true);
    setTimeout(() => {
      sessionStorage.setItem('hasSeenSplash', 'true');
      setShow(false);
    }, 600);
  };

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-600 ${
        leaving ? 'opacity-0' : visible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        background: 'linear-gradient(135deg, #0a2e1a 0%, #0d3b22 30%, #0a1628 70%, #060e1a 100%)',
        transition: 'opacity 0.6s ease',
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              background: i % 3 === 0 ? '#34d399' : i % 3 === 1 ? '#f97316' : '#60a5fa',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Glowing rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-96 h-96 rounded-full border border-emerald-500/10 animate-ping"
          style={{ animationDuration: '3s' }}
        />
        <div
          className="absolute w-72 h-72 rounded-full border border-emerald-400/15 animate-ping"
          style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}
        />
      </div>

      <div
        className={`relative z-10 flex flex-col items-center text-center px-8 max-w-md transition-all duration-700 ${
          visible && !leaving ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        {/* Logo */}
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-full bg-emerald-400/20 blur-xl scale-150" />
          <div
            className="relative w-28 h-28 rounded-full border-2 border-emerald-400/40 flex items-center justify-center overflow-hidden"
            style={{
              background: 'radial-gradient(circle, rgba(52,211,153,0.15) 0%, transparent 70%)',
            }}
          >
            <img
              src="/assets/CC_20260226_043346-1.png"
              alt="Evergreen Hub Logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          {/* Rotating dashed ring */}
          <div
            className="absolute inset-0 w-28 h-28 rounded-full border-2 border-dashed border-emerald-400/30"
            style={{ animation: 'spin 8s linear infinite' }}
          />
        </div>

        {/* Sparkle stars */}
        <div className="absolute top-8 left-8 text-yellow-300 text-xl animate-bounce" style={{ animationDelay: '0.2s' }}>✦</div>
        <div className="absolute top-12 right-12 text-emerald-300 text-sm animate-bounce" style={{ animationDelay: '0.8s' }}>✦</div>
        <div className="absolute bottom-20 left-16 text-orange-300 text-xs animate-bounce" style={{ animationDelay: '1.2s' }}>✦</div>

        {/* Welcome text */}
        <div className="mb-2">
          <span className="text-xs font-semibold tracking-widest text-emerald-400 uppercase">
            Welcome to
          </span>
        </div>

        <h1
          className="text-4xl font-extrabold mb-3 leading-tight"
          style={{
            background: 'linear-gradient(135deg, #34d399 0%, #f97316 50%, #60a5fa 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Evergreen Hub
        </h1>

        <p className="text-emerald-100/70 text-sm mb-8 leading-relaxed">
          Your gateway to digital skills, affiliate marketing & online income opportunities.
        </p>

        {/* CTA Button */}
        <button
          onClick={handleDismiss}
          className="relative px-10 py-3.5 rounded-full font-bold text-white text-base overflow-hidden group transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #f97316 0%, #ea580c 50%, #dc2626 100%)',
            boxShadow: '0 0 30px rgba(249,115,22,0.4)',
          }}
        >
          <span className="relative z-10">🚀 Get Started</span>
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>

        <p className="mt-4 text-emerald-400/50 text-xs">
          Tap to continue exploring
        </p>
      </div>
    </div>
  );
}
