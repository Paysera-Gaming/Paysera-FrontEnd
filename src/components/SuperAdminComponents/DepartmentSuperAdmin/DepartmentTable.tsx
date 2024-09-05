import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface Team {
    id: number;
    name: string;
    teamLeader?: {
        firstName: string;
        lastName: string;
        middleName?: string;
    };
    members: number;
    schedule: {
        startHour: string;
        startMinute: string;
        startPeriod: string;
        endHour: string;
        endMinute: string;
        endPeriod: string;
    };
}

interface Department {
    id: number;
    name: string;
    totalTeams: number;
    teams: Team[];
}

interface DepartmentTableProps {
    departments: Department[];
    onEditClick: (department: { id: number; name: string; teamLeader: string; teamMembers: string[] }) => void;
}

export default function DepartmentTable({ departments, onEditClick }: DepartmentTableProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

    const handleDeleteClick = (department: Department) => {
        setSelectedDepartment(department);
        setIsDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        setIsDialogOpen(false);
        toast.success(`Successfully deleted ${selectedDepartment?.name}`);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Department List</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Department</TableHead>
                            <TableHead>Team Leader</TableHead>
                            <TableHead>Team Members</TableHead>
                            <TableHead>Schedule</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {departments.map((dept) =>
                            dept.teams.map((team) => (
                                <TableRow key={team.id}>
                                    <TableCell>{dept.name}</TableCell>
                                    <TableCell>
                                        {team.teamLeader ? (
                                            `${team.teamLeader.lastName}, ${team.teamLeader.firstName} ${team.teamLeader.middleName ?? ''}`
                                        ) : (
                                            'No Leader'
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {team.members > 3 ? `${team.members} members (etc)` : `${team.members} members`}
                                    </TableCell>
                                    <TableCell>
                                        {`${team.schedule.startHour}:${team.schedule.startMinute} ${team.schedule.startPeriod} - ${team.schedule.endHour}:${team.schedule.endMinute} ${team.schedule.endPeriod}`}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm" onClick={() => onEditClick({
                                                id: dept.id,
                                                name: dept.name,
                                                teamLeader: team.teamLeader ? `${team.teamLeader.firstName} ${team.teamLeader.lastName}` : '',
                                                teamMembers: dept.teams.map(t => t.name)
                                            })}>
                                                <Edit2 size={16} />
                                                Edit
                                            </Button>
                                            <Button variant="outline" size="sm" color="red" onClick={() => handleDeleteClick(dept)}>
                                                <Trash2 size={16} />
                                                Delete
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                    </DialogHeader>
                    <p>Are you sure you want to delete the department {selectedDepartment?.name}?</p>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={handleConfirmDelete}>Confirm</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Card>
    );
}