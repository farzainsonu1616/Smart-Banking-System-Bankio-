import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import AdminService from '../../services/AdminService'
import Preloader from '../../components/Common/Preloader'
import { FiSearch } from 'react-icons/fi'

const ManageUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const res = await AdminService.getUsers()
      setUsers(res.data.data || [])
    } catch (error) {
      toast.error('Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (id) => {
    try {
      await AdminService.approveUser(id)
      toast.success('User approved successfully')
      fetchUsers()
    } catch (error) {
      toast.error('Failed to approve user')
    }
  }

  const handleFreeze = async (id) => {
    try {
      await AdminService.freezeUser(id)
      toast.success('User frozen successfully')
      fetchUsers()
    } catch (error) {
      toast.error('Failed to freeze user')
    }
  }

  const handleActivate = async (id) => {
    try {
      await AdminService.activateUser(id)
      toast.success('User activated successfully')
      fetchUsers()
    } catch (error) {
      toast.error('Failed to activate user')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) return
    try {
      await AdminService.deleteUser(id)
      toast.success('User deleted successfully')
      fetchUsers()
    } catch (error) {
      toast.error('Failed to delete user')
    }
  }

  if (loading) return <Preloader />

  const filteredUsers = users.filter(u => {
    const term = searchTerm.toLowerCase()
    return (
      (u.firstName || '').toLowerCase().includes(term) ||
      (u.lastName || '').toLowerCase().includes(term) ||
      (u.email || '').toLowerCase().includes(term) ||
      (u.phone || '').toLowerCase().includes(term)
    )
  })

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Manage Users</h2>
        <div className="input-group" style={{ maxWidth: '300px' }}>
          <span className="input-group-text bg-white border-end-0"><FiSearch /></span>
          <input
            type="text"
            className="form-control border-start-0 ps-0"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="bg-white rounded-3 shadow-sm p-4">
        <div className="table-responsive custom-table">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(u => (
                <tr key={u.id}>
                  <td>#{u.id}</td>
                  <td>{u.firstName} {u.lastName}</td>
                  <td>{u.email}</td>
                  <td>{u.phone || '-'}</td>
                  <td><span className="badge bg-secondary">{u.roles || 'CUSTOMER'}</span></td>
                  <td>
                    {u.isLocked ? (
                      <span className="badge bg-danger">Frozen</span>
                    ) : u.isActive ? (
                      <span className="badge bg-success">Active</span>
                    ) : (
                      <span className="badge bg-warning">Inactive</span>
                    )}
                  </td>
                  <td>
                    <div className="d-flex gap-2 flex-wrap">
                      {!u.isActive && (
                        <button className="btn btn-sm btn-outline-primary" onClick={() => handleApprove(u.id)}>
                          Approve
                        </button>
                      )}
                      {u.isActive && !u.isLocked && (
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleFreeze(u.id)}>
                          Freeze
                        </button>
                      )}
                      {u.isLocked && (
                        <button className="btn btn-sm btn-outline-success" onClick={() => handleActivate(u.id)}>
                          Activate
                        </button>
                      )}
                      <button className="btn btn-sm btn-outline-dark" onClick={() => handleDelete(u.id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-muted">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ManageUsers
