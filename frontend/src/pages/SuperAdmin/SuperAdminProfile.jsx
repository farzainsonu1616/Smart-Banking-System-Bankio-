import React from 'react'
import { FiUser, FiMail, FiPhone, FiShield, FiEdit2 } from 'react-icons/fi'

const SuperAdminProfile = () => {
  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bolder text-dark mb-0">Profile Overview</h3>
        <button className="btn btn-primary d-flex align-items-center gap-2"><FiEdit2 /> Edit Profile</button>
      </div>

      <div className="row gy-4">
        <div className="col-xl-4">
          <div className="card border-0 shadow-sm rounded-4 text-center p-4">
            <img src="https://ui-avatars.com/api/?name=Super+Admin&background=random" alt="Admin" className="rounded-circle mx-auto mb-3" width="120" height="120" />
            <h4 className="fw-bold text-dark mb-1">System Administrator</h4>
            <span className="badge bg-danger-subtle text-danger mb-3"><FiShield className="me-1" /> Super Admin Level 1</span>
            <p className="text-muted">Maintained and operated by Bankio Global IT Operations.</p>
          </div>
        </div>
        <div className="col-xl-8">
          <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
            <h5 className="fw-bold text-dark mb-4">Personal Information</h5>
            <div className="row gy-4">
              <div className="col-md-6">
                <label className="text-muted mb-1 d-flex align-items-center gap-2"><FiUser /> Full Name</label>
                <div className="fw-bold text-dark fs-5">System Administrator</div>
              </div>
              <div className="col-md-6">
                <label className="text-muted mb-1 d-flex align-items-center gap-2"><FiMail /> Email Address</label>
                <div className="fw-bold text-dark fs-5">superadmin@bankio.com</div>
              </div>
              <div className="col-md-6">
                <label className="text-muted mb-1 d-flex align-items-center gap-2"><FiPhone /> Phone Number</label>
                <div className="fw-bold text-dark fs-5">+1 800 123 4567</div>
              </div>
              <div className="col-md-6">
                <label className="text-muted mb-1 d-flex align-items-center gap-2"><FiShield /> Department</label>
                <div className="fw-bold text-dark fs-5">Global IT Security HQ</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuperAdminProfile
