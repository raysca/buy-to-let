import React from "react";
import { BuyToLetInput, BuyToLetResult } from "../calculator";

const currencyFormatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
});

export const BuyToLetResultSummary = ({ result }: any) => {

    const totalTextClass = result.annualProfit > 0 ? 'text-green-700' : 'text-red-700';

    return (
        <div>
            <table className="table text-base-content w-full text-xl">
                <tbody>
                    <tr>
                        <td>Initial Capital</td>
                        <td className='font-black'>{currencyFormatter.format(result.capital.total ?? 0)}</td>
                    </tr>
                    <tr>
                        <td>Annual Gross Income</td>
                        <td>{currencyFormatter.format(result.rentalIncome)}</td>
                    </tr>
                    <tr>
                        <td>Annual Cost + Fees</td>
                        <td>{currencyFormatter.format(result.annualCost)}</td>
                    </tr>
                    <tr>
                        <td>Annual Gross Profit</td>
                        <td className={`${totalTextClass} font-bold`}>{currencyFormatter.format(result.annualProfit ?? 0)}</td>
                    </tr>
                    <tr>
                        <td>Annual Yield</td>
                        <td className={`${totalTextClass} font-bold`}>{result.annualProfitPercentage.toFixed(2)}%</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export const BuyToLetResultDetailed = ({ result, input }: { result: BuyToLetResult, input: BuyToLetInput }) => {

    const totalTextClass = result.annualProfit > 0 ? 'text-green-700' : 'text-red-700';
    return <div className="grid grid-flow-row space-y-8">
        <table className="table text-base-content w-full text-xl">
            <caption>Initial Capital</caption>
            <tbody>
                <tr>
                    <td>Deposit</td>
                    <td>{currencyFormatter.format(result.capital.deposit)}</td>
                </tr>
                <tr>
                    <td>Stamp Duty</td>
                    <td>{currencyFormatter.format(result.capital.stampDuty)}</td>
                </tr>
                <tr>
                    <td>Solicitor Fees</td>
                    <td>{currencyFormatter.format(result.capital.solicitorFees)}</td>
                </tr>
                <tr>
                    <td>Mortgage Fees</td>
                    <td>{currencyFormatter.format(result.capital.mortgageFees)}</td>
                </tr>
                <tr className="font-black">
                    <td>Total</td>
                    <td>{currencyFormatter.format(result.capital.total)}</td>
                </tr>
            </tbody>
        </table>
        <table>
            <caption>Annual</caption>
            <tbody>
                <tr>
                    <td>Income</td>
                    <td>{currencyFormatter.format(result.rentalIncome)}</td>
                </tr>
                <tr>
                    <td>Mortgage Payment</td>
                    <td>{currencyFormatter.format(result.monthlyMortgagePayment * 12)}</td>
                </tr>
                {input.managementFees > 0 && <tr>
                    <td>Management Fees</td>
                    <td>{currencyFormatter.format(input.managementFees)}</td>
                </tr>}
                <tr>
                    <td>Service Charge</td>
                    <td>{currencyFormatter.format(input.annualServiceCharge)}</td>
                </tr>
                {input.groundRent > 0 && <tr>
                    <td>Ground Rent</td>
                    <td>{currencyFormatter.format(input.groundRent)}</td>
                </tr>}
                <tr>
                    <td>Maintenance</td>
                    <td>{currencyFormatter.format(input.annualMaintenance)}</td>
                </tr>
                {input.other > 0 && <tr>
                    <td>Other</td>
                    <td>{currencyFormatter.format(input.other)}</td>
                </tr>}
                <tr>
                    <td>Annual Gross Profit</td>
                    <td className={`${totalTextClass} font-bold`}>{currencyFormatter.format(result.annualProfit ?? 0)}</td>
                </tr>
            </tbody>
        </table>
    </div>
}

export const BuyToLetResultView = ({ result, input }: { result: BuyToLetResult, input: BuyToLetInput }) => {
    const [view, setView] = React.useState('summary');

    return <div className="w-full">
        <div className="flex justify-between">
            <button className={`btn btn-sm ${view === 'summary' ? 'btn-primary' : 'btn-neutral'}`} onClick={() => setView('summary')}>Summary</button>
            <button className={`btn btn-sm ${view === 'detailed' ? 'btn-primary' : 'btn-neutral'}`} onClick={() => setView('detailed')}>Detailed</button>
        </div>
        {view === 'summary' && <BuyToLetResultSummary result={result} />}
        {view === 'detailed' && <BuyToLetResultDetailed input={input} result={result} />}
    </div>
}