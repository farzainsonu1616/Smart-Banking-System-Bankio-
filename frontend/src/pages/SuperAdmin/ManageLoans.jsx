import React, { useState } from 'react'
import { FiSearch, FiFilter, FiCheck, FiX, FiEye } from 'react-icons/fi'

const ManageLoans = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const loans = [
    { id: 'LN50012', customer: 'Alice Williams', type: 'Home Loan', amount: '$250,000.00', duration: '15 Years', status: 'Pending', score: 750 },
    { id: 'LN50013', customer: 'Mark Davis', type: 'Personal Loan', amount: '$15,000.00', duration: '3 Years', status: 'Approved', score: 810 },
    { id: 'LN50014', customer: 'John Doe', type: 'Business Loan', amount: '$500,000.00', duration: '10 Years', status: 'Rejected', score: 590 },
  ]

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bolder text-dark mb-0">Loan Management</h3>
        <div className="d-flex gap-2">
          <div className="input-group" style={{ width: '300px' }}>
            <span className="input-group-text bg-white border-end-0"><FiSearch /></span>
            <input type="text" className="form-control border-start-0 ps-0" placeholder="Search Loan ID/Customer..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
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
                  <th className="px-4 py-3 border-top-0 border-end-0">Loan ID</th>
                  <th className="py-3 border-top-0 border-end-0 border-start-0">Customer</th>
                  <th className="py-3 border-top-0 border-end-0 border-start-0">Loan Type</th>
                  <th className="py-3 border-top-0 border-end-0 border-start-0">Duration</th>
                  <th className="py-3 border-top-0 border-end-0 border-start-0 text-end">Amount</th>
                  <th className="py-3 border-top-0 border-end-0 border-start-0 text-center">Credit Score</th>
                  <th className="py-3 border-top-0 border-end-0 border-start-0 text-center">Status</th>
                  <th className="text-end px-4 py-3 border-top-0 border-start-0">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loans.map(loan => (
                  <tr key={loan.id}>
                    <td className="px-4 py-3 border-end-0 fw-bold">{loan.id}</td>
                    <td className="py-3 border-end-0 border-start-0">{loan.customer}</td>
                    <td className="py-3 border-end-0 border-start-0">{loan.type}</td>
                    <td className="py-3 border-end-0 border-start-0">{loan.duration}</td>
                    <td className="py-3 border-end-0 border-start-0 text-end fw-bold text-dark">{loan.amount}</td>
                    <td className="py-3 border-end-0 border-start-0 text-center">
                      <span className={`badge ${loan.score >= 700 ? 'bg-success' : loan.score >= 600 ? 'bg-warning text-dark' : 'bg-danger'}`}>
                        {loan.score}
                      </span>
                    </td>
                    <td className="py-3 border-end-0 border-start-0 text-center">
                      <span className={`badge ${loan.status === 'Approved' ? 'bg-success-subtle text-success' : loan.status === 'Pending' ? 'bg-warning-subtle text-warning' : 'bg-danger-subtle text-danger'}`}>
                        {loan.status}
                      </span>
                    </td>
                    <td className="text-end px-4 py-3 border-start-0">
                      <div className="d-flex justify-content-end gap-2">
                        <button className="btn btn-sm btn-light text-primary" title="View Details"><FiEye /></button>
                        {loan.status === 'Pending' && (
                          <>
                            <button className="btn btn-sm btn-light text-success" title="Approve"><FiCheck /></button>
                            <button className="btn btn-sm btn-light text-danger" title="Reject"><FiX /></button>
                          </>
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

export default ManageLoans
