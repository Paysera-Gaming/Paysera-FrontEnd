import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sun } from 'lucide-react';
import { format, isFuture, isToday } from 'date-fns';
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  JanuaryIcon,
  FebruaryIcon,
  MarchIcon,
  AprilIcon,
  MayIcon,
  JuneIcon,
  JulyIcon,
  AugustIcon,
  SeptemberIcon,
  OctoberIcon,
  NovemberIcon,
  DecemberIcon
} from './HolidayIcons';

interface Holiday {
  id: number;
  name: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface HolidayTableProps {
  holidays: Holiday[];
}

const monthIcons: { [key: string]: React.FC } = {
  January: JanuaryIcon,
  February: FebruaryIcon,
  March: MarchIcon,
  April: AprilIcon,
  May: MayIcon,
  June: JuneIcon,
  July: JulyIcon,
  August: AugustIcon,
  September: SeptemberIcon,
  October: OctoberIcon,
  November: NovemberIcon,
  December: DecemberIcon,
};

const HolidayTable: React.FC<HolidayTableProps> = ({ holidays }) => {
  const getStatus = (date: Date) => {
    if (isToday(date)) return "Ongoing";
    if (isFuture(date)) return "Upcoming";
    return "Done";
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Holiday Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {holidays.map((holiday) => {
          const status = getStatus(new Date(holiday.date));
          const month = format(new Date(holiday.date), 'MMMM');
          const IconComponent = monthIcons[month] || (() => <Sun className="mr-2 h-4 w-4 text-muted-foreground" />); // Default to Sun icon

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
                  <IconComponent />
                  {format(new Date(holiday.date), 'MMMM d')} {/* Removed the year */}
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={status === "Done" ? "outline" : "default"}
                  className="capitalize"
                >
                  {status}
                </Badge>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default HolidayTable;