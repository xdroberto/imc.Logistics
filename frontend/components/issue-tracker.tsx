"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { AlertCircle, CheckCircle, Clock } from 'lucide-react'

interface Issue {
  id: number;
  trackingNumber: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  priority: 'Low' | 'Medium' | 'High';
  type: string;
  createdAt: string;
}

export function IssueTracker() {
  const [issues, setIssues] = useState<Issue[]>([])
  const [newIssueCount, setNewIssueCount] = useState(0)

  useEffect(() => {
    // Simulate receiving new issues
    const timer = setInterval(() => {
      const newIssue: Issue = {
        id: issues.length + 1,
        trackingNumber: `SHIP${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        description: "New issue reported by user",
        status: 'Open',
        priority: 'Medium',
        type: ['Delayed Shipment', 'Damaged Package', 'Lost Package', 'Wrong Address'][Math.floor(Math.random() * 4)],
        createdAt: new Date().toISOString(),
      }
      setIssues(prevIssues => [...prevIssues, newIssue])
      setNewIssueCount(prevCount => prevCount + 1)
      toast({
        title: "New Issue Reported",
        description: `A new ${newIssue.type} issue has been reported.`,
      })
    }, 30000) // New issue every 30 seconds for demonstration

    return () => clearInterval(timer)
  }, [issues])

  const handleStatusChange = (id: number, newStatus: 'Open' | 'In Progress' | 'Resolved') => {
    setIssues(issues.map(issue => 
      issue.id === id ? { ...issue, status: newStatus } : issue
    ))
  }

  const handlePriorityChange = (id: number, newPriority: 'Low' | 'Medium' | 'High') => {
    setIssues(issues.map(issue => 
      issue.id === id ? { ...issue, priority: newPriority } : issue
    ))
  }

  const clearNewIssueCount = () => {
    setNewIssueCount(0)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Issue Tracker</CardTitle>
        <CardDescription>Manage and respond to reported shipment issues</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div>
            <Label>Filter by Status</Label>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Search</Label>
            <Input placeholder="Search by tracking number..." />
          </div>
          <Button onClick={clearNewIssueCount}>
            View New Issues ({newIssueCount})
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tracking Number</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {issues.map((issue) => (
              <TableRow key={issue.id}>
                <TableCell>{issue.trackingNumber}</TableCell>
                <TableCell>{issue.type}</TableCell>
                <TableCell>{issue.description}</TableCell>
                <TableCell>
                  <Select defaultValue={issue.status} onValueChange={(value) => handleStatusChange(issue.id, value as 'Open' | 'In Progress' | 'Resolved')}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Open">
                        <Badge variant="destructive">Open</Badge>
                      </SelectItem>
                      <SelectItem value="In Progress">
                        <Badge variant="warning">In Progress</Badge>
                      </SelectItem>
                      <SelectItem value="Resolved">
                        <Badge variant="success">Resolved</Badge>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Select defaultValue={issue.priority} onValueChange={(value) => handlePriorityChange(issue.id, value as 'Low' | 'Medium' | 'High')}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">
                        <Badge variant="secondary">Low</Badge>
                      </SelectItem>
                      <SelectItem value="Medium">
                        <Badge variant="default">Medium</Badge>
                      </SelectItem>
                      <SelectItem value="High">
                        <Badge variant="destructive">High</Badge>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">View Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

