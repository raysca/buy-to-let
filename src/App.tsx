import React from 'react';
import { CurrencyInput, NumberInput, PercentageInput } from './input/view';
import { BuyToLetInput, buyToLetCalculator } from './calculator';
import { BuyToLetResultView } from './result/view';
import { BUY_TO_LET_INPUT } from './properties';

const CapitalView = ({ inputState, onChange, onInterestChange, interestOnly, isLoss }: any) => {
  return <div className='w-full grid grid-flow-row space-y-8'>
    <CurrencyInput
      value={inputState.propertyValue}
      property="propertyValue"
      label={BUY_TO_LET_INPUT.propertyValue.label}
      description={BUY_TO_LET_INPUT.propertyValue.description}
      max={1000000}
      min={50000}
      step='1000'
      onChange={onChange}
      useDanger={isLoss}
    />

    <PercentageInput
      value={inputState.loanToValue}
      property="loanToValue"
      label={BUY_TO_LET_INPUT.loanToValue.label}
      description={BUY_TO_LET_INPUT.loanToValue.description}
      max={100}
      min={0}
      step='0.5'
      onChange={onChange}
      useDanger={isLoss}
    />

    <CurrencyInput
      value={inputState.monthlyRent}
      property="monthlyRent"
      label={BUY_TO_LET_INPUT.monthlyRent.label}
      description={BUY_TO_LET_INPUT.monthlyRent.description}
      max={10000}
      step='100'
      onChange={onChange}
      useDanger={isLoss}
    />

    <NumberInput
      value={inputState.vacantMonths}
      property="vacantMonths"
      label={BUY_TO_LET_INPUT.vacantMonths.label}
      description={BUY_TO_LET_INPUT.vacantMonths.description}
      max={12}
      min={0}
      step='1'
      onChange={onChange}
      useDanger={isLoss}
    />

    <div className='flex align-middle space-x-2'>
      <input defaultChecked={interestOnly} type='checkbox' className='checkbox' onChange={(e) => onInterestChange(e.target.checked)} />
      <span>Interest Only</span>
    </div>
  </div>
}

const FeeView = ({ inputState, onChange }: any) => {
  return <div className='w-full grid grid-flow-row space-y-8'>
    <CurrencyInput
      value={inputState.mortgageFees}
      property="mortgageFees"
      label={BUY_TO_LET_INPUT.mortgageFees.label}
      description={BUY_TO_LET_INPUT.mortgageFees.description}
      max={10000}
      min={0}
      step='10'
      onChange={onChange}
    />

    <CurrencyInput
      value={inputState.solicitorFees}
      property="solicitorFees"
      label={BUY_TO_LET_INPUT.solicitorFees.label}
      description={BUY_TO_LET_INPUT.solicitorFees.description}
      max={10000}
      step='10'
      onChange={onChange}
    />

    <CurrencyInput
      value={inputState.annualMaintenance}
      property="annualMaintenance"
      label={BUY_TO_LET_INPUT.annualMaintenance.label}
      description={BUY_TO_LET_INPUT.annualMaintenance.description}
      max={5000}
      step='10'
      onChange={onChange}
    />

    <CurrencyInput
      value={inputState.annualServiceCharge}
      property="annualServiceCharge"
      label={BUY_TO_LET_INPUT.annualServiceCharge.label}
      description={BUY_TO_LET_INPUT.annualServiceCharge.description}
      max={10000}
      step='10'
      onChange={onChange}
    />

    <CurrencyInput
      value={inputState.groundRent}
      property="groundRent"
      label={BUY_TO_LET_INPUT.groundRent.label}
      description={BUY_TO_LET_INPUT.groundRent.description}
      max={1000}
      step='5'
      onChange={onChange}
    />

  </div>
}

const App = () => {

  const defaultState: BuyToLetInput = {
    propertyValue: 250000,
    interestRate: 5.5,
    mortgageFees: 500,
    mortgageYears: 25,
    monthlyRent: 1300,
    other: 0,
    vacantMonths: 0,
    managementFees: 0,
    loanToValue: 75,
    solicitorFees: 100,
    annualMaintenance: 100,
    annualServiceCharge: 100,
    groundRent: 10,
  }

  const [inputState, setState] = React.useState(defaultState);
  const [interestOnly, setInterestOnly] = React.useState(true);
  const [view, setView] = React.useState('capital');

  const onChange = ({ property, value }: any) => {
    setState({ ...inputState, [property]: value });
  }

  const result = buyToLetCalculator(Object.assign({}, inputState, { interestOnly }))

  return <div className='hero min-h-screen bg-base-200 text-xl'>
    <div className='hero-content w-full flex-col max-w-4xl'>

      <div className='max-w-xl grid grid-flow-row space-y-8 my-8'>
        <h1 className="text-4xl font-bold text-center">Buy To Let Profitability Calculator</h1>

        <p className='text-base-content text-2xl'>
          This is a simple calculator to help you estimate the profitability of a buy to let property.
        </p>

        <p className='alert alert-warning text-left rounded-none'>
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          It is not intended to be a replacement for professional advice but a tool to quickly estimate the profitability of a property.
        </p>
      </div>

      <div className='flex flex-col lg:flex-row-reverse'>
        <div className="card flex-1 shadow-2xl bg-base-100 rounded-none w-full">
          <div className='card-body'>
            <BuyToLetResultView input={inputState} result={result} />
          </div>
        </div>

        <div className="card flex-1 shadow-2xl bg-base-100 rounded-none w-full">
          <div className='card-body'>
            <div className="tabs tabs-bordered">
              <a className={`tab tab-bordered text-xl ${view === 'capital' ? 'tab-active' : ''}`} onClick={() => setView('capital')}>Capital</a>
              <a className={`tab tab-bordered text-xl ${view === 'fees' ? 'tab-active' : ''}`} onClick={() => setView('fees')}>Fees</a>
              <div className='pt-8 w-full'>
                {view === 'capital' && <CapitalView inputState={inputState} onChange={onChange} onInterestChange={setInterestOnly} interestOnly isLoss={result.annualProfit < 0} />}
                {view === 'fees' && <FeeView inputState={inputState} onChange={onChange} />}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
}

export default App;
