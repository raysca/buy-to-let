import { BuyToLetResult } from "../calculator"

export const SummaryView = ({ result }: { result: BuyToLetResult }) => {
    const { capital, vacantMonths, annualProfit, annualProfitPercentage } = result
    const formatter = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' })

    const ProfitComponent = () => {
        if (annualProfit > 0) {
            return <span className="text text-green-700">+{formatter.format(annualProfit)}</span>
        } else if (annualProfit < 0) {
            return <span className="text text-red-700">{formatter.format(annualProfit)}</span>
        } else {
            return <span>{formatter.format(annualProfit)}</span>
        }
    }


    return <div>
        <h2>Profit Expectation</h2>
        <div>
            {vacantMonths === 0 && <p>
                With no vacancy months, your yearly profit will be <ProfitComponent /> resulting to a yearly yield of about {annualProfitPercentage.toFixed(2)}%.
            </p>
            }

            {vacantMonths > 0 && <p>
                With {vacantMonths} vacancy months, your yearly profit will be <ProfitComponent /> resulting to a yearly yield of about {annualProfitPercentage.toFixed(2)}%.
            </p>
            }
            <p>
                This will require a total of {formatter.format(capital.total)} in initial capital including fees.
            </p>
        </div>
    </div>
}