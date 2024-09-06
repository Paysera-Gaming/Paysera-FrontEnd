import { useState } from 'react';
import { Department, TeamMember, Schedule } from './types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button'; // Correct the import statement for Button
import { Input } from '@/components/ui/input'; // Correct the import statement for Input
import { Label } from '@/components/ui/label'; // Correct the import statement for Label

interface EditDepartmentDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onEdit: (department: Department) => void;
    department: Department | null;
}

export default function EditDepartmentDialog({ isOpen, onClose, onEdit, department }: EditDepartmentDialogProps) {
    const [name, setName] = useState(department?.name || '');
    const [teamLeader, setTeamLeader] = useState<TeamMember | null>(department?.teams[0]?.teamLeader || null);
    const [schedule, setSchedule] = useState<Schedule>(department?.teams[0]?.schedule || {
        startHour: '',
        startMinute: '',
        startPeriod: '',
        endHour: '',
        endMinute: '',
        endPeriod: ''
    });

    const handleSave = () => {
        if (department) {
            const updatedDepartment: Department = {
                ...department,
                name,
                teams: department.teams.map(team => ({
                    ...team,
                    teamLeader,
                    schedule
                }))
            };
            onEdit(updatedDepartment);
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
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTeamLeader({ ...teamLeader, firstName: e.target.value.split(' ')[0], lastName: e.target.value.split(' ')[1] })}
                        />
                    </div>
                    <div className="mb-4">
                        <Label>Schedule</Label>
                        <div className="flex gap-2">
                            <Input
                                placeholder="Start Hour"
                                value={schedule.startHour}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSchedule({ ...schedule, startHour: e.target.value })}
                            />
                            <Input
                                placeholder="Start Minute"
                                value={schedule.startMinute}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSchedule({ ...schedule, startMinute: e.target.value })}
                            />
                            <Input
                                placeholder="Start Period"
                                value={schedule.startPeriod}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSchedule({ ...schedule, startPeriod: e.target.value })}
                            />
                            <Input
                                placeholder="End Hour"
                                value={schedule.endHour}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSchedule({ ...schedule, endHour: e.target.value })}
                            />
                            <Input
                                placeholder="End Minute"
                                value={schedule.endMinute}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSchedule({ ...schedule, endMinute: e.target.value })}
                            />
                            <Input
                                placeholder="End Period"
                                value={schedule.endPeriod}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSchedule({ ...schedule, endPeriod: e.target.value })}
                            />
                        </div>
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