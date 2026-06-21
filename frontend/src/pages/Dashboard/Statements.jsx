import React, { useState, useEffect } from 'react'
import { FiDownload, FiPrinter, FiFilter } from 'react-icons/fi'
import { toast } from 'react-toastify'
import TransactionTable from '../../components/DashboardWidgets/TransactionTable'
import Preloader from '../../components/Common/Preloader'
import { exportToPDF, exportToExcel } from '../../utils/exportUtils'

const Statements = () => {
  const [loading, setLoading] = useState(true)
  const [filterType, setFilterType] = useState('monthly')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [isExporting, setIsExporting] = useState(false)

  // Realistic mock data for transactions
  const mockTransactions = [
    { id: 1, transactionDate: '2026-06-20T10:30:00Z', referenceNumber: 'TXN89347593', description: 'Amazon Web Services', type: 'WITHDRAWAL', amount: 1500, status: 'COMPLETED' },
    { id: 2, transactionDate: '2026-06-19T14:15:00Z', referenceNumber: 'TXN89347594', description: 'Salary NEFT', type: 'DEPOSIT', amount: 85000, status: 'COMPLETED' },
    { id: 3, transactionDate: '2026-06-18T09:45:00Z', referenceNumber: 'TXN89347595', description: 'Starbucks Coffee', type: 'WITHDRAWAL', amount: 350, status: 'COMPLETED' },
    { id: 4, transactionDate: '2026-06-17T18:20:00Z', referenceNumber: 'TXN89347596', description: 'Rent Transfer', type: 'TRANSFER_OUT', amount: 25000, status: 'PENDING' },
    { id: 5, transactionDate: '2026-06-16T11:10:00Z', referenceNumber: 'TXN89347597', description: 'Dividend Credit', type: 'DEPOSIT', amount: 4500, status: 'COMPLETED' },
    { id: 6, transactionDate: '2026-06-10T08:30:00Z', referenceNumber: 'TXN89347598', description: 'Grocery Store', type: 'WITHDRAWAL', amount: 2100, status: 'COMPLETED' },
    { id: 7, transactionDate: '2026-06-05T19:00:00Z', referenceNumber: 'TXN89347599', description: 'Gym Membership', type: 'WITHDRAWAL', amount: 1200, status: 'COMPLETED' },
  ]

  const columns = [
    { header: 'Date', key: 'transactionDate' },
    { header: 'Reference ID', key: 'referenceNumber' },
    { header: 'Description', key: 'description' },
    { header: 'Type', key: 'type' },
    { header: 'Amount', key: 'amount' },
    { header: 'Status', key: 'status' }
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 600)
    return () => clearTimeout(timer)
  }, [])

  const handleExportPDF = () => {
    toast.info('Preparing PDF statement for download...')
    try {
      const exportData = mockTransactions.map(t => ({
        ...t,
        transactionDate: new Date(t.transactionDate).toLocaleString(),
        amount: `$${t.amount.toLocaleString()}`
      }))
      exportToPDF(exportData, columns, `Statement_${filterType}.pdf`)
      toast.success('PDF statement downloaded successfully!')
    } catch (err) {
      toast.error('Failed to generate PDF')
    }
  }

  const handleExportExcel = () => {
    setIsExporting(true)
    toast.info('Generating Excel file...')
    
    setTimeout(() => {
      try {
        const exportData = mockTransactions.map(t => ({
          ...t,
          transactionDate: new Date(t.transactionDate).toLocaleString(),
          amount: `$${t.amount.toLocaleString()}`
        }))
        exportToExcel(exportData, columns, `Statement_${filterType}.xlsx`)
        toast.success('Excel statement downloaded successfully!')
      } catch (err) {
        toast.error('Failed to generate Excel file')
      } finally {
        setIsExporting(false)
      }
    }, 1000)
  }

  if (loading) return <Preloader />

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Account Statements</h2>
      </div>

      <div className="row gy-4">
        {/* Filters Section */}
        <div className="col-12 d-print-none">
          <div className="bg-white rounded-3 shadow-sm p-4">
            <h5 className="mb-4 d-flex align-items-center gap-2">
              <FiFilter className="text-primary" /> Filter Statement
            </h5>
            
            <div className="row gy-3 align-items-end">
              <div className="col-md-3">
                <label className="form-label text-muted small">Select Period</label>
                <select 
                  className="form-select" 
                  value={filterType} 
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="custom">Custom Date Range</option>
                </select>
              </div>

              {filterType === 'custom' && (
                <>
                  <div className="col-md-3">
                    <label className="form-label text-muted small">From Date</label>
                    <input 
                      type="date" 
                      className="form-control" 
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label text-muted small">To Date</label>
                    <input 
                      type="date" 
                      className="form-control" 
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                    />
                  </div>
                </>
              )}

              <div className="col-md-3 ms-auto text-md-end">
                <button className="btn btn-primary d-inline-flex align-items-center gap-2 me-2" onClick={handleExportPDF}>
                  <FiPrinter /> PDF
                </button>
                <button 
                  className="btn btn-success d-inline-flex align-items-center gap-2" 
                  onClick={handleExportExcel}
                  disabled={isExporting}
                >
                  <FiDownload /> {isExporting ? 'Generating...' : 'Excel'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Preview Table */}
        <div className="col-12">
          <div className="bg-white rounded-3 shadow-sm p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="mb-0">Transaction Preview <span className="badge bg-light text-dark ms-2 fw-normal fs-6">Account: XXXX-4589</span></h5>
              <span className="text-muted small d-none d-md-block">Showing results for: {filterType.charAt(0).toUpperCase() + filterType.slice(1)}</span>
            </div>
            
            {/* Using the existing TransactionTable component for UI consistency */}
            <TransactionTable transactions={mockTransactions} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Statements
