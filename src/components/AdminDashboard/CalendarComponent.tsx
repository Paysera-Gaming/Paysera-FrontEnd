"use client";

import * as React from "react";
import { addMonths, addDays, format, subMonths } from "date-fns";
import { DateRange } from "react-day-picker";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

export function CalendarComponent({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  // State to control the displayed month for each calendar
  const [startMonth, setStartMonth] = React.useState(date?.from || new Date());
  const [endMonth, setEndMonth] = React.useState(date?.to || new Date());

  const handleStartPrevious = () => {
    setStartMonth((prevMonth) => subMonths(prevMonth, 1));
  };

  const handleStartNext = () => {
    setStartMonth((prevMonth) => addMonths(prevMonth, 1));
  };

  const handleEndPrevious = () => {
    setEndMonth((prevMonth) => subMonths(prevMonth, 1));
  };

  const handleEndNext = () => {
    setEndMonth((prevMonth) => addMonths(prevMonth, 1));
  };

  return (
    <div className={`grid gap-2 ${className}`}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal text-sm px-4 py-2"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                `Start Date: ${format(date.from, "LLL dd, y")} - End Date: ${format(
                  date.to,
                  "LLL dd, y"
                )}`
              ) : (
                `Start Date: ${format(date.from, "LLL dd, y")}`
              )
            ) : (
              <span>Select Date Range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="grid grid-cols-2 gap-4 p-4">
            {/* Start Date Section */}
            <div className="relative">
              <div className="flex items-center justify-between mb-2 space-x-2">
                <Button variant="ghost" size="sm" className="p-1" onClick={handleStartPrevious}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h3 className="font-medium text-sm text-center">Start Date</h3>
                <Button variant="ghost" size="sm" className="p-1" onClick={handleStartNext}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <Calendar
                mode="single"
                selected={date?.from}
                onSelect={(from) =>
                  setDate((prevDate) => ({ ...prevDate, from }))
                }
                month={startMonth}
                onMonthChange={setStartMonth}
                classNames={{
                  root: "border rounded-md shadow-sm bg-white",
                  month: "p-2 relative",
                  caption: "text-center font-medium text-sm mb-2 text-gray-600",
                  nav: "hidden", // Hide the built-in nav buttons
                  day: "h-8 w-8 p-0 rounded-full focus:bg-gray-200 focus:text-black hover:bg-gray-100",
                  day_selected:
                    "bg-green-500 text-white rounded-full hover:bg-green-600",
                }}
              />
            </div>

            {/* End Date Section */}
            <div className="relative">
              <div className="flex items-center justify-between mb-2 space-x-2">
                <Button variant="ghost" size="sm" className="p-1" onClick={handleEndPrevious}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h3 className="font-medium text-sm text-center">End Date</h3>
                <Button variant="ghost" size="sm" className="p-1" onClick={handleEndNext}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <Calendar
                mode="single"
                selected={date?.to}
                onSelect={(to) =>
                  setDate((prevDate) => ({ ...prevDate, to }))
                }
                month={endMonth}
                onMonthChange={setEndMonth}
                classNames={{
                  root: "border rounded-md shadow-sm bg-white",
                  month: "p-2 relative",
                  caption: "text-center font-medium text-sm mb-2 text-gray-600",
                  nav: "hidden", // Hide the built-in nav buttons
                  day: "h-8 w-8 p-0 rounded-full focus:bg-gray-200 focus:text-black hover:bg-gray-100",
                  day_selected:
                    "bg-blue-500 text-white rounded-full hover:bg-blue-600",
                }}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
