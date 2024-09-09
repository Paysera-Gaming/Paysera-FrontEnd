import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Department, Employee } from './types'; // Import interfaces from the types file
import ViewSummaryCards from './ViewSummaryCards'; // Import the ViewSummaryCards component

interface ViewDepartmentProps {
    department: Department;
    onBack: () => void;
}

export default function ViewDepartment({ department, onBack }: ViewDepartmentProps) {
    const renderFullName = (employee: Employee) => {
        return `${employee.lastName}, ${employee.firstName} ${employee.middleName ?? ''}`;
    };

    return (
        <>
            {/* Use the ViewSummaryCards component */}
            <ViewSummaryCards />
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