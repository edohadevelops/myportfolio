import React from 'react'
import { BreadcrumbNavigation, DashboardTable } from '../../../components'

const Project = () => {
  const prevLinks = [
    {
        to: '/dashboard',
        link: 'Project'
    }
  ]
  const columns = ['project title','category', 'stack', 'date'];
  const tableData = [
    {
        id: Math.floor(Math.random() * 100),
        title: "Fundrise",
        stack: [
          {
            value: "React JS"
          },
          {
            value: "Node JS"
          },
          {
            value: "SQL"
          },
          {
            value: "Tailwind CSS"
          },
        ],
        category: [
          {
            value: "Fullstack "
          },
          {
            value: "Live Project"
          },
          {
            value: "Personal Project"
          }
        ],
        date: "12th February 2025",
        status: "Active"
    },
  ];
  return (
    <div className='w-full h-full'>
      <BreadcrumbNavigation prevLinks={prevLinks} actionText={'New Project'} pageTitle={'Projects'} />
      <div className="dashboard-page-content">
        <DashboardTable columns={columns} tableData={tableData} />
      </div>
    </div>
  )
}

export default Project
