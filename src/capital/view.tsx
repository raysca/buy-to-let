export const CapitalView = ({ result }: any) => {
    const { deposit, stampDuty, solicitorFees, mortgageFees, total } = result.capital
    const formatter = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' })

    return <table className="uk-table uk-table-striped uk-table-small">
        <tbody>
            <tr>
                <td>Deposit</td>
                <td>{formatter.format(deposit)}</td>
            </tr>
            <tr>
                <td>Stamp Duty</td>
                <td>{formatter.format(stampDuty)}</td>
            </tr>
            <tr>
                <td>Fees</td>
                <td>{formatter.format(solicitorFees + mortgageFees)}</td>
            </tr>
            <tr className="uk-text-bolder">
                <td>Total</td>
                <td>{formatter.format(total)}</td>
            </tr>
        </tbody>
    </table>
}