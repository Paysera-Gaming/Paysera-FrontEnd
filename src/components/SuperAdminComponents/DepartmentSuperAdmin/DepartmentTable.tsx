import { useState } from 'react';
import axios from 'axios';
import { Department, Employee } from './types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2, Eye } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

interface DepartmentTableProps {
    departments: Department[];
    onEditClick: (department: { id: number; name: string; teamLeader: Employee | null; teamMembers: Employee[] }) => void;
    onViewClick: (departmentId: number) => void;
    onDeleteClick: (departmentId: number) => void;
}

export default function DepartmentTable({ departments, onEditClick, onViewClick, onDeleteClick }: DepartmentTableProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
    const queryClient = useQueryClient();

    const handleConfirmDelete = async () => {
        if (selectedDepartment) {
            try {
                await axios.delete(`${import.meta.env.VITE_BASE_API}/api/department/${selectedDepartment.id}`);
                toast.success(`Successfully deleted ${selectedDepartment.name}`);
                queryClient.invalidateQueries({ queryKey: ['departments'] }); // Invalidate the department query
                onDeleteClick(selectedDepartment.id);
            } catch (error) {
                toast.error(`Failed to delete ${selectedDepartment.name}`);
                console.error('Error deleting department:', error);
            }
        }
        setIsDialogOpen(false);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Department List</CardTitle>
            </CardHeader>
            <CardContent>
                <Table className="min-w-full divide-y divide-gray-200">
                    <TableHeader className="bg-gray-50">
                        <TableRow>
                            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</TableHead>
                            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team Leader</TableHead>
                            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team Members</TableHead>
                            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="bg-white divide-y divide-gray-200">
                        {departments.map((dept) => (
                            <TableRow key={dept.id}>
                                <TableCell className="px-6 py-4 whitespace-nowrap">{dept.name}</TableCell>
                                <TableCell className="px-6 py-4 whitespace-nowrap">
                                    {dept.Leader ? (
                                        `${dept.Leader.lastName}, ${dept.Leader.firstName} ${dept.Leader.middleName ?? ''}`
                                    ) : (
                                        'No Leader'
                                    )}
                                </TableCell>
                                <TableCell className="px-6 py-4 whitespace-nowrap">
                                    {dept.Employees.length > 3
                                        ? `${dept.Employees.slice(0, 3).map(member => `${member.firstName} ${member.lastName}`).join(', ')} and ${dept.Employees.length - 3} more`
                                        : dept.Employees.map(member => `${member.firstName} ${member.lastName}`).join(', ')}
                                </TableCell>
                                <TableCell className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" onClick={() => onEditClick({
                                            id: dept.id,
                                            name: dept.name,
                                            teamLeader: dept.Leader,
                                            teamMembers: dept.Employees
                                        })}>
                                            <Edit2 size={16} />
                                            Edit
                                        </Button>
                                        <Button variant="outline" size="sm" color="red" onClick={() => {
                                            setSelectedDepartment(dept);
                                            setIsDialogOpen(true);
                                        }}>
                                            <Trash2 size={16} />
                                            Delete
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => onViewClick(dept.id)}>
                                            <Eye size={16} />
                                            View
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
                    <p>Are you sure you want to delete the department {selectedDepartment?.name}?</p>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={handleConfirmDelete}>Confirm</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Card>
    );
}