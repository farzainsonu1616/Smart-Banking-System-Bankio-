import React, { useState } from 'react'
import { FiSearch, FiFilter, FiCheck, FiX, FiEye } from 'react-icons/fi'
import { toast } from 'react-toastify'

const initialLoans = [
  { id: 'LN50012', customer: 'Alice Williams', type: 'Home Loan', amount: '$250,000.00', duration: '15 Years', status: 'Pending', score: 750 },
  { id: 'LN50013', customer: 'Mark Davis', type: 'Personal Loan', amount: '$15,000.00', duration: '3 Years', status: 'Approved', score: 810 },
  { id: 'LN50014', customer: 'John Doe', type: 'Business Loan', amount: '$500,000.00', duration: '10 Years', status: 'Rejected', score: 590 },
]

const ManageLoans = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [loans, setLoans] = useState(initialLoans)

  const handleAction = (id, action) => {
    setLoans(loans.map(loan => {
      if (loan.id === id) {
        if (action === 'Approve') {
          toast.success(`Loan ${id} approved successfully`)
          return { ...loan, status: 'Approved' }
        }
        if (action === 'Reject') {
          toast.error(`Loan ${id} rejected`)
          return { ...loan, status: 'Rejected' }
        }
      }
      return loan
    }))

    if (action === 'View') {
      toast.info(`Viewing details for Loan ${id}`)
    }
  }

  const filteredLoans = loans.filter(loan => {
    const matchesSearch = loan.customer.toLowerCase().includes(searchTerm.toLowerCase()) || loan.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'All' || loan.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bolder text-dark mb-0">Loan Management</h3>
        <div className="d-flex gap-2">
          <div className="input-group" style={{ width: '250px' }}>
            <span className="input-group-text bg-white border-end-0"><FiSearch /></span>
            <input type="text" className="form-control border-start-0 ps-0" placeholder="Search Loan ID/Customer..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <select className="form-select" style={{ width: '150px' }} value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="All">All Status</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
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
                {filteredLoans.length > 0 ? filteredLoans.map(loan => (
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
                        <button onClick={() => handleAction(loan.id, 'View')} className="btn btn-sm btn-light text-primary" title="View Details"><FiEye /></button>
                        {loan.status === 'Pending' && (
                          <>
                            <button onClick={() => handleAction(loan.id, 'Approve')} className="btn btn-sm btn-light text-success" title="Approve"><FiCheck /></button>
                            <button onClick={() => handleAction(loan.id, 'Reject')} className="btn btn-sm btn-light text-danger" title="Reject"><FiX /></button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="8" className="text-center py-4">No loans found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageLoans
