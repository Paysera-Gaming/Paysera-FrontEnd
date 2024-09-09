import { useState, useEffect } from 'react';
import axios from 'axios';
import { Department, TeamMember, Team } from './types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

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
            setTeamLeader(department.teams?.[0]?.teamLeader || null);
        }
    }, [department]);

    const handleSave = async () => {
        if (department) {
            const updatedDepartment: Department = {
                ...department,
                name,
                teams: department.teams?.map((team: Team) => ({
                    ...team,
                    teamLeader
                })) || []
            };
            try {
                await axios.put(`${import.meta.env.VITE_BASE_API}/api/department/${department.id}`, updatedDepartment);
                onEdit(updatedDepartment);
                toast.success('Department edited successfully!');
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
                    <div className="mb-4">
                        <Label htmlFor="teamLeader">Team Leader</Label>
                        <Input
                            id="teamLeader"
                            value={teamLeader ? `${teamLeader.firstName} ${teamLeader.lastName}` : ''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                const [firstName, lastName] = e.target.value.split(' ');
                                setTeamLeader({ 
                                    id: teamLeader?.id || 0, // Ensure id is defined
                                    firstName, 
                                    lastName, 
                                    role: teamLeader?.role || 'Team Leader',
                                    middleName: teamLeader?.middleName
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