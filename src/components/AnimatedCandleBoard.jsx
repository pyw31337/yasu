import React from 'react';
import { TrendingUp, TrendingDown, Zap } from 'lucide-react';

export default function AnimatedCandleBoard({
  stocks,
  allocations,
  onSetAlloc,
  isTrading
}) {
  return (
    <div className="candle-board-container">
      <div className="candle-board-header">
        <div className="flex items-center gap-2">
          <Zap size={18} className="text-amber-400 animate-pulse" />
          <span className="font-bold text-sm text-slate-200">실시간 상장 종목 캔들 시세판</span>
        </div>
        <div className="text-xs text-slate-400">
          * 붉은 양봉(상승) / 파란 음봉(하락)
        </div>
      </div>

      <div className="stock-candle-grid">
        {stocks.map((stock) => {
          const alloc = allocations[stock.code] || 0;
          const isUp = stock.rate >= 0;

          return (
            <div
              key={stock.code}
              className={`stock-candle-card ${alloc > 0 ? 'card-selected' : ''} ${isTrading ? 'card-trading' : ''}`}
            >
              {/* Card Top */}
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="stock-code-tag">{stock.code}</span>
                  <h4 className="stock-name-title">{stock.name}</h4>
                  <span className="stock-cat-pill">{stock.category}</span>
                </div>
                <div className="text-right">
                  <div className="stock-price-display">{stock.price.toLocaleString()}원</div>
                  <div className={`stock-rate-indicator ${isUp ? 'text-bull' : 'text-bear'}`}>
                    {isUp ? '▲ +' : '▼ '}{(stock.rate * 100).toFixed(1)}%
                  </div>
                </div>
              </div>

              {/* Animated Visual Candle Bar */}
              <div className="candle-visual-area">
                <div className="candle-stick-line"></div>
                <div
                  className={`candle-body-box ${isUp ? 'bg-bull' : 'bg-bear'}`}
                  style={{
                    height: `${Math.min(100, Math.max(25, Math.abs(stock.rate) * 80))}%`
                  }}
                >
                  <span className="candle-glow-dot"></span>
                </div>
              </div>

              {/* Historical Note Description */}
              <div className="stock-history-snippet">
                {stock.detail}
              </div>

              {/* Allocation Slider & Quick Buttons */}
              <div className="alloc-control-box">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">투자 배분</span>
                  <span className={`font-mono font-bold ${alloc > 0 ? 'text-amber-400' : 'text-slate-500'}`}>
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
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />

                <div className="grid grid-cols-4 gap-1 mt-2">
                  <button type="button" onClick={() => onSetAlloc(stock.code, 0)} className="btn-alloc-chip">0%</button>
                  <button type="button" onClick={() => onSetAlloc(stock.code, 25)} className="btn-alloc-chip">25%</button>
                  <button type="button" onClick={() => onSetAlloc(stock.code, 50)} className="btn-alloc-chip">50%</button>
                  <button type="button" onClick={() => onSetAlloc(stock.code, 100)} className="btn-alloc-chip btn-allin-red">풀매수🚀</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
