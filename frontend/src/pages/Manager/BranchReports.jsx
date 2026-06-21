import React from 'react'
import { toast } from 'react-toastify'
import { FiDownload, FiBarChart2, FiUsers, FiTrendingUp } from 'react-icons/fi'

const BranchReports = () => {
  
  const handleGenerate = (reportName) => {
    toast.info(`Gathering data for ${reportName}...`)
    setTimeout(() => {
      toast.success(`${reportName} generated and downloaded!`)
    }, 2000)
  }

  const reports = [
    { id: 1, title: 'Branch Performance Report', description: 'Metrics on loan approvals, new account openings, and overall branch targets.', icon: <FiTrendingUp size={24} />, color: 'primary' },
    { id: 2, title: 'Branch Revenue Summary', description: 'Breakdown of Q3 revenue, transaction fees, and loan interest collected.', icon: <FiBarChart2 size={24} />, color: 'success' },
    { id: 3, title: 'Customer Acquisition Report', description: 'Detailed list of new customers verified and onboarded at this branch.', icon: <FiUsers size={24} />, color: 'info' },
  ]

  return (
    <div className="container-fluid py-4">
      <div className="mb-4">
        <h2 className="mb-1">Branch Reports</h2>
        <p className="text-muted">Generate localized performance and revenue reports for the Downtown Main Branch.</p>
      </div>
      
      <div className="row gy-4">
        {reports.map(report => (
          <div className="col-xl-4 col-lg-6" key={report.id}>
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
              <div className="mt-auto pt-3 border-top text-end">
                <button 
                  className={`btn btn-${report.color} d-flex align-items-center gap-2 ms-auto`}
                  onClick={() => handleGenerate(report.title)}
                >
                  <FiDownload /> Generate Report
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BranchReports
