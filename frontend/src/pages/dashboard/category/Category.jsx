import React from 'react'
import { BreadcrumbNavigation, DashboardTable } from '../../../components'

const Category = () => {
  const prevLinks = [
    {
        to: '/dashboard',
        link: 'Project'
    },
    {
        to: '/dashboard',
        link: 'Categories'
    }
  ];

  const columns = ['category','projects'];
  const tableData = [
    {
        id: Math.floor(Math.random() * 100),
        title: "Personal Projects",
        projects: "3 Projects",
        status: "Active"
    },
    {
        id: Math.floor(Math.random() * 100),
        title: "Landing pages",
        projects: "10 Projects",
        status: "Active"
    },
    {
        id: Math.floor(Math.random() * 100),
        title: "Live Projects",
        projects: "4 Projects",
        status: "INACTIVE"
    },
    {
        id: Math.floor(Math.random() * 100),
        title: "Frontend Projects",
        projects: "16 Projects",
        status: "Active"
    },
    {
        id: Math.floor(Math.random() * 100),
        title: "Personal Projects",
        projects: "3 Projects",
        status: "Active"
    }
  ];
  return (
    <div className='w-full h-full'>
      <BreadcrumbNavigation prevLinks={prevLinks} actionText={'New Category'} pageTitle={'Project Categories'} />
      <div className="dashboard-page-content">
        <DashboardTable columns={columns} tableData={tableData} />
      </div>
      
    </div>
  )
}

export default Category
