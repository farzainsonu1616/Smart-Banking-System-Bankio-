import React, { useState } from 'react'
import { FiSearch, FiFilter, FiUser } from 'react-icons/fi'

const BranchCustomers = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const [customers] = useState([
    { id: '1001', name: 'John Doe', email: 'john@example.com', phone: '+91 9876543210', kycStatus: 'VERIFIED', joinDate: '2025-01-15' },
    { id: '1002', name: 'Jane Smith', email: 'jane@example.com', phone: '+91 9876543211', kycStatus: 'PENDING', joinDate: '2026-06-10' },
    { id: '1003', name: 'Mike Johnson', email: 'mike@example.com', phone: '+91 9876543212', kycStatus: 'VERIFIED', joinDate: '2025-11-20' },
    { id: '1004', name: 'Emily Davis', email: 'emily@example.com', phone: '+91 9876543213', kycStatus: 'REJECTED', joinDate: '2026-05-05' },
  ])

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.id.includes(searchTerm)
  )

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0 d-flex align-items-center gap-2">
          <FiUser className="text-primary" /> Branch Customers
        </h2>
        <div className="d-flex gap-2">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0"><FiSearch /></span>
            <input 
              type="text" 
              className="form-control border-start-0 ps-0" 
              placeholder="Search by ID or Name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn btn-outline-primary d-flex align-items-center gap-2">
            <FiFilter /> Filter
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-3 shadow-sm p-4">
        <div className="table-responsive custom-table">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Join Date</th>
                <th>KYC Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map(customer => (
                <tr key={customer.id}>
                  <td className="font-monospace fw-medium text-primary">#{customer.id}</td>
                  <td className="fw-bold">{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.joinDate}</td>
                  <td>
                    <span className={`badge ${
                      customer.kycStatus === 'VERIFIED' ? 'bg-success' : 
                      customer.kycStatus === 'REJECTED' ? 'bg-danger' : 
                      'bg-warning text-dark'
                    }`}>
                      {customer.kycStatus}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredCustomers.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-muted">No customers found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default BranchCustomers
