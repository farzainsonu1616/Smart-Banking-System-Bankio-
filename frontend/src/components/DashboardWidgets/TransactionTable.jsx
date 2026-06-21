import React from 'react'
import { formatCurrency, formatDateTime, getStatusBadgeClass } from '../../utils/Helpers'

const TransactionTable = ({ transactions = [], limit }) => {
  const displayTxns = limit ? transactions.slice(0, limit) : transactions

  if (!displayTxns.length) {
    return (
      <div className="text-center py-4 bg-white rounded-3 shadow-sm">
        <p className="text-muted mb-0">No transactions found.</p>
      </div>
    )
  }

  return (
    <div className="table-responsive bg-white shadow-sm custom-table">
      <table className="table table-hover mb-0">
        <thead>
          <tr>
            <th>Date</th>
            <th>Reference ID</th>
            <th>Description</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {displayTxns.map((txn) => (
            <tr key={txn.id}>
              <td>{formatDateTime(txn.transactionDate)}</td>
              <td className="fw-medium">{txn.referenceNumber}</td>
              <td>{txn.description}</td>
              <td>
                <span className={`fw-bold ${txn.type === 'DEPOSIT' || txn.type === 'TRANSFER_IN' ? 'text-success' : 'text-danger'}`}>
                  {txn.type}
                </span>
              </td>
              <td className="fw-bold">
                {txn.type === 'DEPOSIT' || txn.type === 'TRANSFER_IN' ? '+' : '-'}
                {formatCurrency(txn.amount)}
              </td>
              <td>
                <span className={`badge ${getStatusBadgeClass(txn.status)}`}>
                  {txn.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TransactionTable
