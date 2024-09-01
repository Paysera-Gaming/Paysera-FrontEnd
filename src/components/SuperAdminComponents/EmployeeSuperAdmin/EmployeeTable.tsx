import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2, Circle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Toaster, toast } from 'sonner';

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
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

    const handleDeleteClick = (employee: Employee) => {
        setSelectedEmployee(employee);
        setIsDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        setIsDialogOpen(false);
        toast.success(`Successfully deleted ${selectedEmployee?.firstName} ${selectedEmployee?.lastName}`);
    };

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
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Circle
                                            size={16}
                                            color={emp.isActive ? 'green' : 'red'}
                                            fill={emp.isActive ? 'green' : 'red'}
                                        />
                                        {`${emp.lastName}, ${emp.firstName} ${emp.middleName}`}
                                    </div>
                                </TableCell>
                                <TableCell>{emp.isActive ? 'Online' : 'Offline'}</TableCell>
                                <TableCell>{emp.department}</TableCell>
                                <TableCell>{emp.role}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm">
                                            <Edit2 size={16} />
                                            Edit
                                        </Button>
                                        <Button variant="outline" size="sm" color="red" onClick={() => handleDeleteClick(emp)}>
                                            <Trash2 size={16} />
                                            Delete
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                    </DialogHeader>
                    <p>Are you sure you want to delete {selectedEmployee?.firstName} {selectedEmployee?.lastName}?</p>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={handleConfirmDelete}>Confirm</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Toaster />
        </Card>
    );
}