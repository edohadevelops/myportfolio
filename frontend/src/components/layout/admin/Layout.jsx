import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../sidebar/Sidebar'
import ProfileBar from './profile/ProfileBar'
import './style.css'

const Layout = () => {
  return (
    <div className='admin-layout'>
      <div className="layout-sidebar">
        <Sidebar />
      </div>
      <div className="layout-content">
        <Outlet />
      </div>
      {/* <div className="layout-profile">
        <ProfileBar />
      </div> */}
    </div>
  )
}

export default Layout
