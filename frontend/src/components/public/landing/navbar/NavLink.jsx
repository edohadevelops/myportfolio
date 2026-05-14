import React from 'react'
import { NavLink } from 'react-router-dom'

const NavigationLink = ({ route,label }) => {
  return (
    <NavLink 
        to={route}
        className={`landing-navbar-link`}
    >
        {label}
    </NavLink>
  )
}

export default NavigationLink
