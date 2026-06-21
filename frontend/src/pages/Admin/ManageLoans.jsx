import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import AdminService from '../../services/AdminService'
import Preloader from '../../components/Common/Preloader'
import { formatCurrency } from '../../utils/Helpers'

const ManageLoans = () => {
  const [loans, setLoans] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLoans()
  }, [])

  const fetchLoans = async () => {
    try {
      const res = await AdminService.getAllLoans()
      setLoans(res.data.data)
    } catch (error) {
      toast.error('Failed to load loans')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (id, status) => {
    try {
      await AdminService.updateLoanStatus(id, status)
      toast.success(`Loan status updated to ${status}`)
      fetchLoans()
    } catch (error) {
      toast.error('Failed to update status')
    }
  }

  if (loading) return <Preloader />

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4">Manage Loans</h2>
      
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
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loans.map(loan => (
                <tr key={loan.id}>
                  <td>#{loan.id}</td>
                  <td>User #{loan.user?.id}</td>
                  <td><span className="badge bg-secondary">{loan.loanType}</span></td>
                  <td className="fw-bold">{formatCurrency(loan.amount)}</td>
                  <td>{loan.interestRate}%</td>
                  <td>{loan.tenureMonths} mo</td>
                  <td>
                    <span className={`badge ${
                      loan.status === 'APPROVED' ? 'bg-success' : 
                      loan.status === 'REJECTED' ? 'bg-danger' : 
                      loan.status === 'PENDING' ? 'bg-warning' : 'bg-primary'
                    }`}>
                      {loan.status}
                    </span>
                  </td>
                  <td>
                    {loan.status === 'PENDING' && (
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-outline-success" onClick={() => handleUpdateStatus(loan.id, 'APPROVED')}>Approve</button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleUpdateStatus(loan.id, 'REJECTED')}>Reject</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ManageLoans
