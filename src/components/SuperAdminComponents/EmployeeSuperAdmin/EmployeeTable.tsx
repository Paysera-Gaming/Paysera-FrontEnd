import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    middleName: string;
    isActive: boolean;
    department: string;
    role: string;
}

interface EmployeeTableProps {
    employees: Employee[];
}

export default function EmployeeTable({ employees }: EmployeeTableProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Employee List</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Full Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {employees.map((emp) => (
                            <TableRow key={emp.id}>
                                <TableCell>{`${emp.lastName}, ${emp.firstName} ${emp.middleName}`}</TableCell>
                                <TableCell>{emp.isActive ? 'Online' : 'Offline'}</TableCell>
                                <TableCell>{emp.department}</TableCell>
                                <TableCell>{emp.role}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" icon={<Edit2 size={16} />}>
                                            Edit
                                        </Button>
                                        <Button variant="outline" size="sm" color="red" leftIcon={<Trash2 size={16} />}>
                                            Delete
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}