import React from 'react'
import { toast } from 'react-toastify'
import { FiDownload, FiFileText, FiBarChart2, FiUsers, FiActivity } from 'react-icons/fi'

const AdminReports = () => {
  
  const handleDownload = (reportName) => {
    toast.info(`Generating ${reportName}...`)
    setTimeout(() => {
      toast.success(`${reportName} downloaded successfully!`)
    }, 1500)
  }

  const reports = [
    { id: 1, title: 'Monthly Financial Report', description: 'Comprehensive summary of revenue, deposits, and loan interest for the current month.', icon: <FiBarChart2 size={24} />, color: 'primary' },
    { id: 2, title: 'User Activity Report', description: 'Detailed logs of user logins, registrations, and active session durations.', icon: <FiUsers size={24} />, color: 'success' },
    { id: 3, title: 'Transaction Audit Logs', description: 'Raw ledger data of all internal and external transfers for compliance auditing.', icon: <FiFileText size={24} />, color: 'info' },
    { id: 4, title: 'System Health & Security', description: 'Records of blocked accounts, failed login attempts, and server performance metrics.', icon: <FiActivity size={24} />, color: 'danger' },
  ]

  return (
    <div className="container-fluid py-4">
      <div className="mb-4">
        <h2 className="mb-1">Reports Center</h2>
        <p className="text-muted">Generate and download administrative reports and audit logs.</p>
      </div>
      
      <div className="row gy-4">
        {reports.map(report => (
          <div className="col-xl-6" key={report.id}>
            <div className="bg-white rounded-4 shadow-sm p-4 d-flex flex-column h-100 border hover-shadow transition-all">
              <div className="d-flex align-items-start gap-3 mb-3">
                <div className={`p-3 rounded-circle bg-${report.color} bg-opacity-10 text-${report.color}`}>
                  {report.icon}
                </div>
                <div>
                  <h5 className="fw-bold mb-1">{report.title}</h5>
                  <p className="text-muted small mb-0">{report.description}</p>
                </div>
              </div>
              <div className="mt-auto pt-3 border-top d-flex justify-content-between align-items-center">
                <span className="small text-muted font-monospace">Format: PDF, CSV</span>
                <button 
                  className={`btn btn-outline-${report.color} d-flex align-items-center gap-2 px-4`}
                  onClick={() => handleDownload(report.title)}
                >
                  <FiDownload /> Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminReports
