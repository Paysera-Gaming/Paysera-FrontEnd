"use client";

import * as React from "react";
import { addMonths, addDays, format, subMonths, isBefore, setYear as setYearFn, setMonth as setMonthFn } from "date-fns";
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

  const [startMonth, setStartMonth] = React.useState(date?.from || new Date());
  const [endMonth, setEndMonth] = React.useState(date?.to || new Date());
  const [error, setError] = React.useState<string | null>(null);

  const handleDateSelection = (key: "from" | "to", selectedDate: Date | undefined) => {
    if (key === "from") {
      setDate((prevDate) => ({ ...prevDate, from: selectedDate }));
      setError(null); // Reset error when the start date is changed
    } else if (key === "to") {
      setDate((prevDate) => {
        const newDateRange = { ...prevDate, to: selectedDate };
        if (newDateRange.from && selectedDate && isBefore(selectedDate, newDateRange.from)) {
          setError("End date cannot be earlier than the start date.");
        } else {
          setError(null); // Clear error if dates are valid
        }
        return newDateRange;
      });
    }
  };

  const handleYearChange = (year: number, setMonth: React.Dispatch<React.SetStateAction<Date>>) => {
    setMonth((prevMonth) => (prevMonth ? setYearFn(prevMonth, year) : new Date()));
  };

  const handleMonthChange = (month: number, setMonth: React.Dispatch<React.SetStateAction<Date>>) => {
    setMonth((prevMonth) => (prevMonth ? setMonthFn(prevMonth, month) : new Date()));
  };

  const generateYearOptions = (startYear: number, endYear: number) => {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push(
        <option key={year} value={year}>
          {year}
        </option>
      );
    }
    return years;
  };

  const generateMonthOptions = () => {
    const months = [];
    for (let month = 0; month < 12; month++) {
      months.push(
        <option key={month} value={month}>
          {format(new Date(2021, month), "MMMM")}
        </option>
      );
    }
    return months;
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
            {/* Display the error message once */}
            {error && (
              <div className="text-red-500 text-sm mb-2 text-center col-span-2">
                {error}
              </div>
            )}

            {/* Start Date Section */}
            <div className="relative">
              <div className="flex items-center justify-between mb-2 space-x-2">
                <Button variant="ghost" size="sm" className="p-1" onClick={() => setStartMonth(subMonths(startMonth || new Date(), 1))}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <select
                  className="border rounded p-1"
                  value={startMonth?.getFullYear() || new Date().getFullYear()}
                  onChange={(e) => handleYearChange(Number(e.target.value), setStartMonth)}
                >
                  {generateYearOptions(2020, 2030)}
                </select>
                <select
                  className="border rounded p-1"
                  value={startMonth?.getMonth() || new Date().getMonth()}
                  onChange={(e) => handleMonthChange(Number(e.target.value), setStartMonth)}
                >
                  {generateMonthOptions()}
                </select>
                <Button variant="ghost" size="sm" className="p-1" onClick={() => setStartMonth(addMonths(startMonth || new Date(), 1))}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <Calendar
                mode="single"
                selected={date?.from}
                onSelect={(from) => handleDateSelection("from", from)}
                month={startMonth || new Date()}
                onMonthChange={setStartMonth}
                classNames={{
                  root: "border rounded-md shadow-sm bg-white",
                  month: "p-2 relative",
                  caption: "text-center font-medium text-sm mb-2 text-gray-600",
                  nav: "hidden", // Hide the built-in nav buttons
                  day: "h-8 w-8 p-0 rounded-full focus:bg-gray-200 focus:text-black hover:bg-gray-100",
                  day_selected: "bg-green-500 text-white rounded-full hover:bg-green-600",
                }}
              />
            </div>

            {/* End Date Section */}
            <div className="relative">
              <div className="flex items-center justify-between mb-2 space-x-2">
                <Button variant="ghost" size="sm" className="p-1" onClick={() => setEndMonth(subMonths(endMonth || new Date(), 1))}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <select
                  className="border rounded p-1"
                  value={endMonth?.getFullYear() || new Date().getFullYear()}
                  onChange={(e) => handleYearChange(Number(e.target.value), setEndMonth)}
                >
                  {generateYearOptions(2020, 2030)}
                </select>
                <select
                  className="border rounded p-1"
                  value={endMonth?.getMonth() || new Date().getMonth()}
                  onChange={(e) => handleMonthChange(Number(e.target.value), setEndMonth)}
                >
                  {generateMonthOptions()}
                </select>
                <Button variant="ghost" size="sm" className="p-1" onClick={() => setEndMonth(addMonths(endMonth || new Date(), 1))}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <Calendar
                mode="single"
                selected={date?.to}
                onSelect={(to) => handleDateSelection("to", to)}
                month={endMonth || new Date()}
                onMonthChange={setEndMonth}
                classNames={{
                  root: "border rounded-md shadow-sm bg-white",
                  month: "p-2 relative",
                  caption: "text-center font-medium text-sm mb-2 text-gray-600",
                  nav: "hidden", // Hide the built-in nav buttons
                  day: "h-8 w-8 p-0 rounded-full focus:bg-gray-200 focus:text-black hover:bg-gray-100",
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
    