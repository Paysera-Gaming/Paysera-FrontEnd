import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Users, Clock, Coffee, UserCheck } from 'lucide-react';

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

    return (
        <div className="p-4 space-y-4">
            <div className="flex justify-between items-center mb-4">
                <Input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-xs"
                />
            </div>

            {/* Summary Cards with Filter Functionality */}
            <div className="flex gap-4 mb-4">
                <Card
                    onClick={() => setActiveFilter('overall')}
                    className={`flex-1 p-4 cursor-pointer bg-transparent ${
                        activeFilter === 'overall' ? 'bg-blue-50 dark:bg-blue-900' : ''
                    }`}
                >
                    <CardContent className="flex items-center">
                        <Users size={32} className="text-blue-500" />
                        <div className="ml-3 flex items-center">
                            <CardTitle className="text-lg">Overall</CardTitle>
                            <p className="ml-2 text-2xl font-semibold">{overallCount}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card
                    onClick={() => setActiveFilter('onJob')}
                    className={`flex-1 p-4 cursor-pointer bg-transparent ${
                        activeFilter === 'onJob' ? 'bg-green-50 dark:bg-green-900' : ''
                    }`}
                >
                    <CardContent className="flex items-center">
                        <UserCheck size={32} className="text-green-500" />
                        <div className="ml-3 flex items-center">
                            <CardTitle className="text-lg">On Job</CardTitle>
                            <p className="ml-2 text-2xl font-semibold">{onJobCount}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card
                    onClick={() => setActiveFilter('lunch')}
                    className={`flex-1 p-4 cursor-pointer bg-transparent ${
                        activeFilter === 'lunch' ? 'bg-yellow-50 dark:bg-yellow-900' : ''
                    }`}
                >
                    <CardContent className="flex items-center">
                        <Coffee size={32} className="text-yellow-500" />
                        <div className="ml-3 flex items-center">
                            <CardTitle className="text-lg">Lunch</CardTitle>
                            <p className="ml-2 text-2xl font-semibold">{lunchCount}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card
                    onClick={() => setActiveFilter('leave')}
                    className={`flex-1 p-4 cursor-pointer bg-transparent ${
                        activeFilter === 'leave' ? 'bg-red-50 dark:bg-red-900' : ''
                    }`}
                >
                    <CardContent className="flex items-center">
                        <Clock size={32} className="text-red-500" />
                        <div className="ml-3 flex items-center">
                            <CardTitle className="text-lg">Leave</CardTitle>
                            <p className="ml-2 text-2xl font-semibold">{leaveCount}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Attendance List Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Attendance List</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Full Name</TableHead>
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
