
interface Mortgage {
    principal: number;
    years: number;
    interest: number;
}

interface MortgageResult {
    monthlyPayment: number;
    balance: number;
}

interface Amortization {
    principalY: number;
    interestY: number;
    balance: number;
}

interface AmortizationResult {
    monthlyPayment: number;
    amortization: Amortization[];
}

interface InterestOnlyLoanResult {
    monthlyPayment: number;
}

export const calculateMortgage = (mortgage: Mortgage): MortgageResult => {
    const { principal, years, interest: rate } = mortgage;
    const monthlyRate = rate / 100 / 12;
    const monthlyPayment = principal * monthlyRate / (1 - (Math.pow(1 / (1 + monthlyRate), years * 12)));
    const balance = principal * Math.pow(1 + monthlyRate, years * 12) - monthlyPayment * ((Math.pow(1 + monthlyRate, years * 12) - 1) / monthlyRate);
    return { monthlyPayment, balance };
}

export const calculateInterestOnlyLoanPayment = (loanTerms: Mortgage): InterestOnlyLoanResult => {
    const { principal, interest: rate } = loanTerms;
    const monthlyRate = rate / 100 / 12;
    const monthlyPayment = principal * monthlyRate;
    return { monthlyPayment };
}


export const calculateAmortization = (mortgage: Mortgage): AmortizationResult => {
    const { principal, years, interest: rate } = mortgage;
    const monthlyRate = rate / 100 / 12;
    const monthlyPayment = principal * monthlyRate / (1 - (Math.pow(1 / (1 + monthlyRate), years * 12)));
    let balance = principal;
    let amortization = [];
    for (let y = 0; y < years; y++) {
        let interestY = 0;
        let principalY = 0;
        for (let m = 0; m < 12; m++) {
            let interestM = balance * monthlyRate;
            let principalM = monthlyPayment - interestM;
            interestY = interestY + interestM;
            principalY = principalY + principalM;
            balance = balance - principalM;
        }
        amortization.push({ principalY, interestY, balance });
    }
    return { monthlyPayment, amortization };
}


export const calculateStampDuty = (propertyValue: number) => {
    const TOP_1 = 250000;
    const TOP_2 = 925000;
    const TOP_3 = 1500000;
    const RATE_1 = 0.03;
    const RATE_2 = 0.08;
    const RATE_3 = 0.13;
    const RATE_4 = 0.15;

    if (propertyValue <= TOP_1) {
        return propertyValue * RATE_1;
    }

    if (propertyValue <= TOP_2) {
        return (propertyValue - TOP_1) * RATE_2 + TOP_1 * RATE_1;
    }

    if (propertyValue <= TOP_3) {
        return (propertyValue - TOP_2) * RATE_3 + (TOP_2 - TOP_1) * RATE_2 + TOP_1 * RATE_1;
    }

    return (propertyValue - TOP_3) * RATE_4 + (TOP_3 - TOP_2) * RATE_3 + (TOP_2 - TOP_1) * RATE_2 + TOP_1 * RATE_1;
}


export interface BuyToLetInput {
    mortgageYears: number;
    interestRate: number;
    monthlyRent: number;
    mortgageFees: number;
    propertyValue: number;
    loanToValue: number;
    annualMaintenance: number;
    annualServiceCharge: number;
    solicitorFees: number;
    groundRent: number;
    other: number;
    vacantMonths: number;
    interestOnly?: boolean;
    managementFees: number;
}

export interface BuyToLetCapital {
    stampDuty: number;
    mortgageFees: number;
    solicitorFees: number;
    other: number;
    total: number;
    deposit: number;
    principal: number;
}

export interface BuyToLetResult {
    capital: BuyToLetCapital;
    monthlyProfit: number;
    annualCost: number;
    annualProfit: number;
    annualProfitPercentage: number;
    rentalIncome: number;
    monthlyMortgagePayment: number
    netCashFlow: number;
    vacantMonths: number;
}

export const buyToLetCalculator = (input: BuyToLetInput): BuyToLetResult => {
    const { interestOnly = false, loanToValue, propertyValue, mortgageYears, interestRate } = input;
    const principal = propertyValue * loanToValue / 100;
    const interestOnlyLoanPayment = calculateInterestOnlyLoanPayment({ principal, years: mortgageYears, interest: interestRate }).monthlyPayment;
    const repaymentMortgagePayment = calculateMortgage({ principal, years: mortgageYears, interest: interestRate }).monthlyPayment;
    const monthlyMortgagePayment = interestOnly ? interestOnlyLoanPayment : repaymentMortgagePayment;

    const { mortgageFees = 0, solicitorFees = 0, other = 0, vacantMonths = 0 } = input
    const stampDuty = calculateStampDuty(propertyValue);
    const capitalNeeded = propertyValue * (1 - loanToValue / 100) + mortgageFees + stampDuty + solicitorFees + other;

    const rentalIncome = (input.monthlyRent * (12 - vacantMonths))
    const { annualMaintenance = 0, annualServiceCharge = 0, groundRent = 0, managementFees = 0 } = input
    const annualCost = (monthlyMortgagePayment * 12) + annualMaintenance + annualServiceCharge + groundRent + managementFees;
    const annualProfit = rentalIncome - annualCost;
    const annualProfitPercentage = annualProfit / capitalNeeded * 100;
    const monthlyProfit = annualProfit / 12;
    
    return {
        capital: {
            stampDuty,
            mortgageFees,
            solicitorFees,
            other,
            total: capitalNeeded,
            principal,
            deposit:  propertyValue - principal
        },
        rentalIncome,
        annualProfit,
        annualProfitPercentage,
        monthlyProfit,
        annualCost,
        vacantMonths,
        monthlyMortgagePayment,
        netCashFlow: monthlyProfit - monthlyMortgagePayment
    }
}