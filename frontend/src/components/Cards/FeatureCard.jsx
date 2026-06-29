import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'

const FeatureCard = ({ icon, title, description, link }) => {
  return (
    <div className="single-box text-center h-100 p-4 p-md-5 hover-lift">
      <div className="icon mb-4 d-inline-flex justify-content-center align-items-center p-3" style={{ background: 'var(--primary-light)', borderRadius: '20px' }}>
        <img src={icon} alt={title} className="img-fluid" style={{ maxHeight: '55px' }} />
      </div>
      <h4 className="mb-3 fw-bold text-dark">{title}</h4>
      <p className="mb-4 text-muted" style={{ fontSize: '15px' }}>{description}</p>
      {link && (
        <Link to={link} className="fw-bold d-inline-flex align-items-center justify-content-center gap-2" style={{ color: 'var(--primary)' }}>
          Learn More <FiArrowRight />
        </Link>
      )}
    </div>
  )
}

export default FeatureCard
