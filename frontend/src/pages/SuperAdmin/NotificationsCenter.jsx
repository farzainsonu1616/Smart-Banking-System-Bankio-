import React, { useState } from 'react'
import { FiBell, FiShield, FiAlertTriangle, FiInfo, FiCheckCircle } from 'react-icons/fi'

const NotificationsCenter = () => {
  const [activeTab, setActiveTab] = useState('all')

  const notifications = [
    { id: 1, type: 'security', title: 'Multiple Failed Login Attempts', desc: 'IP 192.168.45.12 blocked after 5 failed attempts.', time: '10 mins ago', icon: <FiShield />, color: 'danger' },
    { id: 2, type: 'system', title: 'Database Backup Completed', desc: 'Automated daily backup finished successfully.', time: '2 hours ago', icon: <FiCheckCircle />, color: 'success' },
    { id: 3, type: 'alert', title: 'High Server Load Detected', desc: 'Node-Beta is experiencing 85% CPU load.', time: '5 hours ago', icon: <FiAlertTriangle />, color: 'warning' },
    { id: 4, type: 'info', title: 'New Admin Added', desc: 'Super Admin added a new branch manager for Delhi.', time: '1 day ago', icon: <FiInfo />, color: 'primary' },
  ]

  const filteredNotifications = activeTab === 'all' ? notifications : notifications.filter(n => n.type === activeTab)

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bolder text-dark mb-0">Notification Center</h3>
        <button className="btn btn-outline-secondary">Mark All as Read</button>
      </div>

      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-header bg-white border-bottom-0 pt-4 pb-0 px-4">
          <ul className="nav nav-tabs border-bottom-0">
            <li className="nav-item">
              <button className={`nav-link border-0 ${activeTab === 'all' ? 'active fw-bold text-primary border-bottom border-primary border-2' : 'text-muted'}`} style={{ backgroundColor: 'transparent' }} onClick={() => setActiveTab('all')}>All Notifications</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link border-0 ${activeTab === 'security' ? 'active fw-bold text-danger border-bottom border-danger border-2' : 'text-muted'}`} style={{ backgroundColor: 'transparent' }} onClick={() => setActiveTab('security')}>Security Alerts</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link border-0 ${activeTab === 'system' ? 'active fw-bold text-success border-bottom border-success border-2' : 'text-muted'}`} style={{ backgroundColor: 'transparent' }} onClick={() => setActiveTab('system')}>System Events</button>
            </li>
          </ul>
        </div>
        <div className="card-body p-0">
          <div className="list-group list-group-flush rounded-bottom-4">
            {filteredNotifications.map(notification => (
              <div key={notification.id} className="list-group-item list-group-item-action p-4 border-light border-bottom">
                <div className="d-flex align-items-start gap-3">
                  <div className={`p-3 rounded-circle bg-${notification.color}-subtle text-${notification.color}`}>
                    {React.cloneElement(notification.icon, { size: 20 })}
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <h6 className="fw-bold mb-0 text-dark">{notification.title}</h6>
                      <small className="text-muted">{notification.time}</small>
                    </div>
                    <p className="text-muted mb-0">{notification.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificationsCenter
