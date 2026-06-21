import React from 'react'
import { FiShield, FiAlertTriangle, FiLock, FiEye } from 'react-icons/fi'
import StatCard from '../../components/DashboardWidgets/StatCard'

const SecurityMonitoring = () => {
  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Security Monitoring</h2>
          <p className="text-muted mb-0">Real-time threat detection and firewall logs</p>
        </div>
        <button className="btn btn-outline-danger d-flex align-items-center">
          <FiAlertTriangle className="me-2" /> Lockdown System
        </button>
      </div>

      <div className="row gy-4 mb-4">
        <div className="col-xl-4 col-md-6">
          <StatCard icon={<FiShield />} title="Active Threats Blocked" value="1,204" color="success" />
        </div>
        <div className="col-xl-4 col-md-6">
          <StatCard icon={<FiLock />} title="Failed Login Attempts" value="45" color="warning" />
        </div>
        <div className="col-xl-4 col-md-6">
          <StatCard icon={<FiEye />} title="Active Sessions" value="892" color="primary" />
        </div>
      </div>

      <div className="bg-white rounded-4 shadow-sm p-4">
        <h5 className="mb-4 text-dark fw-bold">Live Security Feed</h5>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Timestamp</th>
                <th>Event Type</th>
                <th>IP Address</th>
                <th>Location</th>
                <th>Action Taken</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Today, 10:45 AM</td>
                <td><span className="text-danger fw-bold">Brute Force Attack</span></td>
                <td>192.168.1.105</td>
                <td>Moscow, RU</td>
                <td><span className="badge bg-danger">IP Blocked</span></td>
              </tr>
              <tr>
                <td>Today, 10:30 AM</td>
                <td><span className="text-warning fw-bold">Multiple Failed Logins</span></td>
                <td>45.22.11.9</td>
                <td>New York, US</td>
                <td><span className="badge bg-warning text-dark">Account Locked</span></td>
              </tr>
              <tr>
                <td>Today, 09:15 AM</td>
                <td><span className="text-info fw-bold">Admin Login</span></td>
                <td>10.0.0.5</td>
                <td>London, UK</td>
                <td><span className="badge bg-success">Allowed (2FA)</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default SecurityMonitoring
