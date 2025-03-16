import React, { useState } from 'react';
import { format, setYear } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Checked = boolean | 'indeterminate';

interface DatePickerWithRangeAndYearProps {
  className?: string;
  onChange: (date: DateRange | undefined, year: number | undefined) => void;
}

const DatePickerWithRangeAndYear: React.FC<DatePickerWithRangeAndYearProps> = ({ className, onChange }) => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });
  const [selectedYear, setSelectedYear] = useState<number | undefined>(undefined);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const currentYear = new Date().getFullYear();
  const years = [2022, 2023, 2024, 2025, 2026].filter(year => year <= currentYear);

  const handleSelect = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate);
    onChange(selectedDate, selectedYear);
  };

  const handleYearChange = (checked: Checked, year: number) => {
    if (checked) {
      setSelectedYear(year);
      const newDate = date ? { from: setYear(date.from!, year), to: setYear(date.to!, year) } : undefined;
      setDate(newDate);
      onChange(newDate, year);
    } else {
      setSelectedYear(undefined);
      onChange(date, undefined);
    }
  };

  const handleRefreshClick = () => {
    const today = new Date();
    const todayRange = { from: today, to: today };
    setDate(todayRange);
    setCurrentMonth(today);
    onChange(todayRange, selectedYear);
    window.location.reload(); // Refresh the page
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex justify-between p-2">
            <Button variant="outline" onClick={handleRefreshClick}>
              Today
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Filter by Year</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Years</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {years.map((year) => (
                  <DropdownMenuCheckboxItem
                    key={year}
                    checked={selectedYear === year}
                    onCheckedChange={(checked) => handleYearChange(checked, year)}
                  >
                    {year}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={currentMonth}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePickerWithRangeAndYear;