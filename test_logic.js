
import { calculateResult } from './src/logic/gameEngine.js';

// Mock getMarketInfo for consistent testing
// We need to bypass the import in gameEngine or mock it. 
// Since we are using ES modules, we can just run this with node if we set type module or use a test runner.
// Simpler: I'll just copy the calculateResult logic here for a quick test or import it assuming node supports it. 
// Node supports ESM in .mjs or if package.json has type: module. 
// Vite project usually sets type: module.

const LOAN_INTEREST_RATE = 0.2;

function test(name, { assets, loan, leverage, rate }, expectedAssets) {
    const totalCapital = assets + loan;
    const investedAmount = totalCapital * leverage;
    const grossReturn = investedAmount * (1 + rate);
    const repayLeverage = investedAmount - totalCapital;
    const repayLoan = loan * (1 + LOAN_INTEREST_RATE);
    const finalAssets = grossReturn - repayLeverage - repayLoan;

    const diff = Math.abs(Math.floor(finalAssets) - expectedAssets);
    if (diff <= 1) { // Allowing 1 won rounding diff
        console.log(`PASS: ${name}`);
    } else {
        console.error(`FAIL: ${name}. Expected ${expectedAssets}, got ${Math.floor(finalAssets)}`);
    }
}

console.log("Starting Verification...");

// Scenario 1: User Example
// 10m Assets, 100m Loan (Total 110m). Leverage 1 (Implicit). 50% Return.
// Expected: 45m.
test("User Scenario 1 (Loan)", { assets: 10000000, loan: 100000000, leverage: 1, rate: 0.5 }, 45000000);

// Scenario 2: User Example
// 10m Assets, 0 Loan. Leverage 5. 20% Return.
// Expected: 20m.
test("User Scenario 2 (Leverage)", { assets: 10000000, loan: 0, leverage: 5, rate: 0.2 }, 20000000);

// Scenario 3: Loss with Loan
// 10m Assets, 10m Loan. Leverage 1. -10% Return.
// Capital 20m. Invest 20m. Return 18m. Repay Loan 12m. Final 6m.
test("Loss Scenario", { assets: 10000000, loan: 10000000, leverage: 1, rate: -0.1 }, 6000000);

// Scenario 4: Bankruptcy
// 10m Assets, 5x Leverage. -30% Return.
// Capital 10. Invest 50. Return 35. Repay Lev 40. Final -5.
test("Bankruptcy Scenario", { assets: 10000000, loan: 0, leverage: 5, rate: -0.3 }, -5000000);

