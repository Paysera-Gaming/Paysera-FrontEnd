import React from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Edit, Trash2 } from 'lucide-react';
import { format, isFuture } from 'date-fns';
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

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
  const isUpcoming = (date: Date) => isFuture(date);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Holiday Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {holidays.map((holiday) => {
          const upcoming = isUpcoming(new Date(holiday.date));
          return (
            <TableRow 
              key={holiday.id} 
              className={cn(
                upcoming && "bg-primary/10 dark:bg-primary/20"
              )}
            >
              <TableCell className="font-medium">{holiday.name}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  {format(new Date(holiday.date), 'MMMM d, yyyy')}
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={upcoming ? "default" : "outline"}
                  className="capitalize"
                >
                  {upcoming ? "Upcoming" : "Past"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm" onClick={() => onEdit(holiday)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onDelete(holiday)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default HolidayTable;

