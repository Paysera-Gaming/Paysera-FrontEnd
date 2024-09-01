import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface Team {
    id: number;
    name: string;
    teamLeader?: {
        firstName: string;
        lastName: string;
        middleName?: string;
    };
    members: number;
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
                                            <Button variant="outline" size="sm" color="red">
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
        </Card>
    );
}