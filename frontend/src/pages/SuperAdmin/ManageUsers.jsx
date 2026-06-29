import React, { useState } from 'react'
import { FiSearch, FiFilter, FiEdit, FiTrash2, FiEye, FiCheckCircle, FiSlash } from 'react-icons/fi'
import { toast } from 'react-toastify'

const initialUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', mobile: '+1 234 567 8900', branch: 'Mumbai HQ', status: 'Active', kyc: 'Verified', avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', mobile: '+1 987 654 3210', branch: 'Delhi', status: 'Frozen', kyc: 'Pending', avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=random' },
  { id: 3, name: 'Robert Johnson', email: 'robert@example.com', mobile: '+1 456 789 0123', branch: 'Bangalore', status: 'Active', kyc: 'Verified', avatar: 'https://ui-avatars.com/api/?name=Robert+Johnson&background=random' },
]

const ManageUsers = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [users, setUsers] = useState(initialUsers)

  const handleAction = (id, action) => {
    setUsers(users.map(user => {
      if (user.id === id) {
        if (action === 'Activate') {
          toast.success(`User ${user.name} activated successfully`)
          return { ...user, status: 'Active' }
        }
        if (action === 'Freeze') {
          toast.warning(`User ${user.name} frozen`)
          return { ...user, status: 'Frozen' }
        }
      }
      return user
    }))

    if (action === 'Delete') {
      if (window.confirm('Are you sure you want to delete this user?')) {
        setUsers(users.filter(u => u.id !== id))
        toast.error('User deleted successfully')
      }
    }
    
    if (action === 'View' || action === 'Edit') {
      toast.info(`${action} mode opened for selected user`)
    }
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'All' || user.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bolder text-dark mb-0">User Management</h3>
        <div className="d-flex gap-2 align-items-center">
          <div className="input-group" style={{ width: '300px' }}>
            <span className="input-group-text bg-white border-end-0"><FiSearch /></span>
            <input type="text" className="form-control border-start-0 ps-0" placeholder="Search Users..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <select className="form-select" style={{ width: '130px' }} value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Frozen">Frozen</option>
          </select>
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
                {filteredUsers.length > 0 ? filteredUsers.map(user => (
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
                        <button onClick={() => handleAction(user.id, 'View')} className="btn btn-sm btn-light text-primary" title="View"><FiEye /></button>
                        <button onClick={() => handleAction(user.id, 'Activate')} className="btn btn-sm btn-light text-success" title="Activate" disabled={user.status === 'Active'}><FiCheckCircle /></button>
                        <button onClick={() => handleAction(user.id, 'Freeze')} className="btn btn-sm btn-light text-warning" title="Freeze" disabled={user.status === 'Frozen'}><FiSlash /></button>
                        <button onClick={() => handleAction(user.id, 'Edit')} className="btn btn-sm btn-light text-dark" title="Edit"><FiEdit /></button>
                        <button onClick={() => handleAction(user.id, 'Delete')} className="btn btn-sm btn-light text-danger" title="Delete"><FiTrash2 /></button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="6" className="text-center py-4">No users found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageUsers
