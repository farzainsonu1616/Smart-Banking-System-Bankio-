import React, { useState, useEffect } from 'react'
import { FiArrowDownCircle, FiArrowUpCircle, FiSend, FiClock, FiGlobe, FiRefreshCcw, FiSmartphone, FiMaximize } from 'react-icons/fi'
import { toast } from 'react-toastify'

const TransferMoney = () => {
  const [activeTab, setActiveTab] = useState('deposit')
  const [transferType, setTransferType] = useState('internal')
  const [loading, setLoading] = useState(false)
  const [qrScanning, setQrScanning] = useState(false)
  const [qrScanned, setQrScanned] = useState(false)

  const handleTransaction = (e, type) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast.success(`${type} completed successfully!`)
      e.target.reset()
      if(type === 'QR Payment') setQrScanned(false)
    }, 1500)
  }

  const simulateQrScan = () => {
    setQrScanning(true)
    setQrScanned(false)
    toast.info('Scanning QR code...')
    setTimeout(() => {
      setQrScanning(false)
      setQrScanned(true)
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
              onClick={() => setActiveTab('deposit')}
            >
              <FiArrowDownCircle /> Deposit
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button 
              className={`nav-link rounded-pill d-flex align-items-center gap-2 ${activeTab === 'withdraw' ? 'active bg-danger' : 'text-dark bg-light'}`}
              onClick={() => setActiveTab('withdraw')}
            >
              <FiArrowUpCircle /> Withdraw
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button 
              className={`nav-link rounded-pill d-flex align-items-center gap-2 ${activeTab === 'transfer' ? 'active bg-primary' : 'text-dark bg-light'}`}
              onClick={() => {setActiveTab('transfer'); setTransferType('internal')}}
            >
              <FiSend /> Transfer
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button 
              className={`nav-link rounded-pill d-flex align-items-center gap-2 ${activeTab === 'upi' ? 'active' : 'text-dark bg-light'}`}
              style={activeTab === 'upi' ? { background: 'linear-gradient(45deg, #FF7A00, #FF004D)' } : {}}
              onClick={() => setActiveTab('upi')}
            >
              <FiSmartphone /> UPI Payment
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button 
              className={`nav-link rounded-pill d-flex align-items-center gap-2 ${activeTab === 'qr' ? 'active bg-dark' : 'text-dark bg-light'}`}
              onClick={() => setActiveTab('qr')}
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
                    <select className="form-select form-select-lg" required>
                      <option value="">Choose Account...</option>
                      <option value="1">XXXX-XXXX-4589 (Premium Savings)</option>
                      <option value="2">XXXX-XXXX-1234 (Current Account)</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="form-label text-muted small">Amount (USD)</label>
                    <div className="input-group input-group-lg">
                      <span className="input-group-text bg-light text-muted">$</span>
                      <input type="number" className="form-control" placeholder="0.00" min="100" required />
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
                    <select className="form-select form-select-lg" required>
                      <option value="">Choose Account...</option>
                      <option value="1">XXXX-XXXX-4589 (Premium Savings) - Bal: $4,500</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="form-label text-muted small">Amount (USD)</label>
                    <div className="input-group input-group-lg">
                      <span className="input-group-text bg-light text-muted">$</span>
                      <input type="number" className="form-control" placeholder="0.00" min="100" required />
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
                  <button className={`btn d-flex align-items-center gap-2 px-4 py-2 ${transferType === 'internal' ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => setTransferType('internal')}>
                    <FiRefreshCcw /> Internal Transfer
                  </button>
                  <button className={`btn d-flex align-items-center gap-2 px-4 py-2 ${transferType === 'external' ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => setTransferType('external')}>
                    <FiGlobe /> External Transfer
                  </button>
                  <button className={`btn d-flex align-items-center gap-2 px-4 py-2 ${transferType === 'scheduled' ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => setTransferType('scheduled')}>
                    <FiClock /> Scheduled Transfer
                  </button>
                </div>

                <div className="card border-light shadow-none bg-light p-4 rounded-4">
                  <form onSubmit={(e) => handleTransaction(e, 'Transfer')}>
                    <div className="row gy-3">
                      <div className="col-md-6">
                        <label className="form-label text-muted small">From Account</label>
                        <select className="form-select form-select-lg" required>
                          <option value="">Choose Source Account...</option>
                          <option value="1">XXXX-XXXX-4589 (Bal: $4,500)</option>
                        </select>
                      </div>

                      {transferType === 'internal' && (
                        <div className="col-md-6">
                          <label className="form-label text-muted small">To Account (Internal)</label>
                          <select className="form-select form-select-lg" required>
                            <option value="">Choose Destination...</option>
                            <option value="2">XXXX-XXXX-1234 (Current Account)</option>
                          </select>
                        </div>
                      )}

                      {(transferType === 'external' || transferType === 'scheduled') && (
                        <div className="col-md-6">
                          <label className="form-label text-muted small">Beneficiary Account</label>
                          <select className="form-select form-select-lg" required>
                            <option value="">Select Beneficiary...</option>
                            <option value="b1">John Doe (HDFC Bank)</option>
                            <option value="b2">Sarah Smith (SBI)</option>
                          </select>
                        </div>
                      )}

                      <div className="col-md-12 mt-4">
                        <label className="form-label text-muted small">Amount (USD)</label>
                        <div className="input-group input-group-lg">
                          <span className="input-group-text bg-white text-muted">$</span>
                          <input type="number" className="form-control" placeholder="0.00" min="1" required />
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
                        <input type="text" className="form-control form-control-lg" placeholder="Optional" />
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
                    <label className="form-label text-muted small">Payee UPI ID</label>
                    <input type="text" className="form-control form-control-lg" placeholder="e.g. john@bankio" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-muted small">From Account</label>
                    <select className="form-select form-select-lg" required>
                      <option value="">Choose Source Account...</option>
                      <option value="1">XXXX-XXXX-4589 (Bal: $4,500)</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="form-label text-muted small">Amount (USD)</label>
                    <div className="input-group input-group-lg">
                      <span className="input-group-text bg-light text-muted">$</span>
                      <input type="number" className="form-control" placeholder="0.00" min="1" required />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-lg w-100 fw-bold text-white" style={{ background: 'linear-gradient(45deg, #FF7A00, #FF004D)', border: 'none' }} disabled={loading}>
                    {loading ? 'Processing...' : 'Pay via UPI'}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* QR SCANNER TAB */}
          {activeTab === 'qr' && (
            <div className="row justify-content-center animate__animated animate__fadeIn">
              <div className="col-md-6 col-lg-5 text-center">
                <div className="mb-4">
                  <div className="bg-dark bg-opacity-10 text-dark rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '64px', height: '64px' }}>
                    <FiMaximize size={32} />
                  </div>
                  <h4>Scan & Pay</h4>
                  <p className="text-muted">Align the QR code within the frame to scan.</p>
                </div>

                {!qrScanned ? (
                  <div className="qr-scanner-container position-relative mx-auto mb-4" style={{ width: '250px', height: '250px', border: '2px dashed #ccc', borderRadius: '16px', overflow: 'hidden' }}>
                    {/* Simulated Camera Feed */}
                    <div className="bg-dark w-100 h-100 d-flex align-items-center justify-content-center text-white opacity-75">
                      <FiSmartphone size={48} />
                    </div>
                    
                    {qrScanning && (
                      <div className="scan-line" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'var(--success)', boxShadow: '0 0 10px var(--success)', animation: 'scan 1.5s infinite linear' }}></div>
                    )}
                    <style>{`@keyframes scan { 0% { top: 0; } 50% { top: 100%; } 100% { top: 0; } }`}</style>
                  </div>
                ) : (
                  <div className="bg-success bg-opacity-10 border border-success rounded-4 p-4 mb-4 text-start">
                    <h5 className="text-success mb-3"><FiArrowDownCircle /> Scanned Details</h5>
                    <p className="mb-1 fw-bold">Merchant Store Pvt Ltd</p>
                    <p className="text-muted small mb-0">UPI ID: merchant@store</p>
                  </div>
                )}

                {!qrScanned ? (
                  <button className="btn btn-dark btn-lg w-100 fw-bold" onClick={simulateQrScan} disabled={qrScanning}>
                    {qrScanning ? 'Scanning...' : 'Start Camera Scan'}
                  </button>
                ) : (
                  <form onSubmit={(e) => handleTransaction(e, 'QR Payment')} className="text-start">
                    <div className="mb-4">
                      <label className="form-label text-muted small">Enter Amount (USD)</label>
                      <div className="input-group input-group-lg">
                        <span className="input-group-text bg-light text-muted">$</span>
                        <input type="number" className="form-control border-success" placeholder="0.00" min="1" autoFocus required />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-success btn-lg w-100 fw-bold" disabled={loading}>
                      {loading ? 'Processing...' : 'Pay Now'}
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
