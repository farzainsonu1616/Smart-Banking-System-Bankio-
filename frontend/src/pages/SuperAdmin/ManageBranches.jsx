import React, { useState } from 'react'
import { FiSearch, FiPlus, FiMapPin, FiUsers, FiDollarSign, FiX, FiActivity, FiTrendingUp, FiCreditCard } from 'react-icons/fi'
import { toast } from 'react-toastify'

const initialBranches = [
  { id: 1, name: 'Downtown Main Branch', code: 'BR-1001', location: '123 Financial District, NY', customers: '4,520', revenue: '$850K', status: 'Operational' },
  { id: 2, name: 'Northside Hub', code: 'BR-1002', location: '45 Corporate Park, NY', customers: '2,100', revenue: '$420K', status: 'Operational' },
  { id: 3, name: 'Westend Branch', code: 'BR-1003', location: '88 Retail Avenue, NY', customers: '1,850', revenue: '$310K', status: 'Maintenance' },
]

const ManageBranches = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [branches, setBranches] = useState(initialBranches)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false)
  const [selectedBranch, setSelectedBranch] = useState(null)
  const [newBranch, setNewBranch] = useState({ name: '', location: '' })

  const handleAddSubmit = (e) => {
    e.preventDefault()
    if(!newBranch.name || !newBranch.location) return toast.error('Please fill all fields')
    
    const newEntry = {
      id: Math.floor(Math.random() * 900) + 100,
      name: newBranch.name,
      code: `BR-${Math.floor(Math.random() * 9000) + 1000}`,
      location: newBranch.location,
      customers: '0',
      revenue: '$0',
      status: 'Operational'
    }
    setBranches([...branches, newEntry])
    setShowAddModal(false)
    setNewBranch({ name: '', location: '' })
    toast.success('New Branch registered successfully')
  }

  const handleViewDetails = (branch) => {
    setSelectedBranch(branch)
    setShowAnalyticsModal(true)
  }

  const filteredBranches = branches.filter(branch => {
    const matchesSearch = branch.name.toLowerCase().includes(searchTerm.toLowerCase()) || branch.location.toLowerCase().includes(searchTerm.toLowerCase()) || branch.code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'All' || branch.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const overlayStyle = { backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 9999, position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backdropFilter: 'blur(3px)' }

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bolder text-dark mb-0">Branch Management</h3>
        <div className="d-flex gap-2">
          <div className="input-group" style={{ width: '250px' }}>
            <span className="input-group-text bg-white border-end-0"><FiSearch /></span>
            <input type="text" className="form-control border-start-0 ps-0" placeholder="Search Branches..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <select className="form-select" style={{ width: '150px' }} value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="All">All Status</option>
            <option value="Operational">Operational</option>
            <option value="Maintenance">Maintenance</option>
          </select>
          <button className="btn btn-primary d-flex align-items-center gap-2" onClick={() => setShowAddModal(true)}><FiPlus /> Register Branch</button>
        </div>
      </div>

      <div className="row gy-4">
        {filteredBranches.length > 0 ? filteredBranches.map((branch) => (
          <div className="col-xl-4 col-md-6" key={branch.id}>
            <div className="card border-0 shadow-sm rounded-4 h-100 hover-lift" style={{ transition: 'all 0.3s ease' }}>
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h5 className="mb-1 fw-bold text-dark">{branch.name}</h5>
                    <p className="text-muted small mb-0"><FiMapPin className="me-1"/> {branch.location}</p>
                    <small className="text-primary fw-medium">{branch.code}</small>
                  </div>
                  <span className={`badge ${branch.status === 'Operational' ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'}`}>
                    {branch.status}
                  </span>
                </div>
                
                <hr className="bg-light my-4" />
                
                <div className="row g-3 mb-4">
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <div className="bg-primary bg-opacity-10 text-primary p-2 rounded-4 me-3">
                        <FiUsers size={20} />
                      </div>
                      <div>
                        <small className="text-muted d-block fw-bold">Customers</small>
                        <strong className="fs-5 text-dark">{branch.customers}</strong>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <div className="bg-success bg-opacity-10 text-success p-2 rounded-4 me-3">
                        <FiDollarSign size={20} />
                      </div>
                      <div>
                        <small className="text-muted d-block fw-bold">Revenue</small>
                        <strong className="fs-5 text-dark">{branch.revenue}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-grid gap-2">
                  <button onClick={() => handleViewDetails(branch)} className="btn btn-outline-primary rounded-4 fw-bold py-2">View Details & Analytics</button>
                </div>
              </div>
            </div>
          </div>
        )) : (
          <div className="col-12 text-center py-5">
            <h5 className="text-muted">No branches found matching your search criteria.</h5>
          </div>
        )}
      </div>

      {/* Register Branch Modal */}
      {showAddModal && (
        <div className="d-flex align-items-center justify-content-center" style={overlayStyle}>
          <div className="card border-0 shadow-lg rounded-4" style={{ width: '100%', maxWidth: '400px', position: 'relative', zIndex: 10000, backgroundColor: '#ffffff' }}>
            <div className="card-header bg-white border-0 pt-4 pb-0 d-flex justify-content-between align-items-center">
              <h5 className="fw-bold mb-0">Register New Branch</h5>
              <button className="btn btn-link text-dark p-0 border-0" onClick={() => setShowAddModal(false)}><FiX size={24}/></button>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleAddSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Branch Name</label>
                  <input type="text" className="form-control" placeholder="e.g. Southside Hub" value={newBranch.name} onChange={e => setNewBranch({...newBranch, name: e.target.value})} required />
                </div>
                <div className="mb-4">
                  <label className="form-label fw-semibold">Location / Address</label>
                  <input type="text" className="form-control" placeholder="e.g. 123 Main St, NY" value={newBranch.location} onChange={e => setNewBranch({...newBranch, location: e.target.value})} required />
                </div>
                <button type="submit" className="btn btn-primary w-100">Register Branch</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Branch Analytics Modal */}
      {showAnalyticsModal && selectedBranch && (
        <div className="d-flex align-items-center justify-content-center" style={overlayStyle}>
          <div className="card border-0 shadow-lg rounded-4" style={{ width: '100%', maxWidth: '800px', position: 'relative', zIndex: 10000, backgroundColor: '#ffffff', overflow: 'hidden' }}>
            <div className="card-header border-0 text-white" style={{ background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)', padding: '24px' }}>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h4 className="fw-bold mb-1 text-white">{selectedBranch.name}</h4>
                  <p className="mb-0 text-white-50"><FiMapPin className="me-1"/> {selectedBranch.location} &bull; {selectedBranch.code}</p>
                </div>
                <button className="btn btn-link text-white p-0 border-0" onClick={() => setShowAnalyticsModal(false)}><FiX size={28}/></button>
              </div>
            </div>
            
            <div className="card-body p-4" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
              <div className="row g-4 mb-4">
                <div className="col-md-4">
                  <div className="bg-light p-3 rounded-4 border">
                    <div className="text-primary mb-2"><FiUsers size={24}/></div>
                    <small className="text-muted fw-bold d-block">Total Customers</small>
                    <h3 className="fw-bolder mb-0 text-dark">{selectedBranch.customers}</h3>
                    <small className="text-success fw-bold"><FiTrendingUp/> +12% this month</small>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="bg-light p-3 rounded-4 border">
                    <div className="text-success mb-2"><FiDollarSign size={24}/></div>
                    <small className="text-muted fw-bold d-block">Monthly Revenue</small>
                    <h3 className="fw-bolder mb-0 text-dark">{selectedBranch.revenue}</h3>
                    <small className="text-success fw-bold"><FiTrendingUp/> +5.4% this month</small>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="bg-light p-3 rounded-4 border">
                    <div className="text-warning mb-2"><FiActivity size={24}/></div>
                    <small className="text-muted fw-bold d-block">Active Loans</small>
                    <h3 className="fw-bolder mb-0 text-dark">452</h3>
                    <small className="text-muted fw-bold">Active portfolios</small>
                  </div>
                </div>
              </div>

              <h6 className="fw-bold text-dark mb-3">Recent Transactions Analytics</h6>
              <div className="bg-light rounded-4 border p-4 mb-4 d-flex align-items-center justify-content-center" style={{ height: '200px' }}>
                <div className="text-center text-muted">
                  <FiActivity size={40} className="mb-2 opacity-50"/>
                  <p className="mb-0">Analytics chart rendering...</p>
                  <small>Real-time graph connecting to branch data feed</small>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <span className={`badge px-3 py-2 ${selectedBranch.status === 'Operational' ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'}`}>
                  Status: {selectedBranch.status}
                </span>
                <button className="btn btn-outline-primary rounded-pill px-4" onClick={() => setShowAnalyticsModal(false)}>Close Analytics</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageBranches
