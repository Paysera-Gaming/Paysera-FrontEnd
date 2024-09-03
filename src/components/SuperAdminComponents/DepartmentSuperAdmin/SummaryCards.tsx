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
        <div className="flex gap-6 mb-6">
            <Card className="flex-1 p-8 border-2 border-blue-500 transition-transform transform hover:scale-105">
                <CardContent className="flex items-center justify-between">
                    <Users size={48} className="text-blue-500" />
                    <div className="ml-4 text-right">
                        <CardTitle className="text-2xl">Total Departments</CardTitle>
                        <p className="text-4xl font-bold">{totalDepartments}</p>
                    </div>
                </CardContent>
            </Card>

            <Card className="flex-1 p-8 border-2 border-green-500 transition-transform transform hover:scale-105">
                <CardContent className="flex items-center justify-between">
                    <UserCheck size={48} className="text-green-500" />
                    <div className="ml-4 text-right">
                        <CardTitle className="text-2xl">Total Teams</CardTitle>
                        <p className="text-4xl font-bold">{totalTeams}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}