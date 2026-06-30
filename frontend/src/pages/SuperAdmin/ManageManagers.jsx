import React, { useState } from 'react'
import { FiSearch, FiEdit, FiTrash2, FiUserPlus, FiRepeat, FiX } from 'react-icons/fi'
import { toast } from 'react-toastify'

const initialManagers = [
  { id: 1, name: 'Alice Williams', branch: 'Mumbai HQ', contact: '+1 234 567 8900', customers: 4500, avatar: 'https://ui-avatars.com/api/?name=Alice+Williams&background=random' },
  { id: 2, name: 'Mark Davis', branch: 'Delhi', contact: '+1 987 654 3210', customers: 3200, avatar: 'https://ui-avatars.com/api/?name=Mark+Davis&background=random' },
]

const ManageManagers = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterBranch, setFilterBranch] = useState('All')
  const [managers, setManagers] = useState(initialManagers)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newManager, setNewManager] = useState({ name: '', branch: 'Mumbai HQ', contact: '' })

  const handleAction = (id, action) => {
    if (action === 'Delete') {
      if (window.confirm('Are you sure you want to delete this manager?')) {
        setManagers(managers.filter(m => m.id !== id))
        toast.error('Manager deleted successfully')
      }
    } else {
      toast.info(`${action} action triggered for manager`)
    }
  }

  const handleAddSubmit = (e) => {
    e.preventDefault()
    if(!newManager.name || !newManager.contact) return toast.error('Please fill all fields')
    
    const newEntry = {
      id: Math.floor(Math.random() * 900) + 100,
      name: newManager.name,
      branch: newManager.branch,
      contact: newManager.contact,
      customers: 0,
      avatar: `https://ui-avatars.com/api/?name=${newManager.name.replace(' ', '+')}&background=random`
    }
    setManagers([...managers, newEntry])
    setShowAddModal(false)
    setNewManager({ name: '', branch: 'Mumbai HQ', contact: '' })
    toast.success('New Manager added successfully')
  }

  const filteredManagers = managers.filter(manager => {
    const matchesSearch = manager.name.toLowerCase().includes(searchTerm.toLowerCase()) || manager.contact.includes(searchTerm)
    const matchesFilter = filterBranch === 'All' || manager.branch === filterBranch
    return matchesSearch && matchesFilter
  })

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bolder text-dark mb-0">Manager Management</h3>
        <div className="d-flex gap-2">
          <div className="input-group" style={{ width: '250px' }}>
            <span className="input-group-text bg-white border-end-0"><FiSearch /></span>
            <input type="text" className="form-control border-start-0 ps-0" placeholder="Search Managers..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <select className="form-select" style={{ width: '150px' }} value={filterBranch} onChange={(e) => setFilterBranch(e.target.value)}>
            <option value="All">All Branches</option>
            <option value="Mumbai HQ">Mumbai HQ</option>
            <option value="Delhi">Delhi</option>
            <option value="Bangalore">Bangalore</option>
          </select>
          <button className="btn btn-primary d-flex align-items-center gap-2" onClick={() => setShowAddModal(true)}><FiUserPlus /> Add Manager</button>
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
                {filteredManagers.length > 0 ? filteredManagers.map(manager => (
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
                        <button onClick={() => handleAction(manager.id, 'Transfer')} className="btn btn-sm btn-light text-info" title="Transfer Branch"><FiRepeat /></button>
                        <button onClick={() => handleAction(manager.id, 'Edit')} className="btn btn-sm btn-light text-dark" title="Edit"><FiEdit /></button>
                        <button onClick={() => handleAction(manager.id, 'Delete')} className="btn btn-sm btn-light text-danger" title="Delete"><FiTrash2 /></button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="5" className="text-center py-4">No managers found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Custom Add Manager Modal */}
      {showAddModal && (
        <div className="d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1050, position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backdropFilter: 'blur(3px)' }}>
          <div className="card border-0 shadow-lg rounded-4" style={{ width: '100%', maxWidth: '400px' }}>
            <div className="card-header bg-white border-0 pt-4 pb-0 d-flex justify-content-between align-items-center">
              <h5 className="fw-bold mb-0">Add New Manager</h5>
              <button className="btn btn-link text-dark p-0 border-0" onClick={() => setShowAddModal(false)}><FiX size={24}/></button>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleAddSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Full Name</label>
                  <input type="text" className="form-control" value={newManager.name} onChange={e => setNewManager({...newManager, name: e.target.value})} required />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Contact Number</label>
                  <input type="text" className="form-control" value={newManager.contact} onChange={e => setNewManager({...newManager, contact: e.target.value})} required />
                </div>
                <div className="mb-4">
                  <label className="form-label fw-semibold">Branch</label>
                  <select className="form-select" value={newManager.branch} onChange={e => setNewManager({...newManager, branch: e.target.value})}>
                    <option value="Mumbai HQ">Mumbai HQ</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Bangalore">Bangalore</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary w-100">Create Manager</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageManagers
