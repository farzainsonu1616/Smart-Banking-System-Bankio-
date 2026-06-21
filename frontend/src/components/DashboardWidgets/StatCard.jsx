import React from 'react'

const StatCard = ({ icon, title, value, color }) => {
  return (
    <div className="stat-card">
      <div className="d-flex align-items-center gap-3">
        <div className={`stat-icon bg-${color} bg-opacity-10 text-${color}`}>
          {icon}
        </div>
        <div>
          <h4 className="stat-value mb-1">{value}</h4>
          <span className="stat-label">{title}</span>
        </div>
      </div>
    </div>
  )
}

export default StatCard
