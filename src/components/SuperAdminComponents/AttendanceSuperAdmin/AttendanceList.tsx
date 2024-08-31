import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Users, Clock, Coffee, UserCheck } from 'lucide-react';
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils"; // Ensure this utility exists or replace it with your own

// Sample data for demonstration
const sampleAttendance = [
    {
        id: 1,
        fullName: 'Doe, John M',
        type: 'Fixed',
        date: '2024-08-31',
        startTime: '09:00 AM',
        endTime: '06:00 PM',
        workHours: 8,
        lunchHours: 1,
        totalHours: 9,
        situation: 'On Job',
    },
    {
        id: 2,
        fullName: 'Smith, Jane A',
        type: 'Flexible',
        date: '2024-08-31',
        startTime: '08:30 AM',
        endTime: '05:30 PM',
        workHours: 7.5,
        lunchHours: 1,
        totalHours: 8.5,
        situation: 'Lunch',
    },
    {
        id: 3,
        fullName: 'Johnson, Emily R',
        type: 'Super Flexible',
        date: '2024-08-31',
        startTime: '10:00 AM',
        endTime: '07:00 PM',
        workHours: 7,
        lunchHours: 1,
        totalHours: 8,
        situation: 'Leave',
    },
];

// DatePickerDemo Component
function DatePickerDemo() {
    const [date, setDate] = useState<Date>();

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
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
    );
}

