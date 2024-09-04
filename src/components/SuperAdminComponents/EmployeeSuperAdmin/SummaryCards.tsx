import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, UserX } from 'lucide-react';

interface SummaryCardsProps {
    overallCount: number;
    onlineCount: number;
    offlineCount: number;
    activeFilter: string;
    handleFilterClick: (filter: string) => void;
}

export default function SummaryCards({
    overallCount,
    onlineCount,
    offlineCount,
    activeFilter,
    handleFilterClick,
}: SummaryCardsProps) {
    return (
        <div className="flex gap-6 mb-6">
            <Card
                onClick={() => handleFilterClick('overall')}
                className={`flex-1 p-8 cursor-pointer border-2 border-blue-500 transition-transform transform hover:scale-105 ${
                    activeFilter === 'overall' ? 'bg-blue-100 dark:bg-blue-900' : ''
                }`}
            >
                <CardContent className="flex items-center justify-between">
                    <Users size={48} className="text-blue-500" />
                    <div className="ml-4 text-right">
                        <CardTitle className="text-2xl">Overall</CardTitle>
                        <p className="text-4xl font-bold">{overallCount}</p>
                    </div>
                </CardContent>
            </Card>

            <Card
                onClick={() => handleFilterClick('online')}
                className={`flex-1 p-8 cursor-pointer border-2 border-green-500 transition-transform transform hover:scale-105 ${
                    activeFilter === 'online' ? 'bg-green-100 dark:bg-green-900' : ''
                }`}
            >
                <CardContent className="flex items-center justify-between">
                    <UserCheck size={48} className="text-green-500" />
                    <div className="ml-4 text-right">
                        <CardTitle className="text-2xl">Online</CardTitle>
                        <p className="text-4xl font-bold">{onlineCount}</p>
                    </div>
                </CardContent>
            </Card>

            <Card
                onClick={() => handleFilterClick('offline')}
                className={`flex-1 p-8 cursor-pointer border-2 border-red-500 transition-transform transform hover:scale-105 ${
                    activeFilter === 'offline' ? 'bg-red-100 dark:bg-red-900' : ''
                }`}
            >
                <CardContent className="flex items-center justify-between">
                    <UserX size={48} className="text-red-500" />
                    <div className="ml-4 text-right">
                        <CardTitle className="text-2xl">Offline</CardTitle>
                        <p className="text-4xl font-bold">{offlineCount}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}