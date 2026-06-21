import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { FiCreditCard, FiSearch } from 'react-icons/fi'

const ManageCards = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const [cards, setCards] = useState([
    { id: 'REQ-101', user: 'John Doe', type: 'Credit Card', variant: 'Platinum Visa', status: 'PENDING_APPROVAL', date: '2026-06-20' },
    { id: 'CRD-5432', user: 'Jane Smith', type: 'Debit Card', variant: 'Gold Mastercard', status: 'ACTIVE', date: '2025-11-15' },
    { id: 'REQ-102', user: 'Mike Johnson', type: 'Credit Card', variant: 'Signature Rewards', status: 'PENDING_APPROVAL', date: '2026-06-21' },
    { id: 'CRD-8891', user: 'Emily Davis', type: 'Debit Card', variant: 'Standard Visa', status: 'BLOCKED', date: '2024-03-10' },
  ])

  const handleAction = (id, newStatus) => {
    setCards(cards.map(card => card.id === id ? { ...card, status: newStatus } : card))
    if (newStatus === 'ACTIVE') toast.success('Card Approved & Activated successfully')
    else if (newStatus === 'BLOCKED') toast.warning('Card Blocked successfully')
    else toast.success(`Card status updated to ${newStatus}`)
  }

  const filteredCards = cards.filter(card => 
    card.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
    card.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0 d-flex align-items-center gap-2">
          <FiCreditCard className="text-primary" /> Card Management
        </h2>
        <div className="input-group" style={{ width: '300px' }}>
          <span className="input-group-text bg-white border-end-0"><FiSearch /></span>
          <input 
            type="text" 
            className="form-control border-start-0 ps-0" 
            placeholder="Search by User or ID..." 
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
                <th>Request / Card ID</th>
                <th>Customer Name</th>
                <th>Card Type</th>
                <th>Variant</th>
                <th>Request Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCards.map(card => (
                <tr key={card.id}>
                  <td className="font-monospace fw-medium text-primary">{card.id}</td>
                  <td>{card.user}</td>
                  <td>{card.type}</td>
                  <td>{card.variant}</td>
                  <td>{card.date}</td>
                  <td>
                    <span className={`badge ${
                      card.status === 'ACTIVE' ? 'bg-success' : 
                      card.status === 'BLOCKED' ? 'bg-danger' : 
                      'bg-warning text-dark'
                    }`}>
                      {card.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td>
                    {card.status === 'PENDING_APPROVAL' && (
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-outline-success" onClick={() => handleAction(card.id, 'ACTIVE')}>Approve</button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleAction(card.id, 'REJECTED')}>Reject</button>
                      </div>
                    )}
                    {card.status === 'ACTIVE' && (
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleAction(card.id, 'BLOCKED')}>Block Card</button>
                    )}
                    {card.status === 'BLOCKED' && (
                      <button className="btn btn-sm btn-outline-success" onClick={() => handleAction(card.id, 'ACTIVE')}>Unblock Card</button>
                    )}
                  </td>
                </tr>
              ))}
              {filteredCards.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-muted">No cards found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ManageCards