// AttendanceList Component
export default function AttendanceList() {
    const [attendanceData] = useState(sampleAttendance);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('overall');

    // Filter attendance data based on selected filter and search term
    const filteredAttendance = attendanceData
        .filter((att) => {
            if (activeFilter === 'onJob') {
                return att.situation === 'On Job';
            } else if (activeFilter === 'lunch') {
                return att.situation === 'Lunch';
            } else if (activeFilter === 'leave') {
                return att.situation === 'Leave';
            }
            return true; // Show all records if the overall filter is selected
        })
        .filter((att) =>
            att.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            att.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            att.situation.toLowerCase().includes(searchTerm.toLowerCase())
        );

    // Calculate summary counts
    const overallCount = attendanceData.length;
    const onJobCount = attendanceData.filter((att) => att.situation === 'On Job').length;
    const lunchCount = attendanceData.filter((att) => att.situation === 'Lunch').length;
    const leaveCount = attendanceData.filter((att) => att.situation === 'Leave').length;

    const typeCounts = {
        Fixed: attendanceData.filter((att) => att.type === 'Fixed').length,
        Flexible: attendanceData.filter((att) => att.type === 'Flexible').length,
        'Super Flexible': attendanceData.filter((att) => att.type === 'Super Flexible').length,
    };

    // Calculate counts for each situation type
    const situationTypeCounts = {
        onJob: {
            Fixed: attendanceData.filter((att) => att.situation === 'On Job' && att.type === 'Fixed').length,
            Flexible: attendanceData.filter((att) => att.situation === 'On Job' && att.type === 'Flexible').length,
            'Super Flexible': attendanceData.filter((att) => att.situation === 'On Job' && att.type === 'Super Flexible').length,
        },
        lunch: {
            Fixed: attendanceData.filter((att) => att.situation === 'Lunch' && att.type === 'Fixed').length,
            Flexible: attendanceData.filter((att) => att.situation === 'Lunch' && att.type === 'Flexible').length,
            'Super Flexible': attendanceData.filter((att) => att.situation === 'Lunch' && att.type === 'Super Flexible').length,
        },
        leave: {
            Fixed: attendanceData.filter((att) => att.situation === 'Leave' && att.type === 'Fixed').length,
            Flexible: attendanceData.filter((att) => att.situation === 'Leave' && att.type === 'Flexible').length,
            'Super Flexible': attendanceData.filter((att) => att.situation === 'Leave' && att.type === 'Super Flexible').length,
        }
    };

    return (
        <div className="p-4 space-y-4">
            <div className="flex items-center gap-2 mb-4">
                <Input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-xs"
                />
                <DatePickerDemo /> {/* Calendar Button moved next to the search bar */}
            </div>

            {/* Summary Cards with Filter Functionality */}
            <div className="flex gap-4 mb-4">
                <Card
                    onClick={() => setActiveFilter('overall')}
                    className={`flex-1 p-4 cursor-pointer bg-transparent ${
                        activeFilter === 'overall' ? 'bg-blue-50 dark:bg-blue-900' : ''
                    }`}
                >
                    <CardContent className="flex flex-col items-center">
                        <div className="flex items-center">
                            <Users size={32} className="text-blue-500" />
                            <div className="ml-3 flex flex-col items-start">
                                <CardTitle className="text-base">Overall</CardTitle>
                                <p className="text-xl font-semibold">{overallCount}</p>
                            </div>
                        </div>
                        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            <p>Fixed: {typeCounts.Fixed}</p>
                            <p>Flexible: {typeCounts.Flexible}</p>
                            <p>Super Flexible: {typeCounts['Super Flexible']}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card
                    onClick={() => setActiveFilter('onJob')}
                    className={`flex-1 p-4 cursor-pointer bg-transparent ${
                        activeFilter === 'onJob' ? 'bg-green-50 dark:bg-green-900' : ''
                    }`}
                >
                    <CardContent className="flex flex-col items-center">
                        <div className="flex items-center">
                            <UserCheck size={32} className="text-green-500" />
                            <div className="ml-3 flex flex-col items-start">
                                <CardTitle className="text-base">On Job</CardTitle>
                                <p className="text-xl font-semibold">{onJobCount}</p>
                            </div>
                        </div>
                        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            <p>Fixed: {situationTypeCounts.onJob.Fixed}</p>
                            <p>Flexible: {situationTypeCounts.onJob.Flexible}</p>
                            <p>Super Flexible: {situationTypeCounts.onJob['Super Flexible']}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card
                    onClick={() => setActiveFilter('lunch')}
                    className={`flex-1 p-4 cursor-pointer bg-transparent ${
                        activeFilter === 'lunch' ? 'bg-yellow-50 dark:bg-yellow-900' : ''
                    }`}
                >
                    <CardContent className="flex flex-col items-center">
                        <div className="flex items-center">
                            <Coffee size={32} className="text-yellow-500" />
                            <div className="ml-3 flex flex-col items-start">
                                <CardTitle className="text-base">Lunch</CardTitle>
                                <p className="text-xl font-semibold">{lunchCount}</p>
                            </div>
                        </div>
                        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            <p>Fixed: {situationTypeCounts.lunch.Fixed}</p>
                            <p>Flexible: {situationTypeCounts.lunch.Flexible}</p>
                            <p>Super Flexible: {situationTypeCounts.lunch['Super Flexible']}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card
                    onClick={() => setActiveFilter('leave')}
                    className={`flex-1 p-4 cursor-pointer bg-transparent ${
                        activeFilter === 'leave' ? 'bg-red-50 dark:bg-red-900' : ''
                    }`}
                >
                    <CardContent className="flex flex-col items-center">
                        <div className="flex items-center">
                            <Clock size={32} className="text-red-500" />
                            <div className="ml-3 flex flex-col items-start">
                                <CardTitle className="text-base">Leave</CardTitle>
                                <p className="text-xl font-semibold">{leaveCount}</p>
                            </div>
                        </div>
                        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            <p>Fixed: {situationTypeCounts.leave.Fixed}</p>
                            <p>Flexible: {situationTypeCounts.leave.Flexible}</p>
                            <p>Super Flexible: {situationTypeCounts.leave['Super Flexible']}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Attendance Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Attendance Records</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Start Time</TableHead>
                                <TableHead>End Time</TableHead>
                                <TableHead>Total Work Hours</TableHead>
                                <TableHead>Total Lunch Hours</TableHead>
                                <TableHead>Total Hours</TableHead>
                                <TableHead>Situation</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredAttendance.map((att) => (
                                <TableRow key={att.id}>
                                    <TableCell>{att.fullName}</TableCell>
                                    <TableCell>{att.type}</TableCell>
                                    <TableCell>{att.date}</TableCell>
                                    <TableCell>{att.startTime}</TableCell>
                                    <TableCell>{att.endTime}</TableCell>
                                    <TableCell>{att.workHours}</TableCell>
                                    <TableCell>{att.lunchHours}</TableCell>
                                    <TableCell>{att.totalHours}</TableCell>
                                    <TableCell>{att.situation}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
