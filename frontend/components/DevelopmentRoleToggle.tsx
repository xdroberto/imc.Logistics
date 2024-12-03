'use client'

import { useDevelopmentRole } from '../contexts/DevelopmentRoleContext'
import { Button } from "@/components/ui/button"

export function DevelopmentRoleToggle() {
  const { role, toggleRole } = useDevelopmentRole()

  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button onClick={toggleRole} variant="outline">
        Current Role: {role === 'admin' ? 'Admin' : 'Requester'}
      </Button>
    </div>
  )
}

