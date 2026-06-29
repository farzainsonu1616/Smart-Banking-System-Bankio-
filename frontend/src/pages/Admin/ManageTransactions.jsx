import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import AdminService from '../../services/AdminService'
import Preloader from '../../components/Common/Preloader'
import { exportCSV } from '../../utils/exportCSV'
import { formatCurrency } from '../../utils/Helpers'
import { FiSearch, FiFilter, FiDownload, FiEye } from 'react-icons/fi'

const ManageTransactions = () => {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('ALL')

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      const res = await AdminService.getAllTransactions()
      setTransactions(res.data.data || [])
    } catch (error) {
      toast.error('Failed to load transactions')
    } finally {
      setLoading(false)
    }
  }

  const handleExport = () => {
    exportCSV(transactions, `transactions_export_${new Date().toISOString().split('T')[0]}`)
    toast.success('Transactions exported successfully')
  }

  if (loading) return <Preloader />

  const filteredTxns = transactions.filter(txn => {
    const term = searchTerm.toLowerCase()
    const matchesSearch = 
      (txn.transactionId || '').toLowerCase().includes(term) || 
      (txn.description || '').toLowerCase().includes(term) ||
      String(txn.accountId || '').includes(term) ||
      String(txn.targetAccountId || '').includes(term)
    
    const matchesType = typeFilter === 'ALL' || txn.type === typeFilter

    return matchesSearch && matchesType
  }).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Transaction Monitoring</h2>
        <div className="d-flex gap-2">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0"><FiSearch /></span>
            <input 
              type="text" 
              className="form-control border-start-0 ps-0" 
              placeholder="Search TXN ID, Desc, Acc..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="form-select" 
            style={{ maxWidth: '150px' }}
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="ALL">All Types</option>
            <option value="DEPOSIT">Deposit</option>
            <option value="WITHDRAWAL">Withdrawal</option>
            <option value="TRANSFER_IN">Transfer In</option>
            <option value="TRANSFER_OUT">Transfer Out</option>
          </select>
          <button className="btn btn-outline-primary d-flex align-items-center gap-2" onClick={handleExport}>
            <FiDownload /> Export
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-3 shadow-sm p-4">
        <div className="table-responsive custom-table">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Date & Time</th>
                <th>Account ID</th>
                <th>Target Acc ID</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTxns.map(txn => (
                <tr key={txn.id}>
                  <td className="font-monospace fw-medium text-primary">{txn.transactionId}</td>
                  <td>{txn.timestamp ? new Date(txn.timestamp).toLocaleString() : '-'}</td>
                  <td>{txn.accountId ? `ACC-${txn.accountId}` : '-'}</td>
                  <td>{txn.targetAccountId ? `ACC-${txn.targetAccountId}` : '-'}</td>
                  <td>
                    <span className="badge bg-light text-dark border">
                      {txn.type}
                    </span>
                  </td>
                  <td className="fw-bold">{formatCurrency(txn.amount)}</td>
                  <td className="text-truncate" style={{ maxWidth: '150px' }} title={txn.description}>{txn.description}</td>
                  <td>
                    <span className={`badge ${
                      txn.status === 'SUCCESS' ? 'bg-success bg-opacity-10 text-success' : 
                      txn.status === 'FAILED' ? 'bg-danger bg-opacity-10 text-danger' : 
                      'bg-warning bg-opacity-10 text-warning'
                    }`}>
                      {txn.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredTxns.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-muted">No transactions found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ManageTransactions
