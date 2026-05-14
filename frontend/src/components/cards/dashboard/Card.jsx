import React from 'react'
import './style.css';
import { MdArrowOutward } from "react-icons/md";


const DashboardCard = ({title,count}) => {
  return (
    <div className='dashboard-analytic'>
      <div className="analytic-heading">
        <p className="analytic-title">{title}</p>
        <button className="analytic-cta">
          <MdArrowOutward size={"20px"} />
        </button>
      </div>
      <div className="analytic-display">
        
      </div>
      <div className="analytic-details">
        <div className="analytic-details-categories">
            <div className="analytic-details-category"></div>
            <div className="analytic-details-category"></div>
        </div>
        <p className="analytic-details-number">{count}+</p>
      </div>
    </div>
  )
}

export default DashboardCard
