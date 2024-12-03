import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Truck, AlertTriangle, CheckCircle, DollarSign } from 'lucide-react'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

const data = [
  {
    name: "Ene",
    total: 167,
  },
  {
    name: "Feb",
    total: 190,
  },
  {
    name: "Mar",
    total: 210,
  },
  {
    name: "Abr",
    total: 252,
  },
  {
    name: "May",
    total: 265,
  },
  {
    name: "Jun",
    total: 280,
  },
]

export function Dashboard() {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Envíos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+20.1% desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Tránsito</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145</div>
            <p className="text-xs text-muted-foreground">+4.5% desde la semana pasada</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Problemas Reportados</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">-2 desde la semana pasada</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entregados</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,089</div>
            <p className="text-xs text-muted-foreground">+19% desde el mes pasado</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Resumen de Envíos</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={data}>
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Envíos Recientes</CardTitle>
            <CardDescription>
              Has enviado 34 paquetes este mes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="flex items-center">
                <Package className="h-9 w-9 text-primary" />
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Envío a María García
                  </p>
                  <p className="text-sm text-muted-foreground">
                    En tránsito
                  </p>
                </div>
                <div className="ml-auto font-medium">SHIP004</div>
              </div>
              <div className="flex items-center">
                <Package className="h-9 w-9 text-primary" />
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Envío a Carlos Rodríguez
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Entregado
                  </p>
                </div>
                <div className="ml-auto font-medium">SHIP003</div>
              </div>
              <div className="flex items-center">
                <Package className="h-9 w-9 text-primary" />
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Envío a Ana Martínez
                  </p>
                  <p className="text-sm text-muted-foreground">
                    En preparación
                  </p>
                </div>
                <div className="ml-auto font-medium">SHIP002</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

