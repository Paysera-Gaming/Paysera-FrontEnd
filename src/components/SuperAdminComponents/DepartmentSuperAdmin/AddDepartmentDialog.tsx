import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';

interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    middleName?: string;
}

interface AddDepartmentDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (department: { name: string; teamLeader: string }) => void;
}

export default function AddDepartmentDialog({ isOpen, onClose, onAdd }: AddDepartmentDialogProps) {
    const [name, setName] = useState('');
    const [teamLeader, setTeamLeader] = useState('');
    const [employees, setEmployees] = useState<Employee[]>([]);
    const queryClient = useQueryClient();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_API}/api/employee/team-leader`);
                setEmployees(response.data);
            } catch (error) {
                toast.error('Error fetching team leaders.');
                console.error('Error fetching team leaders:', error);
            }
        };

        fetchEmployees();
    }, []);

    const handleAdd = async () => {
        if (name.trim() && teamLeader.trim()) {
            try {
                const response = await axios.post(`${import.meta.env.VITE_BASE_API}/api/department`, { name, teamLeader });
                onAdd(response.data);
                toast.success('Department added successfully!');
                setName('');
                setTeamLeader('');
                queryClient.invalidateQueries({ queryKey: ['departments'] });
                onClose();
            } catch (error) {
                toast.error('Error adding department.');
                console.error('Error adding department:', error);
            }
        } else {
            toast.error('Please fill out all fields.');
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white dark:bg-gray-800">
                <DialogHeader>
                    <DialogTitle className="text-gray-900 dark:text-gray-100">Add Department</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <Input
                        placeholder="Department Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-100"
                    />
                    <select
                        value={teamLeader}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTeamLeader(e.target.value)}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-100"
                    >
                        <option value="" disabled>Select Team Leader</option>
                        {employees.map((employee) => (
                            <option key={employee.id} value={employee.id.toString()}>
                                {`${employee.lastName}, ${employee.firstName} ${employee.middleName ?? ''}`}
                            </option>
                        ))}
                    </select>
                </div>
                <DialogFooter>
                    <Button onClick={handleAdd} className="bg-blue-500 text-white dark:bg-blue-700">Add</Button>
                    <Button variant="outline" onClick={onClose} className="border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300">Cancel</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}