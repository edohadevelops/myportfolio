import React from 'react';
import './style.css'
import DashboardCard from '../../../components/cards/dashboard/Card';
import Profile from '../../../assets/aboutMe.jpg'
import { MdArrowOutward } from "react-icons/md";
import { FaRegFolderOpen } from "react-icons/fa";
import { BsBriefcase } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
import { IoLayersOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { CiCircleMinus } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";

const Home = () => {
  return (
    <div className='dashboard-home-page'>
      <div className="dashboard-greeting-card">
        <p className="dashboard-greeting-date">Friday, 24th January 2025</p>
        <div className="dashboard-greeting-img">
            <img src={Profile} alt="" />
        </div>
        <p className="dashboard-greeting">Good Morning! Amen,</p>
        <p className="dashboard-greeting-description">Here is a brief overview of the daily insights of the projects you have published.</p>
      </div>
      <div className="dashboard-page-analytics">
        <div className='dashboard-analytic'>
          <div className="analytic-heading">
            <p className="analytic-title">Projects Overview</p>
            <button className="analytic-cta">
              <MdArrowOutward size={"20px"} />
            </button>
          </div>
          <div className="analytic-display bg-tertiary">
              <div className='bg-[#fff4d2] text-[orange]'>
                <BsBriefcase size={"25px"} style={{fontWeight: "900"}} />
              </div>
          </div>
          <div className="analytic-details">
            <div className="analytic-detail">
              <span className="analytic-detail-icon bg-[#b72020]"></span>
              <span className="analytic-detail-text">In Progress: 6</span>
            </div>
            <div className="analytic-detail">
              <span className="analytic-detail-icon bg-green-500"></span>
              <span className="analytic-detail-text">Completed: 4</span>
            </div>
            <div className="analytic-detail">
              <span className="analytic-detail-icon bg-primary"></span>
              <span className="analytic-detail-text font-semibold">Total: 10</span>
            </div>
          </div>
        </div>
        <div className='dashboard-analytic'>
          <div className="analytic-heading">
            <p className="analytic-title">Categories Overview</p>
            <button className="analytic-cta">
              <MdArrowOutward size={"20px"} />
            </button>
          </div>
          <div className="analytic-display bg-[#e8fff1]">
            <div className='bg-[#ccfcde] text-green-500'>
              <BiCategoryAlt size={"25px"} />
            </div>
          </div>
          <div className="analytic-details">
            <div className="analytic-detail">
              <span className="analytic-detail-icon bg-green-500"></span>
              <span className="analytic-detail-text">Most popular: Personal Projects</span>
            </div>
            <div className="analytic-detail">
              <span className="analytic-detail-icon bg-primary"></span>
              <span className="analytic-detail-text font-semibold">Total: 7</span>
            </div>
          </div>
        </div>
        <div className='dashboard-analytic'>
          <div className="analytic-heading">
            <p className="analytic-title">Stacks Overview</p>
            <button className="analytic-cta">
              <MdArrowOutward size={"20px"} />
            </button>
          </div>
          <div className="analytic-display bg-[#efefff]">
            <div className='bg-[#dbdbfe] text-[#3e3396]'>
              <IoLayersOutline size={"25px"} />
            </div>
          </div>
          <div className="analytic-details">
            <div className="analytic-detail">
              <span className="analytic-detail-icon bg-green-500"></span>
              <span className="analytic-detail-text">Most Used: React</span>
            </div>
            <div className="analytic-detail">
              <span className="analytic-detail-icon bg-[#b72020]"></span>
              <span className="analytic-detail-text">Least used: HTML</span>
            </div>
            <div className="analytic-detail">
              <span className="analytic-detail-icon bg-primary"></span>
              <span className="analytic-detail-text font-semibold">Total: 8</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
