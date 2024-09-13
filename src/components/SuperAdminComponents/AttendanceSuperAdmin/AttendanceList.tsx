    "use client"
    
    import * as React from "react"
    import { useState, useMemo } from 'react';
    import { useQuery, UseQueryResult } from '@tanstack/react-query';
    import { ColumnDef } from '@tanstack/react-table';
    import { getAttendanceList } from './api';
    import { Attendance } from './types';
    import { startOfDay, endOfDay } from 'date-fns';
    import { DateRange } from 'react-day-picker';
    import DateRangePicker from './DateRangePicker';
    import AttendanceTable from './AttendanceTable';
    import { exportToCSV } from './exportToCSV';
    import { Button } from '@/components/ui/button';
    import { formatDate, formatTime, calculateWorkTimeTotal } from './utils';
    import AttendanceSummaryCards from './AttendanceSummaryCards';
    import PaidLeaveForm from './PaidLeaveForm'; // Import the PaidLeaveForm
    import {
      DropdownMenu,
      DropdownMenuCheckboxItem,
      DropdownMenuContent,
      DropdownMenuLabel,
      DropdownMenuSeparator,
      DropdownMenuTrigger
    } from "@/components/ui/dropdown-menu"
    
    const AttendanceList: React.FC = () => {
      const { data: attendanceList, isLoading, error }: UseQueryResult<Attendance[], Error> = useQuery({
        queryKey: ['attendanceList'],
        queryFn: getAttendanceList,
        refetchInterval: 5000,
      });
    
      const today = new Date();
      const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
        from: startOfDay(today),
        to: endOfDay(today),
      });
    
      const [selectedYear, setSelectedYear] = useState<number | undefined>(today.getFullYear());
      const [activeFilter, setActiveFilter] = useState<string>('overall');
      const [searchQuery, setSearchQuery] = useState<string>('');
      const [sortOrder, setSortOrder] = useState<'oldest' | 'latest'>('latest');
      const [statusFilter, setStatusFilter] = useState<string>('all');
    
      const handleDateRangeAndYearChange = (date: DateRange | undefined, year: number | undefined) => {
        setDateRange({ from: date?.from, to: date?.to });
        setSelectedYear(year);
      };
    
      const handleFilterClick = (filter: string) => {
        setActiveFilter(filter);
      };
    
      const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
      };
    
      const handleSortOrderChange = (value: 'oldest' | 'latest') => {
        setSortOrder(value);
      };
    
      const handleStatusFilterChange = (value: string) => {
        setStatusFilter(value);
      };
    
      const filteredAttendanceList = useMemo(() => {
        if (!attendanceList) return attendanceList;
        let filteredList = attendanceList.filter((attendance) => {
          const attendanceDate = new Date(attendance.date);
          const matchesDateRange = dateRange?.from && dateRange?.to ? attendanceDate >= dateRange.from && attendanceDate <= dateRange.to : true;
          const matchesYear = selectedYear && !dateRange ? attendanceDate.getFullYear() === selectedYear : true;
          const matchesFilter = activeFilter === 'overall' || attendance.scheduleType === activeFilter.toUpperCase();
          const matchesSearchQuery = searchQuery
            ? attendance.employee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
              attendance.employee.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
              formatDate(attendance.date).toLowerCase().includes(searchQuery.toLowerCase()) ||
              attendance.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
              attendance.scheduleType.toLowerCase().includes(searchQuery.toLowerCase())
            : true;
          const matchesStatusFilter = statusFilter === 'all' || attendance.status === statusFilter.toUpperCase();
          return matchesDateRange && matchesYear && matchesFilter && matchesSearchQuery && matchesStatusFilter;
        });
    
        if (sortOrder === 'oldest') {
          filteredList = filteredList.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        } else {
          filteredList = filteredList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        }
    
        return filteredList;
      }, [attendanceList, dateRange, selectedYear, activeFilter, searchQuery, sortOrder, statusFilter]);
    
      const countStatus = (list: Attendance[], status: string) => list.filter(a => a.status === status).length;
    
      const overallCounts = {
        ongoing: countStatus(filteredAttendanceList || [], 'ONGOING'),
        break: countStatus(filteredAttendanceList || [], 'BREAK'),
        done: countStatus(filteredAttendanceList || [], 'DONE'),
        paidLeave: countStatus(filteredAttendanceList || [], 'PAID_LEAVE'),
      };
    
      const fixedCounts = {
        ongoing: countStatus(filteredAttendanceList?.filter(a => a.scheduleType === 'FIXED') || [], 'ONGOING'),
        break: countStatus(filteredAttendanceList?.filter(a => a.scheduleType === 'FIXED') || [], 'BREAK'),
        done: countStatus(filteredAttendanceList?.filter(a => a.scheduleType === 'FIXED') || [], 'DONE'),
        paidLeave: countStatus(filteredAttendanceList?.filter(a => a.scheduleType === 'FIXED') || [], 'PAID_LEAVE'),
      };
    
      const SUPER_FLEXICounts = {
        ongoing: countStatus(filteredAttendanceList?.filter(a => a.scheduleType === 'SUPER_FLEXI') || [], 'ONGOING'),
        break: countStatus(filteredAttendanceList?.filter(a => a.scheduleType === 'SUPER_FLEXI') || [], 'BREAK'),
        done: countStatus(filteredAttendanceList?.filter(a => a.scheduleType === 'SUPER_FLEXI') || [], 'DONE'),
        paidLeave: countStatus(filteredAttendanceList?.filter(a => a.scheduleType === 'SUPER_FLEXI') || [], 'PAID_LEAVE'),
      };
    
      const flexiCounts = {
        ongoing: countStatus(filteredAttendanceList?.filter(a => a.scheduleType === 'FLEXI') || [], 'ONGOING'),
        break: countStatus(filteredAttendanceList?.filter(a => a.scheduleType === 'FLEXI') || [], 'BREAK'),
        done: countStatus(filteredAttendanceList?.filter(a => a.scheduleType === 'FLEXI') || [], 'DONE'),
        paidLeave: countStatus(filteredAttendanceList?.filter(a => a.scheduleType === 'FLEXI') || [], 'PAID_LEAVE'),
      };
    
      const overallCount = filteredAttendanceList?.length || 0;
      const fixedCount = filteredAttendanceList?.filter(a => a.scheduleType === 'FIXED').length || 0;
      const SUPER_FLEXICount = filteredAttendanceList?.filter(a => a.scheduleType === 'SUPER_FLEXI').length || 0;
      const flexiCount = filteredAttendanceList?.filter(a => a.scheduleType === 'FLEXI').length || 0;
    
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
          accessorKey: 'timeOut',
          header: 'Time Out',
          cell: ({ row }) => formatTime(row.original.timeOut),
        },
        {
          accessorKey: 'lunchTimeTotal',
          header: 'Lunch Time Total',
        },
        {
          accessorKey: 'timeHoursWorked',
          header: 'Work Time Total',
          cell: ({ row }) => calculateWorkTimeTotal(row.original.timeIn, row.original.timeOut, row.original.lunchTimeTotal),
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
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="border p-1 rounded mr-2 text-sm bg-white dark:bg-transparent dark:text-white dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <DateRangePicker onChange={handleDateRangeAndYearChange} />
            </div>
            <div className="flex items-center">
              <Button
                onClick={() => {
                  if (dateRange.from && dateRange.to) {
                    exportToCSV(filteredAttendanceList || [], dateRange as { from: Date; to: Date });
                  } else {
                    console.error("Date range is not fully defined");
                  }
                }}
                className="bg-green-500 text-white mr-2"
              >
                Export to CSV
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Filters</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Sort Order</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={sortOrder === 'latest'}
                    onCheckedChange={() => handleSortOrderChange('latest')}
                  >
                    Latest
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={sortOrder === 'oldest'}
                    onCheckedChange={() => handleSortOrderChange('oldest')}
                  >
                    Oldest
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Status Filter</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={statusFilter === 'all'}
                    onCheckedChange={() => handleStatusFilterChange('all')}
                  >
                    All
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={statusFilter === 'ONGOING'}
                    onCheckedChange={() => handleStatusFilterChange('ONGOING')}
                  >
                    Ongoing
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={statusFilter === 'BREAK'}
                    onCheckedChange={() => handleStatusFilterChange('BREAK')}
                  >
                    Break
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={statusFilter === 'DONE'}
                    onCheckedChange={() => handleStatusFilterChange('DONE')}
                  >
                    Done
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={statusFilter === 'PAID_LEAVE'}
                    onCheckedChange={() => handleStatusFilterChange('PAID_LEAVE')}
                  >
                    Paid Leave
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <PaidLeaveForm /> {/* Use the PaidLeaveForm component */}
            </div>
          </div>
          <AttendanceSummaryCards
            key={activeFilter} // Add key to force re-render
            overallCount={overallCount}
            fixedCount={fixedCount}
            SUPER_FLEXICount={SUPER_FLEXICount} // Updated this line
            flexiCount={flexiCount}
            overallCounts={overallCounts}
            fixedCounts={fixedCounts}
            SUPER_FLEXICounts={SUPER_FLEXICounts} // Updated this line
            flexiCounts={flexiCounts}
            activeFilter={activeFilter}
            handleFilterClick={handleFilterClick}
          />
          <AttendanceTable data={filteredAttendanceList || []} columns={columns} dateRange={dateRange} activeFilter={activeFilter} searchQuery={searchQuery} />
        </div>
      );
    };
    
    export default AttendanceList;