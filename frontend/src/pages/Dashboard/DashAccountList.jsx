import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import AccountService from '../../services/AccountService'
import Preloader from '../../components/Common/Preloader'
import { formatCurrency, formatDateTime } from '../../utils/Helpers'

const DashAccountList = () => {
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAccounts()
  }, [])

  const fetchAccounts = async () => {
    try {
      const res = await AccountService.getAccounts()
      setAccounts(res.data.data)
    } catch (error) {
      toast.error('Failed to load accounts')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Preloader />

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">My Accounts</h2>
      </div>

      <div className="row gy-4">
        {accounts.map(acc => (
          <div className="col-xl-4 col-md-6" key={acc.id}>
            <div className="bg-white rounded-4 shadow-sm p-4 h-100 border-top border-primary border-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <span className="badge bg-light text-primary mb-2 px-3 py-2 border">{acc.accountType}</span>
                  <h4 className="mb-0">{acc.accountNumber}</h4>
                </div>
                <span className={`badge ${acc.status === 'ACTIVE' ? 'bg-success' : 'bg-warning'}`}>
                  {acc.status}
                </span>
              </div>
              
              <div className="mt-4">
                <p className="text-muted mb-1">Available Balance</p>
                <h2 className="text-primary mb-0">{formatCurrency(acc.balance, acc.currency)}</h2>
              </div>
              
              <hr className="my-4" />
              
              <div className="d-flex justify-content-between fs-6 text-muted">
                <span>Opened: {formatDateTime(acc.createdAt).split(',')[0]}</span>
                <span>{acc.currency}</span>
              </div>
            </div>
          </div>
        ))}

        {accounts.length === 0 && (
          <div className="col-12 text-center py-5 bg-white rounded-3">
            <p className="text-muted fs-5">You don't have any accounts yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DashAccountList
