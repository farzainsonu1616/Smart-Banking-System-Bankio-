import React, { useState } from 'react'
import { FiUserPlus, FiCheck, FiTrash2, FiAlertCircle } from 'react-icons/fi'
import { toast } from 'react-toastify'

const Beneficiaries = () => {
  const [beneficiaries, setBeneficiaries] = useState([
    { id: 'b1', name: 'John Doe', accountNo: 'XXXX-XXXX-9901', ifsc: 'HDFC0001234', bank: 'HDFC Bank', status: 'APPROVED' },
    { id: 'b2', name: 'Sarah Smith', accountNo: 'XXXX-XXXX-8822', ifsc: 'SBIN0005678', bank: 'State Bank of India', status: 'PENDING' },
  ])

  const [formData, setFormData] = useState({
    name: '', accountNo: '', ifsc: '', bank: ''
  })
  
  const [isAdding, setIsAdding] = useState(false)

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleAddBeneficiary = (e) => {
    e.preventDefault()
    const newBeneficiary = {
      ...formData,
      id: `b${Date.now()}`,
      status: 'PENDING'
    }
    setBeneficiaries([newBeneficiary, ...beneficiaries])
    setFormData({ name: '', accountNo: '', ifsc: '', bank: '' })
    setIsAdding(false)
    toast.success('Beneficiary added successfully! Waiting for approval.')
  }

  const handleApprove = (id) => {
    setBeneficiaries(beneficiaries.map(b => b.id === id ? { ...b, status: 'APPROVED' } : b))
    toast.success('Beneficiary approved successfully.')
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this beneficiary?')) {
      setBeneficiaries(beneficiaries.filter(b => b.id !== id))
      toast.info('Beneficiary deleted.')
    }
  }

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <h2 className="mb-0">Manage Beneficiaries</h2>
        <button 
          className="btn btn-primary d-flex align-items-center gap-2"
          onClick={() => setIsAdding(!isAdding)}
        >
          <FiUserPlus /> {isAdding ? 'Cancel' : 'Add Beneficiary'}
        </button>
      </div>

      {isAdding && (
        <div className="bg-white rounded-4 shadow-sm p-4 mb-4 border-top border-primary border-4 animate__animated animate__fadeInDown">
          <h5 className="mb-4">Add New Beneficiary</h5>
          <form onSubmit={handleAddBeneficiary}>
            <div className="row gy-3">
              <div className="col-md-6">
                <label className="form-label text-muted small">Beneficiary Name</label>
                <input type="text" className="form-control" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label text-muted small">Account Number</label>
                <input type="text" className="form-control" name="accountNo" value={formData.accountNo} onChange={handleInputChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label text-muted small">IFSC Code</label>
                <input type="text" className="form-control" name="ifsc" value={formData.ifsc} onChange={handleInputChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label text-muted small">Bank Name</label>
                <input type="text" className="form-control" name="bank" value={formData.bank} onChange={handleInputChange} required />
              </div>
              <div className="col-12 mt-4 text-end">
                <button type="button" className="btn btn-outline-secondary me-2" onClick={() => setIsAdding(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary px-4">Save Beneficiary</button>
              </div>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-4 shadow-sm p-0 overflow-hidden border">
        <div className="table-responsive custom-table">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="py-3 px-4">Name</th>
                <th>Account Details</th>
                <th>Bank Info</th>
                <th>Status</th>
                <th className="text-end px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {beneficiaries.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-5 text-muted">
                    <FiAlertCircle size={40} className="mb-3 opacity-50" />
                    <p className="mb-0">No beneficiaries found. Add one to get started.</p>
                  </td>
                </tr>
              ) : (
                beneficiaries.map((b) => (
                  <tr key={b.id}>
                    <td className="px-4 fw-medium text-dark">{b.name}</td>
                    <td>
                      <span className="d-block letter-spacing-1">{b.accountNo}</span>
                    </td>
                    <td>
                      <span className="d-block fw-medium">{b.bank}</span>
                      <span className="text-muted small">IFSC: {b.ifsc}</span>
                    </td>
                    <td>
                      <span className={`badge ${b.status === 'APPROVED' ? 'bg-success' : 'bg-warning'} rounded-pill px-3`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="text-end px-4">
                      <div className="d-flex justify-content-end gap-2">
                        {b.status === 'PENDING' && (
                          <button 
                            className="btn btn-sm btn-outline-success d-flex align-items-center gap-1"
                            onClick={() => handleApprove(b.id)}
                            title="Approve Beneficiary"
                          >
                            <FiCheck /> Approve
                          </button>
                        )}
                        <button 
                          className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
                          onClick={() => handleDelete(b.id)}
                          title="Delete Beneficiary"
                        >
                          <FiTrash2 /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Beneficiaries
