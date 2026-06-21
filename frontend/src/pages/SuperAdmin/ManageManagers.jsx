import React, { useState } from 'react'
import { FiSearch, FiEdit, FiTrash2, FiUserPlus, FiRepeat } from 'react-icons/fi'

const ManageManagers = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const managers = [
    { id: 1, name: 'Alice Williams', branch: 'Mumbai HQ', contact: '+1 234 567 8900', customers: 4500, avatar: 'https://ui-avatars.com/api/?name=Alice+Williams&background=random' },
    { id: 2, name: 'Mark Davis', branch: 'Delhi', contact: '+1 987 654 3210', customers: 3200, avatar: 'https://ui-avatars.com/api/?name=Mark+Davis&background=random' },
  ]

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bolder text-dark mb-0">Manager Management</h3>
        <div className="d-flex gap-2">
          <div className="input-group" style={{ width: '300px' }}>
            <span className="input-group-text bg-white border-end-0"><FiSearch /></span>
            <input type="text" className="form-control border-start-0 ps-0" placeholder="Search Managers..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <button className="btn btn-primary d-flex align-items-center gap-2"><FiUserPlus /> Add Manager</button>
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="px-4 py-3 border-top-0 border-end-0">Manager</th>
                  <th className="py-3 border-top-0 border-end-0 border-start-0">Branch Assigned</th>
                  <th className="py-3 border-top-0 border-end-0 border-start-0">Contact</th>
                  <th className="py-3 border-top-0 border-end-0 border-start-0">Active Customers</th>
                  <th className="text-end px-4 py-3 border-top-0 border-start-0">Actions</th>
                </tr>
              </thead>
              <tbody>
                {managers.map(manager => (
                  <tr key={manager.id}>
                    <td className="px-4 py-3 border-end-0">
                      <div className="d-flex align-items-center gap-3">
                        <img src={manager.avatar} alt="avatar" className="rounded-circle" width="40" height="40" />
                        <div className="fw-bold text-dark">{manager.name}</div>
                      </div>
                    </td>
                    <td className="py-3 border-end-0 border-start-0"><span className="badge bg-secondary-subtle text-secondary px-2 py-1">{manager.branch}</span></td>
                    <td className="py-3 border-end-0 border-start-0">{manager.contact}</td>
                    <td className="py-3 border-end-0 border-start-0 text-success fw-bold">{manager.customers}</td>
                    <td className="text-end px-4 py-3 border-start-0">
                      <div className="d-flex justify-content-end gap-2">
                        <button className="btn btn-sm btn-light text-info" title="Transfer Branch"><FiRepeat /></button>
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

export default ManageManagers
