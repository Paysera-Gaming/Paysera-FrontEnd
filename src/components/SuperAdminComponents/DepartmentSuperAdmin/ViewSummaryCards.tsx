import { Card, CardContent } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Employee } from './types'; // Import the Employee type

interface ViewSummaryCardsProps {
    departmentId: number;
}

const fetchTeamMembers = async (departmentId: number): Promise<Employee[]> => {
    const response = await axios.get(`${import.meta.env.VITE_BASE_API}/api/department/${departmentId}/team`);
    return response.data;
};

export default function ViewSummaryCards({ departmentId }: ViewSummaryCardsProps) {
    const { data: team = [] } = useQuery<Employee[]>({
        queryKey: ['teamMembers', departmentId],
        queryFn: () => fetchTeamMembers(departmentId),
    });

    return (
        <div className="flex gap-6 mb-6">
            <Card className="flex-1 p-8 border-2 border-blue-500 transition-transform transform hover:scale-105">
                <CardContent className="flex items-center justify-between">
                    <Users size={48} className="text-blue-500" />
                    <div className="ml-4 text-right">
                        <p className="text-4xl font-bold">
                            Team Members: {team.length}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}