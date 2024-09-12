    import React, { useState, useMemo } from 'react';
    import { useQuery, UseQueryResult } from '@tanstack/react-query';
    import { ColumnDef } from '@tanstack/react-table';
    import { getAttendanceList } from './api';
    import { Attendance } from './types';
    import { addDays } from 'date-fns';
    import { DateRange } from 'react-day-picker';
    import DateRangePicker from './DateRangePicker';
    import AttendanceTable from './AttendanceTable';
    import { exportToCSV } from './exportToCSV';
    import { Button } from '@/components/ui/button';
    import { formatDate, formatTime, calculateWorkTimeTotal } from './utils';
    
    const AttendanceList: React.FC = () => {
      const { data: attendanceList, isLoading, error }: UseQueryResult<Attendance[], Error> = useQuery({
        queryKey: ['attendanceList'],
        queryFn: getAttendanceList,
        refetchInterval: 5000,
      });
    
      const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
        from: new Date(),
        to: new Date(),
      });
    
      const [selectedYear, setSelectedYear] = useState<number | undefined>(undefined);
    
      const handleDateRangeAndYearChange = (date: DateRange | undefined, year: number | undefined) => {
        setDateRange({ from: date?.from, to: date?.to });
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
    
      if (isLoading) return <div>Loading...</div>;
      if (error) return <div>Error loading attendance list</div>;
    
      return (
        <div className="w-full">
          <div className="flex justify-between items-center mb-4">
            <DateRangePicker onChange={handleDateRangeAndYearChange} />
            <Button onClick={() => {
              if (dateRange.from && dateRange.to) {
                exportToCSV(filteredAttendanceList || [], dateRange as { from: Date; to: Date });
              } else {
                console.error("Date range is not fully defined");
              }
            }}>Export to CSV</Button>
          </div>
          <AttendanceTable data={filteredAttendanceList || []} columns={columns} dateRange={dateRange} />
        </div>
      );
    };
    
    export default AttendanceList;