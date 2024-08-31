import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Edit2, Trash2 } from 'lucide-react';

interface Team {
    id: number;
    name: string;
    leader: Employee;
    members: Employee[];
}

interface Department {
    id: number;
    name: string;
    teams: Team[];
}

interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    middleName: string;
}

interface DepartmentTableProps {
    departments: Department[];
}

export default function DepartmentTable({ departments }: DepartmentTableProps) {
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
                            <TableHead>Team Leader Full Name</TableHead>
                            <TableHead>Team Members</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {departments.map((dept) =>
                            dept.teams.map((team) => (
                                <TableRow key={team.id}>
                                    <TableCell>{dept.name}</TableCell>
                                    <TableCell>{`${team.leader.lastName}, ${team.leader.firstName} ${team.leader.middleName}`}</TableCell>
                                    <TableCell>
                                        {team.members.slice(0, 3).map((member, index) => (
                                            <span key={member.id}>
                                                {`${member.lastName}, ${member.firstName} ${member.middleName}`}
                                                {index < team.members.length - 1 ? ', ' : ''}
                                            </span>
                                        ))}
                                        {team.members.length > 3 && '...'}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm">
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
