import React from 'react'
import { FiActivity, FiServer, FiClock, FiAlertCircle } from 'react-icons/fi'

const APIMonitoring = () => {
  const apis = [
    { endpoint: '/api/v1/users/login', method: 'POST', status: '200 OK', time: '45ms' },
    { endpoint: '/api/v1/accounts/balance', method: 'GET', status: '200 OK', time: '120ms' },
    { endpoint: '/api/v1/transactions/transfer', method: 'POST', status: '500 ERROR', time: '850ms' },
    { endpoint: '/api/v1/loans/apply', method: 'POST', status: '201 CREATED', time: '320ms' },
    { endpoint: '/api/v1/cards/block', method: 'PUT', status: '403 FORBIDDEN', time: '65ms' },
  ]

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bolder text-dark mb-0">API Monitoring</h3>
      </div>

      <div className="row gy-4 mb-4">
        <div className="col-xl-3 col-md-6">
          <div className="card border-0 shadow-sm rounded-4 h-100 bg-primary bg-opacity-10">
            <div className="card-body p-4 text-center">
              <FiActivity size={32} className="text-primary mb-2" />
              <h3 className="fw-bolder text-dark mb-1">124</h3>
              <p className="text-muted mb-0">Total APIs</p>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card border-0 shadow-sm rounded-4 h-100 bg-success bg-opacity-10">
            <div className="card-body p-4 text-center">
              <FiServer size={32} className="text-success mb-2" />
              <h3 className="fw-bolder text-dark mb-1">120</h3>
              <p className="text-muted mb-0">Active APIs</p>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card border-0 shadow-sm rounded-4 h-100 bg-danger bg-opacity-10">
            <div className="card-body p-4 text-center">
              <FiAlertCircle size={32} className="text-danger mb-2" />
              <h3 className="fw-bolder text-dark mb-1">4</h3>
              <p className="text-muted mb-0">Failed APIs</p>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card border-0 shadow-sm rounded-4 h-100 bg-info bg-opacity-10">
            <div className="card-body p-4 text-center">
              <FiClock size={32} className="text-info mb-2" />
              <h3 className="fw-bolder text-dark mb-1">145ms</h3>
              <p className="text-muted mb-0">Avg Response Time</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-header bg-white border-bottom-0 pt-4 pb-0 px-4">
          <h5 className="fw-bold text-dark mb-3">Live API Traffic</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="px-4 py-3 border-top-0 border-end-0">Endpoint</th>
                  <th className="py-3 border-top-0 border-end-0 border-start-0">Method</th>
                  <th className="py-3 border-top-0 border-end-0 border-start-0 text-center">Status</th>
                  <th className="text-end px-4 py-3 border-top-0 border-start-0">Response Time</th>
                </tr>
              </thead>
              <tbody>
                {apis.map((api, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-3 border-end-0 font-monospace text-muted">{api.endpoint}</td>
                    <td className="py-3 border-end-0 border-start-0">
                      <span className={`badge ${api.method === 'GET' ? 'bg-info' : api.method === 'POST' ? 'bg-success' : 'bg-warning text-dark'}`}>{api.method}</span>
                    </td>
                    <td className="py-3 border-end-0 border-start-0 text-center">
                      <span className={`badge ${api.status.includes('200') || api.status.includes('201') ? 'bg-success-subtle text-success' : api.status.includes('403') ? 'bg-warning-subtle text-warning' : 'bg-danger-subtle text-danger'}`}>
                        {api.status}
                      </span>
                    </td>
                    <td className={`text-end px-4 py-3 border-start-0 fw-bold ${parseInt(api.time) > 500 ? 'text-danger' : 'text-dark'}`}>{api.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default APIMonitoring
