import React, { useState, useEffect, useRef } from 'react';
import { Flame, Zap, ShieldAlert, Sparkles, TrendingUp, TrendingDown, Info, DollarSign } from 'lucide-react';
import { sound } from '../utils/audio';

function formatKRW(val) {
  if (val === undefined || val === null || isNaN(val)) return '0원';
  const abs = Math.abs(val);
  const sign = val < 0 ? '-' : '';
  if (abs >= 100000000) {
    const eok = Math.floor(abs / 100000000);
    const man = Math.floor((abs % 100000000) / 10000);
    return `${sign}${eok}억 ${man > 0 ? man.toLocaleString() + '만' : ''} 원`;
  }
  if (abs >= 10000) {
    return `${sign}${Math.floor(abs / 10000).toLocaleString()}만 원`;
  }
  return `${sign}${abs.toLocaleString()} 원`;
}

export default function ArcadeStage({
  year,
  yearData,
  assets,
  loan,
  leverage,
  allocations,
  onSetAlloc,
  onCycleLoan,
  onCycleLeverage,
  onExecuteTrade,
  isTrading,
  onOpenInfo
}) {
  const stocks = yearData.stocks || [];
  
  // 현재 선택된 포커스 종목 (기본값: 첫 번째 종목)
  const [selectedStockCode, setSelectedStockCode] = useState(stocks[0]?.code || '');

  // 연도 바뀔 때 첫 종목으로 자동 선택 및 100% 기본 세팅
  useEffect(() => {
    if (stocks.length > 0) {
      const first = stocks[0].code;
      setSelectedStockCode(first);
      onSetAlloc(first, 100);
    }
  }, [year]);

  const activeStock = stocks.find(s => s.code === selectedStockCode) || stocks[0] || {};
  const activeAlloc = allocations[activeStock.code] || 0;
  const isUp = (activeStock.rate || 0) >= 0;

  // 캔들 차트 미니 캔버스 (실시간 라이브 틱 진동)
  const canvasRef = useRef(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick(t => t + 1);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !activeStock) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    // 미니 그리드
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    for (let y = 14; y < h; y += 14) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    const candleCount = 7;
    const candleWidth = 14;
    const gap = (w - (candleCount * candleWidth)) / (candleCount + 1);
    const midY = h * 0.52;

    const heights = [];
    const colors = [];

    for (let i = 0; i < candleCount - 1; i++) {
      const pseudo = (Math.sin(i * 1.7 + (activeStock.price || 1000) % 5) * 0.2) + ((activeStock.rate || 0) * 0.3);
      colors.push(pseudo >= 0 ? '#ff334b' : '#2f80ed');
      heights.push(Math.max(6, Math.min(26, Math.abs(pseudo) * 80 + 8)));
    }

    // 마지막 캔들 (올해 실제 + 실시간 펄스)
    const pulse = Math.sin(tick * 0.5) * 2;
    colors.push(isUp ? '#ff334b' : '#2f80ed');
    heights.push(Math.max(10, Math.min(38, Math.abs(activeStock.rate || 0) * 90 + pulse + 10)));

    // 추세선
    ctx.beginPath();
    ctx.strokeStyle = '#ffbe1a';
    ctx.lineWidth = 2;
    for (let i = 0; i < candleCount; i++) {
      const cx = gap + i * (candleWidth + gap) + candleWidth / 2;
      const cy = colors[i] === '#ff334b' ? midY - heights[i] / 2 : midY + heights[i] / 2;
      if (i === 0) ctx.moveTo(cx, cy);
      else ctx.lineTo(cx, cy);
    }
    ctx.stroke();

    // 캔들
    for (let i = 0; i < candleCount; i++) {
      const cx = gap + i * (candleWidth + gap);
      const ch = heights[i];
      const col = colors[i];
      const isCUp = col === '#ff334b';
      const cy = isCUp ? midY - ch : midY;

      // 꼬리
      ctx.strokeStyle = col;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx + candleWidth / 2, cy - 4);
      ctx.lineTo(cx + candleWidth / 2, cy + ch + 4);
      ctx.stroke();

      // 몸통
      ctx.fillStyle = col;
      ctx.fillRect(cx, cy, candleWidth, Math.max(4, ch));
    }
  }, [activeStock, tick, isUp]);

  // 캐릭터 말풍선 대사 동적 산출
  const getTraderQuote = () => {
    if (isTrading) return "⚡ 심장이 터질 것 같다! 가즈아아아!!";
    if (leverage >= 5) return "🔥 5배 영끌 풀미수! 인생은 한 방이다!";
    if (loan > 0) return "👺 사채까지 땡겼어... 무조건 상한가 가야 해!";
    if (activeAlloc === 100) return `🚀 ${activeStock.name}에 전 재산 100% 몰빵 완료!`;
    return "어떤 대세 상승주가 쩜상을 칠까?";
  };

  return (
    <div className="arcade-clean-viewport">
      {/* 1. 컴팩트 캐릭터 & 배틀 시어터 ("내용은 내용처럼") */}
      <div className="arcade-theater-box">
        <span className="hud-corner-tl"></span>
        <span className="hud-corner-tr"></span>
        <span className="hud-corner-bl"></span>
        <span className="hud-corner-br"></span>

        <div className="theater-inner">
          {/* 주인공 스프라이트 */}
          <div className="theater-char-wrapper">
            <img 
              src="./assets/sprite_trader.png" 
              alt="김트레이더" 
              className={`theater-trader-img ${isTrading ? 'animate-bounce' : ''}`}
            />
            {/* 사채 사용 시 사채왕 마동석이 뒤에서 붉은 아우라로 압박 */}
            {loan > 0 && (
              <img 
                src="./assets/sprite_loanshark.png" 
                alt="사채왕" 
                className="theater-shark-shadow animate-pulse"
                title="원금 못 갚으면 큰일납니다!"
              />
            )}
          </div>

          {/* 중앙 말풍선 & 실시간 ECG 파동 */}
          <div className="theater-dialog-area">
            <div className="theater-speech-bubble">
              <span className="speech-quote">"{getTraderQuote()}"</span>
            </div>

            {/* 미니 심박수 게이지 */}
            <div className="theater-heart-strip">
              <span className="heart-icon animate-pulse">💓</span>
              <span className="heart-rate-text text-bull font-mono font-black">
                {75 + (leverage * 12) + (loan > 0 ? 30 : 0) + (isTrading ? 45 : 0)} BPM
              </span>
              <span className="text-[10px] text-slate-400 ml-1">
                {leverage >= 3 ? '위험 수치!' : '안정'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 메인 액티브 종목 카드 (스프라이트 프레임 card_frame.png 탑재) */}
      <div className="arcade-active-stock-card sprite-framed">
        <img 
          src="./assets/card_frame.png" 
          alt="Card Frame" 
          className="card-frame-sprite-bg" 
        />
        
        <div className="active-stock-inner-content">
          <div className="active-stock-header">
            <div className="flex items-center gap-1.5">
              <span className="stock-code-pill font-mono">{activeStock.code}</span>
              <h2 className="active-stock-name text-lg font-black m-0 tracking-tight text-amber-300">
                {activeStock.name}
              </h2>
              <button
                type="button"
                className="btn-arcade-info"
                onClick={() => onOpenInfo({
                  title: `${activeStock.name} (${activeStock.code})`,
                  content: activeStock.detail,
                  tip: `${activeStock.name}은 ${isUp ? '해당 연도 대세 상승을 주도' : '역사적 조정'}을 겪었습니다.`
                })}
              >
                i
              </button>
            </div>

            <div className="text-right">
              <div className="text-base font-black font-mono">
                {activeStock.price?.toLocaleString()}
                <span className="text-xs text-slate-400 font-normal ml-0.5">원</span>
              </div>
              <div className={`text-xs font-black font-mono ${isUp ? 'text-bull' : 'text-bear'}`}>
                {isUp ? '▲ +' : '▼ '}{((activeStock.rate || 0) * 100).toFixed(1)}%
                {Math.abs(activeStock.rate || 0) >= 0.28 && (
                  <span className="ml-1 px-1 rounded bg-red-950 text-red-300 border border-red-600 text-[10px]">
                    ★ 쩜상
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* 캔들 차트 */}
          <div className="active-stock-canvas-wrap">
            <canvas ref={canvasRef} width={300} height={58} className="w-full h-[58px] block" />
            <div className="canvas-badge-live">
              <span className="live-dot animate-ping"></span>
              LIVE TICKS
            </div>
          </div>

          {/* 비중 표시 바 */}
          <div className="active-stock-alloc-indicator">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="text-slate-300 font-bold">투자 체결 비중</span>
              <span className={`font-mono font-black ${activeAlloc === 100 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {activeAlloc}% {activeAlloc === 100 ? '(올인 몰빵!)' : ''}
              </span>
            </div>
            <div className="alloc-track-bar">
              <div 
                className="alloc-track-fill" 
                style={{ width: `${activeAlloc}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 1-탭 종목 전환 셀렉터 독 (3종목 원터치 탭) */}
      <div className="stock-selector-dock">
        {stocks.map((s) => {
          const isSelected = s.code === activeStock.code;
          const sAlloc = allocations[s.code] || 0;
          const sUp = (s.rate || 0) >= 0;
          return (
            <button
              key={s.code}
              type="button"
              onClick={() => {
                sound.playBuy();
                setSelectedStockCode(s.code);
                onSetAlloc(s.code, 100);
              }}
              className={`stock-selector-chip ${isSelected ? 'active' : ''}`}
            >
              <div className="chip-name font-bold truncate">{s.name}</div>
              <div className={`chip-rate text-xs font-mono font-black ${sUp ? 'text-bull' : 'text-bear'}`}>
                {sUp ? '+' : ''}{((s.rate || 0) * 100).toFixed(0)}%
              </div>
              {sAlloc > 0 && (
                <span className="chip-alloc-badge">{sAlloc}%</span>
              )}
            </button>
          );
        })}
      </div>

      {/* 4. 순수 그래픽 스프라이트 아케이드 버튼 콘솔 ("버튼은 진짜 게임 버튼 스프라이트로!") */}
      <div className="arcade-controller-console">
        {/* 상단 3개 3D 게임 스프라이트 액션 버튼 */}
        <div className="arcade-btn-row">
          {/* 사채 대출 스프라이트 버튼 */}
          <button
            type="button"
            onClick={() => {
              sound.playBuy();
              onCycleLoan();
            }}
            className={`btn-sprite-button ${loan > 0 ? 'active' : ''}`}
            title="명동 사채 차입"
          >
            <img 
              src="./assets/btn_loanshark.png" 
              alt="사채 버튼" 
              className="btn-sprite-texture" 
            />
            <div className="btn-sprite-overlay-text">
              <span className="btn-sprite-title">명동 사채</span>
              <span className="btn-sprite-val text-red-200">
                {loan > 0 ? formatKRW(loan) : '0원 (클릭)'}
              </span>
            </div>
          </button>

          {/* 신용 레버리지 스프라이트 버튼 */}
          <button
            type="button"
            onClick={() => {
              sound.playBuy();
              onCycleLeverage();
            }}
            className={`btn-sprite-button ${leverage > 1 ? 'active' : ''}`}
            title="신용 미수 레버리지"
          >
            <img 
              src="./assets/btn_leverage.png" 
              alt="레버리지 버튼" 
              className="btn-sprite-texture" 
            />
            <div className="btn-sprite-overlay-text">
              <span className="btn-sprite-title">신용 레버리지</span>
              <span className="btn-sprite-val text-cyan-200">
                x{leverage}배 {leverage === 5 ? '🔥영끌' : leverage === 3 ? '불나방' : leverage === 2 ? '야수' : '기본'}
              </span>
            </div>
          </button>

          {/* 100% 몰빵 스프라이트 버튼 */}
          <button
            type="button"
            onClick={() => {
              sound.playBuy();
              onSetAlloc(activeStock.code, 100);
            }}
            className="btn-sprite-button"
            title="선택 종목 100% 올인"
          >
            <img 
              src="./assets/btn_allin.png" 
              alt="올인 버튼" 
              className="btn-sprite-texture" 
            />
            <div className="btn-sprite-overlay-text">
              <span className="btn-sprite-title">몰빵 세팅</span>
              <span className="btn-sprite-val text-emerald-200">100% 올인</span>
            </div>
          </button>
        </div>

        {/* 하단: 초특대 3D 아케이드 레드 푸시 버튼 (btn_big_red.png 스프라이트 탑재) */}
        <div className="arcade-big-button-wrapper">
          <button
            type="button"
            disabled={isTrading}
            onClick={() => {
              sound.playArcadePush();
              onExecuteTrade();
            }}
            className={`mega-red-sprite-btn ${isTrading ? 'trading' : ''}`}
          >
            <img 
              src="./assets/btn_big_red.png" 
              alt="장 개장 버튼" 
              className="mega-red-sprite-img" 
            />
            <div className="mega-red-btn-label">
              <Flame size={24} className="inline mr-1 text-yellow-300 animate-pulse" />
              <span>{isTrading ? '⚡ 주문 체결 중...' : `${year}년 장 개장 (주문 전송)`}</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
