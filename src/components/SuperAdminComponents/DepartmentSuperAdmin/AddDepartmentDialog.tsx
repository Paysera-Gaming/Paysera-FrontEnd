import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import sampleDepartments from './sampleDepartments';

interface AddDepartmentDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (department: { name: string; teamLeader: string }) => void;
}

export default function AddDepartmentDialog({ isOpen, onClose, onAdd }: AddDepartmentDialogProps) {
    const [name, setName] = useState('');
    const [teamLeader, setTeamLeader] = useState('');

    const handleAdd = () => {
        if (name.trim() && teamLeader.trim()) {
            const departmentExists = sampleDepartments.some(dept => dept.name === name);

            if (departmentExists) {
                toast.error('Department name already exists.');
            } else {
                onAdd({ name, teamLeader });
                toast.success('Department added successfully!');
                setName('');
                setTeamLeader('');
                onClose();
            }
        } else {
            toast.error('Please fill out all required fields.');
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Department</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-white">Department Name</label>
                        <Input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-white">Team Leader</label>
                        <Input
                            type="text"
                            value={teamLeader}
                            onChange={(e) => setTeamLeader(e.target.value)}
                            className="mt-2"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleAdd}>Add</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}