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
                        <CardTitle className="text-lg">Overall</CardTitle>
                        <p className="ml-2 text-2xl font-semibold">{overallCount}</p>
                    </div>
                </CardContent>
            </Card>

            <Card
                onClick={() => handleFilterClick('online')}
                className={`flex-1 p-4 cursor-pointer border-2 border-green-500 ${
                    activeFilter === 'online' ? 'bg-green-100 dark:bg-green-900' : ''
                }`}
            >
                <CardContent className="flex items-center">
                    <UserCheck size={32} className="text-green-500" />
                    <div className="ml-3 flex items-center">
                        <CardTitle className="text-lg">Online</CardTitle>
                        <p className="ml-2 text-2xl font-semibold">{onlineCount}</p>
                    </div>
                </CardContent>
            </Card>

            <Card
                onClick={() => handleFilterClick('offline')}
                className={`flex-1 p-4 cursor-pointer border-2 border-red-500 ${
                    activeFilter === 'offline' ? 'bg-red-100 dark:bg-red-900' : ''
                }`}
            >
                <CardContent className="flex items-center">
                    <UserX size={32} className="text-red-500" />
                    <div className="ml-3 flex items-center">
                        <CardTitle className="text-lg">Offline</CardTitle>
                        <p className="ml-2 text-2xl font-semibold">{offlineCount}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}