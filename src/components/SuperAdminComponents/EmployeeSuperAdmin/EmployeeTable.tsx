import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2, Circle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { toast } from 'sonner';
import axios from 'axios';
import EmployeeEdit from './EmployeeEdit';
import { useQueryClient } from '@tanstack/react-query';

interface Employee {
    id: number;
    username: string; // Added username field
    firstName: string;
    lastName: string;
    middleName?: string; // Make middleName optional
    isActive: boolean;
}

interface EmployeeTableProps {
    employees: Employee[];
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees }) => {
    const queryClient = useQueryClient();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

    const handleDeleteClick = (employee: Employee) => {
        setSelectedEmployee(employee);
        setIsDialogOpen(true);
    };

    const handleEditClick = (employee: Employee) => {
        setSelectedEmployee(employee);
        setIsEditDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedEmployee) return;

        try {
            await axios.delete(`${import.meta.env.VITE_BASE_API}/api/employee/${selectedEmployee.id}`);
            toast.success(`Successfully deleted ${selectedEmployee.firstName} ${selectedEmployee.lastName}`);
            setIsDialogOpen(false);
            queryClient.invalidateQueries({ queryKey: ['employees'] }); // Invalidate the employee query
        } catch (error) {
            toast.error('Error deleting the employee.');
            console.error('Error deleting the employee:', error);
        }
    };

    const handleEditSubmit = async (values: any) => {
        if (!selectedEmployee) return;

        try {
            await axios.put(`${import.meta.env.VITE_BASE_API}/api/employee/${selectedEmployee.id}`, {
                ...values,
                middleName: values.middleName || "", // Handle optional middle name
            });
            toast.success(`Successfully edited ${selectedEmployee.firstName} ${selectedEmployee.lastName}`);
            setIsEditDialogOpen(false);
            queryClient.invalidateQueries({ queryKey: ['employees'] }); // Invalidate the employee query
        } catch (error) {
            toast.error('Error editing the employee.');
            console.error('Error editing the employee:', error);
        }
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
                            <TableHead>Username</TableHead> {/* Added Username column */}
                            <TableHead>Status</TableHead>
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
                                        {`${emp.lastName}, ${emp.firstName} ${emp.middleName || ""}`} {/* Handle optional middle name */}
                                    </div>
                                </TableCell>
                                <TableCell>{emp.username}</TableCell> {/* Display Username */}
                                <TableCell>{emp.isActive ? 'Online' : 'Offline'}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" onClick={() => handleEditClick(emp)}>
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
                        <DialogDescription>
                            Are you sure you want to delete {selectedEmployee?.firstName} {selectedEmployee?.lastName}?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={handleConfirmDelete}>Confirm</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            {selectedEmployee && (
                <EmployeeEdit
                    key={selectedEmployee.id}
                    employee={selectedEmployee}
                    onSubmit={handleEditSubmit}
                    isOpen={isEditDialogOpen}
                    onClose={() => setIsEditDialogOpen(false)}
                />
            )}
        </Card>
    );
};

export default EmployeeTable;