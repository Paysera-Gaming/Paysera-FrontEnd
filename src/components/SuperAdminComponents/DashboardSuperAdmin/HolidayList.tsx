import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import HolidayAndAnnouncement from "./HolidayAndAnnouncement";

type Holiday = {
  id: number;
  name: string;
  month: string;
  day: number;
  createdAt: string;
  updatedAt: string;
};

const fetchHolidays = async (): Promise<Holiday[]> => {
  const response = await fetch(`${import.meta.env.VITE_BASE_API}api/holiday`);
  if (!response.ok) {
    throw new Error("Failed to fetch holidays");
  }
  return response.json();
};

type HolidayListProps = {
  className?: string;
};

export default function HolidayList({ className }: HolidayListProps) {
  const { data: holidays = [], isLoading: isLoadingHolidays } = useQuery<
    Holiday[]
  >({
    queryKey: ["holidays"],
    queryFn: fetchHolidays,
  });

  const [currentMonth, setCurrentMonth] = useState<number | undefined>(
    undefined
  );
  const [nextMonth, setNextMonth] = useState<number | undefined>(undefined);

  useEffect(() => {
    const month = new Date().getMonth(); // getMonth() returns 0 for January, 1 for February, etc.
    setCurrentMonth(month);
    setNextMonth((month + 1) % 12); // Next month, wrap around to January if December
  }, []);

  const sortedHolidays = holidays.sort((a, b) => {
    const monthOrder = (month: string) =>
      new Date(`${month} 1, 2000`).getMonth();
    const monthA = monthOrder(a.month);
    const monthB = monthOrder(b.month);
    return monthA - monthB;
  });

  const currentMonthHolidays = sortedHolidays.filter((holiday) => {
    return new Date(`${holiday.month} 1, 2000}`).getMonth() === currentMonth;
  });

  const nextMonthHolidays = sortedHolidays.filter((holiday) => {
    return new Date(`${holiday.month} 1, 2000}`).getMonth() === nextMonth;
  });

  return (
    <HolidayAndAnnouncement>
      <Card className={`h-full flex flex-col ${className}`}>
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-semibold">
            Upcoming Holidays
          </CardTitle>
          <Calendar size={"1.8rem"} />
        </CardHeader>
        <CardContent className="flex-grow">
          <ScrollArea className="h-[45rem] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-sm">Date</TableHead>
                  <TableHead className="text-sm">Holiday</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoadingHolidays ? (
                  <TableRow>
                    <TableCell colSpan={2} className="text-sm">
                      Loading holidays...
                    </TableCell>
                  </TableRow>
                ) : (
                  <>
                    <TableRow>
                      <TableCell colSpan={2} className="text-lg font-semibold">
                        This Month
                      </TableCell>
                    </TableRow>
                    {currentMonthHolidays.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={2} className="text-sm">
                          No holidays this month
                        </TableCell>
                      </TableRow>
                    ) : (
                      currentMonthHolidays.map((holiday) => (
                        <TableRow key={holiday.id}>
                          <TableCell className="text-sm">{`${holiday.month} ${holiday.day}`}</TableCell>
                          <TableCell className="text-sm">
                            {holiday.name}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                    <TableRow>
                      <TableCell colSpan={2} className="text-lg font-semibold">
                        Next Month
                      </TableCell>
                    </TableRow>
                    {nextMonthHolidays.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={2} className="text-sm">
                          No holidays next month
                        </TableCell>
                      </TableRow>
                    ) : (
                      nextMonthHolidays.map((holiday) => (
                        <TableRow key={holiday.id}>
                          <TableCell className="text-sm">{`${holiday.month} ${holiday.day}`}</TableCell>
                          <TableCell className="text-sm">
                            {holiday.name}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </HolidayAndAnnouncement>
  );
}
