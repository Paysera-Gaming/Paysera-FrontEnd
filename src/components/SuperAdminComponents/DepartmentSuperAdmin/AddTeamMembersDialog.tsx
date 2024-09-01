import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface AddTeamMembersDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (teamMembers: { name: string; department: string }[]) => void;
}

const departments = ['Human Resources', 'Finance', 'Engineering', 'Marketing', 'Sales'];

export default function AddTeamMembersDialog({ isOpen, onClose, onAdd }: AddTeamMembersDialogProps) {
    const [teamMembers, setTeamMembers] = useState<{ name: string; department: string }[]>([{ name: '', department: '' }]);
    const [currentPage, setCurrentPage] = useState(0);
    const membersPerPage = 3;

    const handleAdd = () => {
        if (teamMembers.every(member => member.name.trim() && member.department.trim())) {
            onAdd(teamMembers);
            toast.success('Team members added successfully!');
            setTeamMembers([{ name: '', department: '' }]);
            setCurrentPage(0);
            onClose();
        } else {
            toast.error('Please fill out all required fields.');
        }
    };

    const handleAddMember = () => {
        setTeamMembers([...teamMembers, { name: '', department: '' }]);
    };

    const handleMemberChange = (index: number, field: 'name' | 'department', value: string) => {
        const newTeamMembers = [...teamMembers];
        newTeamMembers[index][field] = value;
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
                    <DialogTitle>Add Team Members</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    {currentMembers.map((member, index) => (
                        <div key={startIndex + index} className="flex items-center space-x-2">
                            <div className="flex-1">
                                <div className="flex items-center space-x-2 mt-2">
                                    <Input
                                        type="text"
                                        placeholder="Employee Name"
                                        value={member.name}
                                        onChange={(e) => handleMemberChange(startIndex + index, 'name', e.target.value)}
                                    />
                                    <Select
                                        value={member.department}
                                        onValueChange={(value) => handleMemberChange(startIndex + index, 'department', value)}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Department Name" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {departments.map((dept) => (
                                                <SelectItem key={dept} value={dept}>
                                                    {dept}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
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