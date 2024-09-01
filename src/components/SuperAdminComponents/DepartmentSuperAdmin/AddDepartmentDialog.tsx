import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface AddDepartmentDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (department: { name: string; teamLeader: string; teamMembers: string[] }) => void;
}

export default function AddDepartmentDialog({ isOpen, onClose, onAdd }: AddDepartmentDialogProps) {
    const [name, setName] = useState('');
    const [teamLeader, setTeamLeader] = useState('');
    const [teamMembers, setTeamMembers] = useState<string[]>(['']);

    const handleAdd = () => {
        if (name.trim() && teamLeader.trim() && teamMembers.every(member => member.trim())) {
            onAdd({ name, teamLeader, teamMembers });
            toast.success('Department added successfully!');
            setName('');
            setTeamLeader('');
            setTeamMembers(['']);
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

    const handleRemoveMember = (index: number) => {
        const newTeamMembers = teamMembers.filter((_, i) => i !== index);
        setTeamMembers(newTeamMembers);
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
                    {teamMembers.map((member, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 dark:text-white">{`Team Member ${index + 1}`}</label>
                                <div className="flex items-center space-x-2 mt-2">
                                    <Input
                                        type="text"
                                        value={member}
                                        onChange={(e) => handleMemberChange(index, e.target.value)}
                                    />
                                    <Button variant="outline" onClick={() => handleRemoveMember(index)}>Remove</Button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <Button variant="outline" onClick={handleAddMember}>Add Team Member</Button>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleAdd}>Add</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}