import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import * as routes from './routes'
import {
  DashboardCategoryPage,
  DashboardProfilePage,
  DashboardProjectPage,
  DashboardStacksPage,
  HomePage,
  LandingPage,
  LoginPage,
  PricingPage,
  ProjectPage,
  RegisterPage
} from '../pages'
import { AdminLayout, ProtectedRoute } from '../components'

const RouterConfig = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to={routes.LANDING} />} />
      <Route path={routes.ENTRY} element={<Navigate to={routes.LANDING} />} />
      <Route path={routes.REGISTER} element={<RegisterPage />} />
      <Route path={routes.LOGIN} element={<LoginPage />} />

      <Route element={<ProtectedRoute Component={AdminLayout} />}>
        <Route path={routes.ADMINHOME}       element={<HomePage />} />
        <Route path={routes.ADMINPROJECTS}   element={<DashboardProjectPage />} />
        <Route path={routes.ADMINCATEGORIES} element={<DashboardCategoryPage />} />
        <Route path={routes.ADMINSTACKS}     element={<DashboardStacksPage />} />
        <Route path={routes.ADMINPROFILE}    element={<DashboardProfilePage />} />
      </Route>

      {/* Public portfolio routes — each pre-selects a track */}
      <Route path={routes.LANDING}           element={<LandingPage />} />
      <Route path="/portfolio/software"      element={<LandingPage initialTrack="software" />} />
      <Route path="/portfolio/teaching"      element={<LandingPage initialTrack="teaching" />} />
      <Route path="/portfolio/data"          element={<LandingPage initialTrack="data" />} />
      <Route path={routes.PUBLIC_PROJECT}    element={<ProjectPage />} />
      <Route path={routes.PRICING}           element={<PricingPage />} />
    </Routes>
  )
}

export default RouterConfig
