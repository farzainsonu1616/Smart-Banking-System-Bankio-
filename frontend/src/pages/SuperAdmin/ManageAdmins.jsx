import React, { useState } from 'react'
import { FiSearch, FiFilter, FiPlus, FiEdit2, FiTrash2, FiShield } from 'react-icons/fi'

const ManageAdmins = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const admins = [
    { id: 'ADM-101', name: 'John Doe', email: 'admin@smartbank.com', role: 'System Admin', status: 'Active', login: '2 mins ago', initials: 'JD', color: 'primary' },
    { id: 'ADM-102', name: 'Sarah Miller', email: 'sarah.m@smartbank.com', role: 'Audit Admin', status: 'Active', login: '5 hours ago', initials: 'SM', color: 'info' },
  ]

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bolder text-dark mb-0">Admin Management</h3>
        <div className="d-flex gap-2">
          <div className="input-group" style={{ width: '300px' }}>
            <span className="input-group-text bg-white border-end-0"><FiSearch /></span>
            <input type="text" className="form-control border-start-0 ps-0" placeholder="Search Admins..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <button className="btn btn-outline-secondary d-flex align-items-center gap-2"><FiFilter /> Filter</button>
          <button className="btn btn-primary d-flex align-items-center gap-2"><FiPlus /> Add Admin</button>
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="px-4 py-3 border-top-0 border-end-0">Admin Name</th>
                  <th className="py-3 border-top-0 border-end-0 border-start-0">Email</th>
                  <th className="py-3 border-top-0 border-end-0 border-start-0">Role</th>
                  <th className="py-3 border-top-0 border-end-0 border-start-0 text-center">Status</th>
                  <th className="py-3 border-top-0 border-end-0 border-start-0">Last Login</th>
                  <th className="text-end px-4 py-3 border-top-0 border-start-0">Actions</th>
                </tr>
              </thead>
              <tbody>
                {admins.map(admin => (
                  <tr key={admin.id}>
                    <td className="px-4 py-3 border-end-0">
                      <div className="d-flex align-items-center gap-3">
                        <div className={`bg-${admin.color} text-white rounded-circle d-flex align-items-center justify-content-center`} style={{width: '40px', height: '40px'}}>
                          <strong>{admin.initials}</strong>
                        </div>
                        <div>
                          <div className="fw-bold text-dark">{admin.name}</div>
                          <small className="text-muted">ID: {admin.id}</small>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 border-end-0 border-start-0">{admin.email}</td>
                    <td className="py-3 border-end-0 border-start-0">
                      <span className={`badge bg-${admin.color}-subtle text-${admin.color}`}><FiShield className="me-1"/> {admin.role}</span>
                    </td>
                    <td className="py-3 border-end-0 border-start-0 text-center">
                      <span className={`badge ${admin.status === 'Active' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}>
                        {admin.status}
                      </span>
                    </td>
                    <td className="py-3 border-end-0 border-start-0 text-muted"><small>{admin.login}</small></td>
                    <td className="text-end px-4 py-3 border-start-0">
                      <div className="d-flex justify-content-end gap-2">
                        <button className="btn btn-sm btn-light text-dark" title="Edit"><FiEdit2 /></button>
                        <button className="btn btn-sm btn-light text-danger" title="Delete"><FiTrash2 /></button>
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

export default ManageAdmins
