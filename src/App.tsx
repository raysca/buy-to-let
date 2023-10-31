import React from 'react';
import { InputView } from './input/view';
import { BuyToLetInput, buyToLetCalculator } from './calculator';
import { BuyToLetResultView } from './result/view';
import { CapitalView } from './capital/view';

const BUY_TO_LET_INPUT = {
  propertyValue: {
    label: 'Property Value (£)',
    description: 'The value of the property being purchased',
  },
  loanToValue: {
    label: 'Loan To Value (%)',
    description: 'The loan to value of the mortgage',
  },
  interestRate: {
    label: 'Interest Rate (%)',
    description: 'The interest rate of the mortgage',
  },
  mortgageYears: {
    label: 'Mortgage Years',
    description: 'The number of years the mortgage is for',
  },
  mortgageFees: {
    label: 'Mortgage Fees (£)',
    description: 'The fees associated with the mortgage',
  },
  monthlyRent: {
    label: 'Monthly Rent (£)',
    description: 'The monthly rent received from the property',
  },
  other: {
    label: 'Other (£)',
    description: 'Other income received from the property',
  },
  vacantMonths: {
    label: 'Vacant Months (per year)',
    description: 'The number of months the property is vacant',
  },
  managementFees: {
    label: 'Management Fees (£)',
    description: 'The fees associated with managing the property',
  },
  solicitorFees: {
    label: 'Solicitor Fees (£)',
    description: 'The fees associated with the solicitor',
  },
  annualMaintenance: {
    label: 'Annual Maintenance (£)',
    description: 'The annual maintenance costs',
  },
  annualServiceCharge: {
    label: 'Annual Service Charge (£)',
    description: 'The annual service charge',
  },
  groundRent: {
    label: 'Ground Rent (£)',
    description: 'The annual ground rent',
  }
}

