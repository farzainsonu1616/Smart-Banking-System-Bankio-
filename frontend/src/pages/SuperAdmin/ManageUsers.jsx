import React, { useState } from 'react'
import { FiSearch, FiFilter, FiEdit, FiTrash2, FiEye, FiCheckCircle, FiSlash } from 'react-icons/fi'

const ManageUsers = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', mobile: '+1 234 567 8900', branch: 'Mumbai HQ', status: 'Active', kyc: 'Verified', avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', mobile: '+1 987 654 3210', branch: 'Delhi', status: 'Frozen', kyc: 'Pending', avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=random' },
    { id: 3, name: 'Robert Johnson', email: 'robert@example.com', mobile: '+1 456 789 0123', branch: 'Bangalore', status: 'Active', kyc: 'Verified', avatar: 'https://ui-avatars.com/api/?name=Robert+Johnson&background=random' },
  ]

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bolder text-dark mb-0">User Management</h3>
        <div className="d-flex gap-2">
          <div className="input-group" style={{ width: '300px' }}>
            <span className="input-group-text bg-white border-end-0"><FiSearch /></span>
            <input type="text" className="form-control border-start-0 ps-0" placeholder="Search Users..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
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
                  <th className="px-4 py-3 border-top-0 border-end-0">User</th>
                  <th className="py-3 border-top-0 border-end-0 border-start-0">Contact Info</th>
                  <th className="py-3 border-top-0 border-end-0 border-start-0">Branch</th>
                  <th className="py-3 border-top-0 border-end-0 border-start-0">Status</th>
                  <th className="py-3 border-top-0 border-end-0 border-start-0">KYC Status</th>
                  <th className="text-end px-4 py-3 border-top-0 border-start-0">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td className="px-4 py-3 border-end-0">
                      <div className="d-flex align-items-center gap-3">
                        <img src={user.avatar} alt="avatar" className="rounded-circle" width="40" height="40" />
                        <div className="fw-bold text-dark">{user.name}</div>
                      </div>
                    </td>
                    <td className="py-3 border-end-0 border-start-0">
                      <div className="text-dark mb-1">{user.email}</div>
                      <small className="text-muted">{user.mobile}</small>
                    </td>
                    <td className="py-3 border-end-0 border-start-0">{user.branch}</td>
                    <td className="py-3 border-end-0 border-start-0">
                      <span className={`badge ${user.status === 'Active' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 border-end-0 border-start-0">
                      <span className={`badge ${user.kyc === 'Verified' ? 'bg-primary-subtle text-primary' : 'bg-warning-subtle text-warning'}`}>
                        {user.kyc}
                      </span>
                    </td>
                    <td className="text-end px-4 py-3 border-start-0">
                      <div className="d-flex justify-content-end gap-2">
                        <button className="btn btn-sm btn-light text-primary" title="View"><FiEye /></button>
                        <button className="btn btn-sm btn-light text-success" title="Activate"><FiCheckCircle /></button>
                        <button className="btn btn-sm btn-light text-warning" title="Freeze"><FiSlash /></button>
                        <button className="btn btn-sm btn-light text-dark" title="Edit"><FiEdit /></button>
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

export default ManageUsers
