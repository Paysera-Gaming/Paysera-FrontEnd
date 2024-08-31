import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Users, UserCheck } from 'lucide-react';

interface SummaryCardsProps {
    totalDepartments: number;
    totalTeams: number;
}

export default function SummaryCards({
    totalDepartments,
    totalTeams,
}: SummaryCardsProps) {
    return (
        <div className="flex gap-4 mb-4">
            <Card className="flex-1 p-4 border-2 border-blue-500">
                <CardContent className="flex items-center">
                    <Users size={32} className="text-blue-500" />
                    <div className="ml-3 flex items-center">
                        <CardTitle className="text-lg">Total Departments</CardTitle>
                        <p className="ml-2 text-2xl font-semibold">{totalDepartments}</p>
                    </div>
                </CardContent>
            </Card>

            <Card className="flex-1 p-4 border-2 border-green-500">
                <CardContent className="flex items-center">
                    <UserCheck size={32} className="text-green-500" />
                    <div className="ml-3 flex items-center">
                        <CardTitle className="text-lg">Total Teams</CardTitle>
                        <p className="ml-2 text-2xl font-semibold">{totalTeams}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
