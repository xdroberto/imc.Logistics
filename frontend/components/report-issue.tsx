"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2 } from 'lucide-react'

interface FormErrors {
  trackingNumber?: string;
  issueType?: string;
  description?: string;
}

export function ReportIssue() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [issueType, setIssueType] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false)
  const { toast } = useToast()

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    if (!trackingNumber.trim()) {
      newErrors.trackingNumber = "Tracking number is required"
    } else if (!/^[A-Za-z0-9]{6,}$/.test(trackingNumber.trim())) {
      newErrors.trackingNumber = "Invalid tracking number format"
    }

    if (!issueType) {
      newErrors.issueType = "Please select an issue type"
    }

    if (!description.trim()) {
      newErrors.description = "Description is required"
    } else if (description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters long"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setIsSubmitSuccess(false)

    try {
      // Simulate sending to server
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Show success message
      toast({
        title: "Report Submitted",
        description: "Your report has been successfully submitted. We will contact you soon.",
      })

      setIsSubmitSuccess(true)

      // Clear the form
      setTrackingNumber("")
      setIssueType("")
      setDescription("")
      setErrors({})
    } catch (error) {
      // Handle any error that might occur
      toast({
        title: "Error",
        description: "There was a problem submitting your report. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Report an Issue</CardTitle>
          <CardDescription>If you're experiencing any problems with your shipment, please let us know.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isSubmitSuccess && (
            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Your report has been successfully submitted. We will contact you soon.
              </AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="tracking-number">Tracking Number</Label>
            <Input 
              id="tracking-number" 
              placeholder="Enter your shipment tracking number" 
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
            />
            {errors.trackingNumber && <p className="text-sm text-red-500">{errors.trackingNumber}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="issue-type">Issue Type</Label>
            <Select value={issueType} onValueChange={setIssueType}>
              <SelectTrigger id="issue-type">
                <SelectValue placeholder="Select the type of issue" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="delayed">Delayed Shipment</SelectItem>
                <SelectItem value="damaged">Damaged Package</SelectItem>
                <SelectItem value="lost">Lost Package</SelectItem>
                <SelectItem value="wrong-address">Wrong Address</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.issueType && <p className="text-sm text-red-500">{errors.issueType}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              placeholder="Please provide details about the issue" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

