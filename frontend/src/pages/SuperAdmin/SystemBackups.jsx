import React from 'react'
import { FiDownload, FiRefreshCw, FiDatabase, FiClock } from 'react-icons/fi'
import { toast } from 'react-toastify'

const SystemBackups = () => {

  const handleTriggerBackup = () => {
    toast.info('Initiating manual database snapshot...')
    setTimeout(() => {
      toast.success('Manual backup completed successfully!')
    }, 2500)
  }

  const handleDownload = (id) => {
    toast.success(`Downloading backup snapshot ${id}...`)
  }

  const handleRestore = (id) => {
    if (window.confirm('WARNING: Restoring a backup will overwrite the current database. Are you sure?')) {
      toast.warning(`Restoring database from snapshot ${id}...`)
    }
  }

  const backups = [
    { id: 'db_snap_20260619', type: 'Automated', size: '1.4 GB', date: 'June 19, 2026 - 00:00:00', status: 'Verified', color: 'info' },
    { id: 'db_snap_20260618', type: 'Automated', size: '1.38 GB', date: 'June 18, 2026 - 00:00:00', status: 'Verified', color: 'info' },
    { id: 'db_snap_manual_update_v2', type: 'Manual', size: '1.35 GB', date: 'June 17, 2026 - 14:30:00', status: 'Verified', color: 'warning' }
  ]

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Database Backups</h2>
          <p className="text-muted mb-0">Manage automated and manual database snapshots</p>
        </div>
        <button onClick={handleTriggerBackup} className="btn btn-success d-flex align-items-center">
          <FiDatabase className="me-2" /> Trigger Manual Backup
        </button>
      </div>

      <div className="row gy-4 mb-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm rounded-4 hover-lift" style={{ transition: 'all 0.3s ease' }}>
            <div className="card-body p-4 d-flex justify-content-between align-items-center">
              <div>
                <h6 className="text-muted mb-1">Next Automated Backup</h6>
                <h4 className="mb-0 fw-bold d-flex align-items-center">
                  <FiClock className="me-2 text-primary" /> Today, 23:59:00 UTC
                </h4>
              </div>
              <div className="text-end">
                <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 py-2 px-3">
                  Schedule: Daily
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-4 shadow-sm p-4 hover-lift" style={{ background: 'var(--secondary)' }}>
        <h5 className="mb-4 text-dark fw-bold">Recent Backup Snapshots</h5>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Snapshot ID</th>
                <th>Type</th>
                <th>Size</th>
                <th>Created At</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {backups.map((b) => (
                <tr key={b.id}>
                  <td><strong>{b.id}</strong></td>
                  <td><span className={`badge bg-${b.color} text-dark`}>{b.type}</span></td>
                  <td>{b.size}</td>
                  <td>{b.date}</td>
                  <td><span className="text-success fw-bold">{b.status}</span></td>
                  <td>
                    <button onClick={() => handleDownload(b.id)} className="btn btn-sm btn-outline-primary me-2"><FiDownload className="me-1"/> Download</button>
                    <button onClick={() => handleRestore(b.id)} className="btn btn-sm btn-outline-danger"><FiRefreshCw className="me-1"/> Restore</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default SystemBackups
