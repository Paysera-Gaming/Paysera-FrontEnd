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
          <Calendar
            mode="range"
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            classNames={{
              root: "border rounded-md shadow-sm bg-white",
              month: "p-4 relative",
              caption: "text-center font-medium text-lg mb-2",
              nav: "absolute top-4 left-0 right-0 flex items-center justify-between z-10", // Ensure the nav is above other elements
              day: "h-8 w-8 p-0 rounded-full focus:bg-gray-200 focus:text-black hover:bg-gray-100",
              day_selected:
                "bg-green-500 text-white rounded-full hover:bg-green-600",
              day_range_middle:
                "bg-green-200 text-black rounded-full hover:bg-green-300",
            }}
            components={{
              DayContent: (day, dateProps) => (
                <div
                  className={`h-full w-full flex items-center justify-center ${
                    dateProps.selected
                      ? "bg-green-500 text-white"
                      : dateProps.rangeMiddle
                      ? "bg-green-200"
                      : ""
                  }`}
                >
                  {format(day, "d")}
                </div>
              ),
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
