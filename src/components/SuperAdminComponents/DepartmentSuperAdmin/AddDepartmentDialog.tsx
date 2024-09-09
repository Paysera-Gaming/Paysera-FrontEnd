import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import axios from 'axios'; // Import axios
import { useQueryClient } from '@tanstack/react-query'; // Import useQueryClient

interface AddDepartmentDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (department: { name: string; teamLeader: string }) => void;
}

export default function AddDepartmentDialog({ isOpen, onClose, onAdd }: AddDepartmentDialogProps) {
    const [name, setName] = useState('');
    const [teamLeader, setTeamLeader] = useState('');
    const queryClient = useQueryClient(); // Initialize queryClient

    const handleAdd = async () => {
        if (name.trim() && teamLeader.trim()) {
            try {
                const response = await axios.post(`${import.meta.env.VITE_BASE_API}/api/department`, { name, teamLeader });
                onAdd(response.data);
                toast.success('Department added successfully!');
                setName('');
                setTeamLeader('');
                queryClient.invalidateQueries({ queryKey: ['departments'] }); // Invalidate the department query
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
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Department</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <Input
                        placeholder="Department Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        placeholder="Team Leader"
                        value={teamLeader}
                        onChange={(e) => setTeamLeader(e.target.value)}
                    />
                </div>
                <DialogFooter>
                    <Button onClick={handleAdd}>Add</Button>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}