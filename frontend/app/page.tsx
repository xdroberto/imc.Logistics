'use client'

import { useState } from 'react'
import { useDevelopmentRole } from '../contexts/DevelopmentRoleContext'
import { Layout } from '../components/layout'
import { AdminDashboard } from '../components/AdminDashboard'
import { RequesterHome } from '../components/RequesterHome'
import { NewRequestForm } from '../components/new-request-form'
import { AdminShipments } from '../components/AdminShipments'
import { IssueTracker } from '../components/issue-tracker'
import { PricingGuide } from '../components/pricing-guide'
import { ReportIssue } from '../components/report-issue'
import { DevelopmentRoleToggle } from '../components/DevelopmentRoleToggle'
import { MyShipments } from '../components/MyShipments'

export default function Home() {
  const devRole = useDevelopmentRole()

  // En producción, esto vendría de tu sistema de autenticación
  const productionRole = 'requester' // o 'admin', dependiendo del usuario autenticado
  const userEmail = 'usuario@ejemplo.com' // Esto vendría de tu sistema de autenticación

  const role = process.env.NODE_ENV === 'development' ? devRole.role : productionRole
  const [currentView, setCurrentView] = useState('home')

  const handleViewChange = (view: string) => {
    setCurrentView(view)
  }

  return (
    <Layout userRole={role} onViewChange={handleViewChange} currentView={currentView}>
      {role === 'admin' && currentView === 'home' && <AdminDashboard />}
      {role === 'admin' && currentView === 'shipments' && <AdminShipments />}
      {role === 'requester' && currentView === 'home' && (
        <RequesterHome 
          userEmail={userEmail} 
          onViewChange={handleViewChange}
        />
      )}
      {currentView === 'newRequest' && role === 'requester' && <NewRequestForm />}
      {currentView === 'shipments' && role === 'requester' && <MyShipments />}
      {currentView === 'issues' && (role === 'admin' ? <IssueTracker /> : <ReportIssue />)}
      {currentView === 'pricing' && role === 'admin' && <PricingGuide />}
      <DevelopmentRoleToggle />
    </Layout>
  )
}

