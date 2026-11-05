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
    <div className="noir-modal-backdrop animate-fadeIn" onClick={() => onSelectOption('skip')}>
      {/* 1. Desktop & Tablet: Pixel-perfect 16:9 Visual Novel Cutscene Stage */}
      <div className="noir-prologue-stage-desktop" onClick={(e) => e.stopPropagation()}>
        <img 
          src="./assets/concept1_noir_intro.jpg" 
          alt="프롤로그 - 명동 사채왕과의 대면" 
          className="noir-prologue-desktop-bg" 
        />

        {/* Hotspot: [1. 각서에 피지장을 찍고 10억 대출] */}
        <button
          type="button"
          className="noir-intro-hotspot noir-intro-hotspot-loan10b"
          title="1. 각서에 피지장을 찍고 10억 대출"
          onClick={() => handleChoose('loan10b')}
        />

        {/* Hotspot: [2. 일단 종잣돈 5천만 원으로 시작] */}
        <button
          type="button"
          className="noir-intro-hotspot noir-intro-hotspot-seed50m"
          title="2. 일단 종잣돈 5천만 원으로 시작"
          onClick={() => handleChoose('seed50m')}
        />

        {/* Top/Dialog Skip Hotspots */}
        <button
          type="button"
          className="noir-intro-hotspot noir-intro-hotspot-skip"
          title="스킵 (SKIP)"
          onClick={() => onSelectOption('skip')}
        />

        {/* Corner close/skip button */}
        <button
          type="button"
          className="noir-prologue-top-skip-btn"
          onClick={() => onSelectOption('skip')}
        >
          스킵 (SKIP ▶)
        </button>
      </div>

      {/* 2. Mobile (< 768px): Responsive Story Stage */}
      <div className="noir-prologue-mobile-card" onClick={(e) => e.stopPropagation()}>
        <div className="noir-mobile-prologue-header">
          <div className="noir-prologue-title">
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff334b', display: 'inline-block' }}></span>
            <span>PROLOGUE : 1980s MYEONGDONG VIP</span>
          </div>
          <button
            type="button"
            onClick={() => onSelectOption('skip')}
            className="noir-prologue-skip-btn"
          >
            스킵 ▶
          </button>
        </div>

        {/* Mobile Cutscene Illustration */}
        <div className="noir-mobile-prologue-art">
          <img 
            src="./assets/concept1_noir_intro.jpg" 
            alt="명동 사채왕 대면" 
            className="noir-mobile-prologue-art-img" 
          />
        </div>

        {/* Dialogue Line */}
        <div className="noir-mobile-dialogue-box">
          <div className="noir-speaker-name">
            [사채왕 마동석]
          </div>
          <p className="noir-dialogue-line">
            {typedText}
            {!isTypingDone && <span className="noir-cursor-blink"></span>}
          </p>
        </div>

        {/* Mobile Choice Sprite Buttons */}
        <div className="noir-mobile-choices-wrapper">
          <button
            type="button"
            onClick={() => handleChoose('loan10b')}
            className={`noir-choice-btn ${selectedBranch === 'loan10b' ? 'active' : ''}`}
            title="1. 각서에 피지장을 찍고 10억 대출"
          >
            <img 
              src="./assets/noir/btn_choice_loan10b.webp" 
              alt="1. 각서에 피지장을 찍고 10억 대출" 
            />
          </button>

          <button
            type="button"
            onClick={() => handleChoose('seed50m')}
            className={`noir-choice-btn ${selectedBranch === 'seed50m' ? 'active' : ''}`}
            title="2. 일단 종잣돈 5천만 원으로 시작"
          >
            <img 
              src="./assets/noir/btn_choice_seed50m.webp" 
              alt="2. 일단 종잣돈 5천만 원으로 시작" 
            />
          </button>
        </div>
      </div>
    </div>
  );
}
