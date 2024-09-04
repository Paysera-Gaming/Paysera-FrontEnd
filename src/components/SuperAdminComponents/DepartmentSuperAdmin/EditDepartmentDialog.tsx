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
    const [currentPage, setCurrentPage] = useState(0);
    const membersPerPage = 3;

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
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-white">Team Members</label>
                        {currentMembers.map((member, index) => (
                            <div key={startIndex + index} className="flex items-center space-x-2 mt-2">
                                <div className="w-6 text-right">{startIndex + index + 1}.</div>
                                <Input
                                    type="text"
                                    value={member}
                                    onChange={(e) => handleMemberChange(startIndex + index, e.target.value)}
                                    className="flex-1"
                                />
                                <Button variant="outline" onClick={() => handleRemoveMember(startIndex + index)}>Remove</Button>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4">
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
                    <Button variant="outline" onClick={handleAddMember} className="mt-4">Add Team Member</Button>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleEdit}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}