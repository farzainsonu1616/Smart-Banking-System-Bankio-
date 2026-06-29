import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import AdminService from '../../services/AdminService'
import Preloader from '../../components/Common/Preloader'
import { formatCurrency } from '../../utils/Helpers'
import { FiSearch } from 'react-icons/fi'

const ManageLoans = () => {
  const [loans, setLoans] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')

  useEffect(() => {
    fetchLoans()
  }, [])

  const fetchLoans = async () => {
    try {
      const res = await AdminService.getAllLoans()
      setLoans(res.data.data || [])
    } catch (error) {
      toast.error('Failed to load loans')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (id, status) => {
    if (!window.confirm(`Are you sure you want to ${status.toLowerCase()} this loan?`)) return
    try {
      await AdminService.updateLoanStatus(id, status)
      toast.success(`Loan ${status.toLowerCase()} successfully`)
      fetchLoans()
    } catch (error) {
      toast.error('Failed to update status')
    }
  }

  if (loading) return <Preloader />

  const filteredLoans = loans.filter(loan => {
    const matchesSearch = (loan.loanType || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          String(loan.id).includes(searchTerm)
    const matchesStatus = statusFilter === 'ALL' || loan.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Manage Loans</h2>
        <div className="d-flex gap-2">
          <div className="input-group" style={{ maxWidth: '250px' }}>
            <span className="input-group-text bg-white border-end-0"><FiSearch /></span>
            <input
              type="text"
              className="form-control border-start-0 ps-0"
              placeholder="Search loans..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="form-select"
            style={{ maxWidth: '150px' }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>
      
      <div className="bg-white rounded-3 shadow-sm p-4">
        <div className="table-responsive custom-table">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Rate</th>
                <th>Tenure</th>
                <th>EMI</th>
                <th>Status</th>
                <th>Applied</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredLoans.map(loan => (
                <tr key={loan.id}>
                  <td>#{loan.id}</td>
                  <td>User #{loan.userId}</td>
                  <td><span className="badge bg-secondary">{loan.loanType}</span></td>
                  <td className="fw-bold">{formatCurrency(loan.amount)}</td>
                  <td>{loan.interestRate}%</td>
                  <td>{loan.tenureMonths} mo</td>
                  <td>{loan.monthlyEmi ? formatCurrency(loan.monthlyEmi) : '-'}</td>
                  <td>
                    <span className={`badge ${
                      loan.status === 'APPROVED' ? 'bg-success' : 
                      loan.status === 'REJECTED' ? 'bg-danger' : 
                      loan.status === 'PENDING' ? 'bg-warning' : 'bg-primary'
                    }`}>
                      {loan.status}
                    </span>
                  </td>
                  <td className="small text-muted">
                    {loan.appliedAt ? new Date(loan.appliedAt).toLocaleDateString() : '-'}
                  </td>
                  <td>
                    {loan.status === 'PENDING' && (
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-outline-success" onClick={() => handleUpdateStatus(loan.id, 'APPROVED')}>Approve</button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleUpdateStatus(loan.id, 'REJECTED')}>Reject</button>
                      </div>
                    )}
                    {loan.status !== 'PENDING' && (
                      <span className="text-muted small">—</span>
                    )}
                  </td>
                </tr>
              ))}
              {filteredLoans.length === 0 && (
                <tr>
                  <td colSpan="10" className="text-center py-4 text-muted">No loans found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ManageLoans
