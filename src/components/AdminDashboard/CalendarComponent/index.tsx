import * as React from "react";
import { useState } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";

export function CalendarComponent({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const [selected, setSelected] = useState<DateRange | undefined>({ from: new Date(), to: undefined });
  const [month, setMonth] = useState(new Date());

  const years = Array.from({ length: 11 }, (_, i) => new Date().getFullYear() - 5 + i);
  const months = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString("default", { month: "short" }));

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = Number(event.target.value);
    setMonth(new Date(newYear, month.getMonth()));
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = Number(event.target.value);
    setMonth(new Date(month.getFullYear(), newMonth));
  };

  const setToday = () => {
    const today = new Date();
    setMonth(today);
    setSelected({ from: today, to: undefined });
  };

  return (
    <div className={`grid gap-1 ${className}`}>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start text-left font-normal text-sm px-2 py-1">
            <CalendarIcon className="mr-1 h-4 w-4" />
            {selected?.from ? (
              selected.to ? (
                `Start: ${format(selected.from, "MMM dd, y")} - End: ${format(selected.to, "MMM dd, y")}`
              ) : (
                `Start: ${format(selected.from, "MMM dd, y")}`
              )
            ) : (
              <span>Select Date Range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-2 bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-1">
                <select
                  value={month.getFullYear()}
                  onChange={handleYearChange}
                  className="border border-gray-200 rounded-md p-1 text-sm"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <select
                  value={month.getMonth()}
                  onChange={handleMonthChange}
                  className="border border-gray-200 rounded-md p-1 text-sm"
                >
                  {months.map((monthName, index) => (
                    <option key={monthName} value={index}>
                      {monthName}
                    </option>
                  ))}
                </select>
              </div>
              <Button variant="ghost" size="sm" className="p-1 text-sm" onClick={setToday}>
                Today
              </Button>
            </div>
            <DayPicker
              mode="range"
              selected={selected}
              onSelect={setSelected}
              month={month}
              onMonthChange={setMonth}
              modifiersClassNames={{
                selected: "text-sm font-medium text-blue-600 bg-blue-50 rounded-full",
              }}
              className="bg-white p-1"
              styles={{
                day: { height: "1.5rem", lineHeight: "1.5rem" }, // Adjust the height of the calendar days
              }}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
