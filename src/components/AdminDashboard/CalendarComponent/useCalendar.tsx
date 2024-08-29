import * as React from "react";
import { addMonths, subMonths, isBefore, setYear as setYearFn, setMonth as setMonthFn } from "date-fns";
import { DateRange } from "react-day-picker";
import { useState } from "react";
import { formatDate } from "./utils";

export function useCalendar() {
  const [date, setDate] = useState<DateRange | undefined>({ from: new Date(), to: new Date() });
  const [startMonth, setStartMonth] = useState(date?.from || new Date());
  const [endMonth, setEndMonth] = useState(date?.to || new Date());
  const [error, setError] = useState<string | null>(null);

  const handleDateSelection = (key: "from" | "to", selectedDate: Date | undefined) => {
    if (key === "from") {
      setDate((prevDate) => ({ ...prevDate, from: selectedDate }));
      setError(null);
    } else if (key === "to") {
      setDate((prevDate) => {
        const newDateRange = { ...prevDate, to: selectedDate };
        if (newDateRange.from && selectedDate && isBefore(selectedDate, newDateRange.from)) {
          setError("End date cannot be earlier than the start date.");
        } else {
          setError(null);
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
          {formatDate(new Date(2021, month), "MMMM")}
        </option>
      );
    }
    return months;
  };

  const handleSetToday = () => {
    const today = new Date();
    setDate({ from: today, to: today });
    setStartMonth(today);
    setEndMonth(today);
    setError(null);
  };

  return {
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
  };
}
