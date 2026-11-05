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
import ArcadeInfoModal from './components/ArcadeInfoModal';
import ArcadeStage from './components/ArcadeStage';
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
  DollarSign,
  Info
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
  const [activeInfo, setActiveInfo] = useState(null); // (i) 정보 도감 팝업 제어
  const [lobbyTheme, setLobbyTheme] = useState('noir'); // 'noir', 'casino', 'arcade'

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

  // 1-탭 사채 단계 순환 (0원 -> 1배 -> 2배 -> 3배(최대) -> 0원)
  const handleCycleLoan = () => {
    sound.playBuy();
    const step = Math.max(10000000, Math.floor(assets * 1));
    const maxL = maxLoanPossible;
    if (maxL <= 0) return;
    setLoan(prev => {
      if (prev === 0) return Math.min(step, maxL);
      if (prev < step * 2) return Math.min(step * 2, maxL);
      if (prev < maxL) return maxL;
      return 0;
    });
  };

  // 1-탭 레버리지 순환 (1x -> 2x -> 3x -> 5x -> 1x)
  const handleCycleLeverage = () => {
    sound.playBuy();
    const lvls = [1, 2, 3, 5];
    const nextIdx = (lvls.indexOf(leverage) + 1) % lvls.length;
    setLeverage(lvls[nextIdx]);
  };

  // ==================== LOBBY SCREEN (3대 게임 배리에이션 실시간 지원) ====================
  if (gameState === 'LOBBY') {
    const bgUrl = lobbyTheme === 'noir' 
      ? './assets/concept1_noir_main.jpg' 
      : lobbyTheme === 'casino' 
      ? './assets/concept2_casino_main.jpg' 
      : lobbyTheme === 'arcade'
      ? './assets/concept3_arcade_main.jpg'
      : './assets/concept4_webtoon_main.jpg';

    return (
      <div className="hero-lobby-container">
        <div className="hero-lobby-bg" style={{ backgroundImage: `url('${bgUrl}')` }}></div>
        <div className="hero-lobby-overlay"></div>

        <div className="hero-lobby">
          {/* 게임 디자인 컨셉 배리에이션 실시간 스위처 */}
          <div className="lobby-concept-switcher-bar mb-3">
            <button
              type="button"
              onClick={() => { sound.playBuy(); setLobbyTheme('noir'); }}
              className={`btn-theme-chip ${lobbyTheme === 'noir' ? 'active-noir' : ''}`}
            >
              ⚔️ 01. 범죄도시 느와르
            </button>
            <button
              type="button"
              onClick={() => { sound.playBuy(); setLobbyTheme('casino'); }}
              className={`btn-theme-chip ${lobbyTheme === 'casino' ? 'active-casino' : ''}`}
            >
              ⚡ 02. 사이버 카지노
            </button>
            <button
              type="button"
              onClick={() => { sound.playBuy(); setLobbyTheme('arcade'); }}
              className={`btn-theme-chip ${lobbyTheme === 'arcade' ? 'active-arcade' : ''}`}
            >
              🕹️ 03. 16비트 오락실
            </button>
            <button
              type="button"
              onClick={() => { sound.playBuy(); setLobbyTheme('webtoon'); }}
              className={`btn-theme-chip ${lobbyTheme === 'webtoon' ? 'active-webtoon' : ''}`}
            >
              🔥 04. K-웹툰 액션
            </button>
          </div>

          <div className="hero-badge-top">
            {lobbyTheme === 'noir' && '★ 1980 명동 사채골목 느와르 금융 스릴러'}
            {lobbyTheme === 'casino' && '⚡ HIGH-ROLLER CYBER CASINO VIP TERMINAL'}
            {lobbyTheme === 'arcade' && '🪙 1988 SEOUL STOCK RETRO ARCADE CABINET'}
            {lobbyTheme === 'webtoon' && '🔥 K-WEBTOON HYPER ACTION 올인 결전'}
          </div>

          <h1 className="hero-title">
            {lobbyTheme === 'casino' ? 'BEAST MODE' : lobbyTheme === 'webtoon' ? '야수의 각성' : '야수의 심장'}
          </h1>
          <p className="hero-subtitle">
            {lobbyTheme === 'noir' && 'THE HEART OF THE BEAST : 1980 ~ 2026 대한민국 증시 50년사'}
            {lobbyTheme === 'casino' && 'ULTRA HIGH-LEVERAGE CYBER STOCK MATRIX 2026'}
            {lobbyTheme === 'arcade' && 'INSERT COIN TO START : 50-YEAR CHRONICLE'}
            {lobbyTheme === 'webtoon' && '전 재산과 목숨을 건 하이퍼 액션 트레이딩 배틀'}
          </p>

          {/* 주요 등장인물 쇼케이스 카드 (아케이드 컴팩트 디자인) */}
          <div className="lobby-character-showcase">
            <div className="character-card card-trader">
              <span className="hud-corner-tl"></span>
              <span className="hud-corner-br"></span>
              <div className="card-avatar-wrapper">
                <img src="./assets/sprite_trader.png" alt="김트레이더" className="card-avatar-img" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="card-char-name text-amber-400">김트레이더 (주인공)</div>
                  <button 
                    type="button" 
                    className="btn-arcade-info"
                    title="캐릭터 스토리 보기"
                    onClick={() => {
                      sound.playBuy();
                      setActiveInfo({
                        title: '김트레이더 (주인공)',
                        content: '1980년 종잣돈 1,000만 원으로 시작해 50년의 파도를 넘어 1조 원의 신화를 노리는 청년 투신. 신용 미수와 레버리지를 다루는 대담한 배짱을 지녔습니다.',
                        tip: '1천만 원 종잣돈으로 1조 원 신화를 쓰고 여의도 꼭대기 펜트하우스로 진격하세요!'
                      });
                    }}
                  >
                    i
                  </button>
                </div>
                <div className="card-char-role">🔥 야수의 심장을 품은 청년 투자자</div>
              </div>
            </div>

            <div className="character-card card-shark">
              <span className="hud-corner-tl"></span>
              <span className="hud-corner-br"></span>
              <div className="card-avatar-wrapper">
                <img src="./assets/sprite_loanshark.png" alt="사채왕 마동석" className="card-avatar-img" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="card-char-name text-bull">명동 사채왕 마동석</div>
                  <button 
                    type="button" 
                    className="btn-arcade-info"
                    title="사채 규칙 보기"
                    onClick={() => {
                      sound.playBuy();
                      setActiveInfo({
                        title: '명동 사채왕 마동석',
                        content: '지하 금융가의 거물. 원금의 최대 3배까지 즉시 대출해주지만 연이율 35%에 달하는 고금리와 가차 없는 강제 반대매매가 도사립니다.',
                        tip: '이봐 김 사장, 원금 못 갚으면 각서대로 손모가지 날아가는 거야. 땡겨줄까?'
                      });
                    }}
                  >
                    i
                  </button>
                </div>
                <div className="card-char-role">👺 지하 금융가 거물 (연이율 35%)</div>
              </div>
            </div>
          </div>

          {/* 군더더기 텍스트 제거 -> 심플 아케이드 뱃지 바 (클릭 시 i 도감 오픈) */}
          <div className="lobby-arcade-badges">
            <div 
              className="arcade-pill" 
              onClick={() => {
                sound.playBuy();
                setActiveInfo({
                  title: '🏛️ 50년 대한민국 증시 실화',
                  content: '1980년대 건설주 붐, 88 올림픽, 1997 IMF 환란, 1999 닷컴버블, 2008 금융위기, 2020 동학개미, 2024 AI 반도체까지 50년 실존 경제 사건과 실제 상장 종목이 100% 구현되어 있습니다.',
                  tip: '각 연도마다 호외 신문을 확인하고 역사적 대세 상승주를 포착하세요!'
                });
              }}
            >
              <span>🏛️ 50년 실존 역사</span>
              <button type="button" className="btn-arcade-info">i</button>
            </div>

            <div 
              className="arcade-pill" 
              onClick={() => {
                sound.playBuy();
                setActiveInfo({
                  title: '⚡ 실시간 호가 & 캔들스틱',
                  content: '매 턴마다 5단계 실시간 매수/매도 호가창 잔량과 캔들스틱 차트 파동이 요동치며, 상한가(쩜상)와 하한가의 도파민을 선사합니다.',
                  tip: '호가창의 매수/매도 잔량 비율을 보면 그 해의 시장 심리를 읽을 수 있습니다.'
                });
              }}
            >
              <span>⚡ 실시간 호가 & 차트</span>
              <button type="button" className="btn-arcade-info">i</button>
            </div>

            <div 
              className="arcade-pill" 
              onClick={() => {
                sound.playBuy();
                setActiveInfo({
                  title: '💥 5배 레버리지 & 명동 사채',
                  content: '합법적인 신용 미수 레버리지(최대 5배)와 지하 금융가 명동 사채 대출(최대 3배)을 활용해 단숨에 수백억을 벌거나 깡통 계좌로 전락할 수 있습니다.',
                  tip: '과도한 레버리지는 마포대교 한강 수온 체크로 이어질 수 있으니 주의하세요!'
                });
              }}
            >
              <span>💥 5배 레버리지 & 사채</span>
              <button type="button" className="btn-arcade-info">i</button>
            </div>
          </div>

          {/* 메인 캠페인 시작 버튼 (컨셉별 타이틀 연동) */}
          <button className="btn-fire-order" onClick={() => startGame(1980)} style={{ marginBottom: '1.2rem' }}>
            <Flame size={24} /> 
            {lobbyTheme === 'noir' && '⚔️ 01. 1980년 명동 사채골목 출진 (초기 1,000만 원)'}
            {lobbyTheme === 'casino' && '⚡ 01. 하이롤러 VIP 카지노 입장 (초기 1,000만 원)'}
            {lobbyTheme === 'arcade' && '🕹️ 01. INSERT COIN 1P 모드 시작 (초기 1,000만 원)'}
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

        {/* 정보 도감 모달 (로비) */}
        {activeInfo && (
          <ArcadeInfoModal
            info={activeInfo}
            onClose={() => setActiveInfo(null)}
          />
        )}
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

  // ==================== MAIN PLAYING SCREEN (10x 간소화 아케이드 HUD) ====================
  return (
    <div className="arcade-app-wrapper">
      {/* 1. 슬림 탑 게임 HUD (hud_header.png 스프라이트 탑재) */}
      <div className="arcade-top-hud sprite-hud-box">
        <img src="./assets/hud_header.png" alt="HUD Header" className="hud-header-sprite-bg" />
        <div className="hud-header-inner-row">
          <div className="flex items-center gap-1.5">
            <div className="hud-year-badge">{year}년</div>
            <div className="hud-era-pill">
              <span>{yearData.era}</span>
              <button 
                type="button" 
                className="btn-arcade-info ml-1"
                title="시대 배경 정보"
                onClick={() => {
                  sound.playBuy();
                  setActiveInfo({
                    title: `${year}년 시대 배경: ${yearData.era}`,
                    content: yearData.headline ? `${yearData.headline}\n\n${yearData.article || ''}` : `${year}년 대한민국 경제 상황입니다.`,
                    tip: `KOSPI: ${yearData.kospi} | 환율: ${yearData.exchangeRate}원 | 기준금리: ${yearData.interestRate}%`
                  });
                }}
              >
                i
              </button>
            </div>
            <button 
              type="button"
              className="hud-btn-news" 
              onClick={() => {
                sound.playBuy();
                setShowNewspaper(true);
              }}
              title="호외 신문 보기"
            >
              <Newspaper size={13} /> 호외
            </button>
          </div>

          {/* 중앙: 실시간 코인/골드 자산 뱃지 (스프라이트 탑재) */}
          <div className="hud-asset-badge">
            <img 
              src="./assets/item_cash_gold.png" 
              alt="자산" 
              className="w-5 h-5 object-contain inline-block mr-1.5 filter drop-shadow(0 2px 6px rgba(255, 190, 26, 0.5))" 
            />
            <span className="hud-asset-num text-bull">
              <RollingNumber value={assets} suffix=" 원" />
            </span>
            <span className="hud-return-rate">
              ({assets >= INITIAL_ASSETS ? '+' : ''}{(((assets - INITIAL_ASSETS) / INITIAL_ASSETS) * 100).toFixed(0)}%)
            </span>
          </div>

          {/* 우측: 사운드 토글 */}
          <button type="button" className="hud-btn-sound" onClick={toggleSound}>
            {isMuted ? <VolumeX size={15} color="#ff334b" /> : <Volume2 size={15} color="#00f37c" />}
          </button>
        </div>
      </div>

      {/* 2. 10x 간소화 단일화면 아케이드 스테이지 */}
      <ArcadeStage
        year={year}
        yearData={yearData}
        assets={assets}
        loan={loan}
        leverage={leverage}
        allocations={allocations}
        onSetAlloc={handleSetAlloc}
        onCycleLoan={handleCycleLoan}
        onCycleLeverage={handleCycleLeverage}
        onExecuteTrade={handleExecuteTrade}
        isTrading={isTrading}
        onOpenInfo={setActiveInfo}
      />

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

      {/* 정보 도감 모달 */}
      {activeInfo && (
        <ArcadeInfoModal
          info={activeInfo}
          onClose={() => setActiveInfo(null)}
        />
      )}
    </div>
  );
}
