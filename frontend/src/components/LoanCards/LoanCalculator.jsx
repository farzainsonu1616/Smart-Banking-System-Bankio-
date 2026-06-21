import React, { useState } from 'react'
import { calculateEMI } from '../../utils/Helpers'

const LoanCalculator = ({ maxAmount = 5000000, rate = 10.5 }) => {
  const [amount, setAmount] = useState(100000)
  const [months, setMonths] = useState(36)

  const result = calculateEMI(amount, rate, months)

  return (
    <div className="loan-calculator">
      <h3 className="mb-4">EMI Calculator</h3>
      <div className="mb-4">
        <div className="d-flex justify-content-between mb-2">
          <label className="fw-semibold">Loan Amount</label>
          <span className="text-primary fw-bold">₹{amount.toLocaleString()}</span>
        </div>
        <input 
          type="range" 
          className="form-range" 
          min="10000" 
          max={maxAmount} 
          step="10000"
          value={amount} 
          onChange={(e) => setAmount(Number(e.target.value))} 
        />
      </div>

      <div className="mb-4">
        <div className="d-flex justify-content-between mb-2">
          <label className="fw-semibold">Tenure (Months)</label>
          <span className="text-primary fw-bold">{months} Months</span>
        </div>
        <input 
          type="range" 
          className="form-range" 
          min="6" 
          max="360" 
          step="6"
          value={months} 
          onChange={(e) => setMonths(Number(e.target.value))} 
        />
      </div>

      <div className="bg-light p-4 rounded-3 text-center">
        <h4 className="mb-2">Your Monthly EMI</h4>
        <h2 className="text-primary fw-bolder mb-3">₹{result.emi.toLocaleString()}</h2>
        <div className="d-flex justify-content-between text-muted fs-6">
          <span>Total Payable: ₹{result.totalPayable.toLocaleString()}</span>
          <span>Total Interest: ₹{result.totalInterest.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}

export default LoanCalculator
