import React from 'react'
import { FiDatabase, FiHardDrive, FiActivity, FiRefreshCw } from 'react-icons/fi'

const DatabaseHealth = () => {
  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Database Health</h2>
          <p className="text-muted mb-0">MySQL cluster performance and storage metrics</p>
        </div>
        <button className="btn btn-outline-primary d-flex align-items-center">
          <FiRefreshCw className="me-2" /> Refresh Stats
        </button>
      </div>

      <div className="row gy-4 mb-4">
        <div className="col-xl-6">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body p-4">
              <div className="d-flex align-items-center mb-4">
                <div className="bg-primary bg-opacity-10 text-primary p-3 rounded-circle me-3">
                  <FiHardDrive size={24} />
                </div>
                <div>
                  <h5 className="mb-0 fw-bold">Storage Capacity</h5>
                  <span className="text-muted small">Cluster-01 Volume</span>
                </div>
              </div>
              
              <h2 className="fw-bold mb-2">420 GB <span className="text-muted fs-6 fw-normal">/ 1000 GB</span></h2>
              <div className="progress mb-2" style={{ height: '12px' }}>
                <div className="progress-bar bg-primary" style={{ width: '42%' }}></div>
              </div>
              <p className="text-muted small">42% utilized. Estimated 18 months until expansion required.</p>
            </div>
          </div>
        </div>

        <div className="col-xl-6">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body p-4">
              <div className="d-flex align-items-center mb-4">
                <div className="bg-success bg-opacity-10 text-success p-3 rounded-circle me-3">
                  <FiActivity size={24} />
                </div>
                <div>
                  <h5 className="mb-0 fw-bold">Query Performance</h5>
                  <span className="text-muted small">Real-time metrics</span>
                </div>
              </div>
              
              <div className="row text-center">
                <div className="col-4 border-end">
                  <h3 className="fw-bold text-dark mb-1">12ms</h3>
                  <small className="text-muted">Avg Latency</small>
                </div>
                <div className="col-4 border-end">
                  <h3 className="fw-bold text-dark mb-1">4.2k</h3>
                  <small className="text-muted">Queries / sec</small>
                </div>
                <div className="col-4">
                  <h3 className="fw-bold text-success mb-1">99.9%</h3>
                  <small className="text-muted">Cache Hit Ratio</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DatabaseHealth
