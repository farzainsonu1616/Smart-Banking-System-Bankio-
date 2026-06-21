import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { FiSearch, FiDollarSign } from 'react-icons/fi'

const BranchTransactions = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const [transactions, setTransactions] = useState([
    { id: 'TXN-842', sender: 'John Doe', receiver: 'Jane Smith', amount: 550000, type: 'INTERNAL', status: 'PENDING_MANAGER_APPROVAL', date: '2026-06-21 10:30 AM' },
    { id: 'TXN-843', sender: 'Emily Davis', receiver: 'HDFC Bank', amount: 1500000, type: 'EXTERNAL', status: 'PENDING_MANAGER_APPROVAL', date: '2026-06-21 11:15 AM' },
    { id: 'TXN-844', sender: 'Mike Johnson', receiver: 'Amazon', amount: 12000, type: 'PAYMENT', status: 'SUCCESS', date: '2026-06-20 02:45 PM' },
    { id: 'TXN-845', sender: 'Jane Smith', receiver: 'John Doe', amount: 45000, type: 'INTERNAL', status: 'SUCCESS', date: '2026-06-20 09:20 AM' },
  ])

  const handleApprove = (id) => {
    setTransactions(transactions.map(txn => txn.id === id ? { ...txn, status: 'SUCCESS' } : txn))
    toast.success(`Large transaction ${id} has been approved and processed.`)
  }

  const handleReject = (id) => {
    setTransactions(transactions.map(txn => txn.id === id ? { ...txn, status: 'FAILED' } : txn))
    toast.error(`Transaction ${id} was rejected. Funds returned to sender.`)
  }

  const filteredTxns = transactions.filter(txn => 
    txn.sender.toLowerCase().includes(searchTerm.toLowerCase()) || 
    txn.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0 d-flex align-items-center gap-2">
          <FiDollarSign className="text-primary" /> Branch Transactions
        </h2>
        <div className="input-group" style={{ width: '300px' }}>
          <span className="input-group-text bg-white border-end-0"><FiSearch /></span>
          <input 
            type="text" 
            className="form-control border-start-0 ps-0" 
            placeholder="Search by ID or Sender..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="bg-white rounded-3 shadow-sm p-4">
        <p className="text-muted mb-4">Transactions exceeding INR 1,00,000 require branch manager verification and approval to prevent fraud.</p>
        
        <div className="table-responsive custom-table">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Date & Time</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Manager Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTxns.map(txn => (
                <tr key={txn.id}>
                  <td className="font-monospace fw-medium text-primary">{txn.id}</td>
                  <td>{txn.date}</td>
                  <td className="fw-bold">{txn.sender}</td>
                  <td>{txn.receiver}</td>
                  <td><span className="badge bg-light text-dark border">{txn.type}</span></td>
                  <td className={`fw-bold ${txn.amount > 100000 ? 'text-danger' : ''}`}>INR {txn.amount.toLocaleString()}</td>
                  <td>
                    <span className={`badge ${
                      txn.status === 'SUCCESS' ? 'bg-success bg-opacity-10 text-success' : 
                      txn.status === 'FAILED' ? 'bg-danger bg-opacity-10 text-danger' : 
                      'bg-warning bg-opacity-10 text-warning'
                    }`}>
                      {txn.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td>
                    {txn.status === 'PENDING_MANAGER_APPROVAL' ? (
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-outline-success fw-bold" onClick={() => handleApprove(txn.id)}>Approve</button>
                        <button className="btn btn-sm btn-outline-danger fw-bold" onClick={() => handleReject(txn.id)}>Reject</button>
                      </div>
                    ) : (
                      <span className="text-muted small">Processed</span>
                    )}
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

export default BranchTransactions
