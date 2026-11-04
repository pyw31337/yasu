import React, { useState, useEffect } from 'react';
import {
  HISTORICAL_YEARS,
  YEAR_LIST
} from './data/historicalData';
import {
  INITIAL_ASSETS,
  MAX_LEVERAGE,
  getYearData,
  getNextYear,
  processYearInvestment
} from './logic/gameEngine';
import { getAssetTier } from './data/assetTiers';
import { sound } from './utils/audio';
import { fireVictoryCannon } from './utils/fx';
import NewspaperModal from './components/NewspaperModal';
import ResultModal from './components/ResultModal';
import OfficeStage from './components/OfficeStage';
import AnimatedCandleBoard from './components/AnimatedCandleBoard';
import {
  TrendingUp,
  TrendingDown,
  Volume2,
  VolumeX,
  Newspaper,
  Flame,
  ShieldAlert,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Trophy,
  DollarSign
} from 'lucide-react';
import './App.css';

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

export default function App() {
  const [gameState, setGameState] = useState('LOBBY'); // LOBBY, PLAYING, GAMEOVER, VICTORY
  const [year, setYear] = useState(1980);
  const [assets, setAssets] = useState(INITIAL_ASSETS);
  const [history, setHistory] = useState([]);
  const [isMuted, setIsMuted] = useState(false);

  // 현재 연도 데이터
  const yearData = getYearData(year);

  // 모달 및 애니메이션 제어
  const [showNewspaper, setShowNewspaper] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [isTrading, setIsTrading] = useState(false);

  // 주문 설정
  const [loan, setLoan] = useState(0); // 사채
  const [leverage, setLeverage] = useState(1); // 1~5배
  const [allocations, setAllocations] = useState({}); // { [code]: percentage }

  // 연도 바뀔 때마다 신문 팝업 띄우고 주문 초기화
  useEffect(() => {
    if (gameState === 'PLAYING') {
      setShowNewspaper(true);
      sound.playNewspaper();
      // 초기 종목 비중 균등 또는 0으로 리셋
      setAllocations({});
      setLoan(0);
      setLeverage(1);
    }
  }, [year, gameState]);

  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const startGame = () => {
    sound.init();
    sound.playBuy();
    setYear(1980);
    setAssets(INITIAL_ASSETS);
    setHistory([]);
    setAllocations({});
    setLoan(0);
    setLeverage(1);
    setResultData(null);
    setIsTrading(false);
    setGameState('PLAYING');
  };

  // 특정 종목에 비중 설정
  const handleSetAlloc = (code, pct) => {
    sound.playBuy();
    setAllocations(prev => {
      const next = { ...prev };
      if (pct === 100) {
        // 몰빵: 다른 종목 전부 0
        Object.keys(next).forEach(k => { next[k] = 0; });
        next[code] = 100;
      } else {
        next[code] = pct;
      }
      return next;
    });
  };

  // 총 비중 합계 계산
  const totalAllocatedPct = Object.values(allocations).reduce((a, b) => a + b, 0);

  // 투자 실행 (장 개장 & 야수의 심장 발동 애니메이션)
  const handleExecuteTrade = () => {
    sound.init();
    sound.playBuy();
    setIsTrading(true);

    const calculatedResult = processYearInvestment({
      year,
      currentAssets: assets,
      loan,
      leverage,
      allocations
    });

    // 800ms 동안 차트 펄스와 캐릭터 집중 애니메이션을 보여준 후 결산창 오픈
    setTimeout(() => {
      setIsTrading(false);
      setResultData(calculatedResult);
    }, 750);
  };

  // 다음 해로 진행
  const handleAdvanceYear = () => {
    if (!resultData) return;

    const nextAssets = resultData.finalAssets;
    const historyItem = {
      year,
      assets: nextAssets,
      profit: resultData.netProfit,
      returnRate: resultData.returnRate,
      isMarginCall: resultData.isMarginCall
    };
    const nextHistory = [...history, historyItem];
    setHistory(nextHistory);
    setAssets(nextAssets);
    setResultData(null);

    if (resultData.isGameOver) {
      setGameState('GAMEOVER');
      return;
    }

    const nextYear = getNextYear(year);
    if (!nextYear) {
      // 2026년 최종 승리
      setGameState('VICTORY');
      fireVictoryCannon();
      sound.playVictory();
    } else {
      setYear(nextYear);
    }
  };

  const currentTier = getAssetTier(assets);
  const totalAvailableCapital = (assets + loan) * leverage;
  const maxLoanPossible = Math.max(0, assets * 3); // 자산의 최대 3배까지 사채 대출 가능

  // ==================== LOBBY SCREEN ====================
  if (gameState === 'LOBBY') {
    return (
      <div className="hero-lobby">
        <h1 className="hero-title text-bull">🔥 야수의 심장</h1>
        <p className="hero-subtitle">대한민국 증시 50년사 (1980 ~ 2026) 주식투자 시뮬레이션</p>

        <div className="lobby-feature-list">
          <div className="feature-item">
            <Sparkles size={22} color="#ffbe1a" />
            <div>
              <strong>실존 역사 사건 & 경제 충격 재현</strong>
              <p style={{ margin: '4px 0 0 0', color: 'var(--text-muted)' }}>
                이철희·장영자 어음 사기, 88 올림픽, 깡통계좌 정리, IMF 외환위기, 닷컴버블, 금융위기, 코로나 동학개미, 2차전지 광풍, AI 반도체까지 실화 바탕 100% 반영!
              </p>
            </div>
          </div>

          <div className="feature-item">
            <DollarSign size={22} color="#00f37c" />
            <div>
              <strong>실제 상장 종목코드 & 당시 환율/금리</strong>
              <p style={{ margin: '4px 0 0 0', color: 'var(--text-muted)' }}>
                삼성전자(005930), 조흥은행, 새롬기술(035610), 신풍제약, 에코프로(086520) 등 실존 종목들의 실제 주가 폭등과 부도 스토리 수록.
              </p>
            </div>
          </div>

          <div className="feature-item">
            <Flame size={22} color="#ff334b" />
            <div>
              <strong>극상의 도파민: 사채 & 5배 풀레버리지 & 반대매매</strong>
              <p style={{ margin: '4px 0 0 0', color: 'var(--text-muted)' }}>
                인생 역전을 위한 영끌 풀미수! 쩜상 폭죽과 반대매매 사이렌의 짜릿한 손맛을 느껴보세요.
              </p>
            </div>
          </div>
        </div>

        <button className="btn-fire-order" onClick={startGame}>
          <Flame size={24} /> 1980년 명동 사채골목에서 게임 시작 (초기 자본 1,000만원)
        </button>
      </div>
    );
  }

  // ==================== GAME OVER SCREEN ====================
  if (gameState === 'GAMEOVER') {
    return (
      <div className="hero-lobby">
        <h1 className="hero-title text-bear" style={{ fontSize: '3rem' }}>💀 깡통 및 파산</h1>
        <p className="hero-subtitle" style={{ color: 'var(--bear-blue)' }}>
          {year}년, 모든 자산을 잃고 신용불량자로 전락했습니다.
        </p>

        <div className="lobby-feature-list" style={{ borderColor: 'var(--bear-blue)', textAlign: 'center' }}>
          <ShieldAlert size={48} color="#ff334b" style={{ margin: '0 auto 1rem auto' }} />
          <h3 style={{ margin: '0 0 0.5rem 0' }}>현재 마포대교 한강 수온: 14.8 ℃</h3>
          <p style={{ color: 'var(--text-muted)' }}>
            과도한 사채와 레버리지로 인해 반대매매가 집행되었거나 상장폐지 폭탄을 맞았습니다.<br />
            최종 잔고: <strong>{formatKRW(assets)}</strong>
          </p>
        </div>

        <button className="btn-fire-order" onClick={startGame}>
          <RotateCcw size={22} /> 다시 1980년으로 환생하기
        </button>
      </div>
    );
  }

  // ==================== VICTORY SCREEN ====================
  if (gameState === 'VICTORY') {
    const totalReturnRate = ((assets - INITIAL_ASSETS) / INITIAL_ASSETS) * 100;
    return (
      <div className="hero-lobby">
        <h1 className="hero-title text-gold" style={{ fontSize: '3.2rem' }}>👑 전설의 월가 투신</h1>
        <p className="hero-subtitle">1980년부터 2026년까지 50년 대한민국 격동의 증시를 정복했습니다!</p>

        <div className="lobby-feature-list" style={{ borderColor: '#ffbe1a' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <Trophy size={56} color="#ffbe1a" style={{ margin: '0 auto 0.5rem auto' }} />
            <h2 style={{ fontSize: '2rem', margin: '0.4rem 0' }} className="text-gold">
              최종 순자산: {formatKRW(assets)}
            </h2>
            <div style={{ fontSize: '1.2rem', color: 'var(--bull-red)', fontWeight: 800 }}>
              총 수익률: +{totalReturnRate.toLocaleString()}%
            </div>
          </div>

          <div style={{ background: '#17202c', padding: '1rem', borderRadius: '8px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-gold)' }}>획득한 전설의 칭호:</h4>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
              • {currentTier.title}<br />
              • {currentTier.lifestyle}<br />
              • IMF와 닷컴버블, 리먼 브라더스, 코로나를 모두 이겨낸 불멸의 야수
            </div>
          </div>
        </div>

        <button className="btn-fire-order" onClick={startGame}>
          <RotateCcw size={22} /> 새로운 야수의 심장으로 재도전
        </button>
      </div>
    );
  }

  // ==================== MAIN PLAYING SCREEN ====================
  return (
    <div className="app-wrapper">
      {/* 탑 네비게이션 바 */}
      <div className="top-nav">
        <div className="nav-left">
          <div className="year-indicator">{year}년</div>
          <div className="era-tag">{yearData.era}</div>
        </div>

        <div className="nav-indices">
          <div className="index-chip">
            KOSPI <strong>{yearData.kospi}</strong> ({yearData.kospiChange >= 0 ? '+' : ''}{(yearData.kospiChange * 100).toFixed(1)}%)
          </div>
          <div className="index-chip">
            환율 <strong>{yearData.exchangeRate}원</strong>
          </div>
          <div className="index-chip">
            금리 <strong>{yearData.interestRate}%</strong>
          </div>
        </div>

        <div className="nav-actions">
          <button className="btn-icon" onClick={() => setShowNewspaper(true)}>
            <Newspaper size={16} /> 호외 특보
          </button>
          <button className="btn-icon" onClick={toggleSound}>
            {isMuted ? <VolumeX size={16} color="#ff334b" /> : <Volume2 size={16} color="#00f37c" />}
          </button>
        </div>
      </div>

      {/* 자산 상태 배너 */}
      <div className="asset-summary-card">
        <div>
          <div className="asset-main-title">현재 보유 순자산</div>
          <div className="asset-main-value text-bull">{formatKRW(assets)}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            원금 대비: {assets >= INITIAL_ASSETS ? '+' : ''}{(((assets - INITIAL_ASSETS) / INITIAL_ASSETS) * 100).toFixed(1)}%
          </div>
        </div>

        <div className="asset-tier-pill" style={{ borderColor: currentTier.color }}>
          <div className="tier-badge-icon">{currentTier.badge.split(' ')[0]}</div>
          <div>
            <div className="tier-label-name" style={{ color: currentTier.color }}>{currentTier.title}</div>
            <div className="tier-label-sub">{currentTier.lifestyle}</div>
          </div>
        </div>
      </div>

      {/* 16-BIT RETRO ANIMATED OFFICE STAGE (그래픽 오피스 & 캐릭터 스프라이트 무대) */}
      <OfficeStage
        year={year}
        assets={assets}
        tier={currentTier}
        loan={loan}
        isTrading={isTrading}
        lastResult={resultData}
      />

      {/* ANIMATED CANDLE BOARD (실시간 호가 시세판 & 캔들 차트) */}
      <AnimatedCandleBoard
        stocks={yearData.stocks}
        allocations={allocations}
        onSetAlloc={handleSetAlloc}
        isTrading={isTrading}
      />

      {/* 주문 터미널 (야수의 심장 콘솔) */}
      <div className="order-terminal">
        <div className="terminal-header">
          <div className="terminal-title">
            <Flame size={22} /> 야수의 심장 트레이딩 콘솔
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            명동 사채와 신용 미수로 레버리지를 극대화하세요
          </div>
        </div>

        <div className="terminal-grid">
          {/* 사채 차입 슬라이더 */}
          <div className="terminal-control-group">
            <div className="control-label">
              <span>명동 사채 대출 (사채왕 마동석)</span>
              <span className="text-bear">{formatKRW(loan)}</span>
            </div>
            <input
              type="range"
              min="0"
              max={maxLoanPossible}
              step={Math.max(1000000, Math.floor(maxLoanPossible / 20))}
              value={loan}
              onChange={(e) => setLoan(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--bull-red)' }}
            />
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
              * 연이율 {(yearData.interestRate + 15).toFixed(1)}% (원금 미상환 시 반대매매 및 담보몰수)
            </div>
          </div>

          {/* 신용 레버리지 선택 버튼 */}
          <div className="terminal-control-group">
            <div className="control-label">
              <span>신용 미수 레버리지</span>
              <span className="text-bull" style={{ fontWeight: 800 }}>x{leverage} 배</span>
            </div>
            <div className="leverage-btn-group">
              {[1, 2, 3, 5].map((lvl) => (
                <button
                  key={lvl}
                  className={`btn-leverage ${leverage === lvl ? 'active' : ''}`}
                  onClick={() => {
                    sound.playBuy();
                    setLeverage(lvl);
                  }}
                >
                  {lvl === 1 ? '1x 기본' : lvl === 2 ? '2x 야수' : lvl === 3 ? '3x 불나방' : '5x 영끌🔥'}
                </button>
              ))}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
              * 레버리지 활용 시 원금 초과 손실 및 반대매매(강제청산) 위험 존재
            </div>
          </div>
        </div>

        {/* 최종 주문 예상 요약 */}
        <div className="terminal-summary-row">
          <div>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>총 가용 투자금: </span>
            <strong style={{ fontSize: '1.25rem', color: 'var(--accent)' }}>
              {formatKRW(totalAvailableCapital)}
            </strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>실제 주문 체결액: </span>
            <strong style={{ fontSize: '1.25rem' }}>
              {formatKRW(totalAvailableCapital * (Math.min(100, totalAllocatedPct) / 100))}
            </strong>
          </div>
        </div>

        <button
          className="btn-fire-order"
          disabled={totalAllocatedPct > 100 || isTrading}
          onClick={handleExecuteTrade}
        >
          <Flame size={24} /> {isTrading ? '⚡ 주문 체결 중...' : `${year}년 장 개장 및 주문 전송 (야수의 심장 발동!)`}
        </button>
      </div>

      {/* 신문 호외 모달 */}
      {showNewspaper && (
        <NewspaperModal
          yearData={yearData}
          onClose={() => setShowNewspaper(false)}
        />
      )}

      {/* 투자 결산 모달 */}
      {resultData && (
        <ResultModal
          resultData={resultData}
          onNextYear={handleAdvanceYear}
          onRestart={startGame}
        />
      )}
    </div>
  );
}
