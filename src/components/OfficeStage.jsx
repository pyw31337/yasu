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

  // 자산 및 시대에 따른 배경 오피스 테마 결정
  const getOfficeTheme = () => {
    if (assets <= 0) return 'office-bankrupt'; // 마포대교 한강 수온 테마
    if (year < 1990) return 'office-1980s'; // 명동 사채골목 80년대 레트로
    if (year < 2000) return 'office-1990s'; // 여의도 증권사 객장 90년대
    if (year < 2015) return 'office-2000s'; // 강남 타워팰리스 / 주상복합
    return 'office-2026s'; // 청담동 PH129 한강뷰 펜트하우스
  };

  const currentOfficeTheme = getOfficeTheme();

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
    <div className={`office-stage-container ${currentOfficeTheme} ${characterState === 'PANICKING' ? 'screen-shake' : ''}`}>
      {/* 상단 전광판 스크롤 뉴스 */}
      <div className="office-marquee">
        <span className="marquee-content">
          ★ {year}년 증권시장 실시간 속보 ★ KOSPI {year < 1989 ? '상승 랠리' : year === 1997 ? 'IMF 외환위기 대폭락' : '사상 최고가 도전'} | 명동 사채시장 자금 쏠림 | 야수의 심장 가동 중!
        </span>
      </div>

      {/* 돈다발 비 파티클 (상한가 환호 시) */}
      {characterState === 'CHEERING' && (
        <div className="money-rain-overlay">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="falling-money" style={{ left: `${(i * 5) + Math.random() * 4}%`, animationDelay: `${Math.random() * 1.5}s` }}>
              {i % 2 === 0 ? '💵' : '💰'}
            </div>
          ))}
        </div>
      )}

      {/* 사이렌 번쩍임 (반대매매/마진콜 시) */}
      {characterState === 'PANICKING' && (
        <div className="emergency-siren-overlay"></div>
      )}

      {/* 메인 그래픽 씬 (픽셀 오피스) */}
      <div className="office-scene-art">
        <svg viewBox="0 0 800 320" className="w-full h-auto select-none">
          {/* Office Wall Background */}
          <rect x="0" y="0" width="800" height="210" fill={
            assets <= 0 ? '#1f1315' :
            year < 1990 ? '#1a2332' :
            year < 2000 ? '#16222f' :
            year < 2015 ? '#1a1829' : '#0c1017'
          }/>

          {/* Wall Window View */}
          <rect x="50" y="25" width="220" height="110" fill="#0b0e14" stroke="#334155" strokeWidth="4" rx="4"/>
          {/* 창문 밖 풍경 */}
          {year < 1990 ? (
            /* 80년대 남산타워와 옛 서울 */
            <g>
              <rect x="50" y="80" width="220" height="55" fill="#1e293b"/>
              <line x1="160" y1="35" x2="160" y2="80" stroke="#f59e0b" strokeWidth="3"/>
              <circle cx="160" cy="45" r="8" fill="#ef4444"/>
              <text x="160" y="20" fill="#f59e0b" fontSize="8" textAnchor="middle" fontWeight="bold">남산타워 1980s</text>
            </g>
          ) : year < 2000 ? (
            /* 90년대 여의도 63빌딩 */
            <g>
              <rect x="50" y="80" width="220" height="55" fill="#1e293b"/>
              <polygon points="140,85 160,35 180,85" fill="#eab308" stroke="#ca8a04" strokeWidth="1.5"/>
              <text x="160" y="25" fill="#eab308" fontSize="8" textAnchor="middle" fontWeight="bold">여의도 63빌딩</text>
            </g>
          ) : (
            /* 2020년대 한강 야경 & 롯데타워 */
            <g>
              <rect x="50" y="70" width="220" height="65" fill="#0f172a"/>
              <path d="M 50 110 Q 160 90 270 110 L 270 135 L 50 135 Z" fill="#1e3a8a"/>
              <polygon points="190,80 195,30 200,80" fill="#38bdf8"/>
              <text x="160" y="20" fill="#38bdf8" fontSize="8" textAnchor="middle" fontWeight="bold">한강 & 롯데타워</text>
            </g>
          )}

          {/* Wall Clock */}
          <circle cx="400" cy="40" r="18" fill="#ffffff" stroke="#334155" strokeWidth="3"/>
          <line x1="400" y1="40" x2="400" y2="28" stroke="#000000" strokeWidth="2"/>
          <line x1="400" y1="40" x2="410" y2="40" stroke="#dc2626" strokeWidth="1.5"/>

          {/* Wall Stock Board (전광판) */}
          <rect x="520" y="25" width="230" height="110" fill="#05080c" stroke="#475569" strokeWidth="3" rx="4"/>
          <text x="535" y="45" fill="#94a3b8" fontFamily="monospace" fontSize="10" fontWeight="bold">여의도 시세판</text>
          <text x="535" y="70" fill="#ffffff" fontFamily="monospace" fontSize="11">KOSPI</text>
          <text x="735" y="70" fill="#ff334b" fontFamily="monospace" fontSize="11" fontWeight="bold" textAnchor="end">
            {year < 1990 ? '▲ 880.5' : year === 1997 ? '▼ 376.3' : year === 2021 ? '▲ 3,000+' : '▲ 2,650'}
          </text>
          <text x="535" y="95" fill="#ffffff" fontFamily="monospace" fontSize="11">USD/KRW</text>
          <text x="735" y="95" fill="#ffbe1a" fontFamily="monospace" fontSize="11" fontWeight="bold" textAnchor="end">
            {year < 1990 ? '680원' : year === 1997 ? '1,695원' : year === 2008 ? '1,500원' : '1,420원'}
          </text>
          <text x="535" y="120" fill="#38bdf8" fontFamily="monospace" fontSize="9">야수 레버리지</text>
          <text x="735" y="120" fill="#ff334b" fontFamily="monospace" fontSize="10" fontWeight="bold" textAnchor="end">최대 x5 미수</text>

          {/* Floor Line */}
          <rect x="0" y="210" width="800" height="110" fill={
            assets <= 0 ? '#11090a' :
            year < 1990 ? '#382218' :
            year < 2000 ? '#261e1b' :
            year < 2015 ? '#1f2937' : '#0f172a'
          }/>

          {/* Desk (책상) */}
          <rect x="250" y="170" width="300" height="110" fill={
            assets <= 0 ? '#27181a' :
            year < 1990 ? '#854d0e' :
            year < 2000 ? '#713f12' : '#334155'
          } stroke="#1e1b18" strokeWidth="3" rx="4"/>

          {/* CRT or Curved Monitor on Desk */}
          <rect x="420" y="105" width="110" height="80" fill="#1e293b" stroke="#64748b" strokeWidth="3" rx="4"/>
          <rect x="428" y="113" width="94" height="64" fill="#040d07"/>
          {/* Candle graph inside monitor */}
          <path d="M 432 165 L 445 155 L 460 160 L 480 130 L 500 120 L 515 116" stroke="#ff334b" strokeWidth="2.5" fill="none"/>

          {/* CHARACTER SPRITE (개미 트레이더) */}
          <g transform="translate(320, 100)" className={characterState === 'CHEERING' ? 'char-bounce-dance' : characterState === 'PANICKING' ? 'char-panic-head' : 'char-breathing'}>
            {/* 상한가 댄스 시 머리 위 불꽃 */}
            {characterState === 'CHEERING' && (
              <g transform="translate(0, -25)">
                <text x="0" y="0" fontSize="24" textAnchor="middle">🔥</text>
              </g>
            )}

            {/* 머리 & 얼굴 표정 */}
            <rect x="-18" y="20" width="36" height="34" fill="#fcd34d" rx="4"/>
            <rect x="-20" y="14" width="40" height="14" fill="#0f172a"/>

            {/* 표정 변화 */}
            {characterState === 'CHEERING' ? (
              /* 환호/선글라스 표정 */
              <g>
                <rect x="-14" y="28" width="12" height="7" fill="#000000" rx="1"/>
                <rect x="2" y="28" width="12" height="7" fill="#000000" rx="1"/>
                <path d="M -8 44 Q 0 52 8 44" stroke="#dc2626" strokeWidth="3" fill="#ffffff"/>
              </g>
            ) : characterState === 'PANICKING' || characterState === 'BANKRUPT' ? (
              /* 멘붕/공포 표정 */
              <g>
                <ellipse cx="-8" cy="32" rx="4" ry="5" fill="#000000"/>
                <ellipse cx="8" cy="32" rx="4" ry="5" fill="#000000"/>
                <ellipse cx="0" cy="44" rx="6" ry="7" fill="#000000"/>
                <line x1="-14" y1="26" x2="-4" y2="30" stroke="#000000" strokeWidth="2"/>
                <line x1="14" y1="26" x2="4" y2="30" stroke="#000000" strokeWidth="2"/>
              </g>
            ) : (
              /* 평시 진지한 눈빛 */
              <g>
                <rect x="-12" y="32" width="6" height="3" fill="#000000"/>
                <rect x="6" y="32" width="6" height="3" fill="#000000"/>
                <line x1="-8" y1="44" x2="8" y2="44" stroke="#000000" strokeWidth="2"/>
              </g>
            )}

            {/* 상의 & 빨간 넥타이 */}
            <rect x="-22" y="54" width="44" height="42" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1"/>
            <polygon points="0,56 6,80 0,92 -6,80" fill="#ff334b"/>

            {/* 팔 동작 */}
            {characterState === 'CHEERING' ? (
              /* 만세 동작 */
              <g>
                <rect x="-36" y="30" width="14" height="34" fill="#ffffff" transform="rotate(-35 -36 30)"/>
                <circle cx="-38" cy="22" r="8" fill="#fcd34d"/>
                <rect x="24" y="30" width="14" height="34" fill="#ffffff" transform="rotate(35 24 30)"/>
                <circle cx="40" cy="22" r="8" fill="#fcd34d"/>
              </g>
            ) : characterState === 'PANICKING' ? (
              /* 머리 감싸쥐기 */
              <g>
                <circle cx="-18" cy="30" r="8" fill="#fcd34d"/>
                <circle cx="18" cy="30" r="8" fill="#fcd34d"/>
              </g>
            ) : (
              /* 키보드 타건 동작 */
              <g>
                <rect x="-28" y="65" width="12" height="28" fill="#ffffff" transform="rotate(25 -28 65)"/>
                <rect x="16" y="65" width="12" height="28" fill="#ffffff" transform="rotate(-25 16 65)"/>
              </g>
            )}

            {/* 바지 & 의자 */}
            <rect x="-18" y="96" width="16" height="40" fill="#1e293b"/>
            <rect x="2" y="96" width="16" height="40" fill="#1e293b"/>
          </g>

          {/* NPC SPRITE: 사채왕 마동석 (사채 대출 시 등장) */}
          {loan > 0 && (
            <g transform="translate(160, 120)" className="char-shark-enter">
              {/* Dark Figure with Sunglasses */}
              <rect x="-26" y="10" width="52" height="42" fill="#d97706" rx="6"/>
              <rect x="-28" y="2" width="56" height="16" fill="#020617"/>
              <rect x="-20" y="22" width="18" height="10" fill="#000000" rx="2"/>
              <rect x="2" y="22" width="18" height="10" fill="#000000" rx="2"/>
              <line x1="-2" y1="27" x2="2" y2="27" stroke="#fbbf24" strokeWidth="2"/>
              
              {/* Thick Gold Chain */}
              <circle cx="0" cy="54" r="16" fill="none" stroke="#eab308" strokeWidth="3"/>

              {/* Huge Leather Jacket Shoulders */}
              <path d="M -44 52 Q 0 46 44 52 L 38 135 L -38 135 Z" fill="#09090b"/>
              <rect x="-10" y="56" width="20" height="78" fill="#831843"/>

              {/* Holding IOU Seal (신체포기각서) */}
              <rect x="28" y="80" width="36" height="46" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" rx="2"/>
              <text x="46" y="98" fill="#b91c1c" fontSize="9" fontWeight="900" textAnchor="middle">각서</text>
              <circle cx="46" cy="112" r="6" fill="#dc2626"/>

              {/* Name Tag */}
              <rect x="-40" y="142" width="80" height="22" fill="#7f1d1d" rx="4"/>
              <text x="0" y="157" fill="#ffffff" fontSize="10" fontWeight="900" textAnchor="middle">명동 사채왕</text>
            </g>
          )}
        </svg>
      </div>

      {/* 말풍선 대사 창 (애니메이션 동기화) */}
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
