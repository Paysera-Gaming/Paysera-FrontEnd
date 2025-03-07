import { useState, useMemo } from 'react';
import { DateRange } from 'react-day-picker';
import { Attendance } from './types';
import { formatDate } from './utils';
import { startOfDay, endOfDay } from 'date-fns'; // Add this line

export const useFiltersAndHandlers = (attendanceList: Attendance[] | undefined) => {
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

  return {
    dateRange,
    selectedYear,
    activeFilter,
    searchQuery,
    sortOrder,
    statusFilter,
    handleDateRangeAndYearChange,
    handleFilterClick,
    handleSearchChange,
    handleSortOrderChange,
    handleStatusFilterChange,
    filteredAttendanceList,
  };
};