import React, { useState, useEffect } from 'react'
import { FiUserPlus, FiCheck, FiTrash2, FiAlertCircle } from 'react-icons/fi'
import { toast } from 'react-toastify'
import BeneficiaryService from '../../services/BeneficiaryService'
import { useAuth } from '../../context/AuthContext'
import Preloader from '../../components/Common/Preloader'

const Beneficiaries = () => {
  const { user } = useAuth()
  const [beneficiaries, setBeneficiaries] = useState([])
  const [loading, setLoading] = useState(true)

  const [formData, setFormData] = useState({
    name: '', accountNo: '', ifsc: '', bank: ''
  })
  
  const [isAdding, setIsAdding] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchBeneficiaries()
  }, [])

  const fetchBeneficiaries = async () => {
    try {
      const response = await BeneficiaryService.getBeneficiaries(user.id)
      if (response.data && response.data.data) {
        setBeneficiaries(response.data.data)
      }
    } catch (error) {
      toast.error('Failed to load beneficiaries')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleAddBeneficiary = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const payload = {
        name: formData.name,
        accountNumber: formData.accountNo, // Mapping to standard DTO format
        ifscCode: formData.ifsc,
        bankName: formData.bank,
        status: 'PENDING'
      }
      
      const response = await BeneficiaryService.addBeneficiary(user.id, payload)
      if (response.data && response.data.data) {
        setBeneficiaries([response.data.data, ...beneficiaries])
      }
      
      setFormData({ name: '', accountNo: '', ifsc: '', bank: '' })
      setIsAdding(false)
      toast.success('Beneficiary added successfully! Waiting for approval.')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add beneficiary')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this beneficiary?')) {
      try {
        await BeneficiaryService.deleteBeneficiary(id)
        setBeneficiaries(beneficiaries.filter(b => b.id !== id))
        toast.success('Beneficiary deleted successfully.')
      } catch (error) {
        toast.error('Failed to delete beneficiary')
      }
    }
  }

  if (loading) return <Preloader />

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
                <button type="submit" className="btn btn-primary px-4" disabled={submitting}>
                  {submitting ? 'Saving...' : 'Save Beneficiary'}
                </button>
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
                      <span className="d-block letter-spacing-1">{b.accountNumber || b.accountNo}</span>
                    </td>
                    <td>
                      <span className="d-block fw-medium">{b.bankName || b.bank}</span>
                      <span className="text-muted small">IFSC: {b.ifscCode || b.ifsc}</span>
                    </td>
                    <td>
                      <span className={`badge ${b.status === 'APPROVED' ? 'bg-success' : 'bg-warning'} rounded-pill px-3`}>
                        {b.status || 'PENDING'}
                      </span>
                    </td>
                    <td className="text-end px-4">
                      <div className="d-flex justify-content-end gap-2">
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
