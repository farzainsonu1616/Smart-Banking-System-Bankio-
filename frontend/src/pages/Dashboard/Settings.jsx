import React, { useState } from 'react'
import { toast } from 'react-toastify'

const Settings = () => {
  const [notifications, setNotifications] = useState(true)
  const [newsletter, setNewsletter] = useState(false)
  const [twoFactor, setTwoFactor] = useState(false)

  const handleSave = () => {
    toast.success('Settings updated successfully!')
  }

  return (
    <div className="container-fluid py-4">
      <div className="row mb-4">
        <div className="col-12">
          <h4 className="mb-0 text-white" style={{ fontWeight: '700' }}>Account Settings</h4>
          <p className="text-light opacity-75">Manage your preferences and security settings.</p>
        </div>
      </div>

      <div className="row gy-4">
        <div className="col-lg-6">
          <div className="card border-0 h-100" style={{ background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(10px)', borderRadius: '16px' }}>
            <div className="card-body p-4 text-white">
              <h5 className="mb-4">Preferences</h5>
              
              <div className="form-check form-switch mb-3">
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  id="flexSwitchCheckChecked1" 
                  checked={notifications} 
                  onChange={() => setNotifications(!notifications)} 
                />
                <label className="form-check-label" htmlFor="flexSwitchCheckChecked1">Enable Push Notifications</label>
              </div>
              <p className="text-light opacity-75 small mb-4">Receive alerts for transactions and account updates.</p>

              <div className="form-check form-switch mb-3">
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  id="flexSwitchCheckChecked2" 
                  checked={newsletter} 
                  onChange={() => setNewsletter(!newsletter)} 
                />
                <label className="form-check-label" htmlFor="flexSwitchCheckChecked2">Subscribe to Newsletter</label>
              </div>
              <p className="text-light opacity-75 small mb-0">Get the latest banking news and product offers.</p>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card border-0 h-100" style={{ background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(10px)', borderRadius: '16px' }}>
            <div className="card-body p-4 text-white">
              <h5 className="mb-4">Security</h5>
              
              <div className="form-check form-switch mb-3">
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  id="flexSwitchCheckChecked3" 
                  checked={twoFactor} 
                  onChange={() => setTwoFactor(!twoFactor)} 
                />
                <label className="form-check-label" htmlFor="flexSwitchCheckChecked3">Two-Factor Authentication (2FA)</label>
              </div>
              <p className="text-light opacity-75 small mb-4">Add an extra layer of security to your account.</p>

              <button className="btn btn-outline-light btn-sm mb-2" onClick={() => toast.info('Password reset instructions sent to email.')}>Change Password</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12 text-end">
          <button className="btn btn-primary px-5 py-2" style={{ borderRadius: '8px' }} onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings
