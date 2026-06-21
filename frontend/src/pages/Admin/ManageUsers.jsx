import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import AdminService from '../../services/AdminService'
import Preloader from '../../components/Common/Preloader'

const ManageUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const res = await AdminService.getUsers()
      setUsers(res.data.data)
    } catch (error) {
      toast.error('Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  const toggleStatus = async (id, currentStatus) => {
    try {
      await AdminService.toggleUserStatus(id, !currentStatus)
      toast.success('User status updated')
      fetchUsers()
    } catch (error) {
      toast.error('Failed to update status')
    }
  }

  if (loading) return <Preloader />

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4">Manage Users</h2>
      
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
                <th>Verified</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td>#{u.id}</td>
                  <td>{u.firstName} {u.lastName}</td>
                  <td>{u.email}</td>
                  <td>{u.phone}</td>
                  <td><span className="badge bg-secondary">{u.role}</span></td>
                  <td>{u.isVerified ? <span className="text-success fw-bold">Yes</span> : <span className="text-warning fw-bold">Pending</span>}</td>
                  <td>
                    <span className={`badge ${u.isActive ? 'bg-success' : 'bg-danger'}`}>
                      {u.isActive ? 'Active' : 'Frozen'}
                    </span>
                  </td>
                  <td>
                    {u.role !== 'ADMIN' && (
                      <div className="d-flex gap-2">
                        {!u.isVerified && (
                          <button className="btn btn-sm btn-outline-primary" onClick={() => {
                            toast.success(`User #${u.id} Approved`)
                            fetchUsers()
                          }}>
                            Approve
                          </button>
                        )}
                        <button 
                          className={`btn btn-sm ${u.isActive ? 'btn-outline-danger' : 'btn-outline-success'}`}
                          onClick={() => toggleStatus(u.id, u.isActive)}
                        >
                          {u.isActive ? 'Freeze' : 'Activate'}
                        </button>
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

export default ManageUsers
