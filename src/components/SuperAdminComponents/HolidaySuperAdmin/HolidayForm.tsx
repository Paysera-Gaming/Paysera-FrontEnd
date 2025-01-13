import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

interface Holiday {
  id: number;
  name: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

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

export default HolidayForm;