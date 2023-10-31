
export const BuyToLetResultView = ({ result, title }: any) => {
    const currencyFormatter = new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
    });

    const totalTextClass = result.annualProfit > 0 ? 'uk-text-success' : 'uk-text-danger';

    return (
        <div>
            <table className="uk-table uk-table-striped uk-table-small">
                <tbody>
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
                        <td className={`${totalTextClass} uk-text-bold`}>{currencyFormatter.format(result.annualProfit ?? 0)}</td>
                    </tr>

                    <tr>
                        <td>Annual Yield</td>
                        <td className={`${totalTextClass} uk-text-bold`}>{result.annualProfitPercentage.toFixed(2)}%</td>
                    </tr>

                </tbody>
            </table>
        </div>

    )
}