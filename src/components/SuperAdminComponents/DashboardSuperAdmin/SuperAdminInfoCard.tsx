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
        <ul className="text-sm space-y-2"> {/* Reduced spacing */}
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
        </ul>
    );
}

export default function SuperAdminInfoCard() {
    return (
        <div className="flex flex-col gap-2"> {/* Reduced gap between cards */}
            <Card className="flex-1 p-2 w-61"> {/* Reduced padding */}
                <CardHeader className="pb-2 flex items-center justify-between flex-row"> {/* Reduced padding */}
                    <CardTitle>Super Admin Info</CardTitle>
                    <BookUser size={'1.8rem'}></BookUser>
                </CardHeader>
                <CardContent>
                    <SuperAdminInfo />
                </CardContent>
            </Card>
            <Card className="border-primary text-primary outline outline-1 outline-transparent hover:outline-primary outline-offset-2 transition-all duration-300 ease-in-out w-61 p-2"> {/* Reduced padding */}
                <CardHeader className="pb-2 flex flex-row items-center justify-between"> {/* Reduced padding */}
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