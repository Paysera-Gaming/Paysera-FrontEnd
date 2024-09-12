    import React, { useState, useMemo } from 'react';
    import { useQuery, UseQueryResult } from '@tanstack/react-query';
    import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
    import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
    import { getAttendanceList } from './api';
    import { formatDate, formatTime, calculateWorkTimeTotal } from './utils';
    import { Attendance } from './types';
    import { addDays, format, setYear } from 'date-fns';
    import { Calendar as CalendarIcon } from 'lucide-react';
    import { DateRange } from 'react-day-picker';
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
    
    const DatePickerWithRangeAndYear: React.FC<{ className?: string; onChange: (date: DateRange | undefined, year: number | undefined) => void }> = ({ className, onChange }) => {
      const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(),
        to: new Date(),
      });
      const [selectedYear, setSelectedYear] = useState<number | undefined>(undefined);
      const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
    
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
    
      const handleTodayClick = () => {
        const today = new Date();
        const todayRange = { from: today, to: today };
        setDate(todayRange);
        setCurrentMonth(today);
        onChange(todayRange, selectedYear);
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
                <Button variant="outline" onClick={handleTodayClick}>
                  Today
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Filter by Year</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Years</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {[2022, 2023, 2024, 2025, 2026].map((year) => (
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
    
    const AttendanceList: React.FC = () => {
      const { data: attendanceList, isLoading, error }: UseQueryResult<Attendance[], Error> = useQuery({
        queryKey: ['attendanceList'],
        queryFn: getAttendanceList,
        refetchInterval: 5000,
      });
    
      const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: new Date(),
        to: new Date(),
      });
    
      const [selectedYear, setSelectedYear] = useState<number | undefined>(undefined);
    
      const handleDateRangeAndYearChange = (date: DateRange | undefined, year: number | undefined) => {
        setDateRange(date);
        setSelectedYear(year);
      };
    
      const filteredAttendanceList = useMemo(() => {
        if (!attendanceList) return attendanceList;
        return attendanceList.filter((attendance) => {
          const attendanceDate = new Date(attendance.date);
          const matchesDateRange = dateRange?.from && dateRange?.to ? attendanceDate >= dateRange.from && attendanceDate <= addDays(dateRange.to, 1) : true;
          const matchesYear = selectedYear && !dateRange ? attendanceDate.getFullYear() === selectedYear : true;
          return matchesDateRange && matchesYear;
        });
      }, [attendanceList, dateRange, selectedYear]);
    
      const columns: ColumnDef<Attendance>[] = [
        {
          accessorKey: 'employee.firstName',
          header: 'First Name',
        },
        {
          accessorKey: 'employee.lastName',
          header: 'Last Name',
        },
        {
          accessorKey: 'date',
          header: 'Date',
          cell: ({ row }) => formatDate(row.original.date),
        },
        {
          accessorKey: 'status',
          header: 'Status',
        },
        {
          accessorKey: 'scheduleType',
          header: 'Schedule Type',
        },
        {
          accessorKey: 'timeIn',
          header: 'Time In',
          cell: ({ row }) => formatTime(row.original.timeIn),
        },
        {
          accessorKey: 'lunchTimeIn',
          header: 'Lunch Time In',
          cell: ({ row }) => formatTime(row.original.lunchTimeIn),
        },
        {
          accessorKey: 'lunchTimeOut',
          header: 'Lunch Time Out',
          cell: ({ row }) => formatTime(row.original.lunchTimeOut),
        },
        {
          accessorKey: 'timeHoursWorked',
          header: 'Work Time Total',
          cell: ({ row }) => calculateWorkTimeTotal(row.original.timeIn, row.original.timeOut, row.original.lunchTimeTotal),
        },
        {
          accessorKey: 'lunchTimeTotal',
          header: 'Lunch Time Total',
        },
        {
          accessorKey: 'timeOut',
          header: 'Time Out',
          cell: ({ row }) => formatTime(row.original.timeOut),
        },
        {
          accessorKey: 'overTimeTotal',
          header: 'Overtime Total',
        },
        {
          accessorKey: 'timeTotal',
          header: 'Total Time',
        },
      ];
    
      const table = useReactTable({
        data: filteredAttendanceList || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
      });
    
      if (isLoading) return <div>Loading...</div>;
      if (error) return <div>Error loading attendance list</div>;
    
      const formattedFromDate = dateRange?.from ? format(dateRange.from, "LLL dd, y") : "N/A";
      const formattedToDate = dateRange?.to ? format(dateRange.to, "LLL dd, y") : "N/A";
    
      return (
        <div className="w-full">
          <DatePickerWithRangeAndYear className="mb-4" onChange={handleDateRangeAndYearChange} />
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {!dateRange?.from || !dateRange?.to ? (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center text-gray-500">
                      Please select a start date and end date to view attendance records.
                    </TableCell>
                  </TableRow>
                ) : table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center text-gray-500">
                      No employee attendance records found for {formattedFromDate} to {formattedToDate}.<br />
                      Please select a different date range to view previous attendance records.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      );
    };
    
    export default AttendanceList;