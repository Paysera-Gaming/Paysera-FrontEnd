import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Book, BookUser } from 'lucide-react';
import { useUserStore } from '@/stores/userStore';

function returnRole(role: string): string {
    return role === 'SUPER_ADMIN'
        ? 'Super Admin'
        : role === 'ADMIN'
        ? 'Admin'
        : role === 'TEAM_LEADER'
        ? 'Team Leader'
        : 'Employee';
}

function SuperAdminInfo() {
    const info = useUserStore.getState().user;

    if (!info || info.accessLevel !== 'ADMIN') {
        return <p>error</p>;
    }

    return (
        <ul>
            <li>
                <b>Name:</b> {info.firstName} {info.middleName} {info.lastName}
            </li>
            <li>
                <b>Username:</b> {info.username}
            </li>
            <li>
                <b>Role:</b> <Badge>{returnRole(info.accessLevel)}</Badge>
            </li>
            <li>
                <b>Access Level:</b> {info.accessLevel}
            </li>
            <li>
                <b>Tier:</b> {info.role}
            </li>
            <li>
                <b>Overtime:</b> <Badge variant={'default'}>Allowed</Badge>
            </li>
            <li>
                <b>Sched type:</b> <Badge>Flexi</Badge>
            </li>
            <li>
                <b>Today's Schedule:</b> 8:00 - 15:00
            </li>
        </ul>
    );
}

export default function SuperAdminInfoCard() {
    return (
        <div className="flex flex-col gap-2">
            <Card className="flex-1 p-0">
                <CardHeader className="pb-2 flex items-center justify-between flex-row">
                    <CardTitle>Super Admin Info</CardTitle>
                    <BookUser size={'1.8rem'}></BookUser>
                </CardHeader>
                <CardContent>
                    <SuperAdminInfo />
                </CardContent>
            </Card>
            <Card className="border-primary text-primary outline outline-1 outline-transparent hover:outline-primary outline-offset-2 transition-all duration-300 ease-in-out">
                <CardHeader className="pb-0 flex flex-row items-center justify-between">
                    <CardTitle>Handbook</CardTitle>
                    <Book></Book>
                </CardHeader>
                <CardContent>
                    <CardDescription className="text-primary">
                        Click here to open
                    </CardDescription>
                </CardContent>
            </Card>
        </div>
    );
}