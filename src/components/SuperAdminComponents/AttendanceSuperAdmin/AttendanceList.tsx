    import React, { useState, useMemo } from 'react';
    import { useQuery, UseQueryResult } from '@tanstack/react-query';
    import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
    import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
    import { getAttendanceList } from './api';
    import { formatDate, formatTime, calculateWorkTimeTotal } from './utils';
    import { Attendance } from './types';
    import { addDays, format } from 'date-fns';
    import { DateRange } from 'react-day-picker';
    import DatePickerWithRangeAndYear from './DatePickerWithRangeAndYear';
    import { Button } from '@/components/ui/button';
    import Papa from 'papaparse';
    
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
    
      const exportToCSV = () => {
        const csvData = filteredAttendanceList?.map((attendance) => ({
          'First Name': attendance.employee.firstName,
          'Last Name': attendance.employee.lastName,
          'Date': formatDate(attendance.date),
          'Status': attendance.status,
          'Schedule Type': attendance.scheduleType,
          'Time In': formatTime(attendance.timeIn),
          'Lunch Time In': formatTime(attendance.lunchTimeIn),
          'Lunch Time Out': formatTime(attendance.lunchTimeOut),
          'Work Time Total': calculateWorkTimeTotal(attendance.timeIn, attendance.timeOut, attendance.lunchTimeTotal),
          'Lunch Time Total': attendance.lunchTimeTotal,
          'Time Out': formatTime(attendance.timeOut),
          'Overtime Total': attendance.overTimeTotal,
          'Total Time': attendance.timeTotal,
        }));
    
        const csv = Papa.unparse(csvData || []);
        const formattedFromDate = dateRange?.from ? format(dateRange.from, "yyyy-MM-dd") : "N/A";
        const formattedToDate = dateRange?.to ? format(dateRange.to, "yyyy-MM-dd") : "N/A";
        const fileName = `attendance_${formattedFromDate}_to_${formattedToDate}.csv`;
    
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
    
      if (isLoading) return <div>Loading...</div>;
      if (error) return <div>Error loading attendance list</div>;
    
      const formattedFromDate = dateRange?.from ? format(dateRange.from, "LLL dd, y") : "N/A";
      const formattedToDate = dateRange?.to ? format(dateRange.to, "LLL dd, y") : "N/A";
    
      return (
        <div className="w-full">
          <div className="flex justify-between items-center mb-4">
            <DatePickerWithRangeAndYear onChange={handleDateRangeAndYearChange} />
            <Button onClick={exportToCSV}>Export to CSV</Button>
          </div>
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