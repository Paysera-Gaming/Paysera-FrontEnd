"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Calendar as CalendarIcon } from "lucide-react";
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

  return (
    <div className={`grid gap-2 ${className}`}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between text-left font-normal text-sm px-4 py-2 bg-white text-black border-gray-300 shadow-sm rounded-lg hover:bg-gray-50"
          >
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  `${format(date.from, "LLL dd, y")} - ${format(date.to, "LLL dd, y")}`
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Select Date Range</span>
              )}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            classNames={{
              root: "border rounded-md shadow-lg bg-white",
              month: "p-6 relative", 
              caption: "text-center font-semibold text-lg text-gray-700 mb-4", 
              nav: "absolute top-6 left-0 right-0 flex items-center justify-between px-6 z-10", 
              day: "h-8 w-8 p-0 focus:bg-gray-200 focus:text-black rounded-full hover:bg-gray-100", 
              day_selected: "bg-blue-500 text-white rounded-full",
              day_outside: "text-gray-300",
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
