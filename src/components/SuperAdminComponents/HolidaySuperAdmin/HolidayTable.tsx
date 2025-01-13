import React from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarIcon, Edit2, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

interface Holiday {
  id: number;
  name: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface HolidayTableProps {
  holidays: Holiday[];
  onEdit: (holiday: Holiday) => void;
  onDelete: (holiday: Holiday) => void;
}

const HolidayTable: React.FC<HolidayTableProps> = ({ holidays, onEdit, onDelete }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {holidays.map((holiday) => (
          <TableRow key={holiday.id}>
            <TableCell>{holiday.name}</TableCell>
            <TableCell>
              <div className="flex items-center">
                <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                {format(new Date(holiday.date), 'MMMM d')}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => onEdit(holiday)}>
                  <Edit2 size={16} className="mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" onClick={() => onDelete(holiday)}>
                  <Trash2 size={16} className="mr-2" />
                  Delete
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default HolidayTable;