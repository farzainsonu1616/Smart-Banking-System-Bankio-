import React, { useState } from 'react'
import { FiSearch, FiFilter, FiDownload, FiEye } from 'react-icons/fi'
import { toast } from 'react-toastify'

const initialTransactions = [
  { id: 'TXN892374', date: '2026-06-20 10:30', from: 'John Doe', to: 'Amazon', amount: '-$120.00', status: 'Completed', type: 'Purchase' },
  { id: 'TXN892375', date: '2026-06-20 11:15', from: 'Jane Smith', to: 'Robert Johnson', amount: '+$500.00', status: 'Pending', type: 'Transfer' },
  { id: 'TXN892376', date: '2026-06-19 14:20', from: 'Company Salary', to: 'John Doe', amount: '+$4,500.00', status: 'Completed', type: 'Deposit' },
]

const ManageTransactions = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')

  const handleExport = () => {
    toast.success('Exporting transactions to CSV...')
  }

  const handleViewDetails = (id) => {
    toast.info(`Viewing details for transaction ${id}`)
  }

  const filteredTransactions = initialTransactions.filter(txn => {
    const matchesSearch = txn.id.toLowerCase().includes(searchTerm.toLowerCase()) || txn.from.toLowerCase().includes(searchTerm.toLowerCase()) || txn.to.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'All' || txn.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bolder text-dark mb-0">Transaction Monitoring</h3>
        <div className="d-flex gap-2">
          <div className="input-group" style={{ width: '250px' }}>
            <span className="input-group-text bg-white border-end-0"><FiSearch /></span>
            <input type="text" className="form-control border-start-0 ps-0" placeholder="Search TXN ID/Name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <select className="form-select" style={{ width: '150px' }} value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="All">All Status</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </select>
          <button onClick={handleExport} className="btn btn-primary d-flex align-items-center gap-2"><FiDownload /> Export</button>
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="px-4 py-3 border-top-0 border-end-0">TXN ID</th>
                  <th className="py-3 border-top-0 border-end-0 border-start-0">Date & Time</th>
                  <th className="py-3 border-top-0 border-end-0 border-start-0">From</th>
                  <th className="py-3 border-top-0 border-end-0 border-start-0">To</th>
                  <th className="py-3 border-top-0 border-end-0 border-start-0">Type</th>
                  <th className="py-3 border-top-0 border-end-0 border-start-0 text-end">Amount</th>
                  <th className="py-3 border-top-0 border-end-0 border-start-0 text-center">Status</th>
                  <th className="text-end px-4 py-3 border-top-0 border-start-0">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.length > 0 ? filteredTransactions.map(txn => (
                  <tr key={txn.id}>
                    <td className="px-4 py-3 border-end-0 text-primary fw-medium">{txn.id}</td>
                    <td className="py-3 border-end-0 border-start-0 text-muted"><small>{txn.date}</small></td>
                    <td className="py-3 border-end-0 border-start-0">{txn.from}</td>
                    <td className="py-3 border-end-0 border-start-0">{txn.to}</td>
                    <td className="py-3 border-end-0 border-start-0"><span className="badge bg-secondary-subtle text-secondary">{txn.type}</span></td>
                    <td className={`py-3 border-end-0 border-start-0 text-end fw-bold ${txn.amount.startsWith('+') ? 'text-success' : 'text-danger'}`}>
                      {txn.amount}
                    </td>
                    <td className="py-3 border-end-0 border-start-0 text-center">
                      <span className={`badge ${txn.status === 'Completed' ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'}`}>
                        {txn.status}
                      </span>
                    </td>
                    <td className="text-end px-4 py-3 border-start-0">
                      <button onClick={() => handleViewDetails(txn.id)} className="btn btn-sm btn-light text-primary" title="View Details"><FiEye /></button>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="8" className="text-center py-4">No transactions found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageTransactions
