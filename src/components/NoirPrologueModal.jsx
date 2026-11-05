import React, { useState, useEffect } from 'react';
import { sound } from '../utils/audio';

export default function NoirPrologueModal({ isOpen, onClose, onSelectOption }) {
  const [typedText, setTypedText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);

  const fullText = "이자 연체되면 장기부터 꺼내는 거야. 각서에 피지장 찍어라... 진짜 야수가 될 준비는 됐나?";

  useEffect(() => {
    if (!isOpen) {
      setTypedText('');
      setIsTypingDone(false);
      setSelectedBranch(null);
      return;
    }

    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      if (idx <= fullText.length) {
        setTypedText(fullText.slice(0, idx));
        if (idx % 3 === 0) sound.playClick();
      } else {
        setIsTypingDone(true);
        clearInterval(interval);
      }
    }, 35);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChoose = (opt) => {
    sound.playBuy();
    setSelectedBranch(opt);
    setTimeout(() => {
      onSelectOption(opt);
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 backdrop-blur-md p-2 md:p-6 select-none overflow-hidden animate-fadeIn">
      {/* Background Graphic */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 md:opacity-50 pointer-events-none scale-105 transition-transform duration-1000"
        style={{ backgroundImage: `url('./assets/noir/bg_noir_intro.webp')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/80 pointer-events-none" />

      {/* Main Cutscene Stage Container */}
      <div className="relative w-full max-w-5xl h-[92vh] max-h-[820px] flex flex-col justify-between rounded-2xl border border-red-950/60 shadow-[0_0_60px_rgba(0,0,0,0.95)] overflow-hidden bg-gradient-to-b from-[#10141d]/90 to-[#080b11]/95">
        
        {/* Top Header HUD Bar */}
        <div className="relative z-20 flex items-center justify-between px-4 py-3 bg-[#0a0f18]/90 border-b border-red-900/40">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
            <span className="text-xs md:text-sm font-black tracking-widest text-red-400 font-mono">
              PROLOGUE : 1980s MYEONGDONG UNDERGROUND VIP DEN
            </span>
          </div>
          <button
            type="button"
            onClick={() => onSelectOption('skip')}
            className="px-3 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-xs font-bold text-slate-300 border border-slate-600 transition-colors"
          >
            스킵 (SKIP ▶)
          </button>
        </div>

        {/* Center Character Standoff Stage */}
        <div className="relative flex-1 flex items-end justify-between px-4 md:px-12 pb-4 overflow-hidden">
          
          {/* Left: Anxious Young Trader Sprite */}
          <div className="relative z-10 w-[160px] md:w-[280px] flex flex-col items-center animate-slideRight">
            <div className="relative w-full overflow-hidden filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]">
              <img 
                src="./assets/noir/portrait_trader_ant.webp" 
                alt="김트레이더" 
                className="w-full h-auto object-contain max-h-[340px] md:max-h-[460px] animate-breathe" 
              />
            </div>
            <div className="mt-2 px-3 py-1 rounded-full bg-slate-900/90 border border-amber-500/50 text-[11px] md:text-xs font-black text-amber-300 shadow-lg">
              김트레이더 (자산 5,000만 원)
            </div>
          </div>

          {/* Center Choice Prompts (Floating in Office Smoke) */}
          <div className="relative z-30 flex-1 max-w-md mx-2 md:mx-6 flex flex-col gap-3 mb-8">
            <div className="text-center mb-1">
              <span className="inline-block px-3 py-0.5 rounded bg-red-950/90 border border-red-600/60 text-red-400 text-[11px] md:text-xs font-black uppercase tracking-wider animate-pulse">
                운명의 갈림길 (CHOOSE YOUR PATH)
              </span>
            </div>

            {/* Option 1: Loan 10 Billion with Blood Thumbprint */}
            <button
              type="button"
              onClick={() => handleChoose('loan10b')}
              className={`group relative overflow-hidden rounded-xl border-2 transition-all p-3 md:p-4 text-left shadow-2xl active:scale-[0.98] ${
                selectedBranch === 'loan10b'
                  ? 'border-red-500 bg-red-950/80 ring-4 ring-red-500/50 scale-102'
                  : 'border-red-900/60 bg-gradient-to-r from-red-950/60 to-black hover:border-red-500 hover:from-red-950/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-red-950 border border-red-500/60 flex items-center justify-center flex-shrink-0 text-red-400 font-black text-lg md:text-xl shadow-inner">
                  1
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs md:text-sm font-black text-white group-hover:text-red-300 transition-colors truncate">
                    1. 각서에 피지장을 찍고 10억 대출
                  </div>
                  <div className="text-[10px] md:text-xs text-red-300/80 truncate mt-0.5">
                    자산 10억 원 시작 · 사채 빚 10억 원 (하이롤러 야수 모드)
                  </div>
                </div>
              </div>
            </button>

            {/* Option 2: Seed 50 Million Underdog */}
            <button
              type="button"
              onClick={() => handleChoose('seed50m')}
              className={`group relative overflow-hidden rounded-xl border-2 transition-all p-3 md:p-4 text-left shadow-2xl active:scale-[0.98] ${
                selectedBranch === 'seed50m'
                  ? 'border-amber-500 bg-amber-950/80 ring-4 ring-amber-500/50 scale-102'
                  : 'border-slate-700 bg-gradient-to-r from-slate-900/80 to-black hover:border-amber-500 hover:from-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-slate-900 border border-amber-500/60 flex items-center justify-center flex-shrink-0 text-amber-400 font-black text-lg md:text-xl shadow-inner">
                  2
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs md:text-sm font-black text-white group-hover:text-amber-300 transition-colors truncate">
                    2. 일단 종잣돈 5천만 원으로 시작
                  </div>
                  <div className="text-[10px] md:text-xs text-slate-400 truncate mt-0.5">
                    자산 5,000만 원 시작 · 사채 빚 3억 원 (흙수저 개미 생존기)
                  </div>
                </div>
              </div>
            </button>
          </div>

          {/* Right: Imposing Loan Shark Kingpin Ma Dong-seok Sprite */}
          <div className="relative z-10 w-[170px] md:w-[300px] flex flex-col items-center animate-slideLeft">
            <div className="relative w-full overflow-hidden filter drop-shadow-[0_15px_30px_rgba(255,51,75,0.4)]">
              <img 
                src="./assets/noir/portrait_loanshark_boss.webp" 
                alt="사채왕 마동석" 
                className="w-full h-auto object-contain max-h-[350px] md:max-h-[480px] animate-breathe" 
              />
            </div>
            <div className="mt-2 px-3 py-1 rounded-full bg-red-950/90 border border-red-500/70 text-[11px] md:text-xs font-black text-red-300 shadow-lg">
              명동 사채왕 마동석 (연이율 35%)
            </div>
          </div>

        </div>

        {/* Bottom Dialogue Box Frame */}
        <div className="relative z-20 p-3 md:p-5 bg-gradient-to-t from-black via-[#0a0d14] to-[#121824]/95 border-t-2 border-red-600/70 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
          
          {/* Speaker Badge & Controls */}
          <div className="flex items-center justify-between mb-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-900/60 border border-red-500/80 text-white font-black text-xs md:text-sm shadow-md">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              [사채왕 마동석]
            </div>

            <div className="flex items-center gap-1.5 md:gap-2">
              <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono font-bold text-slate-300 border border-slate-700">AUTO</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono font-bold text-slate-300 border border-slate-700">LOG</span>
              <button 
                type="button" 
                onClick={() => { setTypedText(fullText); setIsTypingDone(true); }}
                className="px-2 py-0.5 rounded bg-red-950 text-[10px] font-mono font-bold text-red-300 border border-red-700 hover:bg-red-900 transition-colors"
              >
                SKIP
              </button>
            </div>
          </div>

          {/* Dialogue Text Container (Strict word wrap, zero overflow) */}
          <div className="min-h-[50px] md:min-h-[64px] flex items-center">
            <p className="text-sm md:text-base font-semibold leading-relaxed text-slate-200 break-keep overflow-hidden">
              {typedText}
              {!isTypingDone && <span className="inline-block w-2 h-4 ml-1 bg-red-500 animate-pulse align-middle"></span>}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
