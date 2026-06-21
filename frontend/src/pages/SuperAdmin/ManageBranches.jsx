import React, { useState } from 'react'
import { FiSearch, FiFilter, FiPlus, FiMapPin, FiUsers, FiDollarSign } from 'react-icons/fi'

const ManageBranches = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const branches = [
    { id: 1, name: 'Downtown Main Branch', code: 'BR-1001', location: '123 Financial District, NY', customers: '4,520', revenue: '$850K', status: 'Operational' },
    { id: 2, name: 'Northside Hub', code: 'BR-1002', location: '45 Corporate Park, NY', customers: '2,100', revenue: '$420K', status: 'Operational' },
    { id: 3, name: 'Westend Branch', code: 'BR-1003', location: '88 Retail Avenue, NY', customers: '1,850', revenue: '$310K', status: 'Maintenance' },
  ]

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bolder text-dark mb-0">Branch Management</h3>
        <div className="d-flex gap-2">
          <div className="input-group" style={{ width: '300px' }}>
            <span className="input-group-text bg-white border-end-0"><FiSearch /></span>
            <input type="text" className="form-control border-start-0 ps-0" placeholder="Search Branches..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <button className="btn btn-outline-secondary d-flex align-items-center gap-2"><FiFilter /> Filter</button>
          <button className="btn btn-primary d-flex align-items-center gap-2"><FiPlus /> Register Branch</button>
        </div>
      </div>

      <div className="row gy-4">
        {branches.map((branch) => (
          <div className="col-xl-4 col-md-6" key={branch.id}>
            <div className="card border-0 shadow-sm rounded-4 h-100">
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
                  <button className="btn btn-outline-primary rounded-4 fw-bold py-2">View Details & Analytics</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ManageBranches
