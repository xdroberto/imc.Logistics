import React, { useState } from 'react'
import { Bell } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface Notification {
  id: string;
  title: string;
  description: string;
  isRead: boolean;
  view: string;
}

interface NotificationMenuProps {
  onViewChange: (view: string) => void;
}

export function NotificationMenu({ onViewChange }: NotificationMenuProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', title: 'New shipment created', description: 'Shipment #1234 has been created', isRead: false, view: 'shipments' },
    { id: '2', title: 'Shipment status updated', description: 'Shipment #5678 is now in transit', isRead: false, view: 'shipments' },
    { id: '3', title: 'Issue reported', description: 'A new issue has been reported for shipment #9101', isRead: true, view: 'issues' },
  ])

  const [isOpen, setIsOpen] = useState(false)

  const unreadCount = notifications.filter(n => !n.isRead).length

  const markAsRead = (id: string, view: string) => {
    setNotifications(notifications.filter(n => n.id !== id))
    onViewChange(view)
    setIsOpen(false)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
          )}
          <span className="sr-only">Toggle notifications menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end" forceMount>
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <div className="text-center py-4 text-sm text-muted-foreground">
            No notifications
          </div>
        ) : (
          notifications.map((notification) => (
            <DropdownMenuItem key={notification.id} className="flex flex-col items-start" onSelect={() => markAsRead(notification.id, notification.view)}>
              <div className={cn("text-sm font-medium", !notification.isRead && "text-primary")}>
                {notification.title}
              </div>
              <div className="text-xs text-muted-foreground">{notification.description}</div>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

