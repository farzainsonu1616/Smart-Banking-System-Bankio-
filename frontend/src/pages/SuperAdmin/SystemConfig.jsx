import React from 'react'
import { FiSettings, FiSave } from 'react-icons/fi'

const SystemConfig = () => {
  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">System Configuration</h2>
          <p className="text-muted mb-0">Global application settings and parameters</p>
        </div>
        <button className="btn btn-primary d-flex align-items-center">
          <FiSave className="me-2" /> Save Changes
        </button>
      </div>

      <div className="row">
        <div className="col-xl-8">
          <div className="bg-white rounded-4 shadow-sm p-4">
            
            <h5 className="mb-4 text-dark fw-bold border-bottom pb-2">Security Parameters</h5>
            <div className="row mb-4">
              <div className="col-md-6 mb-3">
                <label className="form-label text-muted fw-bold">Session Timeout (Minutes)</label>
                <input type="number" className="form-control" defaultValue="15" />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label text-muted fw-bold">Max Failed Login Attempts</label>
                <input type="number" className="form-control" defaultValue="5" />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label text-muted fw-bold">OTP Expiry (Minutes)</label>
                <input type="number" className="form-control" defaultValue="5" />
              </div>
              <div className="col-md-6 mb-3">
                <div className="form-check form-switch mt-4">
                  <input className="form-check-input" type="checkbox" id="mfaToggle" defaultChecked />
                  <label className="form-check-label fw-bold" htmlFor="mfaToggle">Force 2FA for all Staff</label>
                </div>
              </div>
            </div>

            <h5 className="mb-4 text-dark fw-bold border-bottom pb-2 mt-5">Maintenance Mode</h5>
            <div className="row mb-3">
              <div className="col-12">
                <div className="alert alert-warning border-0 d-flex align-items-center">
                  <div className="form-check form-switch me-3">
                    <input className="form-check-input" type="checkbox" id="maintenanceToggle" />
                  </div>
                  <div>
                    <strong>Enable System Maintenance Mode</strong>
                    <p className="mb-0 small">This will log out all customers and show a maintenance page. Admins will still have access.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default SystemConfig
