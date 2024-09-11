import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Users, UserCheck, UserX } from 'lucide-react';
import { useState, useEffect } from 'react';
import { fetchEmployees } from '@/utils/fetchEmployees'; // Import the shared fetch function
import { Employee } from '@/components/SuperAdminComponents/EmployeeSuperAdmin/types'; // Adjust the import path as needed

type CardData = {
    title: string;
    population: number;
    icon: React.ReactNode;
    description: string;
};

export default function EmployeesStatusCards() {
    const [employees, setEmployees] = useState<Employee[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchEmployees();
            setEmployees(data);
        };
        fetchData();
    }, []);

    const overallCount = employees.length;
    const onlineCount = employees.filter((emp: Employee) => emp.isActive).length;
    const offlineCount = overallCount - onlineCount;

    const cardData: CardData[] = [
        {
            title: 'Total Employees',
            population: overallCount,
            icon: <Users></Users>,
            description: 'Total Employees on this department',
        },
        {
            title: 'Online Employees',
            population: onlineCount,
            icon: <UserCheck></UserCheck>,
            description: 'Total employees that are online',
        },
        {
            title: 'Offline Employees',
            population: offlineCount,
            icon: <UserX></UserX>,
            description: 'Total employees that are offline',
        },
    ];

    const CardItems = cardData.map((card) => (
        <Card className="flex-1 p-2 m-2 h-32" key={card.title}>
            <CardContent className="flex items-center justify-between p-0 pb-1">
                <p className="text-sm">{card.title}:</p>
                {card.icon}
            </CardContent>
            <CardHeader className="p-0">
                <CardTitle className="text-lg">{card.population}</CardTitle>
                <CardDescription className="text-xs">{card.description}</CardDescription>
            </CardHeader>
        </Card>
    ));

    return <>{CardItems}</>;
}