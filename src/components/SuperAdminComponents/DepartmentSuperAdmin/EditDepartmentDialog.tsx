import { useState, useEffect } from 'react';
import axios from 'axios';
import { Department } from './types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query'; // Import useQueryClient

interface EditDepartmentDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onEdit: (department: Department) => void;
    department: Department | null;
}

export default function EditDepartmentDialog({ isOpen, onClose, onEdit, department }: EditDepartmentDialogProps) {
    const [name, setName] = useState(department?.name || '');
    const queryClient = useQueryClient(); // Initialize queryClient

    useEffect(() => {
        if (department) {
            setName(department.name);
        }
    }, [department]);

    const handleSave = async () => {
        if (department) {
            const updatedDepartment: Department = {
                ...department,
                name,
            };
            try {
                await axios.put(`${import.meta.env.VITE_BASE_API}/api/department/${department.id}`, updatedDepartment);
                onEdit(updatedDepartment);
                toast.success('Department edited successfully!');
                queryClient.invalidateQueries({ queryKey: ['departments'] }); // Invalidate the department query
                onClose();
            } catch (error) {
                toast.error('Failed to edit department.');
                console.error('Error editing department:', error);
            }
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Department</DialogTitle>
                </DialogHeader>
                <div>
                    <div className="mb-4">
                        <Label htmlFor="name">Department Name</Label>
                        <Input id="name" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button variant="default" onClick={handleSave}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}