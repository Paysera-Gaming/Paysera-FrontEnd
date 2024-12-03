import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '@/api';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';
import { format } from 'date-fns';
import { CalendarIcon, PlusIcon, Edit2, Trash2 } from 'lucide-react';

interface Holiday {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
}

const fetchHolidays = async (): Promise<Holiday[]> => {
  const response = await axiosInstance.get('/api/holidays');
  return response.data;
};

const HolidayList: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: holidays = [] } = useQuery<Holiday[], Error>({
    queryKey: ['holidays'],
    queryFn: fetchHolidays,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedHoliday, setSelectedHoliday] = useState<Holiday | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const addHolidayMutation = useMutation({
    mutationFn: (newHoliday: Omit<Holiday, 'id'>) => axiosInstance.post('/api/holidays', newHoliday),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['holidays'] });
      toast.success('Holiday added successfully!');
    },
  });

  const editHolidayMutation = useMutation({
    mutationFn: (updatedHoliday: Holiday) => axiosInstance.put(`/api/holidays/${updatedHoliday.id}`, updatedHoliday),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['holidays'] });
      toast.success('Holiday updated successfully!');
    },
  });

  const deleteHolidayMutation = useMutation({
    mutationFn: (id: number) => axiosInstance.delete(`/api/holidays/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['holidays'] });
      toast.success('Holiday deleted successfully!');
    },
  });

  const filteredHolidays = holidays.filter((holiday) => {
    const matchesSearch = holiday.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || holiday.status.toLowerCase() === activeFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const handleFormSubmit = (newHoliday: Omit<Holiday, 'id'>) => {
    addHolidayMutation.mutate(newHoliday);
    setIsFormOpen(false);
  };

  const handleEditSubmit = (updatedHoliday: Holiday) => {
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
          placeholder="Search holidays..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={() => setIsFormOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add Holiday
        </Button>
      </div>

      <Tabs value={activeFilter} onValueChange={setActiveFilter}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
      </Tabs>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Status</TableHead>
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
                      {format(holiday.startDate, 'MMM d, yyyy')} - {format(holiday.endDate, 'MMM d, yyyy')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={holiday.status === 'Completed' ? 'secondary' : 'default'}>
                      {holiday.status}
                    </Badge>
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
  onSubmit: (holiday: Omit<Holiday, 'id'>) => void;
  onCancel: () => void;
}

const HolidayForm: React.FC<HolidayFormProps> = ({ holiday, onSubmit, onCancel }) => {
  const [name, setName] = useState(holiday?.name || '');
  const [startDate, setStartDate] = useState<Date | undefined>(holiday?.startDate);
  const [endDate, setEndDate] = useState<Date | undefined>(holiday?.endDate);
  const [status, setStatus] = useState<Holiday['status']>(holiday?.status || 'Upcoming');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && startDate && endDate) {
      onSubmit({ name, startDate, endDate, status });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Holiday Name</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select value={status} onValueChange={(value) => setStatus(value as Holiday['status'])}>
          <SelectTrigger>
            <SelectValue placeholder="Select a status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Upcoming">Upcoming</SelectItem>
            <SelectItem value="Ongoing">Ongoing</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default HolidayList;

