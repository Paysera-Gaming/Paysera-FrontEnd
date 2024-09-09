import { useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Department, Employee } from './types'; // Import interfaces from the types file
import ViewSummaryCards from './ViewSummaryCards'; // Import the ViewSummaryCards component
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface ViewDepartmentProps {
    departmentId: number;
    onBack: () => void;
}

const fetchDepartment = async (departmentId: number): Promise<Department> => {
    const response = await axios.get(`${import.meta.env.VITE_BASE_API}/api/department/${departmentId}`);
    return response.data;
};

export default function ViewDepartment({ departmentId, onBack }: ViewDepartmentProps) {
    const queryClient = useQueryClient();
    const { data: department } = useQuery<Department>({
        queryKey: ['department', departmentId],
        queryFn: () => fetchDepartment(departmentId),
        enabled: !!departmentId,
    });

    useEffect(() => {
        queryClient.invalidateQueries({ queryKey: ['department', departmentId] });
    }, [departmentId, queryClient]);

    const renderFullName = (employee: Employee) => {
        return `${employee.lastName}, ${employee.firstName} ${employee.middleName ?? ''}`;
    };

    if (!department) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {/* Use the ViewSummaryCards component */}
            <ViewSummaryCards departmentId={departmentId} />
            <Card>
                <CardHeader>
                    <CardTitle>{department.name}</CardTitle>
                    <Button variant="outline" onClick={onBack}>Back</Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Team Members</TableHead>
                                <TableHead>Role</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {department.Employees.map((employee: Employee, index: number) => (
                                <TableRow key={index}>
                                    <TableCell>{renderFullName(employee)}</TableCell>
                                    {/* Render the actual role from the employee object */}
                                    <TableCell>{employee.role}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    );
}