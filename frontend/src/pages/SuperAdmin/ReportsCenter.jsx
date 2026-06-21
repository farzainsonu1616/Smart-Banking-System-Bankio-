import React from 'react'
import { FiDownload, FiFileText, FiBarChart2, FiPieChart, FiTrendingUp } from 'react-icons/fi'

const ReportsCenter = () => {
  const reports = [
    { title: 'Customer Demographics Report', icon: <FiPieChart />, desc: 'Analysis of customer base by age, region, and account type.', type: 'PDF' },
    { title: 'Monthly Transaction Volume', icon: <FiBarChart2 />, desc: 'Detailed breakdown of all deposits, withdrawals, and transfers.', type: 'Excel' },
    { title: 'Loan Portfolio Risk Analysis', icon: <FiTrendingUp />, desc: 'Risk assessment of active loans and default predictions.', type: 'PDF' },
    { title: 'Branch Revenue Summary', icon: <FiFileText />, desc: 'Revenue generated per branch including fees and interest.', type: 'Excel' },
    { title: 'System Security Audit', icon: <FiFileText />, desc: 'Log of failed logins, blocked IPs, and suspicious activities.', type: 'PDF' },
  ]

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bolder text-dark mb-0">Reports Center</h3>
        <button className="btn btn-primary d-flex align-items-center gap-2"><FiDownload /> Export All</button>
      </div>

      <div className="row gy-4">
        {reports.map((report, idx) => (
          <div className="col-xl-4 col-md-6" key={idx}>
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-4">
                <div className="d-flex align-items-start mb-3">
                  <div className="p-3 bg-primary-subtle text-primary rounded-4 me-3">
                    {React.cloneElement(report.icon, { size: 24 })}
                  </div>
                  <div>
                    <h5 className="fw-bold text-dark mb-1">{report.title}</h5>
                    <span className="badge bg-secondary-subtle text-secondary">{report.type} Format</span>
                  </div>
                </div>
                <p className="text-muted mb-4">{report.desc}</p>
                <button className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center gap-2">
                  <FiDownload /> Download Report
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReportsCenter
