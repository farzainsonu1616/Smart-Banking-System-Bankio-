import React from 'react'
import { Link } from 'react-router-dom'

const PricingCard = ({ title, price, features, link, recommended = false }) => {
  return (
    <div className={`single-plan h-100 ${recommended ? 'recommended' : ''}`} style={recommended ? { border: '2px solid var(--primary)' } : {}}>
      {recommended && <div className="badge bg-primary rounded-pill mb-3 px-3 py-2">Most Popular</div>}
      <h3 className="mb-3">{title}</h3>
      <h2 className="mb-4 text-primary">{price} <span className="fs-6 text-muted fw-normal">/ month</span></h2>
      <ul className="list-unstyled mb-4">
        {features.map((feature, i) => (
          <li key={i} className="mb-3 d-flex align-items-center gap-2">
            <span className="text-success">✓</span> {feature}
          </li>
        ))}
      </ul>
      <Link to={link} className={`btn w-100 py-2 ${recommended ? 'btn-primary' : 'btn-outline-primary'}`}>
        Choose Plan
      </Link>
    </div>
  )
}

export default PricingCard
