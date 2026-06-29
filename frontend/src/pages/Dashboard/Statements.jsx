import React, { useState, useEffect } from 'react'
import { FiDownload, FiPrinter, FiFilter } from 'react-icons/fi'
import { toast } from 'react-toastify'
import TransactionTable from '../../components/DashboardWidgets/TransactionTable'
import Preloader from '../../components/Common/Preloader'
import { exportToPDF, exportToExcel } from '../../utils/exportUtils'
import TransactionService from '../../services/TransactionService'

const Statements = () => {
  const [loading, setLoading] = useState(true)
  const [transactions, setTransactions] = useState([])
  const [filteredTransactions, setFilteredTransactions] = useState([])
  const [filterType, setFilterType] = useState('all')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [isExporting, setIsExporting] = useState(false)

  const columns = [
    { header: 'Date', key: 'transactionDate' },
    { header: 'Reference ID', key: 'referenceNumber' },
    { header: 'Description', key: 'description' },
    { header: 'Type', key: 'type' },
    { header: 'Amount', key: 'amount' },
    { header: 'Status', key: 'status' }
  ]

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      const res = await TransactionService.getHistory()
      if (res.data && res.data.data) {
        const sorted = res.data.data.sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate))
        setTransactions(sorted)
        setFilteredTransactions(sorted)
      }
    } catch (error) {
      toast.error('Failed to load transactions')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [filterType, fromDate, toDate, transactions])

  const applyFilter = () => {
    const now = new Date()
    let filtered = [...transactions]

    if (filterType === 'daily') {
      filtered = filtered.filter(t => new Date(t.transactionDate).toDateString() === now.toDateString())
    } else if (filterType === 'weekly') {
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      filtered = filtered.filter(t => new Date(t.transactionDate) >= oneWeekAgo)
    } else if (filterType === 'monthly') {
      const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
      filtered = filtered.filter(t => new Date(t.transactionDate) >= oneMonthAgo)
    } else if (filterType === 'custom' && fromDate && toDate) {
      const start = new Date(fromDate)
      const end = new Date(toDate)
      end.setHours(23, 59, 59, 999)
      filtered = filtered.filter(t => {
        const txDate = new Date(t.transactionDate)
        return txDate >= start && txDate <= end
      })
    }

    setFilteredTransactions(filtered)
  }

  const handleExportPDF = () => {
    if (filteredTransactions.length === 0) {
      toast.warning('No transactions to export')
      return
    }
    toast.info('Preparing PDF statement for download...')
    try {
      const exportData = filteredTransactions.map(t => ({
        ...t,
        transactionDate: new Date(t.transactionDate).toLocaleString(),
        amount: `${t.amount.toLocaleString()}`
      }))
      exportToPDF(exportData, columns, `Statement_${filterType}.pdf`)
      toast.success('PDF statement downloaded successfully!')
    } catch (err) {
      toast.error('Failed to generate PDF')
    }
  }

  const handleExportExcel = () => {
    if (filteredTransactions.length === 0) {
      toast.warning('No transactions to export')
      return
    }
    setIsExporting(true)
    toast.info('Generating Excel file...')
    
    setTimeout(() => {
      try {
        const exportData = filteredTransactions.map(t => ({
          ...t,
          transactionDate: new Date(t.transactionDate).toLocaleString(),
          amount: `${t.amount.toLocaleString()}`
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
                  <option value="all">All Time</option>
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
              <h5 className="mb-0">Transaction Preview</h5>
              <span className="text-muted small d-none d-md-block">Showing results for: {filterType.charAt(0).toUpperCase() + filterType.slice(1)}</span>
            </div>
            
            <TransactionTable transactions={filteredTransactions} />
            {filteredTransactions.length === 0 && (
              <p className="text-muted text-center py-4">No transactions found for the selected period.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Statements
