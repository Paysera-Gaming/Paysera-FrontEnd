import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/api';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Import Button component
import HolidayTable from './HolidayTable';
import HolidayPagination from './HolidayPagination';
import { useTheme } from '@/components/ThemeProvider/ThemeProvider'; // Corrected import path

interface Holiday {
  id: number;
  name: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface HolidayApiResponse {
  id: number;
  name: string;
  month: string;
  day: number;
  createdAt: string;
  updatedAt: string;
}

const fetchHolidays = async (): Promise<Holiday[]> => {
  const response = await axiosInstance.get('/api/holiday');
  return response.data.map((holiday: HolidayApiResponse) => ({
    ...holiday,
    date: new Date(`${holiday.month} ${holiday.day}, ${new Date().getFullYear()}`),
  }));
};

const HolidayList: React.FC = () => {
  const { data: holidays = [] } = useQuery<Holiday[], Error>({
    queryKey: ['holiday'],
    queryFn: fetchHolidays,
  });

  const { theme } = useTheme(); // Get the current theme

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState<string | undefined>(undefined);
  const holidaysPerPage = 10;

  useEffect(() => {
    const currentMonth = new Date().toLocaleString('default', { month: 'long' }).toUpperCase();
    setSelectedMonth(currentMonth);
  }, []);

  const filteredHolidays = holidays.filter((holiday) => {
    const matchesSearch = holiday.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMonth = selectedMonth
      ? holiday.date.toLocaleString('default', { month: 'long' }).toUpperCase() === selectedMonth
      : true;
    return matchesSearch && matchesMonth;
  });

  const indexOfLastHoliday = currentPage * holidaysPerPage;
  const indexOfFirstHoliday = indexOfLastHoliday - holidaysPerPage;
  const currentHolidays = filteredHolidays.slice(indexOfFirstHoliday, indexOfLastHoliday);

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Search holiday..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedMonth ? selectedMonth : 'Filter by month'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className={`w-auto p-0 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
              <select
                value={selectedMonth}
                onChange={(e) => {
                  setSelectedMonth(e.target.value);
                  setCurrentPage(1);
                }}
                className={`p-2 border rounded ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`} // Apply text color based on theme
              >
                {Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('default', { month: 'long' }).toUpperCase()).map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </PopoverContent>
          </Popover>
          {selectedMonth && (
            <Button variant="ghost" onClick={() => setSelectedMonth(undefined)}>
              Clear filter
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardContent>
          <HolidayTable holidays={currentHolidays} />
        </CardContent>
      </Card>

      {filteredHolidays.length > holidaysPerPage && (
        <HolidayPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalHolidays={filteredHolidays.length}
          holidaysPerPage={holidaysPerPage}
        />
      )}
    </div>
  );
};

export default HolidayList;