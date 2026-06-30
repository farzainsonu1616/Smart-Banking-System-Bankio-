import React from 'react'
import { Link } from 'react-router-dom'

const SolutionCard = ({ title, description, link, image }) => {
  return (
    <div className="solution-card h-100 position-relative overflow-hidden rounded-4 hover-lift" style={{ minHeight: '350px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
      <img src={image} alt={title} className="solution-img w-100 h-100 object-fit-cover position-absolute top-0 start-0" style={{ transition: 'transform 0.5s ease' }} />
      <div className="position-relative z-1 p-5 h-100 d-flex flex-column justify-content-end" style={{ background: 'linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.4) 50%, transparent 100%)' }}>
        <h3 className="text-white mb-2 fw-bold" style={{ fontSize: '28px' }}>{title}</h3>
        <p className="mb-4" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px' }}>{description}</p>
        <Link to={link} className="cmn-btn align-self-start" style={{ padding: '12px 24px', fontSize: '14px' }}>Explore</Link>
      </div>
    </div>
  )
}

export default SolutionCard
