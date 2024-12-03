import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package } from 'lucide-react'
import Link from 'next/link'

interface RequesterHomeProps {
  userEmail: string;
  onViewChange: (view: string) => void;
}

function extractNameFromEmail(email: string): string {
  const name = email.split('@')[0];
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function RequesterHome({ userEmail, onViewChange }: RequesterHomeProps) {
  const userName = extractNameFromEmail(userEmail);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Welcome, {userName}</h2>
      
      <Button asChild className="w-full text-lg py-6" onClick={() => onViewChange('newRequest')}>
        <Link href="#">Create New Shipping Request</Link>
      </Button>
      
      <Card>
        <CardHeader>
          <CardTitle>My Recent Shipments</CardTitle>
          <CardDescription>
            Your last 3 shipments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { id: 'SHIP012', recipient: 'John Doe', status: 'In Transit' },
              { id: 'SHIP011', recipient: 'Jane Smith', status: 'Delivered' },
              { id: 'SHIP010', recipient: 'Alice Johnson', status: 'In Preparation' },
            ].map((shipment) => (
              <div key={shipment.id} className="flex items-center">
                <Package className="h-9 w-9 text-primary" />
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Shipment to {shipment.recipient}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {shipment.status}
                  </p>
                </div>
                <div className="ml-auto font-medium">{shipment.id}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Button 
          variant="outline" 
          onClick={() => onViewChange('shipments')}
          className="w-full"
        >
          View All My Shipments
        </Button>
        <Button 
          variant="outline" 
          onClick={() => onViewChange('issues')}
          className="w-full hover:bg-red-500 hover:text-white transition-colors"
        >
          Report an Issue
        </Button>
      </div>
    </div>
  )
}

