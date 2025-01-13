import React from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Edit, Trash2 } from 'lucide-react';
import { format, isFuture, isToday } from 'date-fns';
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
  const getStatus = (date: Date) => {
    if (isToday(date)) return "Ongoing";
    if (isFuture(date)) return "Upcoming";
    return "Past";
  };

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
          const status = getStatus(new Date(holiday.date));
          return (
            <TableRow 
              key={holiday.id} 
              className={cn(
                status === "Upcoming" && "bg-primary/10 dark:bg-primary/20",
                status === "Ongoing" && "bg-secondary/10 dark:bg-secondary/20"
              )}
            >
              <TableCell className="font-medium">{holiday.name}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  {format(new Date(holiday.date), 'MMMM d')} {/* Removed the year */}
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={status === "Past" ? "outline" : "default"}
                  className="capitalize"
                >
                  {status}
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