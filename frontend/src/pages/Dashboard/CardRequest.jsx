import React, { useState } from 'react'
import { FiCreditCard, FiCheckCircle } from 'react-icons/fi'
import { toast } from 'react-toastify'

const CardRequest = () => {
  const [activeTab, setActiveTab] = useState('debit')
  const [loading, setLoading] = useState(false)

  const handleSimulateRequest = (e, type) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast.success(`${type} application submitted successfully! It will be reviewed shortly.`)
      e.target.reset()
    }, 1500)
  }

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Request New Card</h2>
      </div>

      <div className="bg-white rounded-4 shadow-sm p-4 border-top border-primary border-4">
        {/* Navigation Tabs */}
        <ul className="nav nav-pills mb-4 pb-2 border-bottom gap-2" role="tablist">
          <li className="nav-item">
            <button 
              className={`nav-link rounded-pill d-flex align-items-center gap-2 ${activeTab === 'debit' ? 'active bg-dark text-white' : 'text-dark bg-light'}`}
              onClick={() => setActiveTab('debit')}
            >
              <FiCreditCard /> Request Debit Card
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link rounded-pill d-flex align-items-center gap-2 ${activeTab === 'credit' ? 'active bg-primary' : 'text-dark bg-light'}`}
              onClick={() => setActiveTab('credit')}
            >
              <FiCreditCard /> Apply Credit Card
            </button>
          </li>
        </ul>

        <div className="tab-content">
          {/* DEBIT CARD TAB */}
          {activeTab === 'debit' && (
            <div className="row justify-content-center animate__animated animate__fadeIn">
              <div className="col-md-8 col-lg-6">
                <form onSubmit={(e) => handleSimulateRequest(e, 'Debit Card')} className="bg-light p-4 rounded-4 border">
                  <div className="text-center mb-4">
                    <div className="bg-dark bg-opacity-10 text-dark rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '64px', height: '64px' }}>
                      <FiCreditCard size={32} />
                    </div>
                    <h4>Debit Card Request</h4>
                    <p className="text-muted small">Link a new debit card to your existing accounts.</p>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label text-muted small">Select Linked Account</label>
                    <select className="form-select form-select-lg" required>
                      <option value="">Choose Account...</option>
                      <option value="1">XXXX-XXXX-4589 (Premium Savings)</option>
                      <option value="2">XXXX-XXXX-1234 (Current Account)</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-muted small">Name on Card</label>
                    <input type="text" className="form-control form-control-lg text-uppercase" placeholder="e.g. JOHN DOE" required />
                  </div>
                  <div className="mb-4">
                    <label className="form-label text-muted small">Card Type</label>
                    <select className="form-select form-select-lg" required>
                      <option value="visa">Visa Platinum</option>
                      <option value="mastercard">Mastercard World</option>
                      <option value="rupay">RuPay Select</option>
                    </select>
                  </div>

                  <div className="bg-white p-3 rounded border mb-4">
                    <h6 className="small fw-bold">Delivery Address</h6>
                    <p className="small text-muted mb-0">The card will be delivered to your registered home address within 5-7 business days.</p>
                  </div>

                  <button type="submit" className="btn btn-dark btn-lg w-100" disabled={loading}>
                    {loading ? 'Processing...' : 'Submit Request'}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* CREDIT CARD TAB */}
          {activeTab === 'credit' && (
            <div className="row justify-content-center animate__animated animate__fadeIn">
              <div className="col-md-8 col-lg-6">
                <form onSubmit={(e) => handleSimulateRequest(e, 'Credit Card')} className="bg-primary bg-opacity-10 p-4 rounded-4 border border-primary border-opacity-25">
                  <div className="text-center mb-4">
                    <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '64px', height: '64px' }}>
                      <FiCheckCircle size={32} />
                    </div>
                    <h4 className="text-primary">Apply for Credit Card</h4>
                    <p className="text-muted small">Get instant approval based on your relationship with us.</p>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label text-muted small">Employment Type</label>
                    <select className="form-select form-select-lg" required>
                      <option value="">Select...</option>
                      <option value="salaried">Salaried</option>
                      <option value="self">Self Employed</option>
                      <option value="business">Business Owner</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-muted small">Net Monthly Income (INR)</label>
                    <input type="number" className="form-control form-control-lg" placeholder="e.g. 75000" min="20000" required />
                  </div>
                  <div className="mb-4">
                    <label className="form-label text-muted small">Select Preferred Card</label>
                    <select className="form-select form-select-lg" required>
                      <option value="rewards">Bankio Rewards Elite</option>
                      <option value="travel">Bankio Miles Voyager</option>
                      <option value="cashback">Bankio CashPlus</option>
                    </select>
                  </div>

                  <div className="form-check mb-4">
                    <input className="form-check-input" type="checkbox" id="termsCheck" required />
                    <label className="form-check-label small text-muted" htmlFor="termsCheck">
                      I authorize Bankio to fetch my credit report and assess my eligibility.
                    </label>
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg w-100" disabled={loading}>
                    {loading ? 'Processing...' : 'Apply Now'}
                  </button>
                </form>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default CardRequest
