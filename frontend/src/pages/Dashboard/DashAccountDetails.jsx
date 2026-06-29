import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiCopy, FiCheckCircle, FiInfo, FiActivity } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { formatCurrency } from '../../utils/Helpers'
import Preloader from '../../components/Common/Preloader'
import AccountService from '../../services/AccountService'

const DashAccountDetails = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [accountData, setAccountData] = useState(null)

  useEffect(() => {
    fetchAccountData()
  }, [])

  const fetchAccountData = async () => {
    try {
      setLoading(true)
      let account;
      // If navigated with state, use that ID, else fetch all and use first
      if (location.state?.accountId) {
        const res = await AccountService.getAccountById(location.state.accountId)
        account = res.data.data
      } else {
        const res = await AccountService.getAccounts()
        if (res.data.data && res.data.data.length > 0) {
          account = res.data.data[0]
        } else {
          toast.error('No accounts found')
          navigate('/customer/dashboard')
          return
        }
      }
      
      setAccountData(account)
    } catch (error) {
      toast.error('Failed to load account details')
      navigate('/customer/dashboard')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success('Account number copied!')
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading || !accountData) return <Preloader />

  return (
    <div className="container-fluid py-4">
      <div className="d-flex align-items-center mb-4 gap-3">
        <Link to="/customer/accounts" className="btn btn-outline-light text-dark rounded-circle d-flex align-items-center justify-content-center p-0" style={{ width: '40px', height: '40px' }}>
          <FiArrowLeft size={20} />
        </Link>
        <h2 className="mb-0">Account Details</h2>
      </div>

      <div className="row gy-4">
        {/* Main Account Info Card */}
        <div className="col-xl-8">
          <div className="bg-white rounded-4 shadow-sm p-4 h-100 border-top border-primary border-4">
            <div className="row align-items-center mb-4">
              <div className="col-md-8">
                <span className="badge bg-primary bg-opacity-10 text-primary mb-2 px-3 py-2 fs-6">
                  {accountData.accountType}
                </span>
                <div className="d-flex align-items-center gap-3 mt-2">
                  <h3 className="mb-0 letter-spacing-2 font-monospace">{accountData.accountNumber}</h3>
                  <button 
                    onClick={() => copyToClipboard(accountData.accountNumber)} 
                    className="btn btn-sm btn-light border"
                    title="Copy Account Number"
                  >
                    {copied ? <FiCheckCircle className="text-success" /> : <FiCopy />}
                  </button>
                </div>
              </div>
              <div className="col-md-4 text-md-end mt-3 mt-md-0">
                <span className={`badge ${accountData.status === 'ACTIVE' ? 'bg-success' : 'bg-danger'} px-4 py-2 fs-6 rounded-pill`}>
                  <FiActivity className="me-2" />
                  {accountData.status}
                </span>
              </div>
            </div>

            <hr className="my-4 opacity-25" />

            {/* Detailed Info Grid */}
            <div className="row gy-4">
              <div className="col-sm-6 col-md-4">
                <div className="p-3 bg-light rounded-3">
                  <p className="text-muted small mb-1">Available Balance</p>
                  <h4 className="text-primary mb-0">{formatCurrency(accountData.balance, accountData.currency || 'INR')}</h4>
                </div>
              </div>
              <div className="col-sm-6 col-md-4">
                <div className="p-3 bg-light rounded-3">
                  <p className="text-muted small mb-1">Branch Name</p>
                  <h5 className="mb-0 text-dark">Main Branch</h5>
                </div>
              </div>
              <div className="col-sm-6 col-md-4">
                <div className="p-3 bg-light rounded-3">
                  <p className="text-muted small mb-1">IFSC Code</p>
                  <h5 className="mb-0 text-dark">{accountData.ifscCode || 'BNKO0001234'}</h5>
                </div>
              </div>
              <div className="col-sm-6 col-md-4">
                <div className="p-3 bg-light rounded-3">
                  <p className="text-muted small mb-1">Interest Rate</p>
                  <h5 className="mb-0 text-dark">4.5% p.a.</h5>
                </div>
              </div>
              <div className="col-sm-6 col-md-4">
                <div className="p-3 bg-light rounded-3">
                  <p className="text-muted small mb-1">Daily Transfer Limit</p>
                  <h5 className="mb-0 text-dark">{formatCurrency(100000, accountData.currency || 'INR')}</h5>
                </div>
              </div>
              <div className="col-sm-6 col-md-4">
                <div className="p-3 bg-light rounded-3">
                  <p className="text-muted small mb-1">Account Opened</p>
                  <h5 className="mb-0 text-dark">{new Date(accountData.createdAt).toLocaleDateString()}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Help / Info Card */}
        <div className="col-xl-4">
          <div className="bg-white rounded-4 shadow-sm p-4 h-100">
            <h5 className="mb-4 d-flex align-items-center gap-2">
              <FiInfo className="text-primary" /> Important Information
            </h5>
            <ul className="list-unstyled text-muted d-flex flex-column gap-3">
              <li className="d-flex align-items-start gap-2">
                <FiCheckCircle className="text-success mt-1 flex-shrink-0" />
                <span className="small">Your account is fully KYC verified. You have access to all premium banking features.</span>
              </li>
              <li className="d-flex align-items-start gap-2">
                <FiCheckCircle className="text-success mt-1 flex-shrink-0" />
                <span className="small">Never share your OTP, PIN, or CVV with anyone. Bankio will never call you asking for these details.</span>
              </li>
              <li className="d-flex align-items-start gap-2">
                <FiCheckCircle className="text-success mt-1 flex-shrink-0" />
                <span className="small">Ensure sufficient balance is maintained to avoid non-maintenance charges.</span>
              </li>
            </ul>
            
            <div className="mt-4 pt-3 border-top">
              <h6 className="mb-3">Need Help?</h6>
              <Link to="/customer/support" className="btn btn-outline-primary w-100">Contact Support</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashAccountDetails
