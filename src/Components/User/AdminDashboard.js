import React from 'react'
import ErrorPage from '../ErrorPage'
import './AdminDashboard.scss'

const AdminDashboard = () => {
    return (
        <div className="AdminDashboard">
            {authError ? <ErrorPage code={403} error="You do not have permission to access the admin dashboard." /> :
            <div className="admin-dashboard-container page">
                <h2>Admin Dashboard</h2>
            </div>}
        </div>
    )
}

export default AdminDashboard
