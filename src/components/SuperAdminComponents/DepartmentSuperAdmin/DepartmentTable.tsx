import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface Team {
    teamName: string;
    leader: {
        firstName: string;
        lastName: string;
        middleName: string;
    };
    members: Array<{
        firstName: string;
        lastName: string;
        middleName: string;
    }>;
}

interface Department {
    departmentName: string;
    teams: Team[];
}

interface DepartmentTableProps {
    departments: Department[];
}

export default function DepartmentTable({ departments }: DepartmentTableProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Department and Teams</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Department</TableHead>
                            <TableHead>Team Leader</TableHead>
                            <TableHead>Team Members</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {departments.map((dept, deptIndex) =>
                            dept.teams.map((team, teamIndex) => (
                                <TableRow key={`${deptIndex}-${teamIndex}`}>
                                    <TableCell>{teamIndex === 0 ? dept.departmentName : ''}</TableCell>
                                    <TableCell>{`${team.leader.lastName}, ${team.leader.firstName} ${team.leader.middleName}`}</TableCell>
                                    <TableCell>
                                        {team.members.slice(0, 3).map((member, memberIndex) => (
                                            <span key={memberIndex}>
                                                {member.lastName}, {member.firstName} {member.middleName}
                                                {memberIndex < team.members.length - 1 && ', '}
                                            </span>
                                        ))}
                                        {team.members.length > 3 && '...'}
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
