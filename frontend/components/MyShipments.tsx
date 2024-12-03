"use client"

import { useState } from "react"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, RotateCcw, Search, MessageCircle } from 'lucide-react'
import { formatDate } from '../utils/conventions'
import { DatePicker } from "@/components/ui/date-picker"
import { isSameDay, parseISO } from "date-fns"

type ShipmentStatus = "In Preparation" | "In Transit" | "Delivered" | "Problematic"

interface Shipment {
  id: string;
  recipient: string;
  status: ShipmentStatus;
  date: string;
  comments: { id: string; text: string; date: string; author: string; }[];
}

const initialShipments: Shipment[] = [
  { id: "SHIP001", recipient: "John Doe", status: "In Transit", date: "2023-06-01", comments: [] },
  { id: "SHIP002", recipient: "Jane Smith", status: "Delivered", date: "2023-05-28", comments: [{ id: "COM001", text: "Left at front door", date: "2023-05-28", author: "Delivery Agent" }] },
  { id: "SHIP003", recipient: "Alice Johnson", status: "In Preparation", date: "2023-06-02", comments: [] },
  { id: "SHIP004", recipient: "Bob Williams", status: "In Transit", date: "2023-05-30", comments: [{ id: "COM002", text: "Delayed due to weather", date: "2023-05-30", author: "Shipping Company" }] },
  { id: "SHIP005", recipient: "Charlie Brown", status: "Problematic", date: "2023-05-25", comments: [{ id: "COM003", text: "Address unclear", date: "2023-05-25", author: "Shipping Company" }] },
]

export function MyShipments() {
  const [shipments, setShipments] = useState<Shipment[]>(initialShipments)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<ShipmentStatus | "All">("All")
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

  const resetFilters = () => {
    setSearchTerm("")
    setStatusFilter("All")
    setSelectedDate(undefined)
    setCurrentPage(1)
    setItemsPerPage(10)
  }

  const filteredShipments = shipments.filter(shipment => {
    // First check status filter
    if (statusFilter !== "All" && shipment.status !== statusFilter) return false;
    
    // Then check search term
    if (searchTerm && !Object.values(shipment).some(value => 
      typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
    )) return false;
    
    // Finally check date filter
    if (selectedDate) {
      const shipmentDate = parseISO(shipment.date);
      return isSameDay(shipmentDate, selectedDate);
    }
    
    return true;
  });

  const totalPages = Math.ceil(filteredShipments.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentShipments = filteredShipments.slice(startIndex, endIndex)

  const getStatusBadge = (status: ShipmentStatus) => {
    switch (status) {
      case "In Transit":
        return <Badge className="bg-blue-500 hover:bg-blue-600 text-white">{status}</Badge>
      case "Delivered":
        return <Badge className="bg-green-500 hover:bg-green-600 text-white">{status}</Badge>
      case "In Preparation":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">{status}</Badge>
      case "Problematic":
        return <Badge className="bg-red-500 hover:bg-red-600 text-white">{status}</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">My Shipments</h2>
        <Button 
          variant="outline" 
          onClick={resetFilters}
          className="hidden sm:flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Reset Filters
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search shipments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as ShipmentStatus | "All")}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Statuses</SelectItem>
            <SelectItem value="In Preparation">In Preparation</SelectItem>
            <SelectItem value="In Transit">In Transit</SelectItem>
            <SelectItem value="Delivered">Delivered</SelectItem>
            <SelectItem value="Problematic">Problematic</SelectItem>
          </SelectContent>
        </Select>
        <div className="lg:col-span-2">
          <DatePicker
            date={selectedDate}
            setDate={setSelectedDate}
            className="w-full"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Show</span>
          <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
            <SelectTrigger className="w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm font-medium">entries</span>
        </div>
        <Button 
          variant="outline" 
          onClick={resetFilters}
          className="sm:hidden flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </div>

      {currentShipments.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No shipments found matching your criteria.</p>
        </div>
      ) : (
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead className="w-[120px]">Status</TableHead>
                <TableHead className="w-[120px]">Date</TableHead>
                <TableHead className="w-[80px]">Comments</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentShipments.map((shipment) => (
                <TableRow key={shipment.id}>
                  <TableCell className="font-medium">{shipment.id}</TableCell>
                  <TableCell>{shipment.recipient}</TableCell>
                  <TableCell>{getStatusBadge(shipment.status)}</TableCell>
                  <TableCell className="whitespace-nowrap">{formatDate(shipment.date)}</TableCell>
                  <TableCell>
                    {shipment.comments.length > 0 ? (
                      <MessageCircle className="h-5 w-5 text-blue-500" />
                    ) : (
                      <MessageCircle className="h-5 w-5 text-gray-300" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground order-2 sm:order-1">
          Showing {startIndex + 1} to {Math.min(endIndex, filteredShipments.length)} of {filteredShipments.length} entries
        </p>
        <div className="flex items-center space-x-2 order-1 sm:order-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">First page</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </Button>
          <div className="text-sm font-medium mx-2">
            Page {currentPage} of {totalPages || 1}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">Last page</span>
          </Button>
        </div>
      </div>
    </Card>
  )
}

