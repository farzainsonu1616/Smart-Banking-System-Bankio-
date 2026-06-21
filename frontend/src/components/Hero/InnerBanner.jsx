import React from 'react'
import { Link } from 'react-router-dom'

const InnerBanner = ({ title, breadcrumbs = [] }) => {
  return (
    <section className="inner-banner d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <h1 className="title text-white mb-3">{title}</h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center mb-0">
                <li className="breadcrumb-item"><Link to="/" className="text-white">Home</Link></li>
                {breadcrumbs.map((crumb, i) => (
                  <li key={i} className={`breadcrumb-item ${i === breadcrumbs.length - 1 ? 'active text-warning' : ''}`}>
                    {crumb.link ? <Link to={crumb.link} className="text-white">{crumb.label}</Link> : crumb.label}
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InnerBanner
