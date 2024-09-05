import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Department, Team } from './types'; // Import interfaces from the types file

interface ViewDepartmentProps {
    department: Department;
    team: Team;
    onBack: () => void;
}

export default function ViewDepartment({ department, team, onBack }: ViewDepartmentProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{department.name}</CardTitle>
                <Button variant="outline" onClick={onBack}>Back</Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Team Leader</TableHead>
                            <TableHead>Team Members</TableHead>
                            <TableHead>Schedule</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow key={team.id}>
                            <TableCell>
                                {team.teamLeader ? (
                                    `${team.teamLeader.lastName}, ${team.teamLeader.firstName} ${team.teamLeader.middleName ?? ''}`
                                ) : (
                                    'No Leader'
                                )}
                            </TableCell>
                            <TableCell>
                                {team.members.join(', ')}
                            </TableCell>
                            <TableCell>
                                {`${team.schedule.startHour}:${team.schedule.startMinute} ${team.schedule.startPeriod} - ${team.schedule.endHour}:${team.schedule.endMinute} ${team.schedule.endPeriod}`}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}