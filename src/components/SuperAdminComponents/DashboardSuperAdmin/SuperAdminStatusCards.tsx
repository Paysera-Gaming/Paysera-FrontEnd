import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Users, UserCheck, UserX } from 'lucide-react';
import { useState, useEffect } from 'react';
import { fetchEmployees } from '@/utils/fetchEmployees'; // Import the shared fetch function
import { Employee } from '@/components/SuperAdminComponents/EmployeeSuperAdmin/types'; // Adjust the import path as needed
import AnnouncementCard from './announcement-card'; // Import the AnnouncementCard component

type CardData = {
    title: string;
    population: number;
    icon: React.ReactNode;
};

export default function EmployeesStatusCards() {
    const [employees, setEmployees] = useState<Employee[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchEmployees();
            setEmployees(data);
        };

        fetchData(); // Initial fetch
    }, []);

    const overallCount = employees.length;
    const onlineCount = employees.filter((emp: Employee) => emp.isActive).length;
    const offlineCount = overallCount - onlineCount;

    const cardData: CardData[] = [
        {
            title: 'Total Employees',
            population: overallCount,
            icon: <Users></Users>,
        },
        {
            title: 'Online Employees',
            population: onlineCount,
            icon: <UserCheck></UserCheck>,
        },
        {
            title: 'Offline Employees',
            population: offlineCount,
            icon: <UserX></UserX>,
        },
    ];

    const CardItems = cardData.map((card) => (
        <Card className="flex-1 p-2 m-2 h-18" key={card.title}>
            <CardContent className="flex items-center justify-between p-0 pb-1">
                <p className="text-sm">{card.title}:</p>
                {card.icon}
            </CardContent>
            <CardHeader className="p-0">
                <CardTitle className="text-lg">{card.population}</CardTitle>
            </CardHeader>
        </Card>
    ));

    return (
        <>
            {CardItems}
            <AnnouncementCard /> {/* Include the AnnouncementCard component */}
        </>
    );
}