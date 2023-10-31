import { calculateStampDuty, buyToLetCalculator } from './calculator';

describe('calculateStampDuty', () => {
    it('should return 0 for property value less than or equal to 250,000', () => {
        const result = calculateStampDuty(250000);
        expect(result).toBe(7500);
    });

    it('should calculate stamp duty correctly for property value between 250,000 and 925,000', () => {
        const result = calculateStampDuty(500000);
        expect(result).toBe(27500);
    });

    it('should calculate stamp duty correctly for property value between 925000 and 1500000', () => {
        const result = calculateStampDuty(1000000);
        expect(result).toBe(71250);
    });

    it('should calculate stamp duty correctly for property value greater than 1500000', () => {
        const result = calculateStampDuty(2000000);
        expect(result).toBe(211250);
    });
});


describe('buyToLetCalculator', () => {

    const result = buyToLetCalculator({
        mortgageYears: 25,
        interestRate: 2.5,
        monthlyRent: 1000,
        mortgageFees: 1000,
        propertyValue: 200000,
        loanToValue: 70,
        annualMaintenance: 1000,
        annualServiceCharge: 1000,
        solicitorFees: 1000,
        groundRent: 1000,
        other: 0,
        vacantMonths: 0,
        interestOnly: false,
        managementFees: 1000
    });

    it('should return correct capital needed', () => {
        expect(result.capital).toMatchObject({ stampDuty: 6000, total: 68000 });
    })

    it('calculate monthly profit correctly', () => {
        expect((result.monthlyProfit).toFixed(2)).toBe("38.60");
    })

    it("calculate annual cost correctly", () => {
        expect((result.annualCost).toFixed(2)).toBe("11536.76");
    });

    it("calculate annual profit correctly", () => {
        expect((result.annualProfit).toFixed(2)).toBe("463.24");
    });

    it('calculate annual profit percentage correctly', () => {
        expect((result.annualProfitPercentage).toFixed(2)).toBe("0.68");
    })
});