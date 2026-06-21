import React, { useState } from 'react'
import { FiBell, FiSmartphone, FiMail, FiDollarSign, FiFileText, FiCreditCard, FiShield, FiCheckCircle } from 'react-icons/fi'

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('inapp')

  const mockNotifications = [
    { id: 1, type: 'TRANSACTION', title: 'Amount Credited', message: 'INR 15,000 has been credited to your account XXXX-4589.', date: 'Just now', read: false },
    { id: 2, type: 'SECURITY', title: 'New Login Detected', message: 'A login was detected from a new device (Windows 11) in Mumbai.', date: '2 hours ago', read: false },
    { id: 3, type: 'LOAN', title: 'Loan Approved', message: 'Congratulations! Your Personal Loan of INR 5,00,000 has been approved.', date: '1 day ago', read: true },
    { id: 4, type: 'CARD', title: 'Card Dispatched', message: 'Your new Visa Platinum Debit Card has been dispatched and will reach you in 3-5 days.', date: '2 days ago', read: true },
  ]

  const getIcon = (type) => {
    switch(type) {
      case 'TRANSACTION': return <div className="bg-success bg-opacity-10 text-success p-2 rounded-circle"><FiDollarSign size={20} /></div>
      case 'SECURITY': return <div className="bg-danger bg-opacity-10 text-danger p-2 rounded-circle"><FiShield size={20} /></div>
      case 'LOAN': return <div className="bg-primary bg-opacity-10 text-primary p-2 rounded-circle"><FiFileText size={20} /></div>
      case 'CARD': return <div className="bg-warning bg-opacity-10 text-warning p-2 rounded-circle"><FiCreditCard size={20} /></div>
      default: return <div className="bg-secondary bg-opacity-10 text-secondary p-2 rounded-circle"><FiBell size={20} /></div>
    }
  }

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0 d-flex align-items-center gap-2">
          <FiBell className="text-primary" /> Notification Center
        </h2>
        <button className="btn btn-sm btn-outline-primary d-none d-md-block">Mark All as Read</button>
      </div>

      <div className="bg-white rounded-4 shadow-sm p-4 border-top border-primary border-4">
        {/* Navigation Tabs */}
        <ul className="nav nav-pills mb-4 pb-2 border-bottom gap-2" role="tablist">
          <li className="nav-item">
            <button 
              className={`nav-link rounded-pill d-flex align-items-center gap-2 ${activeTab === 'inapp' ? 'active bg-primary' : 'text-dark bg-light'}`}
              onClick={() => setActiveTab('inapp')}
            >
              <FiBell /> In-App Alerts
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link rounded-pill d-flex align-items-center gap-2 ${activeTab === 'email' ? 'active bg-dark text-white' : 'text-dark bg-light'}`}
              onClick={() => setActiveTab('email')}
            >
              <FiMail /> Email Simulation
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link rounded-pill d-flex align-items-center gap-2 ${activeTab === 'sms' ? 'active bg-success' : 'text-dark bg-light'}`}
              onClick={() => setActiveTab('sms')}
            >
              <FiSmartphone /> SMS Simulation
            </button>
          </li>
        </ul>

        <div className="tab-content">
          
          {/* IN-APP ALERTS TAB */}
          {activeTab === 'inapp' && (
            <div className="animate__animated animate__fadeIn">
              <div className="d-flex flex-column gap-3">
                {mockNotifications.map(notification => (
                  <div key={notification.id} className={`p-3 rounded-3 border d-flex gap-3 align-items-start ${notification.read ? 'bg-white' : 'bg-light border-primary border-opacity-25'}`}>
                    {getIcon(notification.type)}
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <h6 className="mb-0 fw-bold">{notification.title}</h6>
                        <span className="small text-muted">{notification.date}</span>
                      </div>
                      <p className="small text-muted mb-0">{notification.message}</p>
                    </div>
                    {!notification.read && <div className="mt-2"><span className="badge bg-primary rounded-circle p-1"><span className="visually-hidden">Unread</span></span></div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EMAIL SIMULATION TAB */}
          {activeTab === 'email' && (
            <div className="animate__animated animate__fadeIn row justify-content-center">
              <div className="col-lg-8">
                <div className="bg-light p-3 rounded-top-3 border border-bottom-0 d-flex align-items-center gap-2">
                  <div className="rounded-circle bg-danger" style={{width: '12px', height: '12px'}}></div>
                  <div className="rounded-circle bg-warning" style={{width: '12px', height: '12px'}}></div>
                  <div className="rounded-circle bg-success" style={{width: '12px', height: '12px'}}></div>
                  <span className="ms-2 small text-muted font-monospace">Email Client Preview</span>
                </div>
                <div className="bg-white border rounded-bottom-3 p-0 overflow-hidden shadow-sm">
                  <div className="p-3 border-bottom bg-light">
                    <p className="mb-1"><strong className="text-muted small me-2">From:</strong> alerts@bankio.com</p>
                    <p className="mb-1"><strong className="text-muted small me-2">To:</strong> customer@bankio.com</p>
                    <p className="mb-0"><strong className="text-muted small me-2">Subject:</strong> Security Alert: New Login Detected</p>
                  </div>
                  <div className="p-4 p-md-5 bg-white text-center">
                    <h2 className="fw-bold text-primary mb-4" style={{ letterSpacing: '1px' }}>Bankio</h2>
                    <div className="p-4 bg-light rounded-4 text-start">
                      <h5 className="mb-3">Hello Customer,</h5>
                      <p className="text-muted">We noticed a new login to your Bankio account from an unrecognized device.</p>
                      
                      <div className="bg-white p-3 rounded border my-4 font-monospace small">
                        <strong>Device:</strong> Windows 11 - Chrome<br/>
                        <strong>Location:</strong> Mumbai, India<br/>
                        <strong>Time:</strong> {new Date().toLocaleString()}
                      </div>

                      <p className="text-muted mb-4">If this was you, you can safely ignore this email. If you don't recognize this activity, please secure your account immediately.</p>
                      
                      <div className="text-center">
                        <button className="btn btn-danger px-4 py-2">Secure My Account</button>
                      </div>
                    </div>
                    <p className="small text-muted mt-4 mb-0">© 2026 Bankio. All rights reserved.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SMS SIMULATION TAB */}
          {activeTab === 'sms' && (
            <div className="animate__animated animate__fadeIn d-flex justify-content-center">
              <div className="position-relative" style={{ width: '320px', height: '600px', background: '#000', borderRadius: '40px', padding: '15px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
                {/* Phone screen */}
                <div className="bg-light h-100 w-100 rounded-4 overflow-hidden position-relative pb-4">
                  
                  {/* Status Bar */}
                  <div className="bg-light w-100 px-3 py-2 d-flex justify-content-between align-items-center small fw-bold">
                    <span>09:41</span>
                    <div className="d-flex gap-1 align-items-center">
                      <FiCheckCircle size={12} /> <FiCheckCircle size={12} />
                    </div>
                  </div>
                  
                  {/* Header */}
                  <div className="bg-white px-3 py-2 border-bottom text-center">
                    <div className="bg-secondary bg-opacity-25 rounded-circle d-inline-flex p-2 mb-1">
                      <FiUser size={24} className="text-dark" />
                    </div>
                    <h6 className="mb-0 fw-bold">BANKIO</h6>
                  </div>

                  {/* SMS Messages Container */}
                  <div className="p-3 d-flex flex-column gap-3 overflow-auto" style={{ height: 'calc(100% - 130px)' }}>
                    
                    <div className="text-center small text-muted my-2">Today 10:15 AM</div>
                    
                    {/* Message 1 */}
                    <div className="bg-white p-3 rounded-4 shadow-sm align-self-start" style={{ maxWidth: '85%', borderBottomLeftRadius: '4px' }}>
                      <p className="small mb-0">
                        Dear Customer, INR 15,000 has been credited to your A/c XXXX-4589 on {new Date().toLocaleDateString()}. Info: NEFT-TRANSFER. Available Bal: INR 1,25,000.
                      </p>
                    </div>

                    <div className="text-center small text-muted my-2">Today 02:30 PM</div>

                    {/* Message 2 */}
                    <div className="bg-white p-3 rounded-4 shadow-sm align-self-start border border-danger border-opacity-25" style={{ maxWidth: '85%', borderBottomLeftRadius: '4px' }}>
                      <p className="small mb-0">
                        SECURITY ALERT: New login detected on Bankio from Windows 11. If this wasn't you, block your account immediately: bankio.com/secure
                      </p>
                    </div>

                  </div>

                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default Notifications
