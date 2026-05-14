import React from 'react'
import { IoIosArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom';
import { FaPlus } from "react-icons/fa6";
import { AiOutlineHome } from "react-icons/ai";
import './style.css'

const Navigation = ({pageTitle,prevLinks,actionText}) => {
    

    const CURRENT_ROUTE = '/dashboard'
  return (
    <div className='navigation-component'>
      <div className="navigation-breadcrumbs">
        <div className="navigation-breadcrumb">
            <Link to={'/dashboard'}>
                <AiOutlineHome size={'15px'} />
            </Link>
            <span>
                <IoIosArrowForward size={'12px'} />
            </span>
        </div>
        {
            prevLinks?.map((item,index)=>(
                <div className="navigation-breadcrumb">
                    <Link to={'/dashboard'}>
                        <p className={`navigation-breadcrumb-label text-gray-600 ${index === prevLinks?.length - 1 && "text-primary font-semibold"}`}>{item.link}</p>
                    </Link>
                    {
                        index !== prevLinks?.length - 1 &&
                        <span className={`${index === prevLinks?.length - 1 && "text-primary"}`}>
                            <IoIosArrowForward size={'12px'} />
                        </span>
                    }
                </div>
            ))
        }
      </div>
      <div className="navigation-content">
        <p className="navigation-page-title">{pageTitle}</p>
        <button className='navigation-page-action-new'>
            <FaPlus />
            {actionText}
        </button>
      </div>
    </div>
  )
}

export default Navigation
