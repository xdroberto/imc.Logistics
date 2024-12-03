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
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, RotateCcw, Search, MessageCircle } from 'lucide-react'
import { toast } from "@/components/ui/use-toast"
import { formatDate } from '../utils/conventions'
import { DatePicker } from "@/components/ui/date-picker"
import { isSameDay, parseISO } from "date-fns"

type ShipmentStatus = "In Preparation" | "In Transit" | "Delivered" | "Problematic"

interface Comment {
  id: string;
  text: string;
  date: string;
  author: string;
}

interface Shipment {
  id: string;
  sender: string;
  recipient: string;
  status: ShipmentStatus;
  date: string;
  hasIssue: boolean;
  comments: Comment[];
  office: string; // Added office field
}

const initialShipments: Shipment[] = [
  { id: "SHIP001", sender: "John Doe", recipient: "Jane Smith", status: "In Transit", date: "2023-06-01", hasIssue: false, comments: [], office: "office1" },
  { id: "SHIP002", sender: "Alice Johnson", recipient: "Bob Williams", status: "Delivered", date: "2023-05-28", hasIssue: false, comments: [{ id: "COM001", text: "Delivered on time", date: "2023-05-28", author: "Delivery Agent" }], office: "office2" },
  { id: "SHIP003", sender: "Charlie Brown", recipient: "Lucy Van Pelt", status: "In Preparation", date: "2023-06-02", hasIssue: true, comments: [
    { id: "COM001", text: "Package has visible damage", date: "2023-06-02", author: "Charlie Brown" }
  ], office: "office3" },
  { id: "SHIP004", sender: "David Miller", recipient: "Emma Davis", status: "In Transit", date: "2023-05-30", hasIssue: false, comments: [], office: "office1" },
  { id: "SHIP005", sender: "Frank Wilson", recipient: "Grace Taylor", status: "Problematic", date: "2023-05-25", hasIssue: true, comments: [
    { id: "COM002", text: "Incorrect delivery address", date: "2023-05-26", author: "Grace Taylor" },
    { id: "COM003", text: "Address corrected, shipment will resume tomorrow", date: "2023-05-27", author: "Customer Service" }
  ], office: "office2" },
]

