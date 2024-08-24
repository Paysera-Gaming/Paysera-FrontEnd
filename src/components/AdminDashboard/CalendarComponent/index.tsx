"use client";

import * as React from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useCalendar } from "./useCalendar";
import { format } from "date-fns"; // <-- Add this import

export function CalendarComponent({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const {
    date,
    startMonth,
    endMonth,
    error,
    handleSetToday,
    handleDateSelection,
    handleYearChange,
    handleMonthChange,
    generateYearOptions,
    generateMonthOptions,
    setStartMonth,
    setEndMonth,
    subMonths,
    addMonths,
  } = useCalendar();

  return (
    <div className={`grid gap-1 ${className}`}>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start text-left font-normal text-xs px-2 py-1">
            <CalendarIcon className="mr-1 h-3 w-3" />
            {date?.from ? (
              date.to ? (
                `Start: ${format(date.from, "LLL dd, y")} - End: ${format(date.to, "LLL dd, y")}`
              ) : (
                `Start: ${format(date.from, "LLL dd, y")}`
              )
            ) : (
              <span>Select Date Range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="grid grid-cols-2 gap-2 p-2">
            <div className="col-span-2 text-center mb-2">
              <Button onClick={handleSetToday} className="bg-green-500 text-white hover:bg-green-600 text-xs">
                Set Today
              </Button>
            </div>
            {error && (
              <div className="text-red-500 text-xs mb-1 text-center col-span-2">
                {error}
              </div>
            )}
            <div className="relative">
              <div className="flex items-center justify-between mb-1 space-x-1">
                <Button variant="ghost" size="sm" className="p-2" onClick={() => setStartMonth(subMonths(startMonth, 1))}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <select
                  className="border rounded p-1 text-xs"
                  value={startMonth.getFullYear()}
                  onChange={(e) => handleYearChange(Number(e.target.value), setStartMonth)}
                >
                  {generateYearOptions(2020, 2030)}
                </select>
                <select
                  className="border rounded p-1 text-xs"
                  value={startMonth.getMonth()}
                  onChange={(e) => handleMonthChange(Number(e.target.value), setStartMonth)}
                >
                  {generateMonthOptions()}
                </select>
                <Button variant="ghost" size="sm" className="p-2" onClick={() => setStartMonth(addMonths(startMonth, 1))}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <Calendar
                mode="single"
                selected={date?.from}
                onSelect={(from) => handleDateSelection("from", from)}
                month={startMonth}
                onMonthChange={setStartMonth}
                classNames={{
                  root: "border rounded-md shadow-sm bg-white",
                  month: "p-1 relative",
                  caption: "text-center font-medium text-xs mb-1 text-gray-600",
                  nav: "hidden",
                  day: "h-8 w-10 p-1 rounded-full focus:bg-gray-200 focus:text-black hover:bg-gray-100",
                  day_selected: "bg-green-500 text-white rounded-full hover:bg-green-600",
                }}
              />
            </div>
            <div className="relative">
              <div className="flex items-center justify-between mb-1 space-x-1">
                <Button variant="ghost" size="sm" className="p-2" onClick={() => setEndMonth(subMonths(endMonth, 1))}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <select
                  className="border rounded p-1 text-xs"
                  value={endMonth.getFullYear()}
                  onChange={(e) => handleYearChange(Number(e.target.value), setEndMonth)}
                >
                  {generateYearOptions(2020, 2030)}
                </select>
                <select
                  className="border rounded p-1 text-xs"
                  value={endMonth.getMonth()}
                  onChange={(e) => handleMonthChange(Number(e.target.value), setEndMonth)}
                >
                  {generateMonthOptions()}
                </select>
                <Button variant="ghost" size="sm" className="p-2" onClick={() => setEndMonth(addMonths(endMonth, 1))}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <Calendar
                mode="single"
                selected={date?.to}
                onSelect={(to) => handleDateSelection("to", to)}
                month={endMonth}
                onMonthChange={setEndMonth}
                classNames={{
                  root: "border rounded-md shadow-sm bg-white",
                  month: "p-1 relative",
                  caption: "text-center font-medium text-xs mb-1 text-gray-600",
                  nav: "hidden",
                  day: "h-8 w-10 p-1 rounded-full focus:bg-gray-200 focus:text-black hover:bg-gray-100",
                  day_selected: "bg-blue-500 text-white rounded-full hover:bg-blue-600",
                }}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
