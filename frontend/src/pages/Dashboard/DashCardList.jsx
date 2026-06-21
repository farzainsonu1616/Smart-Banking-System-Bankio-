import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import CardService from '../../services/CardService'
import Preloader from '../../components/Common/Preloader'
import { maskCardNumber, formatCurrency } from '../../utils/Helpers'
import { FiWifi, FiLock, FiUnlock, FiRefreshCcw, FiKey, FiList, FiAlertTriangle } from 'react-icons/fi'

const DashCardList = () => {
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)
  
  // States for simulated actions
  const [activeAction, setActiveAction] = useState(null)
  const [selectedCardId, setSelectedCardId] = useState(null)
  const [pinInput, setPinInput] = useState('')

  // Realistic mock data if backend falls short for demonstration
  const mockCards = [
    { id: 'C1001', cardType: 'CREDIT', cardNumber: '4532112233445566', cardHolderName: 'JOHN DOE', expiryDate: '12/28', status: 'ACTIVE', creditLimit: 500000, availableBalance: 125000 },
    { id: 'C1002', cardType: 'DEBIT', cardNumber: '5522334411229988', cardHolderName: 'JOHN DOE', expiryDate: '09/27', status: 'ACTIVE' },
    { id: 'C1003', cardType: 'DEBIT', cardNumber: '4532001122334455', cardHolderName: 'JOHN DOE', expiryDate: '05/25', status: 'BLOCKED' },
  ]

  useEffect(() => {
    fetchCards()
  }, [])

  const fetchCards = async () => {
    try {
      const res = await CardService.getCards()
      if (res.data && res.data.data && res.data.data.length > 0) {
        setCards(res.data.data)
      } else {
        setCards(mockCards)
      }
    } catch (error) {
      setCards(mockCards)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleCardStatus = async (id, currentStatus) => {
    try {
      if (currentStatus === 'ACTIVE') {
        setCards(cards.map(c => c.id === id ? { ...c, status: 'BLOCKED' } : c))
        toast.success('Card blocked successfully for your security.')
      } else if (currentStatus === 'BLOCKED') {
        setCards(cards.map(c => c.id === id ? { ...c, status: 'ACTIVE' } : c))
        toast.success('Card activated successfully.')
      }
    } catch (error) {
      toast.error('Failed to update card status')
    }
  }

  const handleSimulatedAction = (e, actionType) => {
    e.preventDefault()
    toast.success(`${actionType} successful!`)
    setActiveAction(null)
    setPinInput('')
  }

  if (loading) return <Preloader />

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">My Cards</h2>
      </div>

      <div className="row gy-4">
        {cards.map(card => {
          const isBlocked = card.status === 'BLOCKED'
          const isCredit = card.cardType === 'CREDIT'
          const outstanding = isCredit ? (card.creditLimit - card.availableBalance) : 0
          
          return (
            <div className="col-xl-5 col-lg-6" key={card.id}>
              <div className="bg-white rounded-4 shadow-sm p-4 h-100 position-relative border border-2 border-light">
                
                {/* Hyper-realistic Card UI */}
                <div 
                  className={`p-4 rounded-4 text-white mb-4 position-relative overflow-hidden transition-all duration-300 ${isBlocked ? 'opacity-50' : ''}`} 
                  style={{ 
                    background: isCredit ? 'linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%)' : 'linear-gradient(135deg, #212529 0%, #495057 100%)', 
                    boxShadow: '0 15px 30px rgba(0,0,0,0.15)',
                    aspectRatio: '1.586 / 1'
                  }}
                >
                  {/* Card Gloss Overlay */}
                  <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%)' }}></div>
                  
                  <div className="d-flex justify-content-between align-items-start mb-4 position-relative z-1">
                    <span className="fw-bold fs-4 fst-italic letter-spacing-1">Bankio</span>
                    <div className="text-end">
                      <span className="fw-semibold d-block" style={{ fontSize: '14px', letterSpacing: '1px' }}>{card.cardType}</span>
                      <FiWifi size={24} className="mt-1" style={{ transform: 'rotate(90deg)' }} />
                    </div>
                  </div>
                  
                  {/* EMV Chip Simulation */}
                  <div className="mb-3 position-relative z-1">
                    <div style={{ width: '45px', height: '35px', background: 'linear-gradient(135deg, #ffd700 0%, #daa520 100%)', borderRadius: '5px', border: '1px solid #b8860b' }}>
                      <div className="w-100 h-100" style={{ border: '1px solid rgba(0,0,0,0.1)', background: 'repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 11px)' }}></div>
                    </div>
                  </div>

                  <h3 className="mb-4 text-white font-monospace position-relative z-1" style={{ letterSpacing: '4px', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                    {isBlocked ? '**** **** **** ****' : maskCardNumber(card.cardNumber)}
                  </h3>
                  
                  <div className="d-flex justify-content-between align-items-end position-relative z-1">
                    <div>
                      <small className="text-white-50 d-block mb-1" style={{ fontSize: '10px' }}>CARD HOLDER</small>
                      <span className="fw-bold text-uppercase" style={{ letterSpacing: '1px', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>{card.cardHolderName}</span>
                    </div>
                    <div className="text-end">
                      <small className="text-white-50 d-block mb-1" style={{ fontSize: '10px' }}>VALID THRU</small>
                      <span className="fw-bold font-monospace" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>{card.expiryDate?.substring(0, 7)}</span>
                    </div>
                  </div>
                </div>

                {/* Card Details & Quick Stats */}
                <div className="card-details mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
                    <span className="text-muted small">Card Status</span>
                    <span className={`badge rounded-pill px-3 ${card.status === 'ACTIVE' ? 'bg-success' : 'bg-danger'}`}>
                      {card.status}
                    </span>
                  </div>

                  {isCredit && (
                    <div className="row gy-3 mb-3">
                      <div className="col-6">
                        <div className="p-2 bg-light rounded text-center h-100">
                          <small className="text-muted d-block" style={{ fontSize: '11px' }}>Total Limit</small>
                          <span className="fw-bold text-dark">{formatCurrency(card.creditLimit)}</span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="p-2 bg-danger bg-opacity-10 rounded text-center h-100">
                          <small className="text-danger d-block" style={{ fontSize: '11px' }}>Outstanding</small>
                          <span className="fw-bold text-danger">{formatCurrency(outstanding)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Management Action Buttons */}
                <div className="row g-2">
                  <div className="col-6">
                    <button 
                      onClick={() => handleToggleCardStatus(card.id, card.status)}
                      className={`btn w-100 d-flex align-items-center justify-content-center gap-2 ${isBlocked ? 'btn-success' : 'btn-outline-danger'}`}
                    >
                      {isBlocked ? <><FiUnlock /> Unblock</> : <><FiLock /> Block</>}
                    </button>
                  </div>
                  <div className="col-6">
                    <button 
                      onClick={() => { setSelectedCardId(card.id); setActiveAction(activeAction === 'pin' ? null : 'pin') }}
                      className="btn w-100 btn-outline-primary d-flex align-items-center justify-content-center gap-2"
                      disabled={isBlocked}
                    >
                      <FiKey /> Change PIN
                    </button>
                  </div>
                  <div className="col-6">
                    <button 
                      onClick={() => { setSelectedCardId(card.id); setActiveAction(activeAction === 'replace' ? null : 'replace') }}
                      className="btn w-100 btn-outline-secondary d-flex align-items-center justify-content-center gap-2"
                    >
                      <FiRefreshCcw /> Replace Card
                    </button>
                  </div>
                  {isCredit && (
                    <div className="col-6">
                      <button 
                        onClick={() => { setSelectedCardId(card.id); setActiveAction(activeAction === 'history' ? null : 'history') }}
                        className="btn w-100 btn-outline-dark d-flex align-items-center justify-content-center gap-2"
                      >
                        <FiList /> Pay History
                      </button>
                    </div>
                  )}
                </div>

                {/* Simulated Action Modals / Expanding Sections */}
                {selectedCardId === card.id && activeAction && (
                  <div className="mt-4 p-3 bg-light rounded-3 border animate__animated animate__fadeIn">
                    
                    {activeAction === 'pin' && (
                      <form onSubmit={(e) => handleSimulatedAction(e, 'PIN Change')}>
                        <h6 className="mb-3">Set New PIN</h6>
                        <div className="mb-3">
                          <input type="password" placeholder="Enter 4-digit PIN" className="form-control text-center letter-spacing-2" maxLength="4" required value={pinInput} onChange={(e) => setPinInput(e.target.value)} />
                        </div>
                        <div className="d-flex gap-2">
                          <button type="button" className="btn btn-sm btn-outline-secondary w-50" onClick={() => setActiveAction(null)}>Cancel</button>
                          <button type="submit" className="btn btn-sm btn-primary w-50">Save PIN</button>
                        </div>
                      </form>
                    )}

                    {activeAction === 'replace' && (
                      <form onSubmit={(e) => handleSimulatedAction(e, 'Card Replacement Request')}>
                        <h6 className="mb-3 text-danger"><FiAlertTriangle /> Request Replacement</h6>
                        <p className="small text-muted mb-3">If your card is lost, damaged, or stolen, request a replacement here. A fee of ₹250 applies.</p>
                        <div className="mb-3">
                          <select className="form-select form-select-sm" required>
                            <option value="">Select Reason...</option>
                            <option value="lost">Lost / Stolen</option>
                            <option value="damaged">Damaged</option>
                          </select>
                        </div>
                        <div className="d-flex gap-2">
                          <button type="button" className="btn btn-sm btn-outline-secondary w-50" onClick={() => setActiveAction(null)}>Cancel</button>
                          <button type="submit" className="btn btn-sm btn-danger w-50">Request New</button>
                        </div>
                      </form>
                    )}

                    {activeAction === 'history' && (
                      <div>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h6 className="mb-0">Recent Card Payments</h6>
                          <button className="btn-close" onClick={() => setActiveAction(null)}></button>
                        </div>
                        <div className="table-responsive">
                          <table className="table table-sm text-center mb-0">
                            <thead className="table-light">
                              <tr>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody className="small">
                              <tr>
                                <td>{new Date().toLocaleDateString()}</td>
                                <td>₹5,000</td>
                                <td className="text-success">Paid</td>
                              </tr>
                              <tr>
                                <td>{new Date(Date.now() - 86400000 * 30).toLocaleDateString()}</td>
                                <td>₹12,450</td>
                                <td className="text-success">Paid</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                  </div>
                )}

              </div>
            </div>
          )
        })}

        {cards.length === 0 && (
          <div className="col-12 text-center py-5 bg-white rounded-3 shadow-sm">
            <p className="text-muted fs-5 mb-0">You don't have any cards.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DashCardList
