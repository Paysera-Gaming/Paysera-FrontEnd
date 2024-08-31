// AttendanceList.tsx
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
    // More sample entries...
];

export default function AttendanceList() {
    const [attendanceData, setAttendanceData] = useState(sampleAttendance);
    const [searchTerm, setSearchTerm] = useState('');

    // Filtering attendance data based on the search term
    const filteredAttendance = attendanceData.filter(attendance =>
        attendance.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate summary counts
    const onJobCount = attendanceData.filter(att => att.situation === 'On Job').length;
    const lunchCount = attendanceData.filter(att => att.situation === 'Lunch').length;
    const leaveCount = attendanceData.filter(att => att.situation === 'Leave').length;

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

            {/* Summary Cards */}
            <div className="flex gap-4 mb-4">
                <Card className="flex-1 p-4">
                    <CardContent className="flex items-center">
                        <Users size={32} className="text-blue-500" />
                        <div className="ml-3 flex items-center">
                            <CardTitle className="text-lg">Overall</CardTitle>
                            <p className="ml-2 text-2xl font-semibold">{attendanceData.length}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="flex-1 p-4">
                    <CardContent className="flex items-center">
                        <UserCheck size={32} className="text-green-500" />
                        <div className="ml-3 flex items-center">
                            <CardTitle className="text-lg">On Job</CardTitle>
                            <p className="ml-2 text-2xl font-semibold">{onJobCount}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="flex-1 p-4">
                    <CardContent className="flex items-center">
                        <Coffee size={32} className="text-yellow-500" />
                        <div className="ml-3 flex items-center">
                            <CardTitle className="text-lg">Lunch</CardTitle>
                            <p className="ml-2 text-2xl font-semibold">{lunchCount}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="flex-1 p-4">
                    <CardContent className="flex items-center">
                        <Clock size={32} className="text-red-500" />
                        <div className="ml-3 flex items-center">
                            <CardTitle className="text-lg">Leave</CardTitle>
                            <p className="ml-2 text-2xl font-semibold">{leaveCount}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

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
