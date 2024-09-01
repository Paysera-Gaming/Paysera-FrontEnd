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
    const [currentPage, setCurrentPage] = useState(0);
    const membersPerPage = 3;

    const handleAdd = () => {
        if (name.trim() && teamLeader.trim() && teamMembers.every(member => member.trim())) {
            onAdd({ name, teamLeader, teamMembers });
            toast.success('Department added successfully!');
            setName('');
            setTeamLeader('');
            setTeamMembers(['']);
            setCurrentPage(0);
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

    const startIndex = currentPage * membersPerPage;
    const endIndex = startIndex + membersPerPage;
    const currentMembers = teamMembers.slice(startIndex, endIndex);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Department</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    {currentPage === 0 && (
                        <>
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
                        </>
                    )}
                    {currentMembers.map((member, index) => (
                        <div key={startIndex + index} className="flex items-center space-x-2">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 dark:text-white">{`Team Member ${startIndex + index + 1}`}</label>
                                <div className="flex items-center space-x-2 mt-2">
                                    <Input
                                        type="text"
                                        value={member}
                                        onChange={(e) => handleMemberChange(startIndex + index, e.target.value)}
                                    />
                                    <Button variant="outline" onClick={() => handleRemoveMember(startIndex + index)}>Remove</Button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-between">
                        <Button
                            variant="outline"
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 0}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={endIndex >= teamMembers.length}
                        >
                            Next
                        </Button>
                    </div>
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