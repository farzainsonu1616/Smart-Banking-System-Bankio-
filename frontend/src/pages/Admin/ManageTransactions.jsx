import React, { useState } from 'react'
import { FiSearch, FiFilter, FiDownload, FiEye } from 'react-icons/fi'

const ManageTransactions = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const mockTransactions = [
    { id: 'TXN849201', date: '2026-06-21 10:30 AM', sender: 'John Doe', receiver: 'Jane Smith', amount: 5000, type: 'INTERNAL', status: 'SUCCESS' },
    { id: 'TXN849202', date: '2026-06-21 11:15 AM', sender: 'Mike Johnson', receiver: 'HDFC Bank (External)', amount: 12000, type: 'EXTERNAL', status: 'PENDING' },
    { id: 'TXN849203', date: '2026-06-20 02:45 PM', sender: 'Emily Davis', receiver: 'Amazon India', amount: 3499, type: 'PAYMENT', status: 'SUCCESS' },
    { id: 'TXN849204', date: '2026-06-20 09:20 AM', sender: 'John Doe', receiver: 'Unknown (Suspected)', amount: 50000, type: 'EXTERNAL', status: 'FAILED' },
  ]

  const filteredTxns = mockTransactions.filter(txn => 
    txn.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    txn.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
    txn.receiver.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
              placeholder="Search TXN ID or Name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn btn-outline-secondary d-flex align-items-center gap-2">
            <FiFilter /> Filter
          </button>
          <button className="btn btn-outline-primary d-flex align-items-center gap-2">
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
                <th>Sender</th>
                <th>Receiver</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTxns.map(txn => (
                <tr key={txn.id}>
                  <td className="font-monospace fw-medium text-primary">{txn.id}</td>
                  <td>{txn.date}</td>
                  <td>{txn.sender}</td>
                  <td>{txn.receiver}</td>
                  <td><span className="badge bg-light text-dark border">{txn.type}</span></td>
                  <td className="fw-bold">INR {txn.amount.toLocaleString()}</td>
                  <td>
                    <span className={`badge ${
                      txn.status === 'SUCCESS' ? 'bg-success bg-opacity-10 text-success' : 
                      txn.status === 'FAILED' ? 'bg-danger bg-opacity-10 text-danger' : 
                      'bg-warning bg-opacity-10 text-warning'
                    }`}>
                      {txn.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-light border" title="View Details">
                      <FiEye className="text-muted" />
                    </button>
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
