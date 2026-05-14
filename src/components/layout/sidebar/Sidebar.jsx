import React, { useState,useEffect } from 'react';
import './style.css';
import Logo from '../../../assets/final-primary-logo.png';
import SmallLogo from '../../../assets/smallLogo.png';
import { ADMINCONTROLS, ADMINLINKS } from './constants';
import { NavLink, useLocation } from 'react-router-dom';
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
// import * as routes from '../../../routes/routes'

const Sidebar = () => {

    const location = useLocation();

    const [activeLink,setActiveLink] = useState(location.pathname);
    const [windowWidth,setWindowWidth] = useState(window.innerWidth);

    useEffect(()=>{
        const resizer = () => setWindowWidth(window.innerWidth);

        window.addEventListener('resize',resizer);

        () =>  window.removeEventListener('resize',resizer)
    },[])

  return (
    <div className='admin-sidebar-component'>
      <div className="admin-sidebar-logo">
        <img src={windowWidth > 1000 ? Logo: SmallLogo} alt='logo' />
      </div>
      <div className='admin-sidebar-links-group'>
        <div className="admin-sidebar-page-links mb-20">
            {
                ADMINLINKS.map((Link)=>(
                    <NavLink 
                        key={Link.id}
                        to={Link.url}
                        className={`admin-sidebar-link ${location.pathname === Link.url && "bg-tertiary"}`}
                        onMouseEnter={()=>{
                            setActiveLink(Link.url)
                        }}
                        onMouseLeave={()=>setActiveLink(location.pathname)}
                    >
                        <div className='admin-sidebar-link-details'>
                            {
                                activeLink === Link.url ?
                                <Link.activeIcon size={"20px"} className={`text-sub-text transition-all duration-300 ease-in ${activeLink === Link.url && 'text-primary'}`}/> :
                                <Link.icon size={"20px"} className={`text-sub-text transition-all duration-300 ease-in ${activeLink === Link.url && 'text-primary'}`}/>
                            }
                            <span className={`text-sub-text ${activeLink === Link.url && 'text-primary font-semibold'}`}>{Link.name}</span>
                        </div>
                        {
                            Link.hasSublinks &&
                            <button className='admin-sidebar-sublink-control'>
                                <FaPlus size={"10px"} />
                            </button>
                        }
                    </NavLink>
                ))
            }
        </div>
        <div className="admin-sidebar-page-links">
            {
                ADMINCONTROLS.map((Link)=>(
                    <NavLink 
                        key={Link.id}
                        to={Link.url}
                        className={`admin-sidebar-link ${location.pathname === Link.url && "bg-tertiary"}`}
                        onMouseEnter={()=>{
                            setActiveLink(Link.url)
                        }}
                        onMouseLeave={()=>setActiveLink(location.pathname)}
                    >
                        <div className='admin-sidebar-link-details'>
                            {
                                activeLink === Link.url ?
                                <Link.activeIcon size={"25px"} className={`text-sub-text transition-all duration-300 ease-in ${activeLink === Link.url && 'text-primary'}`}/> :
                                <Link.icon size={"25px"} className={`text-sub-text transition-all duration-300 ease-in ${activeLink === Link.url && 'text-primary'}`}/>
                            }
                            <span className={`text-sub-text ${activeLink === Link.url && 'text-primary font-semibold'}`}>{Link.name}</span>
                        </div>
                        {
                            Link.hasSublinks &&
                            <button className='admin-sidebar-sublink-control'>
                                <FaPlus size={"10px"} />
                            </button>
                        }
                    </NavLink>
                ))
            }
        </div>
      </div>
    </div>
  )
}

export default Sidebar