function App() {

  const defaultState: BuyToLetInput = {
    propertyValue: 250000,
    interestRate: 5.5,
    mortgageFees: 0,
    mortgageYears: 25,
    monthlyRent: 1300,
    other: 0,
    vacantMonths: 0,
    managementFees: 0,
    loanToValue: 75,
    solicitorFees: 0,
    annualMaintenance: 0,
    annualServiceCharge: 0,
    groundRent: 0,
  }

  const [inputState, setState] = React.useState(defaultState);
  const [interestOnly, setInterestOnly] = React.useState(false);

  return (
    <div className="uk-width-1-2@m uk-margin-auto">
      <article className='uk-article uk-margin-bottom'>
        <p className='uk-alert-primary uk-padding'>
          Calculate the capital required and the annual profit for a buy to let property
        </p>
      </article>

      <div className='uk-card uk-card-default uk-card-body uk-margin-bottom'>
        <h3 className='uk-card-title'>Mortgage</h3>
        <InputView
          value={inputState.propertyValue}
          property="propertyValue"
          label={BUY_TO_LET_INPUT.propertyValue.label}
          description={BUY_TO_LET_INPUT.propertyValue.description}
          onChange={({ property, value }) => {
            setState({ ...inputState, [property]: value });
          }}
        />
        <InputView
          value={inputState.loanToValue}
          property="loanToValue"
          label={BUY_TO_LET_INPUT.loanToValue.label}
          description={BUY_TO_LET_INPUT.loanToValue.description}
          onChange={({ property, value }) => {
            setState({ ...inputState, [property]: value });
          }}
        />
        <InputView
          value={inputState.interestRate}
          property="interestRate"
          label={BUY_TO_LET_INPUT.interestRate.label}
          description={BUY_TO_LET_INPUT.interestRate.description}
          onChange={({ property, value }) => {
            setState({ ...inputState, [property]: value });
          }}
        />
        <InputView
          value={inputState.mortgageYears}
          property="mortgageYears"
          label={BUY_TO_LET_INPUT.mortgageYears.label}
          description={BUY_TO_LET_INPUT.mortgageYears.description}
          onChange={({ property, value }) => {
            setState({ ...inputState, [property]: value });
          }}
        />

        <InputView
          value={inputState.monthlyRent}
          property="monthlyRent"
          label={BUY_TO_LET_INPUT.monthlyRent.label}
          description={BUY_TO_LET_INPUT.monthlyRent.description}
          onChange={({ property, value }) => {
            setState({ ...inputState, [property]: value });
          }}
        />

        <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
          <label><input
            type="checkbox"
            checked={interestOnly}
            onChange={e => setInterestOnly(e.target.checked)}
            className="uk-checkbox" /> Interest Only Payment</label>
        </div>

      </div>

      <div className='uk-card uk-card-default uk-card-body uk-margin-bottom'>
        <h3 className='uk-card-title'>Fees</h3>
        <InputView
          value={inputState.mortgageFees}
          property="mortgageFees"
          label={BUY_TO_LET_INPUT.mortgageFees.label}
          description={BUY_TO_LET_INPUT.mortgageFees.description}
          onChange={({ property, value }) => {
            setState({ ...inputState, [property]: value });
          }}
        />
        <InputView
          value={inputState.solicitorFees}
          property="solicitorFees"
          label={BUY_TO_LET_INPUT.solicitorFees.label}
          description={BUY_TO_LET_INPUT.solicitorFees.description}
          onChange={({ property, value }) => {
            setState({ ...inputState, [property]: value });
          }}
        />

        <InputView
          value={inputState.annualMaintenance}
          property="annualMaintenance"
          label={BUY_TO_LET_INPUT.annualMaintenance.label}
          description={BUY_TO_LET_INPUT.annualMaintenance.description}
          onChange={({ property, value }) => {
            setState({ ...inputState, [property]: value });
          }}
        />

        <InputView
          value={inputState.annualServiceCharge}
          property="annualServiceCharge"
          label={BUY_TO_LET_INPUT.annualServiceCharge.label}
          description={BUY_TO_LET_INPUT.annualServiceCharge.description}
          onChange={({ property, value }) => {
            setState({ ...inputState, [property]: value });
          }}
        />

        <InputView
          value={inputState.groundRent}
          property="groundRent"
          label={BUY_TO_LET_INPUT.groundRent.label}
          description={BUY_TO_LET_INPUT.groundRent.description}
          onChange={({ property, value }) => {
            setState({ ...inputState, [property]: value });
          }}
        />

        <InputView
          value={inputState.other}
          property="other"
          label={BUY_TO_LET_INPUT.other.label}
          description={BUY_TO_LET_INPUT.other.description}
          onChange={({ property, value }) => {
            setState({ ...inputState, [property]: value });
          }}
        />

      </div>

      <div className='uk-card uk-card-default uk-card-body uk-margin-bottom'>
        <h3 className='uk-card-title'>Capital Required</h3>
        <CapitalView result={buyToLetCalculator(inputState)} />
      </div>

      <div className='uk-card uk-card-default uk-card-body'>
        <h3 className='uk-card-title'>Full Occupancy</h3>
        <BuyToLetResultView result={buyToLetCalculator(Object.assign({}, inputState, { vacantMonths: 0, interestOnly }))} />
      </div>

      <div className='uk-card uk-card-default uk-card-body'>
        <h3 className='uk-card-title'>1 Month Vacancy</h3>
        <BuyToLetResultView result={buyToLetCalculator(Object.assign({}, inputState, { vacantMonths: 1, interestOnly }))} />
      </div>

      <div className='uk-card uk-card-default uk-card-body'>
        <h3 className='uk-card-title'>3 Month Vacancy</h3>
        <BuyToLetResultView result={buyToLetCalculator(Object.assign({}, inputState, { vacantMonths: 3, interestOnly }))} />
      </div>

    </div>
  );
}

export default App;
