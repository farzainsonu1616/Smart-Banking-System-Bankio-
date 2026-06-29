import React from 'react'
import { FiSave } from 'react-icons/fi'

const SuperAdminSettings = () => {
  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bolder text-dark mb-0">Portal Settings</h3>
        <button className="btn btn-primary d-flex align-items-center gap-2"><FiSave /> Save Changes</button>
      </div>

      <div className="card border-0 shadow-sm rounded-4 p-4 hover-lift" style={{ background: 'var(--secondary)' }}>
        <div className="row gy-4">
          <div className="col-md-6">
            <div className="form-group">
              <label className="form-label fw-bold">Admin Portal Theme</label>
              <select className="form-select border-0 bg-light">
                <option>System Default</option>
                <option>Light Mode</option>
                <option>Dark Mode</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="form-label fw-bold">Session Timeout (Minutes)</label>
              <input type="number" className="form-control border-0 bg-light" defaultValue="15" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="form-label fw-bold">Default Export Format</label>
              <select className="form-select border-0 bg-light">
                <option>PDF</option>
                <option>Excel (CSV)</option>
                <option>JSON</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="form-label fw-bold">Enable Multi-Factor Authentication</label>
              <div className="form-check form-switch mt-2">
                <input className="form-check-input" type="checkbox" role="switch" id="mfaSwitch" defaultChecked />
                <label className="form-check-label" htmlFor="mfaSwitch">Require OTP for Admin Logins</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuperAdminSettings
