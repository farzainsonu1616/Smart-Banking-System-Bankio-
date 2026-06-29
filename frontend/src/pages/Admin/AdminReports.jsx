import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import AdminService from '../../services/AdminService'
import Preloader from '../../components/Common/Preloader'
import { exportCSV } from '../../utils/exportCSV'
import { FiDownload, FiFileText, FiBarChart2, FiUsers, FiActivity } from 'react-icons/fi'

const AdminReports = () => {
  const [reportData, setReportData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchReportData()
  }, [])

  const fetchReportData = async () => {
    try {
      const res = await AdminService.getReports()
      setReportData(res.data.data)
    } catch (error) {
      toast.error('Failed to load report data')
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadUsers = async () => {
    try {
      toast.info('Fetching users for export...')
      const res = await AdminService.getUsers()
      exportCSV(res.data.data, 'users_report')
      toast.success('User Activity Report downloaded')
    } catch (error) {
      toast.error('Failed to export users')
    }
  }

  const handleDownloadTransactions = async () => {
    try {
      toast.info('Fetching transactions for export...')
      const res = await AdminService.getAllTransactions()
      exportCSV(res.data.data, 'transactions_report')
      toast.success('Transaction Audit Logs downloaded')
    } catch (error) {
      toast.error('Failed to export transactions')
    }
  }

  const handleDownloadFinancials = async () => {
    try {
      toast.info('Fetching financial summary...')
      const res = await AdminService.getAllLoans()
      exportCSV(res.data.data, 'loans_report')
      toast.success('Financial Report (Loans) downloaded')
    } catch (error) {
      toast.error('Failed to export financials')
    }
  }
  
  const handleDownloadSystemHealth = () => {
    if (!reportData) {
      toast.error('Report data not available')
      return
    }
    const data = [
        { Metric: 'Total Users', Value: reportData.totalUsers },
        { Metric: 'Total Accounts', Value: reportData.totalAccounts },
        { Metric: 'Total Transactions', Value: reportData.totalTransactions },
        { Metric: 'Total Loans', Value: reportData.totalLoans },
        { Metric: 'Successful Transactions', Value: reportData.successfulTransactions },
        { Metric: 'Failed Transactions', Value: reportData.failedTransactions },
    ]
    exportCSV(data, 'system_health_report')
    toast.success('System Health Report downloaded')
  }

  if (loading) return <Preloader />

  const reports = [
    { id: 1, title: 'Financial Report (Loans)', description: 'Comprehensive summary of all loans applied, approved, and rejected.', icon: <FiBarChart2 size={24} />, color: 'primary', action: handleDownloadFinancials },
    { id: 2, title: 'User Activity Report', description: 'Detailed list of all registered users and their account statuses.', icon: <FiUsers size={24} />, color: 'success', action: handleDownloadUsers },
    { id: 3, title: 'Transaction Audit Logs', description: 'Raw ledger data of all internal and external transfers for compliance auditing.', icon: <FiFileText size={24} />, color: 'info', action: handleDownloadTransactions },
    { id: 4, title: 'System Health & Security', description: 'System-wide summary metrics, including transaction success/failure rates.', icon: <FiActivity size={24} />, color: 'danger', action: handleDownloadSystemHealth },
  ]

  return (
    <div className="container-fluid py-4">
      <div className="mb-4 d-flex justify-content-between align-items-end">
        <div>
          <h2 className="mb-1">Reports Center</h2>
          <p className="text-muted mb-0">Generate and download administrative reports and audit logs.</p>
        </div>
        <div className="d-flex align-items-center gap-2 bg-white p-2 rounded-3 shadow-sm border">
          <span className="text-muted small fw-bold ms-2">Date Range:</span>
          <input type="date" className="form-control form-control-sm border-0" defaultValue="2026-06-01" />
          <span className="text-muted">to</span>
          <input type="date" className="form-control form-control-sm border-0" defaultValue="2026-06-30" />
        </div>
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
                <span className="small text-muted font-monospace">Format: CSV</span>
                <button 
                  className={`btn btn-outline-${report.color} d-flex align-items-center gap-2 px-4`}
                  onClick={report.action}
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
