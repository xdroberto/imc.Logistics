'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

type Role = 'admin' | 'requester'

interface DevelopmentRoleContextType {
  role: Role
  toggleRole: () => void
}

const DevelopmentRoleContext = createContext<DevelopmentRoleContextType | undefined>(undefined)

export function DevelopmentRoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>('requester')

  const toggleRole = () => {
    setRole(prevRole => prevRole === 'admin' ? 'requester' : 'admin')
  }

  return (
    <DevelopmentRoleContext.Provider value={{ role, toggleRole }}>
      {children}
    </DevelopmentRoleContext.Provider>
  )
}

export function useDevelopmentRole() {
  const context = useContext(DevelopmentRoleContext)
  if (context === undefined) {
    throw new Error('useDevelopmentRole must be used within a DevelopmentRoleProvider')
  }
  return context
}

