import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import TransactionService from '../../services/TransactionService'
import Preloader from '../../components/Common/Preloader'
import TransactionTable from '../../components/DashboardWidgets/TransactionTable'
import { FiDownload, FiPrinter, FiSearch, FiFilter } from 'react-icons/fi'

const DashTransactions = () => {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('ALL')
  const [filterType, setFilterType] = useState('ALL')
  const [isExporting, setIsExporting] = useState(false)

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      const res = await TransactionService.getHistory()
      if (res.data && res.data.data) {
        const sorted = res.data.data.sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate))
        setTransactions(sorted)
      } else {
        setTransactions([])
      }
    } catch (error) {
      toast.error('Failed to fetch transactions')
      setTransactions([])
    } finally {
      setLoading(false)
    }
  }

  // Filter and Search Logic
  const filteredTransactions = transactions.filter(txn => {
    const matchesSearch = 
      txn.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
      txn.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'ALL' || txn.status === filterStatus;
    
    // Grouping Transfer types for simpler filtering or matching exactly
    const matchesType = filterType === 'ALL' || 
                       (filterType === 'TRANSFER' && txn.type.includes('TRANSFER')) || 
                       txn.type === filterType;

    return matchesSearch && matchesStatus && matchesType;
  });

  const handleExportPDF = () => {
    toast.success('Preparing PDF statement...')
    setTimeout(() => { window.print() }, 1000)
  }

  const handleExportExcel = () => {
    setIsExporting(true)
    toast.info('Generating Excel file...')
    setTimeout(() => {
      const headers = ['Date', 'Reference ID', 'Description', 'Type', 'Amount', 'Status']
      const csvContent = [
        headers.join(','),
        ...filteredTransactions.map(t => 
          `"${new Date(t.transactionDate).toLocaleDateString()}","${t.referenceNumber}","${t.description}","${t.type}","${t.amount}","${t.status}"`
        )
      ].join('\n')

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `transactions_${new Date().toISOString().split('T')[0]}.csv`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      setIsExporting(false)
      toast.success('Excel downloaded successfully!')
    }, 1500)
  }

  if (loading) return <Preloader />

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <h2 className="mb-0">Transaction History</h2>
        <div className="d-flex gap-2 d-print-none">
          <button className="btn btn-outline-primary d-flex align-items-center gap-2" onClick={handleExportPDF}>
            <FiPrinter /> PDF
          </button>
          <button className="btn btn-success d-flex align-items-center gap-2" onClick={handleExportExcel} disabled={isExporting}>
            <FiDownload /> {isExporting ? 'Exporting...' : 'Excel'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-4 shadow-sm p-4 mb-4 border d-print-none">
        <h6 className="mb-3 d-flex align-items-center gap-2 text-muted">
          <FiFilter /> Filter Transactions
        </h6>
        <div className="row gy-3">
          <div className="col-md-4">
            <div className="input-group">
              <span className="input-group-text bg-light text-muted border-end-0"><FiSearch /></span>
              <input 
                type="text" 
                className="form-control border-start-0" 
                placeholder="Search by ID or Description..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <select className="form-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="ALL">All Statuses</option>
              <option value="SUCCESS">Success / Completed</option>
              <option value="PENDING">Pending</option>
              <option value="FAILED">Failed</option>
            </select>
          </div>
          <div className="col-md-4">
            <select className="form-select" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="ALL">All Types</option>
              <option value="DEPOSIT">Deposits</option>
              <option value="WITHDRAWAL">Withdrawals</option>
              <option value="TRANSFER">Transfers</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3 shadow-sm p-4 border">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-5 text-muted">
            <p className="mb-0 fs-5">No transactions found matching your filters.</p>
          </div>
        ) : (
          <TransactionTable transactions={filteredTransactions} />
        )}
      </div>
    </div>
  )
}

export default DashTransactions
