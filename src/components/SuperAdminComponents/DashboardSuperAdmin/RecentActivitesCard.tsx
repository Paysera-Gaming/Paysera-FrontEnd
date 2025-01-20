    import React, { useState } from 'react';
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
    import { getAttendanceList } from '@/components/SuperAdminComponents/AttendanceSuperAdmin/api';
    import { getEmployeeList } from '@/components/SuperAdminComponents/EmployeeSuperAdmin/api';
    import { Attendance } from '@/components/SuperAdminComponents/AttendanceSuperAdmin/types';
    import { Employee } from '@/components/SuperAdminComponents/EmployeeSuperAdmin/types';
    import {
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuItem,
        DropdownMenuTrigger,
    } from '@/components/ui/dropdown-menu';
    import { Button } from '@/components/ui/button';
    import { Skeleton } from '@/components/ui/skeleton';
    import { Input } from '@/components/ui/input';
    
    function RecentActivitiesTable({ tableData }: { tableData: Attendance[] }) {
        const sortedData = tableData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
        const renderedList = sortedData.map((data) => {
            const parsedDate = new Date(data.date);
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
            <Table className="text-base"> {/* Increased font size */}
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
        const [searchTerm, setSearchTerm] = useState('');
        const [selectedAccessLevel, setSelectedAccessLevel] = useState('');
    
        const filteredData = tableData.filter((employee) =>
            employee.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedAccessLevel ? employee.accessLevel === selectedAccessLevel : true)
        );
    
        const sortedData = filteredData.sort((a, b) => b.id - a.id);
    
        const renderedList = sortedData.map((employee) => (
            <TableRow key={employee.id}>
                <TableCell>{employee.username}</TableCell>
                <TableCell>{employee.accessLevel}</TableCell>
                <TableCell>{employee.isActive ? 'Active' : 'Inactive'}</TableCell>
            </TableRow>
        ));
    
        return (
            <>
                <div className="flex mb-4 space-x-2">
                    <Input
                        type="text"
                        placeholder="Search by username"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="p-1 text-sm w-40">Access Level</Button>
                       </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-64"> {/* Adjusted width */}
                            <DropdownMenuItem onSelect={() => setSelectedAccessLevel('')}>
                                All
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => setSelectedAccessLevel('SUPER_ADMIN')}>
                                Super Admin
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => setSelectedAccessLevel('ADMIN')}>
                                Admin
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => setSelectedAccessLevel('TEAM_LEADER')}>
                                Team Leader
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => setSelectedAccessLevel('EMPLOYEE')}>
                                Employee
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <Table className="text-base"> {/* Increased font size */}
                    <TableHeader>
                        <TableRow>
                            <TableHead>Username</TableHead>
                            <TableHead>Access Level</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>{renderedList}</TableBody>
                </Table>
            </>
        );
    }
    
    const SkeletonCard: React.FC = () => {
        return (
            <Card className="flex-1 col-span-2 p-3">
                <CardHeader className="flex flex-col md:flex-row items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Skeleton className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700" />
                        <Skeleton className="h-6 w-32 rounded bg-gray-200 dark:bg-gray-700" />
                    </div>
                    <Skeleton className="h-8 w-24 rounded bg-gray-200 dark:bg-gray-700 mt-2 md:mt-0" />
                </CardHeader>
                <CardDescription className="mt-1 text-base text-gray-600"> {/* Increased font size */}
                    <Skeleton className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
                </CardDescription>
                <CardContent className="mt-3">
                    <ScrollArea className="h-[180px]">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
                            <Skeleton className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
                            <Skeleton className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
                            <Skeleton className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        );
    };
    
    interface RecentActivitiesCardProps {
      className?: string;
    }
    
    export default function RecentActivitiesCard({ className }: RecentActivitiesCardProps) {
        const [selectedOption, setSelectedOption] = useState('Paid');
        const { data: attendanceData, isLoading: isLoadingAttendance, error: attendanceError, refetch: refetchAttendance } = useQuery<Attendance[]>({
            queryKey: ['attendanceData'],
            queryFn: getAttendanceList,
        });
    
        const { data: employeeData, isLoading: isLoadingEmployee, error: employeeError, refetch: refetchEmployee } = useQuery<Employee[]>({
            queryKey: ['employeeData'],
            queryFn: getEmployeeList,
        });
    
        if (isLoadingAttendance || isLoadingEmployee) return <SkeletonCard />;
    
        const handleRetry = () => {
            if (attendanceError) refetchAttendance();
            if (employeeError) refetchEmployee();
        };
    
        if (attendanceError || employeeError) {
            return (
                <Card className="flex-1 col-span-2 p-3">
                    <CardHeader className="flex flex-col md:flex-row items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Activity size={'1.8rem'} className="text-black dark:text-white" />
                            <CardTitle className="text-base font-semibold">Error</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="mt-3">
                        <div className="text-center">
                            <p className="text-red-500">Failed to load data. Please try again.</p>
                            <Button onClick={handleRetry} className="mt-3">Retry</Button>
                        </div>
                    </CardContent>
                </Card>
            );
        }
    
        const paidLeaveData = Array.isArray(attendanceData) ? attendanceData.filter((attendance: Attendance) => attendance.status === 'PAID_LEAVE') : [];
    
        const handleDropdownChange = (value: string) => {
            setSelectedOption(value);
        };
    
        const title = selectedOption === 'Paid' ? 'Paid Leave Record' : 'Employee Record';
        const description = selectedOption === 'Paid'
            ? 'Recent activities for paid leave of the employees of this department'
            : 'Recent activities for adding employees, sorted from latest to oldest';
    
        return (
            <Card className={`flex-1 col-span-2 p-3 ${className}`}>
                <CardHeader className="flex flex-col md:flex-row items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Activity size={'1.8rem'} className="text-black dark:text-white" />
                        <CardTitle className="text-base font-semibold">{title}</CardTitle>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="mt-2 md:mt-0 p-1 text-sm">Select Option</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-64"> {/* Adjusted width */}
                            <DropdownMenuItem onSelect={() => handleDropdownChange('Paid')}>
                                Paid
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => handleDropdownChange('Employee')}>
                                Employee
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </CardHeader>
                <CardDescription className="mt-1 text-base text-gray-600">{description}</CardDescription> {/* Increased font size */}
                <CardContent className="mt-3">
                    <ScrollArea className="h-[170px]">
                        {selectedOption === 'Paid' ? (
                            <RecentActivitiesTable tableData={paidLeaveData} />
                        ) : (
                            employeeData && <EmployeeListTable tableData={employeeData} />
                        )}
                    </ScrollArea>
                </CardContent>
            </Card>
        );
    }