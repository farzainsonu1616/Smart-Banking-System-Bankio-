import React, { useState, useEffect } from 'react'
import { FiArrowDownCircle, FiArrowUpCircle, FiSend, FiClock, FiGlobe, FiRefreshCcw, FiSmartphone, FiMaximize } from 'react-icons/fi'
import { toast } from 'react-toastify'
import TransactionService from '../../services/TransactionService'
import AccountService from '../../services/AccountService'
import BeneficiaryService from '../../services/BeneficiaryService'
import { useAuth } from '../../context/AuthContext'

const TransferMoney = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('deposit')
  const [transferType, setTransferType] = useState('internal')
  const [loading, setLoading] = useState(false)
  const [accounts, setAccounts] = useState([])
  const [beneficiaries, setBeneficiaries] = useState([])
  const [qrScanning, setQrScanning] = useState(false)
  const [qrScanned, setQrScanned] = useState(false)

  // Form States
  const [accountId, setAccountId] = useState('')
  const [targetAccountId, setTargetAccountId] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    fetchAccounts()
    if (user?.id) {
      fetchBeneficiaries()
    }
  }, [user])

  const fetchAccounts = async () => {
    try {
      const response = await AccountService.getAccounts()
      if (response.data && response.data.data) {
        setAccounts(response.data.data)
      }
    } catch (error) {
      toast.error('Failed to load accounts')
    }
  }

  const fetchBeneficiaries = async () => {
    try {
      const response = await BeneficiaryService.getBeneficiaries(user.id)
      if (response.data && response.data.data) {
        setBeneficiaries(response.data.data)
      }
    } catch (error) {
      toast.error('Failed to load beneficiaries')
    }
  }

  const resetForm = () => {
    setAccountId('')
    setTargetAccountId('')
    setAmount('')
    setDescription('')
    setQrScanned(false)
  }

  const handleTransaction = async (e, type) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      let response;
      if (type === 'Deposit') {
        response = await TransactionService.deposit({ accountId, amount, description: description || 'Deposit' })
      } else if (type === 'Withdrawal') {
        response = await TransactionService.withdraw({ accountId, amount, description: description || 'Withdrawal' })
      } else if (type === 'Transfer' || type === 'UPI Payment' || type === 'QR Payment') {
        if (!targetAccountId) {
          toast.error("Please enter a valid target account ID or UPI mapped account")
          setLoading(false)
          return
        }
        response = await TransactionService.transfer({ sourceAccountId: accountId, targetAccountId, amount, description: description || type })
      }

      if (response && response.data) {
        toast.success(`${type} completed successfully!`)
        resetForm()
        fetchAccounts() // Refresh balances
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || `Failed to process ${type}`
      toast.error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  const simulateQrScan = () => {
    setQrScanning(true)
    setQrScanned(false)
    toast.info('Scanning QR code...')
    setTimeout(() => {
      setQrScanning(false)
      setQrScanned(true)
      setTargetAccountId('2') // Assuming '2' is the merchant's account ID for the demo
      toast.success('QR Code scanned successfully! Recipient: Merchant Store')
    }, 3000)
  }

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Transact & Transfer</h2>
      </div>

      <div className="bg-white rounded-4 shadow-sm p-4 border-top border-primary border-4">
        {/* Custom Navigation Pills */}
        <ul className="nav nav-pills mb-4 pb-2 border-bottom gap-2 flex-nowrap overflow-auto" style={{ whiteSpace: 'nowrap' }} role="tablist">
          <li className="nav-item" role="presentation">
            <button 
              className={`nav-link rounded-pill d-flex align-items-center gap-2 ${activeTab === 'deposit' ? 'active bg-success' : 'text-dark bg-light'}`}
              onClick={() => { setActiveTab('deposit'); resetForm(); }}
            >
              <FiArrowDownCircle /> Deposit
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button 
              className={`nav-link rounded-pill d-flex align-items-center gap-2 ${activeTab === 'withdraw' ? 'active bg-danger' : 'text-dark bg-light'}`}
              onClick={() => { setActiveTab('withdraw'); resetForm(); }}
            >
              <FiArrowUpCircle /> Withdraw
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button 
              className={`nav-link rounded-pill d-flex align-items-center gap-2 ${activeTab === 'transfer' ? 'active bg-primary' : 'text-dark bg-light'}`}
              onClick={() => { setActiveTab('transfer'); setTransferType('internal'); resetForm(); }}
            >
              <FiSend /> Transfer
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button 
              className={`nav-link rounded-pill d-flex align-items-center gap-2 ${activeTab === 'upi' ? 'active' : 'text-dark bg-light'}`}
              style={activeTab === 'upi' ? { background: 'linear-gradient(45deg, #FF7A00, #FF004D)' } : {}}
              onClick={() => { setActiveTab('upi'); resetForm(); }}
            >
              <FiSmartphone /> UPI Payment
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button 
              className={`nav-link rounded-pill d-flex align-items-center gap-2 ${activeTab === 'qr' ? 'active bg-dark' : 'text-dark bg-light'}`}
              onClick={() => { setActiveTab('qr'); resetForm(); }}
            >
              <FiMaximize /> Scan & Pay
            </button>
          </li>
        </ul>

        <div className="tab-content">
          {/* DEPOSIT TAB */}
          {activeTab === 'deposit' && (
            <div className="row justify-content-center animate__animated animate__fadeIn">
              <div className="col-md-6 col-lg-5">
                <div className="text-center mb-4">
                  <div className="bg-success bg-opacity-10 text-success rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '64px', height: '64px' }}>
                    <FiArrowDownCircle size={32} />
                  </div>
                  <h4>Deposit Money</h4>
                  <p className="text-muted">Add funds securely to your account</p>
                </div>
                <form onSubmit={(e) => handleTransaction(e, 'Deposit')}>
                  <div className="mb-3">
                    <label className="form-label text-muted small">Select Account</label>
                    <select className="form-select form-select-lg" required value={accountId} onChange={(e) => setAccountId(e.target.value)}>
                      <option value="">Choose Account...</option>
                      {accounts.map(acc => (
                        <option key={acc.id} value={acc.id}>{acc.accountNumber} (Bal: ${acc.balance})</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="form-label text-muted small">Amount (USD)</label>
                    <div className="input-group input-group-lg">
                      <span className="input-group-text bg-light text-muted">$</span>
                      <input type="number" className="form-control" placeholder="0.00" min="1" step="0.01" required value={amount} onChange={(e) => setAmount(e.target.value)} />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-success btn-lg w-100 fw-bold" disabled={loading}>
                    {loading ? 'Processing...' : 'Confirm Deposit'}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* WITHDRAW TAB */}
          {activeTab === 'withdraw' && (
            <div className="row justify-content-center animate__animated animate__fadeIn">
              <div className="col-md-6 col-lg-5">
                <div className="text-center mb-4">
                  <div className="bg-danger bg-opacity-10 text-danger rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '64px', height: '64px' }}>
                    <FiArrowUpCircle size={32} />
                  </div>
                  <h4>Withdraw Money</h4>
                  <p className="text-muted">Withdraw funds from your account</p>
                </div>
                <form onSubmit={(e) => handleTransaction(e, 'Withdrawal')}>
                  <div className="mb-3">
                    <label className="form-label text-muted small">Select Account</label>
                    <select className="form-select form-select-lg" required value={accountId} onChange={(e) => setAccountId(e.target.value)}>
                      <option value="">Choose Account...</option>
                      {accounts.map(acc => (
                        <option key={acc.id} value={acc.id}>{acc.accountNumber} (Bal: ${acc.balance})</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="form-label text-muted small">Amount (USD)</label>
                    <div className="input-group input-group-lg">
                      <span className="input-group-text bg-light text-muted">$</span>
                      <input type="number" className="form-control" placeholder="0.00" min="1" step="0.01" required value={amount} onChange={(e) => setAmount(e.target.value)} />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-danger btn-lg w-100 fw-bold" disabled={loading}>
                    {loading ? 'Processing...' : 'Confirm Withdrawal'}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TRANSFER TAB */}
          {activeTab === 'transfer' && (
            <div className="row justify-content-center animate__animated animate__fadeIn">
              <div className="col-xl-8 col-lg-10">
                <div className="d-flex flex-wrap gap-3 mb-4 justify-content-center">
                  <button type="button" className={`btn d-flex align-items-center gap-2 px-4 py-2 ${transferType === 'internal' ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => setTransferType('internal')}>
                    <FiRefreshCcw /> Internal Transfer
                  </button>
                  <button type="button" className={`btn d-flex align-items-center gap-2 px-4 py-2 ${transferType === 'external' ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => setTransferType('external')}>
                    <FiGlobe /> External Transfer
                  </button>
                  <button type="button" className={`btn d-flex align-items-center gap-2 px-4 py-2 ${transferType === 'scheduled' ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => setTransferType('scheduled')}>
                    <FiClock /> Scheduled Transfer
                  </button>
                </div>

                <div className="card border-light shadow-none bg-light p-4 rounded-4">
                  <form onSubmit={(e) => handleTransaction(e, 'Transfer')}>
                    <div className="row gy-3">
                      <div className="col-md-6">
                        <label className="form-label text-muted small">From Account</label>
                        <select className="form-select form-select-lg" required value={accountId} onChange={(e) => setAccountId(e.target.value)}>
                          <option value="">Choose Source Account...</option>
                          {accounts.map(acc => (
                            <option key={acc.id} value={acc.id}>{acc.accountNumber} (Bal: ${acc.balance})</option>
                          ))}
                        </select>
                      </div>

                      {transferType === 'internal' && (
                        <div className="col-md-6">
                          <label className="form-label text-muted small">To Account ID (Internal)</label>
                          <input type="number" className="form-control form-control-lg" placeholder="Target Account ID" required value={targetAccountId} onChange={(e) => setTargetAccountId(e.target.value)} />
                        </div>
                      )}

                      {(transferType === 'external' || transferType === 'scheduled') && (
                        <div className="col-md-6">
                          <label className="form-label text-muted small">Beneficiary Account</label>
                          <select className="form-select form-select-lg" required value={targetAccountId} onChange={(e) => setTargetAccountId(e.target.value)}>
                            <option value="">Select Beneficiary...</option>
                            {beneficiaries.map(ben => (
                              <option key={ben.id} value={ben.accountNumber}>{ben.name} ({ben.accountNumber})</option>
                            ))}
                          </select>
                        </div>
                      )}

                      <div className="col-md-12 mt-4">
                        <label className="form-label text-muted small">Amount (USD)</label>
                        <div className="input-group input-group-lg">
                          <span className="input-group-text bg-white text-muted">$</span>
                          <input type="number" className="form-control" placeholder="0.00" min="1" step="0.01" required value={amount} onChange={(e) => setAmount(e.target.value)} />
                        </div>
                      </div>

                      {transferType === 'scheduled' && (
                        <div className="col-md-6 mt-4">
                          <label className="form-label text-muted small">Schedule Date</label>
                          <input type="date" className="form-control form-control-lg" required />
                        </div>
                      )}

                      <div className="col-12 mt-4">
                        <label className="form-label text-muted small">Remarks / Description</label>
                        <input type="text" className="form-control form-control-lg" placeholder="Optional" value={description} onChange={(e) => setDescription(e.target.value)} />
                      </div>

                      <div className="col-12 mt-4 pt-3 border-top text-end">
                        <button type="submit" className="btn btn-primary btn-lg px-5 fw-bold" disabled={loading}>
                          {loading ? 'Processing...' : (transferType === 'scheduled' ? 'Schedule Transfer' : 'Send Money')}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* UPI TAB */}
          {activeTab === 'upi' && (
            <div className="row justify-content-center animate__animated animate__fadeIn">
              <div className="col-md-6 col-lg-5">
                <div className="text-center mb-4">
                  <div className="bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '64px', height: '64px', background: 'linear-gradient(45deg, #FF7A00, #FF004D)', color: '#fff' }}>
                    <FiSmartphone size={32} />
                  </div>
                  <h4>UPI Transfer</h4>
                  <p className="text-muted">Instant payment to any UPI ID</p>
                </div>
                <form onSubmit={(e) => handleTransaction(e, 'UPI Payment')}>
                  <div className="mb-3">
                    <label className="form-label text-muted small">From Account</label>
                    <select className="form-select form-select-lg" required value={accountId} onChange={(e) => setAccountId(e.target.value)}>
                      <option value="">Choose Account...</option>
                      {accounts.map(acc => (
                        <option key={acc.id} value={acc.id}>{acc.accountNumber} (Bal: ${acc.balance})</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-muted small">UPI ID</label>
                    <input type="text" className="form-control form-control-lg" placeholder="e.g. username@bank" required value={targetAccountId} onChange={(e) => setTargetAccountId(e.target.value)} />
                  </div>
                  <div className="mb-4">
                    <label className="form-label text-muted small">Amount (USD)</label>
                    <div className="input-group input-group-lg">
                      <span className="input-group-text bg-light text-muted">$</span>
                      <input type="number" className="form-control" placeholder="0.00" min="1" step="0.01" required value={amount} onChange={(e) => setAmount(e.target.value)} />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-dark btn-lg w-100 fw-bold border-0" style={{ background: 'linear-gradient(45deg, #FF7A00, #FF004D)' }} disabled={loading}>
                    {loading ? 'Processing...' : 'Pay via UPI'}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* QR SCAN TAB */}
          {activeTab === 'qr' && (
            <div className="row justify-content-center animate__animated animate__fadeIn">
              <div className="col-md-6 col-lg-5">
                <div className="text-center mb-4">
                  <div className="bg-dark bg-opacity-10 text-dark rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '64px', height: '64px' }}>
                    <FiMaximize size={32} />
                  </div>
                  <h4>Scan & Pay</h4>
                  <p className="text-muted">Pay at stores using QR code</p>
                </div>
                
                {!qrScanned ? (
                  <div className="text-center">
                    <div className={`bg-light border rounded-4 d-flex align-items-center justify-content-center mx-auto mb-4 ${qrScanning ? 'border-primary' : ''}`} style={{ width: '250px', height: '250px', borderStyle: 'dashed !important' }}>
                      {qrScanning ? (
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Scanning...</span>
                        </div>
                      ) : (
                        <FiMaximize size={64} className="text-muted opacity-50" />
                      )}
                    </div>
                    <button type="button" className="btn btn-outline-dark btn-lg px-5" onClick={simulateQrScan} disabled={qrScanning}>
                      {qrScanning ? 'Scanning...' : 'Simulate Camera Scan'}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={(e) => handleTransaction(e, 'QR Payment')} className="animate__animated animate__zoomIn">
                    <div className="alert alert-success d-flex align-items-center gap-3 mb-4">
                      <div className="fs-1">🏪</div>
                      <div>
                        <h6 className="mb-0 fw-bold">Merchant Store</h6>
                        <small>Verified Merchant</small>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <label className="form-label text-muted small">From Account</label>
                      <select className="form-select form-select-lg" required value={accountId} onChange={(e) => setAccountId(e.target.value)}>
                        <option value="">Choose Account...</option>
                        {accounts.map(acc => (
                          <option key={acc.id} value={acc.id}>{acc.accountNumber} (Bal: ${acc.balance})</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="form-label text-muted small">Amount (USD)</label>
                      <div className="input-group input-group-lg">
                        <span className="input-group-text bg-light text-muted">$</span>
                        <input type="number" className="form-control" placeholder="0.00" min="1" step="0.01" required value={amount} onChange={(e) => setAmount(e.target.value)} />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-dark btn-lg w-100 fw-bold" disabled={loading}>
                      {loading ? 'Processing...' : 'Pay Now'}
                    </button>
                    <button type="button" className="btn btn-link text-muted w-100 mt-2" onClick={() => setQrScanned(false)}>
                      Scan Again
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default TransferMoney