export function AdminShipments() {
  const [shipments, setShipments] = useState<Shipment[]>(initialShipments)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<ShipmentStatus | "All">("All")
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isNewShipmentOpen, setIsNewShipmentOpen] = useState(false)
  const [isAddCommentOpen, setIsAddCommentOpen] = useState(false)
  const [newShipment, setNewShipment] = useState<Omit<Shipment, 'id' | 'date' | 'hasIssue' | 'comments'>>({ 
    sender: "", 
    recipient: "", 
    status: "In Preparation",
    office: "" // Nuevo campo
  })
  const [newComment, setNewComment] = useState("")
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

  const getStatusBadge = (status: ShipmentStatus, hasIssue: boolean) => {
    if (hasIssue) {
      return <Badge className="bg-red-500 hover:bg-red-600 text-white">Problematic</Badge>
    }
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

  const handleUpdateStatus = (id: string, newStatus: ShipmentStatus) => {
    const updatedShipments = shipments.map(shipment => 
      shipment.id === id ? { ...shipment, status: newStatus, hasIssue: newStatus === "Problematic" } : shipment
    )
    setShipments(updatedShipments)
    toast({
      title: "Status updated",
      description: `Shipment ${id} has been updated to ${newStatus}.`,
    })
  }

  const handleDeleteShipment = () => {
    if (selectedShipment) {
      const updatedShipments = shipments.filter(shipment => shipment.id !== selectedShipment.id)
      setShipments(updatedShipments)
      setIsDeleteOpen(false)
      toast({
        title: "Shipment deleted",
        description: `Shipment ${selectedShipment.id} has been deleted.`,
        variant: "destructive",
      })
    }
  }

  const handleCreateNewShipment = () => {
    const lastId = parseInt(shipments[shipments.length - 1].id.slice(4))
    const newId = `SHIP${String(lastId + 1).padStart(3, '0')}`
    const currentDate = new Date().toISOString().split('T')[0] // Format: YYYY-MM-DD
    const newShipmentWithId: Shipment = { 
      ...newShipment, 
      id: newId, 
      date: currentDate,
      hasIssue: false,
      comments: []
    }
    setShipments([...shipments, newShipmentWithId])
    setIsNewShipmentOpen(false)
    setNewShipment({ sender: "", recipient: "", status: "In Preparation", office: "" })
    toast({
      title: "New shipment created",
      description: `Shipment ${newId} has been created.`,
    })
  }

  const handleAddComment = () => {
    if (selectedShipment && newComment.trim() !== "") {
      const newCommentObj: Comment = {
        id: `COM${String(selectedShipment.comments.length + 1).padStart(3, '0')}`,
        text: newComment,
        date: formatDate(new Date()),
        author: "Admin" // In a real implementation, this would come from the authenticated user
      }
      const updatedShipment = {
        ...selectedShipment,
        comments: [...selectedShipment.comments, newCommentObj]
      }
      setShipments(shipments.map(shipment => 
        shipment.id === selectedShipment.id ? updatedShipment : shipment
      ))
      setNewComment("")
      setIsAddCommentOpen(false)
      toast({
        title: "Comment added",
        description: `A new comment has been added to shipment ${selectedShipment.id}.`,
      })
    }
  }

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Shipment Management</h2>
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
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={resetFilters}
            className="sm:hidden flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
          <Button onClick={() => setIsNewShipmentOpen(true)}>New Shipment</Button>
        </div>
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
                <TableHead>Sender</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead className="w-[120px]">Status</TableHead>
                <TableHead className="w-[120px]">Date</TableHead>
                <TableHead className="w-[80px]">Comments</TableHead>
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentShipments.map((shipment) => (
                <TableRow key={shipment.id}>
                  <TableCell className="font-medium">{shipment.id}</TableCell>
                  <TableCell>{shipment.sender}</TableCell>
                  <TableCell>{shipment.recipient}</TableCell>
                  <TableCell>
                    <Select defaultValue={shipment.status} onValueChange={(value) => handleUpdateStatus(shipment.id, value as ShipmentStatus)}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue>{getStatusBadge(shipment.status, shipment.hasIssue)}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="In Preparation">
                          {getStatusBadge("In Preparation", false)}
                        </SelectItem>
                        <SelectItem value="In Transit">
                          {getStatusBadge("In Transit", false)}
                        </SelectItem>
                        <SelectItem value="Delivered">
                          {getStatusBadge("Delivered", false)}
                        </SelectItem>
                        <SelectItem value="Problematic">
                          {getStatusBadge("Problematic", true)}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{formatDate(shipment.date)}</TableCell>
                  <TableCell>
                    {shipment.comments.length > 0 ? (
                      <MessageCircle className="h-5 w-5 text-blue-500" />
                    ) : (
                      <MessageCircle className="h-5 w-5 text-gray-300" />
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(shipment.id)}>
                          Copy ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => {
                          setSelectedShipment(shipment)
                          setIsDetailsOpen(true)
                        }}>
                          View details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          setSelectedShipment(shipment)
                          setIsAddCommentOpen(true)
                        }}>
                          Add comment
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          setSelectedShipment(shipment)
                          setIsDeleteOpen(true)
                        }}>
                          Delete shipment
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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

      {/* View shipment details */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Shipment Details</DialogTitle>
          </DialogHeader>
          {selectedShipment && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="id" className="text-right">
                  ID
                </Label>
                <Input id="id" value={selectedShipment.id} className="col-span-3" readOnly />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="sender" className="text-right">
                  Sender
                </Label>
                <Input id="sender" value={selectedShipment.sender} className="col-span-3" readOnly />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="recipient" className="text-right">
                  Recipient
                </Label>
                <Input id="recipient" value={selectedShipment.recipient} className="col-span-3" readOnly />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Input id="status" value={selectedShipment.status} className="col-span-3" readOnly />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input id="date" value={selectedShipment.date} className="col-span-3" readOnly />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="comments" className="text-right">
                  Comments
                </Label>
                <div className="col-span-3 space-y-2">
                  {selectedShipment.comments.length > 0 ? (
                    selectedShipment.comments.map((comment) => (
                      <div key={comment.id} className="bg-muted p-2 rounded-md">
                        <p className="text-sm font-medium">{comment.author} - {formatDate(comment.date)}</p>
                        <p className="text-sm">{comment.text}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No comments for this shipment.</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="office" className="text-right">
                  Office
                </Label>
                <Input id="office" value={selectedShipment.office} className="col-span-3" readOnly />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete shipment */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Shipment</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete shipment {selectedShipment?.id}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteShipment}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create new shipment */}
      <Dialog open={isNewShipmentOpen} onOpenChange={setIsNewShipmentOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create New Shipment</DialogTitle>
    </DialogHeader>
    <form onSubmit={(e) => {
      e.preventDefault();
      handleCreateNewShipment();
    }}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="office" className="text-right">
            Office
          </Label>
          <Select
            value={newShipment.office}
            onValueChange={(value) => setNewShipment({...newShipment, office: value})}
          >
            <SelectTrigger id="office" className="col-span-3">
              <SelectValue placeholder="Select office" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="office1">Office 1</SelectItem>
              <SelectItem value="office2">Office 2</SelectItem>
              <SelectItem value="office3">Office 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="sender" className="text-right">
            Sender
          </Label>
          <Input
            id="sender"
            value={newShipment.sender}
            onChange={(e) => setNewShipment({...newShipment, sender: e.target.value})}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="recipient" className="text-right">
            Recipient
          </Label>
          <Input
            id="recipient"
            value={newShipment.recipient}
            onChange={(e) => setNewShipment({...newShipment, recipient: e.target.value})}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="status" className="text-right">
            Status
          </Label>
          <Select
            value={newShipment.status}
            onValueChange={(value) => setNewShipment({...newShipment, status: value as ShipmentStatus})}
          >
            <SelectTrigger id="status" className="col-span-3">
              <SelectValue>{newShipment.status}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="In Preparation">In Preparation</SelectItem>
              <SelectItem value="In Transit">In Transit</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
              <SelectItem value="Problematic">Problematic</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={() => setIsNewShipmentOpen(false)}>Cancel</Button>
        <Button type="submit">Create Shipment</Button>
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>

      {/* Add comment */}
      <Dialog open={isAddCommentOpen} onOpenChange={setIsAddCommentOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Comment</DialogTitle>
            <DialogDescription>
              Add a new comment to shipment {selectedShipment?.id}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="comment" className="text-right">
                Comment
              </Label>
              <Textarea
                id="comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddCommentOpen(false)}>Cancel</Button>
            <Button onClick={handleAddComment}>Add Comment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

