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
import BeastHeartRate from './components/BeastHeartRate';
import RollingNumber from './components/RollingNumber';
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

  const startGame = (startYear = 1980) => {
    sound.init();
    sound.playBuy();
    const initialCapital = startYear === 1980 ? INITIAL_ASSETS :
                           startYear === 1997 ? 50000000 :
                           startYear === 1999 ? 100000000 : 200000000;
    setYear(startYear);
    setAssets(initialCapital);
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

  // ==================== LOBBY SCREEN (AAA 메이저 게임 스타일) ====================
  if (gameState === 'LOBBY') {
    return (
      <div className="hero-lobby-container">
        <div className="hero-lobby-bg" style={{ backgroundImage: "url('./assets/key_art.jpg')" }}></div>
        <div className="hero-lobby-overlay"></div>

        <div className="hero-lobby">
          <div className="hero-badge-top">
            <Flame size={16} /> AAA CINEMATIC K-STOCK SURVIVAL SIMULATION
          </div>
          <h1 className="hero-title">야수의 심장</h1>
          <p className="hero-subtitle">THE HEART OF THE BEAST : 1980 ~ 2026 대한민국 증시 50년사</p>

          {/* 주요 등장인물 쇼케이스 카드 */}
          <div className="lobby-character-showcase">
            <div className="character-card card-trader">
              <div className="card-avatar-wrapper">
                <img src="./assets/sprite_trader.png" alt="김트레이더" className="card-avatar-img" />
              </div>
              <div>
                <div className="card-char-name text-amber-400">김트레이더 (주인공)</div>
                <div className="card-char-role">🔥 야수의 심장을 품은 청년 투자자</div>
                <p className="card-char-quote">"1천만 원 종잣돈으로 1조 원 신화를 쓰고 여의도 꼭대기 펜트하우스로 간다!"</p>
              </div>
            </div>

            <div className="character-card card-shark">
              <div className="card-avatar-wrapper">
                <img src="./assets/sprite_loanshark.png" alt="사채왕 마동석" className="card-avatar-img" />
              </div>
              <div>
                <div className="card-char-name text-bull">명동 사채왕 마동석</div>
                <div className="card-char-role">👺 지하 금융가 거물 (연이율 35%)</div>
                <p className="card-char-quote">"이봐 김 사장, 원금 못 갚으면 각서대로 손모가지 날아가는 거야. 땡겨줄까?"</p>
              </div>
            </div>
          </div>

          <div className="lobby-feature-list">
            <div className="feature-item">
              <Sparkles size={22} color="#ffbe1a" />
              <div>
                <strong>실존 역사 사건 & 경제 충격 100% 실화 재현</strong>
                <p style={{ margin: '4px 0 0 0', color: 'var(--text-muted)' }}>
                  장영자 어음 사기, 88 올림픽, 깡통계좌 정리, 1997 IMF 외환위기, 1999 닷컴버블, 2008 리먼브라더스, 2020 동학개미, 2023 2차전지, 2024 AI 반도체까지 총망라!
                </p>
              </div>
            </div>

            <div className="feature-item">
              <DollarSign size={22} color="#00f37c" />
              <div>
                <strong>실제 종목코드 & 당시 환율/금리 리얼 반영</strong>
                <p style={{ margin: '4px 0 0 0', color: 'var(--text-muted)' }}>
                  삼성전자(005930), 현대차, 새롬기술(035610), 신풍제약, 에코프로(086520) 등 역사적 상장 종목들의 실제 주가 폭등과 부도 스토리.
                </p>
              </div>
            </div>

            <div className="feature-item">
              <Flame size={22} color="#ff334b" />
              <div>
                <strong>극상의 도파민: 사채 & 5배 풀레버리지 & 쩜상 폭죽 & 반대매매 사이렌</strong>
                <p style={{ margin: '4px 0 0 0', color: 'var(--text-muted)' }}>
                  상한가 돈다발 비와 반대매매 사이렌의 짜릿한 긴장감 속에서 대한민국 최고 부호 티어에 도전하세요.
                </p>
              </div>
            </div>
          </div>

          {/* 메인 캠페인 시작 버튼 */}
          <button className="btn-fire-order" onClick={() => startGame(1980)} style={{ marginBottom: '1.2rem' }}>
            <Flame size={24} /> 01. 1980년 명동 사채골목 연대기 시작 (초기 1,000만 원)
          </button>

          {/* 시대별 결전 특수 작전 즉시 참전 */}
          <div style={{ textAlign: 'left', marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-gold)', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Sparkles size={16} /> 시대별 결전 특수 작전 즉시 참전 (HISTORICAL OPS):
            </div>
            <div className="lobby-scenario-grid">
              <button 
                onClick={() => startGame(1997)}
                className="btn-scenario-chip"
                style={{ background: 'rgba(255, 51, 75, 0.15)', border: '1px solid #ff334b', color: '#ff4d63' }}
              >
                <strong>⚡ 1997 IMF 환란 외환위기</strong>
                <span style={{ fontSize: '0.75rem', opacity: 0.85, display: 'block', marginTop: '2px' }}>대폭락장 공매도·달러 사투 (초기 5,000만)</span>
              </button>

              <button 
                onClick={() => startGame(1999)}
                className="btn-scenario-chip"
                style={{ background: 'rgba(255, 190, 26, 0.15)', border: '1px solid #ffbe1a', color: '#ffbe1a' }}
              >
                <strong>🌐 1999 새롬기술 닷컴 광풍</strong>
                <span style={{ fontSize: '0.75rem', opacity: 0.85, display: 'block', marginTop: '2px' }}>100배 쩜상 롤러코스터 (초기 1억 원)</span>
              </button>

              <button 
                onClick={() => startGame(2020)}
                className="btn-scenario-chip"
                style={{ background: 'rgba(0, 243, 124, 0.15)', border: '1px solid #00f37c', color: '#00f37c' }}
              >
                <strong>🔥 2020 동학개미운동</strong>
                <span style={{ fontSize: '0.75rem', opacity: 0.85, display: 'block', marginTop: '2px' }}>삼성전자·바이오 풀미수 (초기 2억 원)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==================== GAME OVER SCREEN ====================
  if (gameState === 'GAMEOVER') {
    return (
      <div className="hero-lobby-container">
        <div className="hero-lobby-bg" style={{ backgroundImage: "url('./assets/key_art.jpg')" }}></div>
        <div className="hero-lobby-overlay"></div>

        <div className="hero-lobby">
          <h1 className="hero-title text-bear" style={{ fontSize: '3.5rem' }}>💀 깡통 및 파산</h1>
          <p className="hero-subtitle" style={{ color: 'var(--bear-blue)' }}>
            {year}년, 모든 자산을 잃고 신용불량자로 전락했습니다.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <img 
              src="./assets/sprite_loanshark.png" 
              alt="사채왕 마동석" 
              style={{ height: '220px', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.8))' }} 
            />
          </div>

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
      </div>
    );
  }

  // ==================== VICTORY SCREEN ====================
  if (gameState === 'VICTORY') {
    const totalReturnRate = ((assets - INITIAL_ASSETS) / INITIAL_ASSETS) * 100;
    return (
      <div className="hero-lobby-container">
        <div className="hero-lobby-bg" style={{ backgroundImage: "url('./assets/key_art.jpg')" }}></div>
        <div className="hero-lobby-overlay"></div>

        <div className="hero-lobby">
          <h1 className="hero-title text-gold" style={{ fontSize: '3.6rem' }}>👑 전설의 월가 투신</h1>
          <p className="hero-subtitle">1980년부터 2026년까지 50년 대한민국 격동의 증시를 정복했습니다!</p>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <img 
              src="./assets/sprite_trader.png" 
              alt="주인공 김트레이더" 
              style={{ height: '240px', filter: 'drop-shadow(0 15px 30px rgba(255, 190, 26, 0.4))' }} 
            />
          </div>

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

      {/* 자산 상태 배너 (골드바 & 돈다발 비주얼 스프라이트 탑재) */}
      <div className="asset-summary-card">
        <div className="flex items-center gap-4">
          <div className="asset-sprite-thumbnail">
            <img 
              src="./assets/item_cash_gold.png" 
              alt="보유 자산 현금 골드바" 
              className="w-16 h-16 object-contain filter drop-shadow(0 4px 12px rgba(255, 190, 26, 0.4))"
            />
          </div>
          <div>
            <div className="asset-main-title">현재 보유 순자산 (CASINO ODOMETER)</div>
            <div className="asset-main-value text-bull">
              <RollingNumber value={assets} suffix=" 원" />
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              원금 대비: {assets >= INITIAL_ASSETS ? '+' : ''}{(((assets - INITIAL_ASSETS) / INITIAL_ASSETS) * 100).toFixed(1)}%
            </div>
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

      {/* ANIMATED CANDLE BOARD (실시간 캔들스틱 차트 & 5단계 호가창 게이지) */}
      <AnimatedCandleBoard
        stocks={yearData.stocks}
        allocations={allocations}
        onSetAlloc={handleSetAlloc}
        isTrading={isTrading}
      />

      {/* 주문 터미널 (야수의 심장 트레이딩 콘솔 & 실시간 ECG 심박수 모니터) */}
      <div className="order-terminal">
        <div className="terminal-header">
          <div className="terminal-title">
            <Flame size={22} /> 야수의 심장 트레이딩 콘솔
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            명동 사채와 신용 미수로 레버리지를 극대화하세요
          </div>
        </div>

        {/* 실시간 야수의 심박수 ECG 파형 모니터 */}
        <div className="mb-4">
          <BeastHeartRate leverage={leverage} loan={loan} isTrading={isTrading} />
        </div>

        <div className="terminal-grid">
          {/* 사채 차입 슬라이더 */}
          <div className="terminal-control-group">
            <div className="control-label">
              <span className="flex items-center gap-1.5">
                <img src="./assets/item_debt_contract.png" alt="각서" className="w-5 h-5 object-contain inline" />
                명동 사채 대출 (사채왕 마동석)
              </span>
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

      {/* 모바일 전용 하단 스티키 트레이딩 독 (320px 사파리 & 삼성 브라우저 최적화) */}
      <div className="mobile-sticky-dock">
        <div className="mobile-dock-info">
          <div className="mobile-dock-pct">
            체결: <span className={totalAllocatedPct === 100 ? 'text-emerald-400 font-bold' : totalAllocatedPct > 100 ? 'text-red-400 font-bold' : 'text-amber-400 font-bold'}>
              {totalAllocatedPct}% / 100%
            </span>
          </div>
          <div className="mobile-dock-amt">
            {formatKRW(totalAvailableCapital * (Math.min(100, totalAllocatedPct) / 100))}
          </div>
        </div>
        <button
          className="btn-mobile-quick-trade"
          disabled={totalAllocatedPct > 100 || isTrading}
          onClick={handleExecuteTrade}
        >
          {isTrading ? '⚡ 체결 중...' : '🔥 장 개장 (풀매수)'}
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
