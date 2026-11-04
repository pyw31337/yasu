import { HISTORICAL_YEARS, YEAR_LIST } from '../data/historicalData';
import { getAssetTier } from '../data/assetTiers';

export const INITIAL_ASSETS = 10000000; // 1,000만 원으로 1980년 시작
export const MAX_LEVERAGE = 5;

export function getYearData(year) {
  return HISTORICAL_YEARS[year] || HISTORICAL_YEARS[YEAR_LIST[0]];
}

export function getNextYear(currentYear) {
  const currentIndex = YEAR_LIST.indexOf(currentYear);
  if (currentIndex >= 0 && currentIndex < YEAR_LIST.length - 1) {
    return YEAR_LIST[currentIndex + 1];
  }
  return null;
}

// 턴별 투자 정산 함수
export function processYearInvestment({
  year,
  currentAssets,
  loan, // 명동 사채 차입금
  leverage, // 1 ~ 5배
  allocations, // { [stockCode]: percentage (0 ~ 100) }
}) {
  const yearData = getYearData(year);
  const totalCapital = currentAssets + loan;
  const leveragedCapital = totalCapital * leverage;

  // 종목별 투자 결과 계산
  const stockResults = [];
  let totalGrossReturn = 0;
  let totalInvestedInStocks = 0;

  yearData.stocks.forEach(stock => {
    const allocPct = allocations[stock.code] || 0;
    if (allocPct > 0) {
      const stockInvested = leveragedCapital * (allocPct / 100);
      // 개별 종목 수익률 적용
      const stockGross = stockInvested * (1 + stock.rate);
      const stockProfit = stockGross - stockInvested;

      totalInvestedInStocks += stockInvested;
      totalGrossReturn += stockGross;

      stockResults.push({
        code: stock.code,
        name: stock.name,
        category: stock.category,
        rate: stock.rate,
        invested: stockInvested,
        gross: stockGross,
        profit: stockProfit,
        detail: stock.detail
      });
    }
  });

  // 미투자 현금 잔여액 (레버리지 미적용분)
  const unallocatedRatio = Math.max(0, 1 - (totalInvestedInStocks / (leveragedCapital || 1)));
  const uninvestedCash = totalCapital * unallocatedRatio;

  // 레버리지 차입 원금 상환 (총 투자액 - 자기 자본 + 사채)
  const leverageRepayment = leveragedCapital - totalCapital;

  // 사채 이자 계산 (시대별 기준금리 + 사채 가산금리 15%)
  const loanInterestRate = ((yearData.interestRate || 10) + 15) / 100;
  const loanInterest = loan * loanInterestRate;
  const totalLoanRepayment = loan + loanInterest;

  // 최종 자산 계산
  // 총 회수액 + 비투자현금 - 레버리지차입원금 - 사채원리금
  let finalAssets = totalGrossReturn + uninvestedCash - leverageRepayment - totalLoanRepayment;
  
  // 마진콜 / 반대매매 체크: 자산이 급락하여 담보비율 130% 미달 시 추가 손실 발생
  let isMarginCall = false;
  if (leverage > 1 && totalGrossReturn < leverageRepayment * 0.9) {
    isMarginCall = true;
    finalAssets -= leveragedCapital * 0.1; // 반대매매 강제청산 패널티
  }

  const netProfit = finalAssets - currentAssets;
  const returnRate = currentAssets > 0 ? (netProfit / currentAssets) : 0;
  const isGameOver = finalAssets <= 0;

  return {
    year,
    yearData,
    initialAssets: currentAssets,
    loan,
    loanInterest,
    leverage,
    leveragedCapital,
    stockResults,
    uninvestedCash,
    finalAssets: Math.floor(finalAssets),
    netProfit: Math.floor(netProfit),
    returnRate,
    isMarginCall,
    isGameOver,
    assetTier: getAssetTier(finalAssets)
  };
}
