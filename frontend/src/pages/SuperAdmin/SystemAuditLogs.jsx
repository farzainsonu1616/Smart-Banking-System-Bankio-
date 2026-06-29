import React, { useState } from 'react'
import { FiSearch, FiFilter, FiDownload, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { toast } from 'react-toastify'

const initialLogs = [
  { id: '#LOG-9281', time: 'Today, 14:32:10', user: 'admin@smartbank.com', ip: '192.168.1.5', module: 'System Settings', details: 'Updated Global OTP Expiry from 15m to 5m', status: 'INFO' },
  { id: '#LOG-9280', time: 'Today, 12:15:00', user: 'manager@smartbank.com', ip: '10.0.4.12', module: 'Account Operations', details: 'Approved Loan Application #L-4829', status: 'INFO' },
  { id: '#LOG-9279', time: 'Yesterday, 09:45:22', user: 'system@smartbank.com', ip: 'localhost', module: 'Authentication', details: 'Failed brute force attempt detected', status: 'ERROR' },
  { id: '#LOG-9278', time: 'Yesterday, 08:30:10', user: 'audit@smartbank.com', ip: '192.168.1.10', module: 'System Settings', details: 'Database backup delayed due to load', status: 'WARN' },
  { id: '#LOG-9277', time: '2 Days Ago, 16:20:05', user: 'admin@smartbank.com', ip: '192.168.1.5', module: 'Account Operations', details: 'Froze Account #ACC1002 due to fraud report', status: 'INFO' },
]

const SystemAuditLogs = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('All Levels')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 3

  const handleExport = () => {
    toast.success('Exporting audit logs to CSV...')
  }

  const filteredLogs = initialLogs.filter(log => {
    const matchesSearch = log.details.toLowerCase().includes(searchTerm.toLowerCase()) || log.user.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'All Levels' || log.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage)
  const currentLogs = filteredLogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">System Audit Logs</h2>
          <p className="text-muted mb-0">Track all actions performed by staff across the system</p>
        </div>
        <button onClick={handleExport} className="btn btn-outline-primary d-flex align-items-center">
          <FiDownload className="me-2" /> Export Logs
        </button>
      </div>

      <div className="bg-white rounded-4 shadow-sm p-4">
        <div className="row mb-4 g-3">
          <div className="col-md-4">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0"><FiSearch /></span>
              <input type="text" className="form-control border-start-0 ps-0" placeholder="Search logs..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} />
            </div>
          </div>
          <div className="col-md-3">
            <select className="form-select" value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}>
              <option value="All Levels">All Levels (INFO, WARN, ERROR)</option>
              <option value="INFO">INFO</option>
              <option value="WARN">WARN</option>
              <option value="ERROR">ERROR</option>
            </select>
          </div>
          <div className="col-md-3">
            <select className="form-select">
              <option>Last 24 Hours</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
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
                <th>Level</th>
              </tr>
            </thead>
            <tbody>
              {currentLogs.length > 0 ? currentLogs.map(log => (
                <tr key={log.id}>
                  <td><small className="text-muted">{log.id}</small></td>
                  <td>{log.time}</td>
                  <td>
                    <div><strong>{log.user}</strong></div>
                    <small className="text-muted">{log.ip}</small>
                  </td>
                  <td><span className="badge bg-secondary-subtle text-secondary">{log.module}</span></td>
                  <td>{log.details}</td>
                  <td>
                    <span className={`badge ${log.status === 'INFO' ? 'bg-info-subtle text-info' : log.status === 'WARN' ? 'bg-warning-subtle text-warning' : 'bg-danger-subtle text-danger'}`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="6" className="text-center py-4">No logs found</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-between align-items-center mt-4">
            <small className="text-muted">Showing page {currentPage} of {totalPages}</small>
            <div className="d-flex gap-2">
              <button 
                className="btn btn-sm btn-outline-secondary d-flex align-items-center" 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
              >
                <FiChevronLeft /> Prev
              </button>
              <button 
                className="btn btn-sm btn-outline-secondary d-flex align-items-center" 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                Next <FiChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SystemAuditLogs
