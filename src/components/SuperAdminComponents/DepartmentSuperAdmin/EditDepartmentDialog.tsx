import { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import { Department, TeamMember } from './types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button'; // Correct the import statement for Button
import { Input } from '@/components/ui/input'; // Correct the import statement for Input
import { Label } from '@/components/ui/label'; // Correct the import statement for Label
import { toast } from 'sonner'; // Import the toast function

interface EditDepartmentDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onEdit: (department: Department) => void;
    department: Department | null;
}

export default function EditDepartmentDialog({ isOpen, onClose, onEdit, department }: EditDepartmentDialogProps) {
    const [name, setName] = useState(department?.name || '');
    const [teamLeader, setTeamLeader] = useState<TeamMember | null>(null);

    useEffect(() => {
        if (department) {
            setName(department.name);
            setTeamLeader(department.teams[0]?.teamLeader || null);
        }
    }, [department]);

    const handleSave = async () => {
        if (department) {
            const updatedDepartment: Department = {
                ...department,
                name,
                teams: department.teams.map(team => ({
                    ...team,
                    teamLeader
                }))
            };
            try {
                await axios.put(`${import.meta.env.VITE_BASE_API}/api/department/${department.id}`, updatedDepartment);
                onEdit(updatedDepartment);
                toast.success('Department edited successfully!');
                onClose(); // Close the dialog after showing the success message
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
                    <div className="mb-4">
                        <Label htmlFor="teamLeader">Team Leader</Label>
                        <Input
                            id="teamLeader"
                            value={teamLeader ? `${teamLeader.firstName} ${teamLeader.lastName}` : ''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                const [firstName, lastName] = e.target.value.split(' ');
                                setTeamLeader({ 
                                    ...teamLeader, 
                                    firstName, 
                                    lastName, 
                                    role: teamLeader?.role || 'Team Leader' // Ensure role is always defined
                                });
                            }}
                        />
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