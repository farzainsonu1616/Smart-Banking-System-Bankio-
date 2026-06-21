import React, { useState } from 'react'
import { FiSearch, FiFilter, FiCheckCircle, FiXCircle, FiCreditCard } from 'react-icons/fi'

const ManageCards = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const cards = [
    { id: 'CRD-1029', customer: 'Alice Williams', type: 'Platinum Credit', limit: '$50,000', status: 'Pending Request', date: '2026-06-20' },
    { id: 'CRD-1030', customer: 'Mark Davis', type: 'Gold Debit', limit: '$10,000', status: 'Active', date: '2026-05-15' },
    { id: 'CRD-1031', customer: 'John Doe', type: 'Travel Prepaid', limit: '$5,000', status: 'Blocked', date: '2026-04-10' },
  ]

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bolder text-dark mb-0">Card Management</h3>
        <div className="d-flex gap-2">
          <div className="input-group" style={{ width: '300px' }}>
            <span className="input-group-text bg-white border-end-0"><FiSearch /></span>
            <input type="text" className="form-control border-start-0 ps-0" placeholder="Search Card Request..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
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
                  <th className="px-4 py-3 border-top-0 border-end-0">Request ID</th>
                  <th className="py-3 border-top-0 border-end-0 border-start-0">Customer</th>
                  <th className="py-3 border-top-0 border-end-0 border-start-0">Card Type</th>
                  <th className="py-3 border-top-0 border-end-0 border-start-0 text-end">Limit/Balance</th>
                  <th className="py-3 border-top-0 border-end-0 border-start-0">Date</th>
                  <th className="py-3 border-top-0 border-end-0 border-start-0 text-center">Status</th>
                  <th className="text-end px-4 py-3 border-top-0 border-start-0">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cards.map(card => (
                  <tr key={card.id}>
                    <td className="px-4 py-3 border-end-0 fw-bold">{card.id}</td>
                    <td className="py-3 border-end-0 border-start-0">{card.customer}</td>
                    <td className="py-3 border-end-0 border-start-0">
                      <div className="d-flex align-items-center gap-2">
                        <FiCreditCard className="text-muted" />
                        {card.type}
                      </div>
                    </td>
                    <td className="py-3 border-end-0 border-start-0 text-end fw-bold text-dark">{card.limit}</td>
                    <td className="py-3 border-end-0 border-start-0 text-muted">{card.date}</td>
                    <td className="py-3 border-end-0 border-start-0 text-center">
                      <span className={`badge ${card.status === 'Active' ? 'bg-success-subtle text-success' : card.status === 'Pending Request' ? 'bg-warning-subtle text-warning' : 'bg-danger-subtle text-danger'}`}>
                        {card.status}
                      </span>
                    </td>
                    <td className="text-end px-4 py-3 border-start-0">
                      <div className="d-flex justify-content-end gap-2">
                        {card.status === 'Pending Request' && (
                          <>
                            <button className="btn btn-sm btn-light text-success" title="Approve Request"><FiCheckCircle /></button>
                            <button className="btn btn-sm btn-light text-danger" title="Reject Request"><FiXCircle /></button>
                          </>
                        )}
                        {card.status === 'Active' && (
                          <button className="btn btn-sm btn-light text-danger" title="Block Card"><FiXCircle /></button>
                        )}
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

export default ManageCards
