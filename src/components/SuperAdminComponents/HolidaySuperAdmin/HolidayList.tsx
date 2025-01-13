import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '@/api';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from 'sonner';
import { PlusIcon, CalendarIcon } from 'lucide-react';
import HolidayTable from './HolidayTable';
import HolidayDialogs from './HolidayDialogs';
import HolidayPagination from './HolidayPagination';

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
  const queryClient = useQueryClient();
  const { data: holidays = [] } = useQuery<Holiday[], Error>({
    queryKey: ['holiday'],
    queryFn: fetchHolidays,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedHoliday, setSelectedHoliday] = useState<Holiday | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState<string | undefined>(undefined);
  const holidaysPerPage = 5;

  useEffect(() => {
    const currentMonth = new Date().toLocaleString('default', { month: 'long' }).toUpperCase();
    setSelectedMonth(currentMonth);
  }, []);

  const addHolidayMutation = useMutation({
    mutationFn: (newHoliday: Omit<Holiday, 'id' | 'createdAt' | 'updatedAt'>) => {
      const { name, date } = newHoliday;
      const month = date.toLocaleString('default', { month: 'long' }).toUpperCase();
      const day = date.getDate();
      return axiosInstance.post('/api/holiday', { name, month, day });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['holiday'] });
      toast.success('Holiday added successfully!');
    },
  });

  const editHolidayMutation = useMutation({
    mutationFn: (updatedHoliday: Omit<Holiday, 'createdAt' | 'updatedAt'>) => {
      const { id, name, date } = updatedHoliday;
      const month = date.toLocaleString('default', { month: 'long' }).toUpperCase();
      const day = date.getDate();
      return axiosInstance.put(`/api/holiday/${id}`, { name, month, day });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['holiday'] });
      toast.success('Holiday updated successfully!');
    },
  });

  const deleteHolidayMutation = useMutation({
    mutationFn: (id: number) => axiosInstance.delete(`/api/holiday/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['holiday'] });
      toast.success('Holiday deleted successfully!');
    },
  });

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

  const handleFormSubmit = (newHoliday: Omit<Holiday, 'id' | 'createdAt' | 'updatedAt'>) => {
    addHolidayMutation.mutate(newHoliday);
    setIsFormOpen(false);
  };

  const handleEditSubmit = (updatedHoliday: Omit<Holiday, 'createdAt' | 'updatedAt'>) => {
    editHolidayMutation.mutate(updatedHoliday);
    setIsEditOpen(false);
    setSelectedHoliday(null);
  };

  const handleDeleteConfirm = () => {
    if (selectedHoliday) {
      deleteHolidayMutation.mutate(selectedHoliday.id);
      setIsDeleteDialogOpen(false);
      setSelectedHoliday(null);
    }
  };

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
            <PopoverContent className="w-auto p-0">
              <select
                value={selectedMonth}
                onChange={(e) => {
                  setSelectedMonth(e.target.value);
                  setCurrentPage(1);
                }}
                className="p-2 border rounded"
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
        <Button onClick={() => setIsFormOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add Holiday
        </Button>
      </div>

      <Card>
        <CardContent>
          <HolidayTable 
            holidays={currentHolidays} 
            onEdit={(holiday) => {
              setSelectedHoliday(holiday);
              setIsEditOpen(true);
            }} 
            onDelete={(holiday) => {
              setSelectedHoliday(holiday);
              setIsDeleteDialogOpen(true);
            }} 
          />
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

      <HolidayDialogs
        isFormOpen={isFormOpen}
        setIsFormOpen={setIsFormOpen}
        isEditOpen={isEditOpen}
        setIsEditOpen={setIsEditOpen}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        selectedHoliday={selectedHoliday}
        handleFormSubmit={handleFormSubmit}
        handleEditSubmit={handleEditSubmit}
        handleDeleteConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default HolidayList;