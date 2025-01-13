import React from 'react';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getAttendanceList } from './api';
import { Attendance } from './types';
import DateRangePicker from './DateRangePicker';
import AttendanceTable from './AttendanceTable';
import { exportToCSV } from './exportToCSV';
import { Button } from '@/components/ui/button';
import AttendanceSummaryCards from './AttendanceSummaryCards';
import PaidLeaveForm from './PaidLeaveForm';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useFiltersAndHandlers } from './filtersAndHandlers';
import { calculateCounts } from './countsCalculation';
import { columns } from './columnsDefinition';

const AttendanceList: React.FC = () => {
  const {
    data: attendanceList = [],
  }: UseQueryResult<Attendance[], Error> = useQuery({
    queryKey: ['attendanceList'],
    queryFn: getAttendanceList,
    refetchInterval: false, // Disable polling
  });

  const {
    dateRange,
    activeFilter,
    searchQuery,
    sortOrder,
    statusFilter,
    handleDateRangeAndYearChange,
    handleFilterClick,
    handleSearchChange,
    handleSortOrderChange,
    handleStatusFilterChange,

    filteredAttendanceList = [],
  } = useFiltersAndHandlers(attendanceList);

  const {
    overallCounts = { ongoing: 0, done: 0, paidLeave: 0 },
    fixedCounts = { ongoing: 0, done: 0, paidLeave: 0 },
    SUPER_FLEXICounts = { ongoing: 0, done: 0, paidLeave: 0 },
    flexiCounts = { ongoing: 0, done: 0, paidLeave: 0 },
    overallCount = 0,
    fixedCount = 0,
    SUPER_FLEXICount = 0,
    flexiCount = 0,
  } = calculateCounts(filteredAttendanceList);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="border p-2 rounded mr-2 text-base bg-white dark:bg-transparent dark:text-white dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <DateRangePicker onChange={handleDateRangeAndYearChange} />
        </div>
        <div className="flex items-center">
          <Button
            onClick={() => {
              if (dateRange.from && dateRange.to) {
                exportToCSV(
                  filteredAttendanceList,
                  dateRange as { from: Date; to: Date }
                );
              } else {
                console.error('Date range is not fully defined');
              }
            }}
            className="bg-green-500 text-white mr-4"
          >
            Export to CSV
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="mr-4">Filters</Button>
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
          <PaidLeaveForm />
        </div>
      </div>
      <AttendanceSummaryCards
        key={activeFilter}
        overallCount={overallCount}
        fixedCount={fixedCount}
        SUPER_FLEXICount={SUPER_FLEXICount}
        flexiCount={flexiCount}
        overallCounts={overallCounts}
        fixedCounts={fixedCounts}
        SUPER_FLEXICounts={SUPER_FLEXICounts}
        flexiCounts={flexiCounts}
        activeFilter={activeFilter}
        handleFilterClick={handleFilterClick}
      />
      <AttendanceTable
        data={filteredAttendanceList}
        columns={columns}
        dateRange={dateRange}
        activeFilter={activeFilter}
        searchQuery={searchQuery}
      />
    </div>
  );
};

export default AttendanceList;