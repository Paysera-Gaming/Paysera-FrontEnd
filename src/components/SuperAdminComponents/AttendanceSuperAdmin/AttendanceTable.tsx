import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface AttendanceRecord {
    id: number;
    fullName: string;
    type: string;
    date: string;
    startTime: string;
    endTime: string;
    workHours: number;
    lunchHours: number;
    totalHours: number;
    situation: string;
}

interface AttendanceTableProps {
    attendanceData: AttendanceRecord[];
}

export function AttendanceTable({ attendanceData }: AttendanceTableProps) {
    return (
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
                        {attendanceData.map((att) => (
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
    );
}