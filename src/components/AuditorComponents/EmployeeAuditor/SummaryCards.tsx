import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { User, Users, Shield } from 'lucide-react';
import { EmployeeCounts } from './types'; // Import the shared EmployeeCounts type

interface EmployeeSummaryCardsProps {
    counts: EmployeeCounts;
    activeFilter: string;
    handleFilterClick: (filter: string) => void;
}

export default function EmployeeSummaryCards({
    counts,
    activeFilter,
    handleFilterClick,
}: EmployeeSummaryCardsProps) {
    return (
        <div className="flex flex-wrap gap-2 mb-2">
            <Card
                onClick={() => handleFilterClick('overall')}
                className={`flex-1 p-2 cursor-pointer border-2 border-gray-500 transition-transform transform hover:scale-105 ${
                    activeFilter === 'overall' ? 'bg-gray-100 dark:bg-gray-900' : ''
                }`}
                style={{ minHeight: '80px' }}
            >
                <CardContent className="flex items-center">
                    <User size={24} className="text-gray-500 mr-2" />
                    <div className="text-right flex-1">
                        <CardTitle className="text-sm">Overall</CardTitle>
                        <p className="text-lg font-bold">{counts.overall.employee + counts.overall.teamLeader + counts.overall.auditor}</p>
                        <p className="text-sm">Employees: {counts.overall.employee}</p>
                        <p className="text-sm">Team Leaders: {counts.overall.teamLeader}</p>
                        <p className="text-sm">Auditors: {counts.overall.auditor}</p>
                    </div>
                </CardContent>
            </Card>

            <Card
                onClick={() => handleFilterClick('online')}
                className={`flex-1 p-2 cursor-pointer border-2 border-green-500 transition-transform transform hover:scale-105 ${
                    activeFilter === 'online' ? 'bg-green-100 dark:bg-green-900' : ''
                }`}
                style={{ minHeight: '80px' }}
            >
                <CardContent className="flex items-center">
                    <Users size={24} className="text-green-500 mr-2" />
                    <div className="text-right flex-1">
                        <CardTitle className="text-sm">Online</CardTitle>
                        <p className="text-lg font-bold">{counts.online.employee + counts.online.teamLeader + counts.online.auditor}</p>
                        <p className="text-sm">Employees: {counts.online.employee}</p>
                        <p className="text-sm">Team Leaders: {counts.online.teamLeader}</p>
                        <p className="text-sm">Auditors: {counts.online.auditor}</p>
                    </div>
                </CardContent>
            </Card>

            <Card
                onClick={() => handleFilterClick('offline')}
                className={`flex-1 p-2 cursor-pointer border-2 border-red-500 transition-transform transform hover:scale-105 ${
                    activeFilter === 'offline' ? 'bg-red-100 dark:bg-red-900' : ''
                }`}
                style={{ minHeight: '80px' }}
            >
                <CardContent className="flex items-center">
                    <Shield size={24} className="text-red-500 mr-2" />
                    <div className="text-right flex-1">
                        <CardTitle className="text-sm">Offline</CardTitle>
                        <p className="text-lg font-bold">{counts.offline.employee + counts.offline.teamLeader + counts.offline.auditor}</p>
                        <p className="text-sm">Employees: {counts.offline.employee}</p>
                        <p className="text-sm">Team Leaders: {counts.offline.teamLeader}</p>
                        <p className="text-sm">Auditors: {counts.offline.auditor}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}