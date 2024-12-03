"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon, X } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export interface DatePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  className?: string
}

export function DatePicker({ date, setDate, className }: DatePickerProps) {
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)
  const [calendarDate, setCalendarDate] = React.useState<Date>(date || new Date())

  // Reset calendar date when popover closes
  React.useEffect(() => {
    if (!isPopoverOpen) {
      setCalendarDate(date || new Date())
    }
  }, [isPopoverOpen, date])

  const handleYearChange = (year: string) => {
    const newDate = new Date(calendarDate)
    newDate.setFullYear(parseInt(year))
    setCalendarDate(newDate)
  }

  const handleMonthChange = (month: string) => {
    const newDate = new Date(calendarDate)
    newDate.setMonth(parseInt(month) - 1)
    setCalendarDate(newDate)
  }

  const clearDate = (e: React.MouseEvent) => {
    e.stopPropagation()
    setDate(undefined)
    setIsPopoverOpen(false)
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? (
              <>
                {format(date, "PPP")}
                <X 
                  className="ml-auto h-4 w-4 opacity-50 hover:opacity-100" 
                  onClick={clearDate}
                />
              </>
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex justify-between p-3">
            <Select
              value={calendarDate.getFullYear().toString()}
              onValueChange={handleYearChange}
            >
              <SelectTrigger className="w-[110px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i).map(
                  (year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
            <Select
              value={(calendarDate.getMonth() + 1).toString()}
              onValueChange={handleMonthChange}
            >
              <SelectTrigger className="w-[110px]">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                  <SelectItem key={month} value={month.toString()}>
                    {format(new Date(2000, month - 1, 1), "MMMM")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Calendar
            mode="single"
            selected={date}
            month={calendarDate}
            onMonthChange={setCalendarDate}
            onSelect={(newDate) => {
              setDate(newDate)
              if (newDate) setCalendarDate(newDate)
              setIsPopoverOpen(false)
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

