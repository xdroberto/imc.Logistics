import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Truck, AlertTriangle, CheckCircle } from 'lucide-react'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

const getStatColor = (value: number, isPositive: boolean, title: string) => {
  if (title === "En Tránsito") return "text-gray-600"
  if (isPositive) {
    return value > 0 ? "text-green-600" : "text-red-600"
  } else {
    return value > 0 ? "text-red-600" : "text-green-600"
  }
}

const stats = [
  { title: "Total Envíos", value: 1234, change: 20.1, icon: Package, isPositive: true },
  { title: "En Tránsito", value: 145, change: 4.5, icon: Truck, isPositive: false },
  { title: "Problemas Reportados", value: 12, change: -2, icon: AlertTriangle, isPositive: false },
  { title: "Entregados", value: 1089, change: 19, icon: CheckCircle, isPositive: true },
]

const data = [
  { name: "Ene", total: 167 },
  { name: "Feb", total: 190 },
  { name: "Mar", total: 210 },
  { name: "Abr", total: 252 },
  { name: "May", total: 265 },
  { name: "Jun", total: 280 },
]

export function AdminDashboard() {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Panel de Administración</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${getStatColor(stat.change, stat.isPositive, stat.title)}`}>
                {stat.change > 0 ? "+" : ""}{stat.change}% desde {stat.title === "En Tránsito" ? "la semana" : "el mes"} pasado
              </p>
            </CardContent>
          </Card>
        ))}
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
                <Bar dataKey="total" fill="#60a5fa" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Envíos Recientes</CardTitle>
            <CardDescription>
              Se han enviado 34 paquetes este mes.
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

