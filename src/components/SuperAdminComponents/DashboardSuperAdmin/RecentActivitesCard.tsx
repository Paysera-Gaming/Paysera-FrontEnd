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
    import { getEmployeeList } from '@/components/SuperAdminComponents/EmployeeSuperAdmin/api'; // Corrected import path
    import { Attendance } from '@/components/SuperAdminComponents/AttendanceSuperAdmin/types'; // Corrected import path
    import { Employee } from '@/components/SuperAdminComponents/EmployeeSuperAdmin/types'; // Corrected import path
    import { useState } from 'react';
    
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
    
    function EmployeeListTable({ tableData }: { tableData: Employee[] }) {
        // Sort the data by id in descending order (assuming id is incremented over time)
        const sortedData = tableData.sort((a, b) => b.id - a.id);
    
        const renderedList = sortedData.map((employee) => (
            <TableRow key={employee.id}>
                <TableCell>{employee.username}</TableCell>
                <TableCell>{employee.firstName}</TableCell>
                <TableCell>{employee.lastName}</TableCell>
                <TableCell>{employee.accessLevel}</TableCell>
                <TableCell>{employee.isActive ? 'Active' : 'Inactive'}</TableCell>
            </TableRow>
        ));
    
        return (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Username</TableHead>
                        <TableHead>First Name</TableHead>
                        <TableHead>Last Name</TableHead>
                        <TableHead>Access Level</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>{renderedList}</TableBody>
            </Table>
        );
    }
    
    export default function RecentActivitiesCard() {
        const [selectedOption, setSelectedOption] = useState('Paid');
        const { data: attendanceData, isLoading: isLoadingAttendance, error: attendanceError } = useQuery<Attendance[]>({
            queryKey: ['attendanceData'],
            queryFn: getAttendanceList, // Use the imported function
        });
    
        const { data: employeeData, isLoading: isLoadingEmployee, error: employeeError } = useQuery<Employee[]>({
            queryKey: ['employeeData'],
            queryFn: getEmployeeList, // Use the imported function
        });
    
        if (isLoadingAttendance || isLoadingEmployee) return <div>Loading...</div>;
    
        if (attendanceError) return <div>Error loading attendance data: {attendanceError.message}</div>;
        if (employeeError) return <div>Error loading employee data: {employeeError.message}</div>;
    
        const paidLeaveData = Array.isArray(attendanceData) ? attendanceData.filter((attendance: Attendance) => attendance.status === 'PAID_LEAVE') : [];
    
        const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectedOption(event.target.value);
        };
    
        const title = selectedOption === 'Paid' ? 'Activities Record' : 'Employee Record';
        const description = selectedOption === 'Paid'
            ? 'Recent activities for paid leave of the employees of this department'
            : 'Recent activities for adding employees, sorted from latest to oldest';
    
        return (
            <Card className="flex-1 col-span-2 ">
                <CardHeader>
                    <div className="flex item-center justify-between">
                        <CardTitle>{title}</CardTitle>
                        <Activity></Activity>
                    </div>
                    <CardDescription>{description}</CardDescription>
                    <select onChange={handleDropdownChange} value={selectedOption}>
                        <option value="Paid">Paid</option>
                        <option value="Employee">Employee</option>
                    </select>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[200px] ">
                        {selectedOption === 'Paid' ? (
                            <RecentActivitiesTable tableData={paidLeaveData}></RecentActivitiesTable>
                        ) : (
                            employeeData && <EmployeeListTable tableData={employeeData}></EmployeeListTable>
                        )}
                    </ScrollArea>
                </CardContent>
            </Card>
        );
    }