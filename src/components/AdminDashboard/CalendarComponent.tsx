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
          <div className="grid grid-cols-2 gap-4 p-4">
            <div>
              <h3 className="text-center font-medium mb-2">Start Date</h3>
              <Calendar
                mode="single"
                selected={date?.from}
                onSelect={(from) =>
                  setDate((prevDate) => ({ ...prevDate, from }))
                }
                classNames={{
                  root: "border rounded-md shadow-sm bg-white",
                  month: "p-4 relative",
                  caption: "text-center font-medium text-lg mb-2",
                  nav: "absolute top-4 left-0 right-0 flex items-center justify-between z-10",
                  day: "h-8 w-8 p-0 rounded-full focus:bg-gray-200 focus:text-black hover:bg-gray-100",
                  day_selected:
                    "bg-green-500 text-white rounded-full hover:bg-green-600",
                }}
              />
            </div>
            <div>
              <h3 className="text-center font-medium mb-2">End Date</h3>
              <Calendar
                mode="single"
                selected={date?.to}
                onSelect={(to) =>
                  setDate((prevDate) => ({ ...prevDate, to }))
                }
                classNames={{
                  root: "border rounded-md shadow-sm bg-white",
                  month: "p-4 relative",
                  caption: "text-center font-medium text-lg mb-2",
                  nav: "absolute top-4 left-0 right-0 flex items-center justify-between z-10",
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
