import React, { useEffect, useRef, useState } from 'react';
import { TrendingUp, TrendingDown, Zap, BarChart3, Activity, Flame } from 'lucide-react';
import { sound } from '../utils/audio';

// 개별 종목 실시간 캔들스틱 & 호가창 아케이드 카드
function StockArcadeCard({ stock, alloc, onSetAlloc, isTrading }) {
  const canvasRef = useRef(null);
  const isUp = stock.rate >= 0;
  const [liveTicks, setLiveTicks] = useState(0);

  // 실시간 호가창 미세 진동 시뮬레이션
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveTicks(prev => prev + 1);
    }, 450 + Math.random() * 300);
    return () => clearInterval(interval);
  }, []);

  // 캔들스틱 차트 캔버스 드로잉 (실시간 틱 진동 & 이동평균선 & 320px 반응형)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // 부모 컨테이너 너비에 맞춰 캔버스 해상도 자동 동기화 (320px 완벽 대응)
    const parentWidth = canvas.parentElement?.clientWidth || 260;
    canvas.width = parentWidth;
    canvas.height = 70;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // 배경 그리드 라인
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let gy = 15; gy < height; gy += 18) {
      ctx.beginPath();
      ctx.moveTo(0, gy);
      ctx.lineTo(width, gy);
      ctx.stroke();
    }

    // 화면 너비에 맞춘 동적 캔들 개수 및 너비 계산 (최소 5개 ~ 최대 8개)
    const candleCount = Math.max(5, Math.min(8, Math.floor(width / 34)));
    const candleWidth = Math.max(9, Math.floor(width / (candleCount * 2.3)));
    const totalCandlesWidth = candleWidth * candleCount;
    const gap = Math.max(2, (width - totalCandlesWidth) / (candleCount + 1));
    const midY = height * 0.52;

    const candleColors = [];
    const candleHeights = [];

    // 과거 6개 캔들 (역사적 추세 시뮬레이션)
    for (let i = 0; i < candleCount - 1; i++) {
      const pseudoRate = (Math.sin(i * 1.5 + stock.price % 7) * 0.15) + (stock.rate * 0.4);
      candleColors.push(pseudoRate >= 0 ? '#ff334b' : '#2f80ed');
      candleHeights.push(Math.max(8, Math.min(32, Math.abs(pseudoRate) * 120 + 10)));
    }

    // 마지막 7번째 캔들: 올해 실제 결과 + 미세 펄스
    const currentPulse = Math.sin(liveTicks * 0.4) * 2;
    candleColors.push(isUp ? '#ff334b' : '#2f80ed');
    candleHeights.push(Math.max(12, Math.min(45, Math.abs(stock.rate) * 110 + currentPulse + 14)));

    // 이동평균선 경로
    ctx.beginPath();
    ctx.strokeStyle = '#ffbe1a';
    ctx.lineWidth = 1.5;
    ctx.shadowBlur = 4;
    ctx.shadowColor = 'rgba(255, 190, 26, 0.5)';

    for (let i = 0; i < candleCount; i++) {
      const cx = gap + i * (candleWidth + gap) + candleWidth / 2;
      const h = candleHeights[i];
      const isCandleUp = candleColors[i] === '#ff334b';
      const cy = isCandleUp ? midY - h / 2 : midY + h / 2;
      if (i === 0) ctx.moveTo(cx, cy);
      else ctx.lineTo(cx, cy);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    // 캔들 본체 및 윗꼬리/아랫꼬리 그리기
    for (let i = 0; i < candleCount; i++) {
      const cx = gap + i * (candleWidth + gap);
      const h = candleHeights[i];
      const color = candleColors[i];
      const isCandleUp = color === '#ff334b';

      const bodyY = isCandleUp ? midY - h : midY;

      // 꼬리 (Wick)
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx + candleWidth / 2, bodyY - 6);
      ctx.lineTo(cx + candleWidth / 2, bodyY + h + 6);
      ctx.stroke();

      // 캔들 몸통 (Body)
      ctx.fillStyle = color;
      ctx.shadowBlur = (i === candleCount - 1 && isTrading) ? 14 : 4;
      ctx.shadowColor = color;
      ctx.fillRect(cx, bodyY, candleWidth, h);

      // 현재 진행 중인 마지막 캔들에 반짝임 점
      if (i === candleCount - 1) {
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(cx + candleWidth / 2, bodyY + (isCandleUp ? 0 : h), 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }, [stock, liveTicks, isUp, isTrading]);

  // 실시간 5단계 호가창 잔량 계산 (틱마다 미세 변동)
  const baseOrderVol = 1200 + (stock.price % 999);
  const ask1Vol = Math.floor(baseOrderVol * (1 + Math.sin(liveTicks) * 0.25));
  const ask2Vol = Math.floor(baseOrderVol * 0.8 * (1 + Math.cos(liveTicks * 0.7) * 0.2));
  const bid1Vol = Math.floor(baseOrderVol * 1.1 * (1 + Math.sin(liveTicks * 0.8 + 1) * 0.3));
  const bid2Vol = Math.floor(baseOrderVol * 0.9 * (1 + Math.cos(liveTicks * 0.5 + 2) * 0.25));

  const totalVol = ask1Vol + ask2Vol + bid1Vol + bid2Vol;
  const bidPct = Math.round(((bid1Vol + bid2Vol) / totalVol) * 100);

  return (
    <div className={`stock-arcade-card ${alloc > 0 ? 'card-active-alloc' : ''} ${isTrading ? 'card-trading-flash' : ''}`}>
      <span className="hud-corner-tl"></span>
      <span className="hud-corner-br"></span>

      {/* 카드 상단: 종목 정보 & 가격 */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="stock-code-tag">{stock.code}</span>
            <span className="stock-cat-pill">{stock.category}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <h3 className="stock-name-title">{stock.name}</h3>
            {/* 정보 숨김 i 버튼 */}
            <button 
              type="button" 
              onClick={() => onOpenInfo && onOpenInfo({
                title: `${stock.name} (${stock.code}) 실화 팩트`,
                content: stock.detail,
                tip: `${stock.name}은 ${isUp ? '해당 연도 상승 랠리를 주도' : '역사적 급락 및 위기'}를 겪었습니다.`
              })}
              className="btn-arcade-info"
              title="역사적 팩트 보기"
            >
              i
            </button>
          </div>
        </div>

        <div className="text-right">
          <div className="stock-price-display">
            {stock.price.toLocaleString()}
            <span className="text-xs font-normal text-slate-400 ml-0.5">원</span>
          </div>
          <div className={`stock-rate-indicator ${isUp ? 'text-bull' : 'text-bear'}`}>
            {isUp ? '▲ +' : '▼ '}{(stock.rate * 100).toFixed(1)}%
            {Math.abs(stock.rate) >= 0.28 && (
              <span className="text-[10px] ml-1 px-1 rounded bg-red-950 text-red-400 border border-red-700 font-bold">
                {isUp ? '★ 쩜상' : '💀 하한'}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 실시간 캔들스틱 캔버스 뷰 */}
      <div className="candle-canvas-box">
        <canvas ref={canvasRef} width={280} height={70} className="w-full h-full block" />
        <div className="chart-live-badge">
          <span className="live-dot animate-ping"></span>
          LIVE TICKS
        </div>
      </div>

      {/* 실시간 미니 5단계 호가창 게이지 */}
      <div className="orderbook-mini-hud">
        <div className="flex justify-between text-[10px] font-mono mb-1">
          <span className="text-bear">매도: {(ask1Vol + ask2Vol).toLocaleString()}</span>
          <span className="text-bull">매수: {(bid1Vol + bid2Vol).toLocaleString()}</span>
        </div>
        <div className="orderbook-gauge-track">
          <div className="orderbook-gauge-fill-bear" style={{ width: `${100 - bidPct}%` }}></div>
          <div className="orderbook-gauge-fill-bull" style={{ width: `${bidPct}%` }}></div>
        </div>
      </div>

      {/* 투자 비중 슬라이더 & 아케이드 원클릭 버튼 (군더더기 텍스트 완전 제거) */}
      <div className="alloc-control-box">
        <div className="flex justify-between items-center text-xs mb-1 font-mono">
          <span className="text-slate-400">비중 설정</span>
          <span className={`text-sm font-black ${alloc > 0 ? 'text-amber-400' : 'text-slate-500'}`}>
            {alloc}%
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          step="5"
          value={alloc}
          onChange={(e) => onSetAlloc(stock.code, Number(e.target.value))}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
        />

        {/* 아케이드 4단 비중 버튼 */}
        <div className="grid grid-cols-4 gap-1.5 mt-2">
          <button 
            type="button" 
            onClick={() => onSetAlloc(stock.code, 0)} 
            className="btn-arcade-alloc"
          >
            0%
          </button>
          <button 
            type="button" 
            onClick={() => onSetAlloc(stock.code, 25)} 
            className="btn-arcade-alloc"
          >
            25%
          </button>
          <button 
            type="button" 
            onClick={() => onSetAlloc(stock.code, 50)} 
            className="btn-arcade-alloc"
          >
            50%
          </button>
          <button 
            type="button" 
            onClick={() => onSetAlloc(stock.code, 100)} 
            className="btn-arcade-alloc btn-arcade-allin"
          >
            <Flame size={12} className="inline mr-0.5" /> 풀매수
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AnimatedCandleBoard({
  stocks,
  allocations,
  onSetAlloc,
  isTrading,
  onOpenInfo
}) {
  return (
    <div className="candle-board-container">
      <div className="candle-board-header">
        <div className="flex items-center gap-2">
          <Zap size={18} className="text-amber-400 animate-pulse" />
          <h2 className="font-black text-sm text-slate-100 tracking-wide uppercase">
            실시간 HTS 시세판
          </h2>
        </div>
        <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2.5">
          <span className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 bg-bull-red rounded-sm"></span> 상승
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 bg-bear-blue rounded-sm"></span> 하락
          </span>
        </div>
      </div>

      <div className="stock-arcade-grid">
        {stocks.map((stock) => (
          <StockArcadeCard
            key={stock.code}
            stock={stock}
            alloc={allocations[stock.code] || 0}
            onSetAlloc={onSetAlloc}
            isTrading={isTrading}
            onOpenInfo={onOpenInfo}
          />
        ))}
      </div>
    </div>
  );
}
