import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface EditDepartmentDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onEdit: (department: { id: number; name: string; teamLeader: string; teamMembers: string[] }) => void;
    department: { id: number; name: string; teamLeader: string; teamMembers: string[] } | null;
}

export default function EditDepartmentDialog({ isOpen, onClose, onEdit, department }: EditDepartmentDialogProps) {
    const [name, setName] = useState('');
    const [teamLeader, setTeamLeader] = useState('');
    const [teamMembers, setTeamMembers] = useState<string[]>(['']);

    useEffect(() => {
        if (department) {
            setName(department.name);
            setTeamLeader(department.teamLeader);
            setTeamMembers(department.teamMembers);
        }
    }, [department]);

    const handleEdit = () => {
        if (name.trim() && teamLeader.trim() && teamMembers.every(member => member.trim())) {
            onEdit({ id: department!.id, name, teamLeader, teamMembers });
            toast.success('Department edited successfully!');
            onClose();
        } else {
            toast.error('Please fill out all required fields.');
        }
    };

    const handleAddMember = () => {
        setTeamMembers([...teamMembers, '']);
    };

    const handleMemberChange = (index: number, value: string) => {
        const newTeamMembers = [...teamMembers];
        newTeamMembers[index] = value;
        setTeamMembers(newTeamMembers);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Department</DialogTitle>
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
                    {teamMembers.map((member, index) => (
                        <div key={index}>
                            <label className="block text-sm font-medium text-gray-700 dark:text-white">{`Team Member ${index + 1}`}</label>
                            <Input
                                type="text"
                                value={member}
                                onChange={(e) => handleMemberChange(index, e.target.value)}
                                className="mt-2"
                            />
                        </div>
                    ))}
                    <Button variant="outline" onClick={handleAddMember}>Add Team Member</Button>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleEdit}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}