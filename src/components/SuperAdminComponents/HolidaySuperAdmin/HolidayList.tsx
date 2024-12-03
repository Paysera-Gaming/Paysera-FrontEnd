import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '@/api';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';
import { format } from 'date-fns';
import { CalendarIcon, PlusIcon, Edit2, Trash2 } from 'lucide-react';

interface Holiday {
  id: number;
  name: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const fetchHolidays = async (): Promise<Holiday[]> => {
  const response = await axiosInstance.get('/api/holiday');
  return response.data;
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

  const addHolidayMutation = useMutation({
    mutationFn: (newHoliday: Omit<Holiday, 'id' | 'createdAt' | 'updatedAt'>) => axiosInstance.post('/api/holiday', newHoliday),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['holiday'] });
      toast.success('Holiday added successfully!');
    },
  });

  const editHolidayMutation = useMutation({
    mutationFn: (updatedHoliday: Omit<Holiday, 'createdAt' | 'updatedAt'>) => axiosInstance.put(`/api/holiday/${updatedHoliday.id}`, updatedHoliday),
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
    return holiday.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

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
        <Input
          type="text"
          placeholder="Search holiday..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={() => setIsFormOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add Holiday
        </Button>
      </div>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHolidays.map((holiday) => (
                <TableRow key={holiday.id}>
                  <TableCell>{holiday.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                      {format(new Date(holiday.date), 'MMM d, yyyy')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => {
                        setSelectedHoliday(holiday);
                        setIsEditOpen(true);
                      }}>
                        <Edit2 size={16} className="mr-2" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => {
                        setSelectedHoliday(holiday);
                        setIsDeleteDialogOpen(true);
                      }}>
                        <Trash2 size={16} className="mr-2" />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

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

interface HolidayFormProps {
  holiday?: Holiday;
  onSubmit: (holiday: Omit<Holiday, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

const HolidayForm: React.FC<HolidayFormProps> = ({ holiday, onSubmit, onCancel }) => {
  const [name, setName] = useState(holiday?.name || '');
  const [date, setDate] = useState<Date | undefined>(holiday?.date);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && date) {
      onSubmit({ name, date });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Holiday Name</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="date">Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default HolidayList;