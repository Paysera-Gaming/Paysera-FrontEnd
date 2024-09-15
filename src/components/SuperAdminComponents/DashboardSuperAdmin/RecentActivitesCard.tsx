    import {
        Card,
        CardContent,
        CardDescription,
        CardHeader,
        CardTitle,
    } from '@/components/ui/card';
    import { ScrollArea } from '@/components/ui/scroll-area';
    import {
        Table,
        TableBody,
        TableCell,
        TableHead,
        TableHeader,
        TableRow,
    } from '@/components/ui/table';
    import { Activity } from 'lucide-react';
    import { useQuery } from '@tanstack/react-query';
    import { getAttendanceList } from '@/components/SuperAdminComponents/AttendanceSuperAdmin/api'; // Corrected import path
    import { Attendance } from '@/components/SuperAdminComponents/AttendanceSuperAdmin/types'; // Corrected import path
    
    function RecentActivitiesTable({ tableData }: { tableData: Attendance[] }) {
        // Sort the data by date in descending order
        const sortedData = tableData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
        const renderedList = sortedData.map((data) => {
            const parsedDate = new Date(data.date); // Parse the date string
            return (
                <TableRow key={data.id}>
                    <TableCell>{`${data.employee.lastName}, ${data.employee.firstName}`}</TableCell>
                    <TableCell>{data.status}</TableCell>
                    <TableCell>{parsedDate.toLocaleString()}</TableCell>
                    <TableCell>{data.timeTotal} hours</TableCell>
                </TableRow>
            );
        });
    
        return (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Last Name, First Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Total Hours</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>{renderedList}</TableBody>
            </Table>
        );
    }
    
    export default function RecentActivitiesCard() {
        const { data, isLoading, error } = useQuery<Attendance[]>({
            queryKey: ['attendanceData'],
            queryFn: getAttendanceList, // Use the imported function
        });
    
        if (isLoading) return <div>Loading...</div>;
        if (error) return <div>Error loading data</div>;
    
        console.log(data); // Log the data to see its structure
    
        const paidLeaveData = Array.isArray(data) ? data.filter((attendance: Attendance) => attendance.status === 'PAID_LEAVE') : [];
    
        return (
            <Card className="flex-1 col-span-2 ">
                <CardHeader>
                    <div className="flex item-center justify-between">
                        <CardTitle> Recent Activities</CardTitle>
                        <Activity></Activity>
                    </div>
                    <CardDescription>
                        Recent activities of the employees of this department
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[200px] ">
                        <RecentActivitiesTable tableData={paidLeaveData}></RecentActivitiesTable>
                    </ScrollArea>
                </CardContent>
            </Card>
        );
    }