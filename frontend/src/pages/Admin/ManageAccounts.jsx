import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { FiSearch, FiFilter } from 'react-icons/fi'

const ManageAccounts = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const [accounts, setAccounts] = useState([
    { id: '1001', accountNumber: '9876543210', user: 'John Doe', type: 'SAVINGS', balance: 150000, status: 'ACTIVE' },
    { id: '1002', accountNumber: '9876543211', user: 'Jane Smith', type: 'CURRENT', balance: 54000, status: 'ACTIVE' },
    { id: '1003', accountNumber: '9876543212', user: 'Mike Johnson', type: 'SAVINGS', balance: 1200, status: 'FROZEN' },
    { id: '1004', accountNumber: '9876543213', user: 'Emily Davis', type: 'SALARY', balance: 85000, status: 'ACTIVE' },
  ])

  const handleAction = (id, newStatus) => {
    setAccounts(accounts.map(acc => acc.id === id ? { ...acc, status: newStatus } : acc))
    toast.success(`Account ${newStatus === 'ACTIVE' ? 'Activated' : 'Frozen'} successfully`)
  }

  const filteredAccounts = accounts.filter(acc => 
    acc.accountNumber.includes(searchTerm) || acc.user.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Account Management</h2>
        <div className="d-flex gap-2">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0"><FiSearch /></span>
            <input 
              type="text" 
              className="form-control border-start-0 ps-0" 
              placeholder="Search accounts..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn btn-outline-primary d-flex align-items-center gap-2">
            <FiFilter /> Filter
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-3 shadow-sm p-4">
        <div className="table-responsive custom-table">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th>Account ID</th>
                <th>Account Number</th>
                <th>Customer Name</th>
                <th>Account Type</th>
                <th>Balance</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.map(acc => (
                <tr key={acc.id}>
                  <td>#{acc.id}</td>
                  <td className="font-monospace fw-medium">{acc.accountNumber}</td>
                  <td>{acc.user}</td>
                  <td><span className="badge bg-secondary">{acc.type}</span></td>
                  <td>INR {acc.balance.toLocaleString()}</td>
                  <td>
                    <span className={`badge ${acc.status === 'ACTIVE' ? 'bg-success' : 'bg-danger'}`}>
                      {acc.status}
                    </span>
                  </td>
                  <td>
                    {acc.status === 'ACTIVE' ? (
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleAction(acc.id, 'FROZEN')}>Freeze Account</button>
                    ) : (
                      <button className="btn btn-sm btn-outline-success" onClick={() => handleAction(acc.id, 'ACTIVE')}>Activate Account</button>
                    )}
                  </td>
                </tr>
              ))}
              {filteredAccounts.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-muted">No accounts found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ManageAccounts
