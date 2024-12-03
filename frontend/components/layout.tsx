"use client"

import { useState } from 'react'
import { Bell, Menu, Package, PieChart, DollarSign, AlertTriangle, LogOut, ChevronLeft, ChevronRight, UserIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NotificationMenu } from "./notification-menu"

interface LayoutProps {
  children: React.ReactNode
  userRole: 'admin' | 'requester'
  onViewChange: (view: string) => void
  currentView: string
}

export function Layout({ children, userRole, onViewChange, currentView }: LayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const adminMenuItems = [
    { name: 'Dashboard', icon: PieChart, view: 'home' },
    { name: 'Shipments', icon: Package, view: 'shipments' },
    { name: 'Issues', icon: AlertTriangle, view: 'issues' },
    { name: 'Pricing', icon: DollarSign, view: 'pricing' },
  ]

  const requesterMenuItems = [
    { name: 'Home', icon: PieChart, view: 'home' },
    { name: 'New Request', icon: Package, view: 'newRequest' },
    { name: 'My Shipments', icon: Package, view: 'shipments' },
    { name: 'Report Issue', icon: AlertTriangle, view: 'issues' },
  ]

  const menuItems = userRole === 'admin' ? adminMenuItems : requesterMenuItems

  const handleViewChange = (view: string) => {
    onViewChange(view)
  }

  const NavContent = () => (
    <>
      <div className={cn("px-3 py-2", isCollapsed && "px-2")}>
        <h2 className={cn("mb-2 px-4 text-lg font-semibold tracking-tight", isCollapsed && "sr-only")}>
          Shipment Management
        </h2>
        <div className="space-y-1">
          {menuItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              className={cn(
                "w-full justify-start hover:bg-primary/5",
                isCollapsed && "justify-center",
                currentView === item.view && "bg-primary/10 text-primary hover:bg-primary/15"
              )}
              onClick={() => handleViewChange(item.view)}
            >
              <item.icon className={cn("h-5 w-5", isCollapsed ? "mr-0" : "mr-2")} />
              {!isCollapsed && <span>{item.name}</span>}
            </Button>
          ))}
        </div>
      </div>
    </>
  )

  return (
    <div className="h-screen flex flex-col">
      <header className={cn("px-4 lg:px-6 h-14 flex items-center", userRole === 'admin' ? 'bg-blue-600' : 'bg-green-600')}>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden text-white">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <NavContent />
          </SheetContent>
        </Sheet>
        <h1 className="text-lg font-semibold text-white">
          {userRole === 'admin' ? 'Admin Panel' : 'User Panel'}
        </h1>
        <div className="flex items-center gap-4 ml-auto">
          <NotificationMenu />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="User avatar" />
                  <AvatarFallback><UserIcon className="h-4 w-4" /></AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">John Doe</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    john.doe@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="flex-1 flex overflow-hidden">
        {isDesktop && (
          <aside className={cn(
            "relative border-r bg-gray-100/40 dark:bg-gray-800/40 flex flex-col",
            isCollapsed ? "w-[60px]" : "w-64"
          )}>
            <NavContent />
            <div className="absolute bottom-4 right-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="h-8 w-8"
              >
                {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              </Button>
            </div>
          </aside>
        )}
        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </div>
  )
}

