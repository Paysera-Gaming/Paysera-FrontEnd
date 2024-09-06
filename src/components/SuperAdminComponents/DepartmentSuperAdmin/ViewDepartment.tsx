import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Department, Team, TeamMember } from './types'; // Import interfaces from the types file

interface ViewDepartmentProps {
    department: Department;
    team: Team;
    onBack: () => void;
}

export default function ViewDepartment({ department, team, onBack }: ViewDepartmentProps) {
    const renderFullName = (member: TeamMember) => {
        return `${member.lastName}, ${member.firstName} ${member.middleName ?? ''}`;
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>{department.name}</CardTitle>
                {/* Display the team leader's name under the department name */}
                {team.teamLeader && (
                    <p className="text-sm text-muted-foreground">Team Leader: {renderFullName(team.teamLeader)}</p>
                )}
                <Button variant="outline" onClick={onBack}>Back</Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Team Members</TableHead>
                            <TableHead>Role</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {team.members.map((member, index) => (
                            <TableRow key={index}>
                                <TableCell>{renderFullName(member)}</TableCell>
                                <TableCell>Team Member</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
