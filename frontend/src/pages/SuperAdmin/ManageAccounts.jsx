import React, { useState } from 'react'
import { FiSearch, FiEye, FiLock, FiUnlock, FiFilter } from 'react-icons/fi'

const ManageAccounts = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const accounts = [
    { id: 'ACC1001', customer: 'John Doe', type: 'Savings', balance: '$12,500.00', status: 'Active', branch: 'Mumbai HQ' },
    { id: 'ACC1002', customer: 'Jane Smith', type: 'Current', balance: '$45,200.00', status: 'Frozen', branch: 'Delhi' },
    { id: 'ACC1003', customer: 'Robert Johnson', type: 'Fixed Deposit', balance: '$100,000.00', status: 'Active', branch: 'Bangalore' },
  ]

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bolder text-dark mb-0">Account Management</h3>
        <div className="d-flex gap-2">
          <div className="input-group" style={{ width: '300px' }}>
            <span className="input-group-text bg-white border-end-0"><FiSearch /></span>
            <input type="text" className="form-control border-start-0 ps-0" placeholder="Search Account/Customer..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <button className="btn btn-outline-secondary d-flex align-items-center gap-2"><FiFilter /> Filter</button>
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="px-4 py-3 border-top-0 border-end-0">Account No</th>
                  <th className="py-3 border-top-0 border-end-0 border-start-0">Customer</th>
                  <th className="py-3 border-top-0 border-end-0 border-start-0">Account Type</th>
                  <th className="py-3 border-top-0 border-end-0 border-start-0">Branch</th>
                  <th className="py-3 border-top-0 border-end-0 border-start-0 text-end">Balance</th>
                  <th className="py-3 border-top-0 border-end-0 border-start-0 text-center">Status</th>
                  <th className="text-end px-4 py-3 border-top-0 border-start-0">Actions</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map(acc => (
                  <tr key={acc.id}>
                    <td className="px-4 py-3 border-end-0 fw-bold">{acc.id}</td>
                    <td className="py-3 border-end-0 border-start-0">{acc.customer}</td>
                    <td className="py-3 border-end-0 border-start-0">{acc.type}</td>
                    <td className="py-3 border-end-0 border-start-0">{acc.branch}</td>
                    <td className="py-3 border-end-0 border-start-0 text-end fw-bold text-dark">{acc.balance}</td>
                    <td className="py-3 border-end-0 border-start-0 text-center">
                      <span className={`badge ${acc.status === 'Active' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}>
                        {acc.status}
                      </span>
                    </td>
                    <td className="text-end px-4 py-3 border-start-0">
                      <div className="d-flex justify-content-end gap-2">
                        <button className="btn btn-sm btn-light text-primary" title="View Details"><FiEye /></button>
                        {acc.status === 'Active' ? (
                          <button className="btn btn-sm btn-light text-warning" title="Freeze Account"><FiLock /></button>
                        ) : (
                          <button className="btn btn-sm btn-light text-success" title="Unfreeze Account"><FiUnlock /></button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageAccounts
