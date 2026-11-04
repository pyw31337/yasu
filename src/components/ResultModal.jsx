import React, { useEffect } from 'react';
import { TrendingUp, TrendingDown, AlertOctagon, CheckCircle2, Award, ArrowRight } from 'lucide-react';
import { sound } from '../utils/audio';
import { fireJackpotConfetti } from '../utils/fx';

function formatKRW(val) {
  if (Math.abs(val) >= 100000000) {
    const eok = Math.floor(val / 100000000);
    const man = Math.floor((Math.abs(val) % 100000000) / 10000);
    return `${eok}억 ${man > 0 ? man.toLocaleString() + '만' : ''} 원`;
  }
  if (Math.abs(val) >= 10000) {
    return `${Math.floor(val / 10000).toLocaleString()}만 원`;
  }
  return `${val.toLocaleString()} 원`;
}

export default function ResultModal({ resultData, onNextYear, onRestart }) {
  if (!resultData) return null;

  const isProfit = resultData.netProfit >= 0;
  const isBankrupt = resultData.isGameOver;

  useEffect(() => {
    if (resultData.isMarginCall) {
      sound.playMarginCall();
    } else if (isBankrupt) {
      sound.playCrash();
    } else if (isProfit && resultData.returnRate > 0.3) {
      sound.playJackpot();
      fireJackpotConfetti();
    } else if (isProfit) {
      sound.playJackpot();
    } else {
      sound.playCrash();
    }
  }, [resultData]);

  return (
    <div className="modal-backdrop">
      <div className={`result-container ${isProfit ? 'profit-glow' : 'loss-glow'}`}>
        <div className="result-header">
          <div className="result-year-badge">{resultData.year}년 투자 결산</div>
          
          {/* 비주얼 스프라이트 덩어리 연출 */}
          <div className="result-sprite-stage">
            {isProfit ? (
              <div className="jackpot-visual-badge">
                <img 
                  src="./assets/item_cash_gold.png" 
                  alt="골드바 돈다발 잭팟" 
                  className="result-cash-sprite-img" 
                />
                <div className="jackpot-aura-rays"></div>
              </div>
            ) : (
              <div className="panic-visual-badge">
                <img 
                  src="./assets/sprite_panicked_ant.png" 
                  alt="패닉 개미 투자자" 
                  className="result-panic-sprite-img" 
                />
              </div>
            )}
          </div>

          <h2 className={`result-title ${isProfit ? 'text-bull' : 'text-bear'}`}>
            {isBankrupt ? '💀 깡통 및 파산 (GAME OVER)' : isProfit ? '🔥 인생역전 떡상 성공!' : '📉 뼈아픈 손실 기록'}
          </h2>
          <div className="result-net-profit">
            순손익: <span className={isProfit ? 'text-bull' : 'text-bear'}>
              {isProfit ? '+' : ''}{formatKRW(resultData.netProfit)} ({(resultData.returnRate * 100).toFixed(1)}%)
            </span>
          </div>
        </div>

        {/* 마진콜 경고 알림 */}
        {resultData.isMarginCall && (
          <div className="margin-call-banner">
            <AlertOctagon size={22} color="#ff334b" />
            <div>
              <strong>[비상 사이렌] 담보비율 미달 반대매매(강제청산) 집행!</strong>
              <p>과도한 레버리지로 인해 증권사에서 장 개시 직후 시장가로 강제 투매 처분했습니다.</p>
            </div>
          </div>
        )}

        {/* 종목별 성적표 */}
        <div className="stock-result-list">
          <div className="stock-result-header">종목별 투자 결과 및 역사적 팩트</div>
          {resultData.stockResults.map((s) => (
            <div key={s.code} className="stock-result-item">
              <div className="stock-result-left">
                <div className="stock-result-name">
                  <strong>{s.name}</strong> <span className="stock-code">{s.code}</span>
                </div>
                <div className="stock-result-detail">{s.detail}</div>
              </div>
              <div className="stock-result-right">
                <div className={`stock-result-rate ${s.rate >= 0 ? 'text-bull' : 'text-bear'}`}>
                  {s.rate >= 0 ? '+' : ''}{(s.rate * 100).toFixed(1)}%
                </div>
                <div className="stock-result-profit">
                  {s.profit >= 0 ? '+' : ''}{formatKRW(Math.floor(s.profit))}
                </div>
              </div>
            </div>
          ))}

          {resultData.loan > 0 && (
            <div className="stock-result-item loan-item">
              <div className="stock-result-left">
                <div className="stock-result-name">
                  <strong>명동 사채 상환</strong> (원금 + 이자)
                </div>
                <div className="stock-result-detail">
                  원금 {formatKRW(resultData.loan)} 상환 및 고리 이자 {formatKRW(Math.floor(resultData.loanInterest))} 지출
                </div>
              </div>
              <div className="stock-result-right text-bear">
                -{formatKRW(Math.floor(resultData.loan + resultData.loanInterest))}
              </div>
            </div>
          )}
        </div>

        {/* 자산 상태 및 티어 */}
        <div className="asset-tier-box" style={{ borderColor: resultData.assetTier.color }}>
          <div className="tier-badge" style={{ backgroundColor: resultData.assetTier.color }}>
            {resultData.assetTier.badge}
          </div>
          <div className="tier-info">
            <div className="tier-title">{resultData.assetTier.title}</div>
            <div className="tier-lifestyle">{resultData.assetTier.lifestyle}</div>
          </div>
          <div className="tier-total">
            최종 자산: <strong>{formatKRW(resultData.finalAssets)}</strong>
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="result-footer">
          {isBankrupt ? (
            <button className="btn-trade btn-bankrupt" onClick={onRestart}>
              처음부터 다시 도전 (1980년)
            </button>
          ) : (
            <button className="btn-trade btn-next-year" onClick={onNextYear}>
              다음 연도로 진행하기 <ArrowRight size={18} style={{ marginLeft: 6 }} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
