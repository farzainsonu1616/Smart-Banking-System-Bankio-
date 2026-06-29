import React from 'react'
import { FiShield, FiPlus, FiCheck } from 'react-icons/fi'
import { toast } from 'react-toastify'

const RoleManagement = () => {
  const handleEditRole = (role) => {
    toast.info(`Editing permissions for ${role} role`)
  }

  const handleCreateRole = () => {
    toast.info('Create Custom Role dialog opened')
  }

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Role & Permission Management</h2>
          <p className="text-muted mb-0">Define granular access control across the organization</p>
        </div>
        <button onClick={handleCreateRole} className="btn btn-primary d-flex align-items-center">
          <FiPlus className="me-2" /> Create Custom Role
        </button>
      </div>

      <div className="row gy-4">
        {['Super Admin', 'Admin', 'Manager', 'Audit Staff'].map((role, idx) => (
          <div className="col-xl-3 col-md-6" key={idx}>
            <div className="card border-0 shadow-sm rounded-4 h-100 hover-lift" style={{ transition: 'all 0.3s ease' }}>
              <div className="card-body p-4 flex-column d-flex">
                <div className="d-flex align-items-center mb-3">
                  <div className={`p-2 rounded me-3 bg-primary bg-opacity-10 text-primary`}>
                    <FiShield size={24} />
                  </div>
                  <h5 className="mb-0 fw-bold">{role}</h5>
                </div>
                <hr className="bg-light" />
                <ul className="list-unstyled mb-4">
                  <li className="mb-2"><FiCheck className="text-success me-2"/> Manage Accounts</li>
                  <li className="mb-2"><FiCheck className="text-success me-2"/> View Transactions</li>
                  {idx < 3 && <li className="mb-2"><FiCheck className="text-success me-2"/> Approve Loans</li>}
                  {idx < 2 && <li className="mb-2"><FiCheck className="text-success me-2"/> Manage Users</li>}
                  {idx === 0 && <li className="mb-2"><FiCheck className="text-success me-2"/> System Settings</li>}
                </ul>
                <div className="d-grid mt-auto">
                  <button onClick={() => handleEditRole(role)} className="btn btn-outline-secondary">Edit Permissions</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RoleManagement
