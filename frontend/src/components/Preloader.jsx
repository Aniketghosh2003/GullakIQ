import React, { useState, useEffect } from 'react';
import { Sparkles, ShieldCheck, Zap, Wallet } from 'lucide-react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing GullakIQ Engine...');
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const totalDuration = 2500; // 2.5 seconds exactly
    const intervalTime = 30; // update every ~30ms
    const totalSteps = totalDuration / intervalTime;
    let step = 0;

    const timer = setInterval(() => {
      step += 1;
      const currentProgress = Math.min(100, Math.round((step / totalSteps) * 100));
      setProgress(currentProgress);

      if (currentProgress < 35) {
        setStatusText('Initializing GullakIQ Engine...');
      } else if (currentProgress < 75) {
        setStatusText('Securing Encrypted Financial Vault...');
      } else {
        setStatusText('Preparing Smart Dashboard...');
      }

      if (step >= totalSteps) {
        clearInterval(timer);
        setIsFading(true);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 400); // 400ms fade-out transition
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#08080c] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-500 ease-out select-none ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Animated Glow Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#ccff00]/15 via-emerald-500/10 to-indigo-600/15 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-[#ccff00]/10 rounded-full blur-[90px] animate-ping duration-1000 opacity-20" />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6 text-center">
        
        {/* Animated Brand Logo & Spinning Ring */}
        <div className="relative flex items-center justify-center mb-8">
          {/* Outer Rotating Neon Ring */}
          <div className="w-28 h-28 rounded-full border-2 border-transparent border-t-[#ccff00] border-r-[#ccff00]/40 animate-spin" style={{ animationDuration: '1.5s' }} />
          
          {/* Inner Counter-Rotating Ring */}
          <div className="absolute w-20 h-20 rounded-full border-2 border-transparent border-b-emerald-400 border-l-emerald-400/40 animate-spin" style={{ animationDuration: '2.5s', animationDirection: 'reverse' }} />

          {/* Central Pulsing Icon */}
          <div className="absolute w-14 h-14 rounded-2xl bg-[#15151e] border border-white/15 flex items-center justify-center shadow-[0_0_30px_rgba(204,255,0,0.3)]">
            <Wallet className="w-7 h-7 text-[#ccff00] animate-bounce" style={{ animationDuration: '2s' }} />
          </div>
        </div>

        {/* Brand Name */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-3xl font-extrabold tracking-tight text-white">GullakIQ</span>
          <span className="w-3 h-3 rounded-full bg-[#ccff00] inline-block shadow-[0_0_12px_#ccff00] animate-pulse" />
        </div>
        <p className="text-xs uppercase tracking-[0.25em] font-semibold text-gray-400 mb-8">
          Smart Expense & Wealth Tracker
        </p>

        {/* Progress Bar Container */}
        <div className="w-full bg-[#15151e] border border-white/10 p-1.5 rounded-full shadow-inner mb-4 relative overflow-hidden">
          <div
            className="h-2.5 rounded-full bg-gradient-to-r from-[#88ff00] via-[#ccff00] to-emerald-400 transition-all duration-75 ease-out shadow-[0_0_15px_#ccff00]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Status Text & Percentage */}
        <div className="flex items-center justify-between w-full text-xs font-medium text-gray-400 px-1">
          <span className="flex items-center gap-1.5 text-gray-300">
            <Sparkles className="w-3.5 h-3.5 text-[#ccff00] animate-spin" style={{ animationDuration: '3s' }} />
            {statusText}
          </span>
          <span className="font-bold text-[#ccff00] text-sm tabular-nums">
            {progress}%
          </span>
        </div>

        {/* Footer Badges */}
        <div className="mt-12 flex items-center gap-4 text-[11px] text-gray-500 font-medium">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            256-Bit Encrypted
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-[#ccff00]" />
            Realtime Analytics
          </span>
        </div>

      </div>
    </div>
  );
}
