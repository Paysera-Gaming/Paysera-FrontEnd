import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { cn } from "@/lib/utils";

export function DatePickerDemo() {
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
        <div className="grid gap-1">
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
                    <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-1">
                                <select
                                    value={month.getFullYear()}
                                    onChange={handleYearChange}
                                    className="border border-gray-200 dark:border-gray-700 rounded-md p-1 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
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
                                    className="border border-gray-200 dark:border-gray-700 rounded-md p-1 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
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
                                selected: "text-sm font-medium text-blue-600 bg-blue-50 dark:bg-blue-900 rounded-full",
                            }}
                            className="bg-white dark:bg-gray-800 p-1"
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