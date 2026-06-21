import React from 'react'
import { FiSearch, FiFilter, FiDownload } from 'react-icons/fi'

const SystemAuditLogs = () => {
  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">System Audit Logs</h2>
          <p className="text-muted mb-0">Track all actions performed by staff across the system</p>
        </div>
        <button className="btn btn-outline-primary d-flex align-items-center">
          <FiDownload className="me-2" /> Export Logs
        </button>
      </div>

      <div className="bg-white rounded-4 shadow-sm p-4">
        <div className="row mb-4 g-3">
          <div className="col-md-4">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0"><FiSearch /></span>
              <input type="text" className="form-control border-start-0" placeholder="Search logs..." />
            </div>
          </div>
          <div className="col-md-3">
            <select className="form-select">
              <option>All Modules</option>
              <option>Authentication</option>
              <option>Account Operations</option>
              <option>System Settings</option>
            </select>
          </div>
          <div className="col-md-3">
            <select className="form-select">
              <option>Last 24 Hours</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="col-md-2">
            <button className="btn btn-secondary w-100 d-flex align-items-center justify-content-center">
              <FiFilter className="me-2" /> Filter
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Log ID</th>
                <th>Timestamp</th>
                <th>User / IP</th>
                <th>Module</th>
                <th>Action details</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><small className="text-muted">#LOG-9281</small></td>
                <td>Today, 14:32:10</td>
                <td>
                  <div><strong>admin@smartbank.com</strong></div>
                  <small className="text-muted">192.168.1.5</small>
                </td>
                <td><span className="badge bg-secondary">System Settings</span></td>
                <td>Updated Global OTP Expiry from 15m to 5m</td>
                <td><span className="text-success fw-bold">Success</span></td>
              </tr>
              <tr>
                <td><small className="text-muted">#LOG-9280</small></td>
                <td>Today, 12:15:00</td>
                <td>
                  <div><strong>manager@smartbank.com</strong></div>
                  <small className="text-muted">10.0.4.12</small>
                </td>
                <td><span className="badge bg-primary">Account Operations</span></td>
                <td>Approved Loan Application #L-4829</td>
                <td><span className="text-success fw-bold">Success</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default SystemAuditLogs
