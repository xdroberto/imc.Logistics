"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertCircle } from 'lucide-react'

export function NewRequestForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    office: "",
    sender: "",
    recipient: "",
    notes: ""
  })
  const [errors, setErrors] = useState({
    office: "",
    sender: "",
    recipient: ""
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, office: value }))
    if (errors.office) {
      setErrors(prev => ({ ...prev, office: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {
      office: formData.office ? "" : "Please select an office",
      sender: formData.sender.trim() ? "" : "Sender name is required",
      recipient: formData.recipient.trim() ? "" : "Recipient name is required"
    }
    setErrors(newErrors)
    return Object.values(newErrors).every(error => !error)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setIsConfirmDialogOpen(true)
    }
  }

  const confirmSubmit = async () => {
    setIsConfirmDialogOpen(false)
    setIsSubmitting(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate network delay
      
      // Simulate successful submission
      const requestId = `REQ${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`
      
      toast({
        title: "Request Submitted Successfully",
        description: (
          <div className="mt-2 rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">Request Details:</h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>Request ID: {requestId}</p>
                  <p>Office: {formData.office}</p>
                  <p>Sender: {formData.sender}</p>
                  <p>Recipient: {formData.recipient}</p>
                  <p>Notes: {formData.notes || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        ),
        duration: 5000,
      })
      setFormData({ office: "", sender: "", recipient: "", notes: "" }) // Reset form
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>New Shipping Request</CardTitle>
            <CardDescription>Fill in the basic details for your new shipping request.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="office">Office</Label>
              <Select value={formData.office} onValueChange={handleSelectChange}>
                <SelectTrigger id="office">
                  <SelectValue placeholder="Select office" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="office1">Office 1</SelectItem>
                  <SelectItem value="office2">Office 2</SelectItem>
                  <SelectItem value="office3">Office 3</SelectItem>
                </SelectContent>
              </Select>
              {errors.office && <p className="text-sm text-red-500">{errors.office}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="sender">Sender</Label>
              <Input 
                id="sender" 
                name="sender"
                value={formData.sender}
                onChange={handleInputChange}
                placeholder="Enter sender's name" 
              />
              {errors.sender && <p className="text-sm text-red-500">{errors.sender}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient</Label>
              <Input 
                id="recipient" 
                name="recipient"
                value={formData.recipient}
                onChange={handleInputChange}
                placeholder="Enter recipient's name" 
              />
              {errors.recipient && <p className="text-sm text-red-500">{errors.recipient}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea 
                id="notes" 
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Enter any additional notes or instructions" 
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Submission</DialogTitle>
            <DialogDescription>
              Are you sure you want to submit this shipping request?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <h4 className="text-sm font-medium">Request Details:</h4>
            <ul className="mt-2 text-sm">
              <li><strong>Office:</strong> {formData.office}</li>
              <li><strong>Sender:</strong> {formData.sender}</li>
              <li><strong>Recipient:</strong> {formData.recipient}</li>
              <li><strong>Notes:</strong> {formData.notes || "N/A"}</li>
            </ul>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmDialogOpen(false)}>Cancel</Button>
            <Button onClick={confirmSubmit}>Confirm Submission</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

