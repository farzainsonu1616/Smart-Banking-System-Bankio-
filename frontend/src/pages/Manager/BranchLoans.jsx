import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { FiSearch, FiFileText } from 'react-icons/fi'

const BranchLoans = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const [loans, setLoans] = useState([
    { id: 'LN-901', user: 'Jane Smith', type: 'Home Loan', amount: 4500000, date: '2026-06-20', status: 'PENDING_VERIFICATION' },
    { id: 'LN-902', user: 'John Doe', type: 'Personal Loan', amount: 500000, date: '2026-06-19', status: 'VERIFIED' },
    { id: 'LN-903', user: 'Mike Johnson', type: 'Business Loan', amount: 1500000, date: '2026-06-21', status: 'PENDING_VERIFICATION' },
  ])

  const handleVerify = (id) => {
    setLoans(loans.map(loan => loan.id === id ? { ...loan, status: 'VERIFIED' } : loan))
    toast.success(`Loan documents for ${id} verified successfully. Sent to Admin for final approval.`)
  }

  const filteredLoans = loans.filter(loan => 
    loan.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
    loan.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0 d-flex align-items-center gap-2">
          <FiFileText className="text-primary" /> Branch Loan Verification
        </h2>
        <div className="input-group" style={{ width: '300px' }}>
          <span className="input-group-text bg-white border-end-0"><FiSearch /></span>
          <input 
            type="text" 
            className="form-control border-start-0 ps-0" 
            placeholder="Search by ID or Name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="bg-white rounded-3 shadow-sm p-4">
        <p className="text-muted mb-4">Managers are required to verify KYC and loan documents before routing the application to the Admin for final financial approval.</p>
        
        <div className="table-responsive custom-table">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th>Loan ID</th>
                <th>Customer Name</th>
                <th>Loan Type</th>
                <th>Amount Requested</th>
                <th>Application Date</th>
                <th>Verification Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredLoans.map(loan => (
                <tr key={loan.id}>
                  <td className="font-monospace fw-medium text-primary">{loan.id}</td>
                  <td className="fw-bold">{loan.user}</td>
                  <td>{loan.type}</td>
                  <td className="fw-bold">INR {loan.amount.toLocaleString()}</td>
                  <td>{loan.date}</td>
                  <td>
                    <span className={`badge ${
                      loan.status === 'VERIFIED' ? 'bg-success' : 'bg-warning text-dark'
                    }`}>
                      {loan.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td>
                    {loan.status === 'PENDING_VERIFICATION' ? (
                      <button className="btn btn-sm btn-outline-primary fw-bold" onClick={() => handleVerify(loan.id)}>
                        Verify Documents
                      </button>
                    ) : (
                      <span className="text-success small fw-bold">Sent to Admin</span>
                    )}
                  </td>
                </tr>
              ))}
              {filteredLoans.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-muted">No branch loans found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default BranchLoans
