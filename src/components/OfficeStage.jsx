import React, { useEffect, useState } from 'react';

export default function OfficeStage({
  year,
  assets,
  tier,
  loan,
  isTrading,
  lastResult
}) {
  const [characterState, setCharacterState] = useState('IDLE'); // IDLE, BUYING, CHEERING, PANICKING, BANKRUPT
  const [speechText, setSpeechText] = useState('');

  // 거래 실행 및 결과에 따른 캐릭터 표정 및 애니메이션 동기화
  useEffect(() => {
    if (isTrading) {
      setCharacterState('BUYING');
      setSpeechText('🔥 "야수의 심장 발동!! 전액 풀매수 들어간다!!"');
    } else if (lastResult) {
      if (lastResult.isGameOver) {
        setCharacterState('BANKRUPT');
        setSpeechText('💀 "으아아악! 깡통 찼다!! 마포대교 한강물 온도 체크하러 간다..."');
      } else if (lastResult.isMarginCall) {
        setCharacterState('PANICKING');
        setSpeechText('🚨 "반대매매 강제청산 당했다!! 증권사가 내 주식을 시초가에 던져버렸어!!"');
      } else if (lastResult.returnRate >= 0.3) {
        setCharacterState('CHEERING');
        setSpeechText('🎉 "끼야호오오옥!! 쩜상 터졌다!! 오늘 밤 여의도 골든벨 울린다!!"');
      } else if (lastResult.returnRate > 0) {
        setCharacterState('CHEERING');
        setSpeechText('📈 "수익 실현 굿! 야수의 심장은 결코 틀리지 않는다!"');
      } else {
        setCharacterState('PANICKING');
        setSpeechText('📉 "윽... 마이너스다... 괜찮아, 아직 존버하면 살아날 수 있어..."');
      }
    } else {
      setCharacterState('IDLE');
      if (loan > 0) {
        setSpeechText('👺 사채왕 마동석: "이봐 김 사장, 이번 판에 못 따면 알지? 각서 도장 찍어."');
      } else if (year === 1980) {
        setSpeechText('💼 "1980년 명동 사채골목... 1천만 원으로 대한민국 증시의 전설을 쓰겠다!"');
      } else if (year === 1997) {
        setSpeechText('📰 "한보철강 부도... 외환보유고 바닥... 역사적 베팅의 순간이다!"');
      } else if (year === 1999) {
        setSpeechText('🌐 "새롬기술, 다음... 닷컴 열풍이다! 100배 가즈아!!"');
      } else {
        setSpeechText('📊 "신문을 확인하고 올해 가장 폭발할 종목을 고르자."');
      }
    }
  }, [isTrading, lastResult, loan, year]);

  return (
    <div className={`aaa-stage-container ${characterState === 'PANICKING' ? 'screen-shake' : ''}`}>
      {/* 상단 전광판 스크롤 뉴스 */}
      <div className="office-marquee">
        <span className="marquee-content">
          ★ {year}년 증권시장 실시간 속보 ★ KOSPI {year < 1989 ? '상승 랠리' : year === 1997 ? 'IMF 외환위기 대폭락' : '사상 최고가 도전'} | 명동 사채시장 자금 쏠림 | 야수의 심장 가동 중!
        </span>
      </div>

      {/* 돈다발 비 파티클 (상한가 환호 시) */}
      {characterState === 'CHEERING' && (
        <div className="money-rain-overlay">
          {[...Array(24)].map((_, i) => (
            <div key={i} className="falling-money" style={{ left: `${(i * 4.2) + Math.random() * 3}%`, animationDelay: `${Math.random() * 1.5}s` }}>
              {i % 2 === 0 ? '💵' : '💰'}
            </div>
          ))}
        </div>
      )}

      {/* 사이렌 번쩍임 (반대매매/마진콜 시) */}
      {characterState === 'PANICKING' && (
        <div className="emergency-siren-overlay"></div>
      )}

      {/* AAA Cinematic Stage View */}
      <div className="aaa-stage-viewport">
        {/* Cinematic Backdrop Image */}
        <div 
          className="aaa-stage-bg" 
          style={{ backgroundImage: `url('./assets/key_art.jpg')` }}
        ></div>
        <div className="aaa-stage-gradient"></div>

        {/* Floating Stock HUD on Stage */}
        <div className="aaa-stage-hud">
          <div className="hud-pill">
            <span className="hud-label">ERA</span>
            <span className="hud-value text-amber-400">{year}년 서바이벌</span>
          </div>
          <div className="hud-pill">
            <span className="hud-label">STATUS</span>
            <span className={`hud-value ${characterState === 'CHEERING' ? 'text-bull' : characterState === 'PANICKING' ? 'text-bear' : 'text-emerald-400'}`}>
              {characterState === 'CHEERING' ? '🔥 쩜상 폭등 랠리' :
               characterState === 'PANICKING' ? '🚨 마진콜 비상' :
               characterState === 'BUYING' ? '⚡ 풀매수 주문 중' : '📊 호가창 관망'}
            </span>
          </div>
        </div>

        {/* AAA Character Sprites Battle Arena */}
        <div className="aaa-sprites-arena">
          
          {/* NPC: Loan Shark Ma Dong-seok (사채 대출 시 슬라이드 인) */}
          {loan > 0 && (
            <div className="sprite-box sprite-loanshark-enter">
              <div className="sprite-tag bg-red-950 text-red-400 border border-red-700">
                명동 사채왕 마동석 (연 35%)
              </div>
              <img 
                src="./assets/sprite_loanshark.png" 
                alt="사채왕 마동석" 
                className="aaa-character-img shark-shadow"
              />
            </div>
          )}

          {/* Protagonist: The Beast Trader */}
          <div className={`sprite-box sprite-protagonist ${characterState === 'CHEERING' ? 'trader-flame-aura' : ''}`}>
            <div className="sprite-tag bg-slate-900 text-amber-400 border border-amber-600">
              야수의 심장 김트레이더 ({tier?.title || '투자자'})
            </div>
            <img 
              src="./assets/sprite_trader.png" 
              alt="주인공 김트레이더" 
              className="aaa-character-img trader-shadow"
            />
          </div>

        </div>
      </div>

      {/* 말풍선 대사 창 */}
      <div className="office-dialog-bubble">
        <div className="dialog-speaker-badge">
          {characterState === 'CHEERING' ? '🎉 [쾌재]' :
           characterState === 'PANICKING' ? '😱 [비명]' :
           loan > 0 ? '👺 [경고]' : '💬 [투자자 심리]'}
        </div>
        <p className="dialog-text">{speechText}</p>
      </div>
    </div>
  );
}
