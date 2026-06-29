import React, { useState } from 'react'
import { FiFileText, FiCheckCircle, FiUploadCloud, FiInfo } from 'react-icons/fi'
import { FaCalculator } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { formatCurrency } from '../../utils/Helpers'
import LoanService from '../../services/LoanService'
import { useAuth } from '../../context/AuthContext'

const LoanApplication = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('apply')
  const [loading, setLoading] = useState(false)

  // Apply Loan State
  const [loanForm, setLoanForm] = useState({ type: '', amount: '', tenure: '' })
  const [documents, setDocuments] = useState({ idProof: null, addressProof: null, incomeProof: null })

  // EMI Calc State
  const [emiData, setEmiData] = useState({ principal: 100000, rate: 10.5, months: 36 })

  // Eligibility Calc State
  const [eligibilityData, setEligibilityData] = useState({ monthlyIncome: '', existingEmi: '' })
  const [eligibleAmount, setEligibleAmount] = useState(null)

  // Handlers
  const handleLoanSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const payload = {
        loanType: loanForm.type.toUpperCase(),
        amount: parseFloat(loanForm.amount),
        tenureMonths: parseInt(loanForm.tenure),
        interestRate: 10.5, // Standard rate for now
        monthlyEmi: 0, // Backend will calculate this or we can pass calculated
        status: 'PENDING'
      }

      await LoanService.applyLoan(user.id, payload)
      toast.success('Loan application submitted successfully! It is now Pending review.')
      setLoanForm({ type: '', amount: '', tenure: '' })
    } catch (error) {
      toast.error('Failed to submit loan application.')
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (e, docType) => {
    if (e.target.files[0]) {
      setDocuments({ ...documents, [docType]: e.target.files[0].name })
      toast.info(`${docType} uploaded successfully.`)
    }
  }

  const calculateEMI = () => {
    const P = parseFloat(emiData.principal)
    const r = parseFloat(emiData.rate) / 12 / 100
    const n = parseFloat(emiData.months)
    if (P && r && n) {
      const emi = P * r * (Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
      const totalPayable = emi * n
      return {
        emi: Math.round(emi),
        totalInterest: Math.round(totalPayable - P),
        totalPayable: Math.round(totalPayable)
      }
    }
    return { emi: 0, totalInterest: 0, totalPayable: 0 }
  }

  const checkEligibility = (e) => {
    e.preventDefault()
    const income = parseFloat(eligibilityData.monthlyIncome)
    const currentEmi = parseFloat(eligibilityData.existingEmi) || 0
    if (income > 0) {
      // Simple eligibility logic: 50% of income can go to EMIs
      const availableEmiCapacity = (income * 0.5) - currentEmi
      if (availableEmiCapacity > 0) {
        // Assume an average interest rate of 10.5% over 5 years (60 months) to calculate max loan
        const r = 10.5 / 12 / 100
        const n = 60
        const maxLoan = availableEmiCapacity * ((Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n)))
        setEligibleAmount(Math.round(maxLoan))
      } else {
        setEligibleAmount(0)
      }
    }
  }

  const calculatedResult = calculateEMI()

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Loan Center</h2>
      </div>

      <div className="bg-white rounded-4 shadow-sm p-4 border-top border-primary border-4">
        {/* Navigation Tabs */}
        <ul className="nav nav-pills mb-4 pb-2 border-bottom gap-2" role="tablist">
          <li className="nav-item">
            <button 
              className={`nav-link rounded-pill d-flex align-items-center gap-2 ${activeTab === 'apply' ? 'active bg-primary' : 'text-dark bg-light'}`}
              onClick={() => setActiveTab('apply')}
            >
              <FiFileText /> Apply Loan
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link rounded-pill d-flex align-items-center gap-2 ${activeTab === 'emi' ? 'active bg-success' : 'text-dark bg-light'}`}
              onClick={() => setActiveTab('emi')}
            >
              <FaCalculator /> EMI Calculator
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link rounded-pill d-flex align-items-center gap-2 ${activeTab === 'eligibility' ? 'active bg-warning text-dark' : 'text-dark bg-light'}`}
              onClick={() => setActiveTab('eligibility')}
            >
              <FiCheckCircle /> Eligibility Checker
            </button>
          </li>
        </ul>

        <div className="tab-content">
          {/* APPLY LOAN TAB */}
          {activeTab === 'apply' && (
            <div className="row animate__animated animate__fadeIn">
              <div className="col-xl-8 mx-auto">
                <form onSubmit={handleLoanSubmit} className="bg-light p-4 rounded-4 border border-light shadow-sm">
                  <h4 className="mb-4">New Loan Application</h4>
                  
                  <div className="row gy-3 mb-4">
                    <div className="col-md-6">
                      <label className="form-label text-muted small">Select Loan Type</label>
                      <select 
                        className="form-select" 
                        value={loanForm.type} 
                        onChange={(e) => setLoanForm({...loanForm, type: e.target.value})}
                        required
                      >
                        <option value="">Choose...</option>
                        <option value="Personal">Personal Loan</option>
                        <option value="Home">Home Loan</option>
                        <option value="Education">Education Loan</option>
                        <option value="Vehicle">Vehicle Loan</option>
                        <option value="Business">Business Loan</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-muted small">Required Amount (INR)</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        value={loanForm.amount} 
                        onChange={(e) => setLoanForm({...loanForm, amount: e.target.value})}
                        min="10000" 
                        required 
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-muted small">Desired Tenure (Months)</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        value={loanForm.tenure} 
                        onChange={(e) => setLoanForm({...loanForm, tenure: e.target.value})}
                        min="6" 
                        max="360" 
                        required 
                      />
                    </div>
                  </div>

                  <h5 className="mb-3 border-top pt-4">Upload Documents</h5>
                  <div className="row gy-3 mb-4">
                    <div className="col-md-4">
                      <div className="p-3 border rounded text-center bg-white position-relative">
                        <FiUploadCloud size={24} className={documents.idProof ? 'text-success' : 'text-primary'} />
                        <p className="small mb-1 mt-2 fw-medium">ID Proof (PAN/Aadhar)</p>
                        <input type="file" className="position-absolute top-0 start-0 w-100 h-100 opacity-0" onChange={(e) => handleFileChange(e, 'idProof')} required />
                        {documents.idProof ? <span className="badge bg-success small">Uploaded</span> : <span className="text-muted small">Click to upload</span>}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="p-3 border rounded text-center bg-white position-relative">
                        <FiUploadCloud size={24} className={documents.addressProof ? 'text-success' : 'text-primary'} />
                        <p className="small mb-1 mt-2 fw-medium">Address Proof</p>
                        <input type="file" className="position-absolute top-0 start-0 w-100 h-100 opacity-0" onChange={(e) => handleFileChange(e, 'addressProof')} required />
                        {documents.addressProof ? <span className="badge bg-success small">Uploaded</span> : <span className="text-muted small">Click to upload</span>}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="p-3 border rounded text-center bg-white position-relative">
                        <FiUploadCloud size={24} className={documents.incomeProof ? 'text-success' : 'text-primary'} />
                        <p className="small mb-1 mt-2 fw-medium">Income Proof (Salary Slip/ITR)</p>
                        <input type="file" className="position-absolute top-0 start-0 w-100 h-100 opacity-0" onChange={(e) => handleFileChange(e, 'incomeProof')} required />
                        {documents.incomeProof ? <span className="badge bg-success small">Uploaded</span> : <span className="text-muted small">Click to upload</span>}
                      </div>
                    </div>
                  </div>

                  <div className="text-end border-top pt-4">
                    <button type="submit" className="btn btn-primary btn-lg px-5" disabled={loading}>
                      {loading ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* EMI CALCULATOR TAB */}
          {activeTab === 'emi' && (
            <div className="row animate__animated animate__fadeIn">
              <div className="col-md-6 mb-4 mb-md-0">
                <div className="bg-light p-4 rounded-4 h-100">
                  <h4 className="mb-4">Loan EMI Calculator</h4>
                  
                  <div className="mb-4">
                    <div className="d-flex justify-content-between mb-2">
                      <label className="form-label text-muted small mb-0">Loan Amount</label>
                      <span className="fw-bold">{formatCurrency(emiData.principal)}</span>
                    </div>
                    <input type="range" className="form-range" min="10000" max="10000000" step="10000" value={emiData.principal} onChange={(e) => setEmiData({...emiData, principal: e.target.value})} />
                  </div>

                  <div className="mb-4">
                    <div className="d-flex justify-content-between mb-2">
                      <label className="form-label text-muted small mb-0">Interest Rate (% p.a.)</label>
                      <span className="fw-bold">{emiData.rate}%</span>
                    </div>
                    <input type="range" className="form-range" min="5" max="20" step="0.1" value={emiData.rate} onChange={(e) => setEmiData({...emiData, rate: e.target.value})} />
                  </div>

                  <div className="mb-4">
                    <div className="d-flex justify-content-between mb-2">
                      <label className="form-label text-muted small mb-0">Tenure (Months)</label>
                      <span className="fw-bold">{emiData.months} Months</span>
                    </div>
                    <input type="range" className="form-range" min="6" max="360" step="6" value={emiData.months} onChange={(e) => setEmiData({...emiData, months: e.target.value})} />
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="bg-success bg-opacity-10 text-success p-4 rounded-4 h-100 d-flex flex-column justify-content-center border border-success border-opacity-25">
                  <div className="text-center mb-4">
                    <h6 className="text-uppercase text-success opacity-75">Equated Monthly Installment</h6>
                    <h1 className="fw-bold display-4">{formatCurrency(calculatedResult.emi)}</h1>
                  </div>
                  <hr className="border-success opacity-25 my-4" />
                  <div className="row text-center gy-3">
                    <div className="col-6 border-end border-success border-opacity-25">
                      <span className="small d-block opacity-75">Principal Amount</span>
                      <h5 className="mb-0">{formatCurrency(emiData.principal)}</h5>
                    </div>
                    <div className="col-6">
                      <span className="small d-block opacity-75">Total Interest</span>
                      <h5 className="mb-0">{formatCurrency(calculatedResult.totalInterest)}</h5>
                    </div>
                    <div className="col-12 mt-4 pt-3 border-top border-success border-opacity-25">
                      <span className="small d-block opacity-75">Total Amount Payable</span>
                      <h4 className="mb-0 fw-bold">{formatCurrency(calculatedResult.totalPayable)}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ELIGIBILITY CHECKER TAB */}
          {activeTab === 'eligibility' && (
            <div className="row justify-content-center animate__animated animate__fadeIn">
              <div className="col-md-6">
                <div className="bg-light p-4 rounded-4 text-center border">
                  <div className="bg-warning bg-opacity-10 text-warning rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '64px', height: '64px' }}>
                    <FiCheckCircle size={32} />
                  </div>
                  <h4 className="mb-4">Check Your Eligibility</h4>
                  
                  <form onSubmit={checkEligibility} className="text-start">
                    <div className="mb-3">
                      <label className="form-label text-muted small">Net Monthly Income (INR)</label>
                      <input 
                        type="number" 
                        className="form-control form-control-lg" 
                        placeholder="e.g. 50000" 
                        value={eligibilityData.monthlyIncome}
                        onChange={(e) => setEligibilityData({...eligibilityData, monthlyIncome: e.target.value})}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="form-label text-muted small">Existing Monthly EMIs (INR)</label>
                      <input 
                        type="number" 
                        className="form-control form-control-lg" 
                        placeholder="e.g. 5000" 
                        value={eligibilityData.existingEmi}
                        onChange={(e) => setEligibilityData({...eligibilityData, existingEmi: e.target.value})}
                      />
                    </div>
                    <button type="submit" className="btn btn-warning w-100 btn-lg">Check Now</button>
                  </form>

                  {eligibleAmount !== null && (
                    <div className="mt-4 p-3 bg-white rounded-3 shadow-sm border animate__animated animate__bounceIn">
                      {eligibleAmount > 0 ? (
                        <>
                          <h6 className="text-muted mb-2">You are eligible for a loan up to:</h6>
                          <h2 className="text-success fw-bold mb-0">{formatCurrency(eligibleAmount)}</h2>
                          <p className="small text-muted mt-2 mb-0"><FiInfo /> Based on an avg. 10.5% interest rate over 5 years.</p>
                        </>
                      ) : (
                        <>
                          <h6 className="text-danger mb-2">Eligibility Not Met</h6>
                          <p className="text-muted small mb-0">Your existing EMIs exceed the permissible threshold for your income.</p>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default LoanApplication
