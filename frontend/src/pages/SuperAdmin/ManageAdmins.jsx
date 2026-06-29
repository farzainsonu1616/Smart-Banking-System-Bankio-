import React, { useState } from 'react'
import { FiSearch, FiFilter, FiPlus, FiEdit2, FiTrash2, FiShield, FiX } from 'react-icons/fi'
import { toast } from 'react-toastify'

const initialAdmins = [
  { id: 'ADM-101', name: 'John Doe', email: 'admin@smartbank.com', role: 'System Admin', status: 'Active', login: '2 mins ago', initials: 'JD', color: 'primary' },
  { id: 'ADM-102', name: 'Sarah Miller', email: 'sarah.m@smartbank.com', role: 'Audit Admin', status: 'Active', login: '5 hours ago', initials: 'SM', color: 'info' },
]

const ManageAdmins = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('All')
  const [admins, setAdmins] = useState(initialAdmins)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', role: 'System Admin' })

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this admin?')) {
      setAdmins(admins.filter(admin => admin.id !== id))
      toast.error('Admin deleted successfully')
    }
  }

  const handleEdit = () => {
    toast.info('Edit Admin modal opened')
  }

  const handleAddSubmit = (e) => {
    e.preventDefault()
    if(!newAdmin.name || !newAdmin.email) return toast.error('Please fill all fields')
    
    const initials = newAdmin.name.split(' ').map(n => n[0]).join('').toUpperCase() || 'NA'
    const newEntry = {
      id: `ADM-${Math.floor(Math.random() * 900) + 100}`,
      name: newAdmin.name,
      email: newAdmin.email,
      role: newAdmin.role,
      status: 'Active',
      login: 'Never',
      initials: initials.substring(0, 2),
      color: 'success'
    }
    setAdmins([...admins, newEntry])
    setShowAddModal(false)
    setNewAdmin({ name: '', email: '', role: 'System Admin' })
    toast.success('New Admin added successfully')
  }

  const filteredAdmins = admins.filter(admin => {
    const matchesSearch = admin.name.toLowerCase().includes(searchTerm.toLowerCase()) || admin.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterRole === 'All' || admin.role === filterRole
    return matchesSearch && matchesFilter
  })

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bolder text-dark mb-0">Admin Management</h3>
        <div className="d-flex gap-2">
          <div className="input-group" style={{ width: '250px' }}>
            <span className="input-group-text bg-white border-end-0"><FiSearch /></span>
            <input type="text" className="form-control border-start-0 ps-0" placeholder="Search Admins..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <select className="form-select" style={{ width: '150px' }} value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
            <option value="All">All Roles</option>
            <option value="System Admin">System Admin</option>
            <option value="Audit Admin">Audit Admin</option>
          </select>
          <button className="btn btn-primary d-flex align-items-center gap-2" onClick={() => setShowAddModal(true)}><FiPlus /> Add Admin</button>
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
                {filteredAdmins.length > 0 ? filteredAdmins.map(admin => (
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
                        <button onClick={handleEdit} className="btn btn-sm btn-light text-dark" title="Edit"><FiEdit2 /></button>
                        <button onClick={() => handleDelete(admin.id)} className="btn btn-sm btn-light text-danger" title="Delete"><FiTrash2 /></button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="6" className="text-center py-4">No admins found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Custom Add Admin Modal */}
      {showAddModal && (
        <div className="modal-backdrop fade show d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050, position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}>
          <div className="card border-0 shadow-lg rounded-4" style={{ width: '100%', maxWidth: '400px' }}>
            <div className="card-header bg-white border-0 pt-4 pb-0 d-flex justify-content-between align-items-center">
              <h5 className="fw-bold mb-0">Add New Admin</h5>
              <button className="btn btn-link text-dark p-0 border-0" onClick={() => setShowAddModal(false)}><FiX size={24}/></button>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleAddSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Full Name</label>
                  <input type="text" className="form-control" value={newAdmin.name} onChange={e => setNewAdmin({...newAdmin, name: e.target.value})} required />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Email Address</label>
                  <input type="email" className="form-control" value={newAdmin.email} onChange={e => setNewAdmin({...newAdmin, email: e.target.value})} required />
                </div>
                <div className="mb-4">
                  <label className="form-label fw-semibold">Role</label>
                  <select className="form-select" value={newAdmin.role} onChange={e => setNewAdmin({...newAdmin, role: e.target.value})}>
                    <option value="System Admin">System Admin</option>
                    <option value="Audit Admin">Audit Admin</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary w-100">Create Admin</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageAdmins
