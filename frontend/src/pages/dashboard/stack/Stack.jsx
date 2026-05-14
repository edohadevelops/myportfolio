import React from 'react'
import { BreadcrumbNavigation, DashboardTable } from '../../../components'

const Stack = () => {
  const prevLinks = [
    {
        to: '/dashboard',
        link: 'Project'
    },
    {
        to: '/dashboard',
        link: 'Stack'
    }
  ]
  const columns = ['tech stack','projects'];
  const tableData = [
    {
        id: Math.floor(Math.random() * 100),
        title: "React JS",
        projects: "3 Projects",
        status: "ACTIVE"
    },
    {
        id: Math.floor(Math.random() * 100),
        title: "Node JS",
        projects: "10 Projects",
        status: "ACTIVE"
    },
    {
        id: Math.floor(Math.random() * 100),
        title: "Tailwind CSS",
        projects: "4 Projects",
        status: "INACTIVE"
    },
    {
        id: Math.floor(Math.random() * 100),
        title: "SQL",
        projects: "16 Projects",
        status: "ACTIVE"
    },
    {
        id: Math.floor(Math.random() * 100),
        title: "Mongo DB",
        projects: "3 Projects",
        status: "ACTIVE"
    }
  ];
  return (
    <div className='w-full h-full'>
      <BreadcrumbNavigation prevLinks={prevLinks} actionText={'New Stack'} pageTitle={'Tech Stack'} />
      <div className="dashboard-page-content">
        <DashboardTable columns={columns} tableData={tableData} />
      </div>
    </div>
  )
}

export default Stack
