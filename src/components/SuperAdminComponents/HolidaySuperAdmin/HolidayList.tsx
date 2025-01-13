import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '@/api';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from 'sonner';
import { PlusIcon, CalendarIcon } from 'lucide-react';
import { format, isSameDay, isSameMonth } from 'date-fns';
import HolidayForm from './HolidayForm';
import HolidayTable from './HolidayTable';

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
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const holidaysPerPage = 5;

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
    const matchesDate = selectedDate
      ? (isSameDay(holiday.date, selectedDate) || isSameMonth(holiday.date, selectedDate))
      : true;
    return matchesSearch && matchesDate;
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
                {selectedDate ? format(selectedDate, 'PPP') : 'Filter by date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date);
                  setCurrentPage(1);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {selectedDate && (
            <Button variant="ghost" onClick={() => setSelectedDate(undefined)}>
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
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
            {Array.from({ length: Math.ceil(filteredHolidays.length / holidaysPerPage) }, (_, i) => i + 1).map(
              (page) => (
                <PaginationItem key={page}>
                  <PaginationLink 
                    onClick={() => setCurrentPage(page)}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            )}
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredHolidays.length / holidaysPerPage)))}
                className={currentPage === Math.ceil(filteredHolidays.length / holidaysPerPage) ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Holiday</DialogTitle>
            <DialogDescription>
              Enter the details for your new holiday here.
            </DialogDescription>
          </DialogHeader>
          <HolidayForm onSubmit={handleFormSubmit} onCancel={() => setIsFormOpen(false)} />
        </DialogContent>
      </Dialog>

      {selectedHoliday && (
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Holiday</DialogTitle>
              <DialogDescription>
                Make changes to your holiday here.
              </DialogDescription>
            </DialogHeader>
            <HolidayForm 
              holiday={selectedHoliday} 
              onSubmit={(updatedHoliday) => handleEditSubmit({ ...updatedHoliday, id: selectedHoliday.id })} 
              onCancel={() => setIsEditOpen(false)} 
            />
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this holiday? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HolidayList;

