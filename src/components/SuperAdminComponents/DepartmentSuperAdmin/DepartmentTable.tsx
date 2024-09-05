import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2, Eye } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';
import ViewDepartment from './ViewDepartment';
import { Department, Team } from './types'; // Import interfaces from the types file

interface DepartmentTableProps {
    departments: Department[];
    onEditClick: (department: { id: number; name: string; teamLeader: string; teamMembers: string[] }) => void;
}

export default function DepartmentTable({ departments, onEditClick }: DepartmentTableProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
    const [viewData, setViewData] = useState<{ department: Department; team: Team } | null>(null);

    const handleDeleteClick = (department: Department) => {
        setSelectedDepartment(department);
        setIsDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        setIsDialogOpen(false);
        toast.success(`Successfully deleted ${selectedDepartment?.name}`);
    };

    const handleViewClick = (department: Department, team: Team) => {
        setViewData({ department, team });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Department List</CardTitle>
            </CardHeader>
            <CardContent>
                {viewData ? (
                    <ViewDepartment department={viewData.department} team={viewData.team} onBack={() => setViewData(null)} />
                ) : (
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
                                            {team.members.length > 3
                                                ? `${team.members.slice(0, 3).join(', ')} and ${team.members.length - 3} more`
                                                : team.members.join(', ')}
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
                                                    teamMembers: team.members
                                                })}>
                                                    <Edit2 size={16} />
                                                    Edit
                                                </Button>
                                                <Button variant="outline" size="sm" color="red" onClick={() => handleDeleteClick(dept)}>
                                                    <Trash2 size={16} />
                                                    Delete
                                                </Button>
                                                <Button variant="outline" size="sm" onClick={() => handleViewClick(dept, team)}>
                                                    <Eye size={16} />
                                                    View
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                )}
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