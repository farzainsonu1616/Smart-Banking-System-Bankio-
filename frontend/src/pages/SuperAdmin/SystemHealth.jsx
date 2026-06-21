import React from 'react'
import { FiCheckCircle, FiAlertTriangle, FiXCircle, FiServer, FiDatabase, FiMail, FiMessageSquare, FiActivity } from 'react-icons/fi'

const SystemHealth = () => {
  const services = [
    { name: 'Frontend Application', type: 'React/Vite', status: 'Healthy', icon: <FiActivity />, load: '12%' },
    { name: 'Backend API Service', type: 'Spring Boot', status: 'Healthy', icon: <FiServer />, load: '45%' },
    { name: 'Database Server', type: 'PostgreSQL', status: 'Warning', icon: <FiDatabase />, load: '88%' },
    { name: 'Email Gateway', type: 'SMTP Service', status: 'Healthy', icon: <FiMail />, load: '5%' },
    { name: 'SMS Gateway', type: 'Twilio API', status: 'Critical', icon: <FiMessageSquare />, load: 'Timeout' },
  ]

  const getStatusColor = (status) => {
    if (status === 'Healthy') return 'success'
    if (status === 'Warning') return 'warning'
    return 'danger'
  }

  const getStatusIcon = (status) => {
    if (status === 'Healthy') return <FiCheckCircle />
    if (status === 'Warning') return <FiAlertTriangle />
    return <FiXCircle />
  }

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bolder text-dark mb-0">System Health Dashboard</h3>
        <button className="btn btn-outline-primary">Run Diagnostics</button>
      </div>

      <div className="row gy-4">
        {services.map((service, idx) => (
          <div className="col-xl-6" key={idx}>
            <div className={`card border-0 shadow-sm rounded-4 h-100 border-start border-4 border-${getStatusColor(service.status)}`}>
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="d-flex align-items-center gap-3">
                    <div className="p-3 bg-light rounded-4 text-secondary">
                      {React.cloneElement(service.icon, { size: 24 })}
                    </div>
                    <div>
                      <h5 className="fw-bold text-dark mb-1">{service.name}</h5>
                      <small className="text-muted">{service.type}</small>
                    </div>
                  </div>
                  <div className={`badge bg-${getStatusColor(service.status)}-subtle text-${getStatusColor(service.status)} px-3 py-2 rounded-pill d-flex align-items-center gap-2`}>
                    {getStatusIcon(service.status)} {service.status}
                  </div>
                </div>
                <div className="mt-4">
                  <div className="d-flex justify-content-between mb-1">
                    <small className="text-muted fw-bold">Resource Load</small>
                    <small className={`fw-bold text-${getStatusColor(service.status)}`}>{service.load}</small>
                  </div>
                  <div className="progress" style={{ height: '8px' }}>
                    <div 
                      className={`progress-bar bg-${getStatusColor(service.status)}`} 
                      style={{ width: service.load === 'Timeout' ? '100%' : service.load }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SystemHealth
