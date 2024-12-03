import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Truck, AlertTriangle, CheckCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function RequesterDashboard() {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Panel de Solicitante</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mis Envíos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">3 en tránsito</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Tránsito</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Llegada estimada: 2 días</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Problemas Reportados</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">En proceso de resolución</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entregados</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Este mes</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Envíos Recientes</CardTitle>
          <CardDescription>
            Tus últimos 3 envíos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="flex items-center">
              <Package className="h-9 w-9 text-primary" />
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  Envío a Juan Pérez
                </p>
                <p className="text-sm text-muted-foreground">
                  En tránsito
                </p>
              </div>
              <div className="ml-auto font-medium">SHIP012</div>
            </div>
            <div className="flex items-center">
              <Package className="h-9 w-9 text-primary" />
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  Envío a Laura Gómez
                </p>
                <p className="text-sm text-muted-foreground">
                  Entregado
                </p>
              </div>
              <div className="ml-auto font-medium">SHIP011</div>
            </div>
            <div className="flex items-center">
              <Package className="h-9 w-9 text-primary" />
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  Envío a Pedro Sánchez
                </p>
                <p className="text-sm text-muted-foreground">
                  En preparación
                </p>
              </div>
              <div className="ml-auto font-medium">SHIP010</div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Button className="w-full">Nuevo Envío</Button>
    </div>
  )
}

