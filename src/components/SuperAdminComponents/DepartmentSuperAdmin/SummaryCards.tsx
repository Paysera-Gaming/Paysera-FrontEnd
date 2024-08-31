import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Users, UserCheck } from 'lucide-react';

interface SummaryCardsProps {
    totalDepartments: number;
    totalTeams: number;
    activeFilter: string;
    handleFilterClick: (filter: string) => void;
}

export default function SummaryCards({
    totalDepartments,
    totalTeams,
    activeFilter,
    handleFilterClick,
}: SummaryCardsProps) {
    return (
        <div className="flex gap-4 mb-4">
            <Card
                onClick={() => handleFilterClick('overall')}
                className={`flex-1 p-4 cursor-pointer border-2 border-blue-500 ${
                    activeFilter === 'overall' ? 'bg-blue-100 dark:bg-blue-900' : ''
                }`}
            >
                <CardContent className="flex items-center">
                    <Users size={32} className="text-blue-500" />
                    <div className="ml-3 flex items-center">
                        <CardTitle className="text-lg">Departments</CardTitle>
                        <p className="ml-2 text-2xl font-semibold">{totalDepartments}</p>
                    </div>
                </CardContent>
            </Card>

            <Card
                onClick={() => handleFilterClick('teams')}
                className={`flex-1 p-4 cursor-pointer border-2 border-green-500 ${
                    activeFilter === 'teams' ? 'bg-green-100 dark:bg-green-900' : ''
                }`}
            >
                <CardContent className="flex items-center">
                    <UserCheck size={32} className="text-green-500" />
                    <div className="ml-3 flex items-center">
                        <CardTitle className="text-lg">Teams</CardTitle>
                        <p className="ml-2 text-2xl font-semibold">{totalTeams}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
