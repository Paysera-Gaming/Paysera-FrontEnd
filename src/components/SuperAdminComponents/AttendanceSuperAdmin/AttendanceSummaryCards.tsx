import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Clock, Calendar, Activity, Shuffle } from 'lucide-react';

interface AttendanceSummaryCardsProps {
    overallCount: number;
    fixedCount: number;
    SUPER_FLEXICount: number;
    flexiCount: number;
    activeFilter: string;
    handleFilterClick: (filter: string) => void;
    overallCounts: { ongoing: number; done: number; paidLeave: number };
    fixedCounts: { ongoing: number; done: number; paidLeave: number };
    SUPER_FLEXICounts: { ongoing: number; done: number; paidLeave: number };
    flexiCounts: { ongoing: number; done: number; paidLeave: number };
}

export default function AttendanceSummaryCards({
    overallCount,
    fixedCount,
    SUPER_FLEXICount,
    flexiCount,
    activeFilter,
    handleFilterClick,
    overallCounts,
    fixedCounts,
    SUPER_FLEXICounts,
    flexiCounts,
}: AttendanceSummaryCardsProps) {
    return (
        <div className="flex flex-wrap gap-2 mb-2">
            <Card
                onClick={() => handleFilterClick('overall')}
                className={`flex-1 p-2 cursor-pointer border-2 border-gray-500 transition-transform transform hover:scale-105 ${
                    activeFilter === 'overall' ? 'bg-gray-100 dark:bg-gray-900' : ''
                }`}
                style={{ minHeight: '80px' }} // Set a smaller height for the cards
            >
                <CardContent className="flex items-center justify-between">
                    <Clock size={24} className="text-gray-500" />
                    <div className="ml-1 text-right">
                        <CardTitle className="text-sm">Overall</CardTitle>
                        <p className="text-lg font-bold">{overallCount}</p>
                        <div className="text-xs">
                            <p>ONGOING: {overallCounts.ongoing}</p>
                            <p>DONE: {overallCounts.done}</p>
                            <p>PAID_LEAVE: {overallCounts.paidLeave}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card
                onClick={() => handleFilterClick('fixed')}
                className={`flex-1 p-2 cursor-pointer border-2 border-blue-500 transition-transform transform hover:scale-105 ${
                    activeFilter === 'fixed' ? 'bg-blue-100 dark:bg-blue-900' : ''
                }`}
                style={{ minHeight: '80px' }} // Set a smaller height for the cards
            >
                <CardContent className="flex items-center justify-between">
                    <Calendar size={24} className="text-blue-500" />
                    <div className="ml-1 text-right">
                        <CardTitle className="text-sm">Fixed</CardTitle>
                        <p className="text-lg font-bold">{fixedCount}</p>
                        <div className="text-xs">
                            <p>ONGOING: {fixedCounts.ongoing}</p>
                            <p>DONE: {fixedCounts.done}</p>
                            <p>PAID_LEAVE: {fixedCounts.paidLeave}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card
                onClick={() => handleFilterClick('SUPER_FLEXI')}
                className={`flex-1 p-2 cursor-pointer border-2 border-green-500 transition-transform transform hover:scale-105 ${
                    activeFilter === 'SUPER_FLEXI' ? 'bg-green-100 dark:bg-green-900' : ''
                }`}
                style={{ minHeight: '80px' }} // Set a smaller height for the cards
            >
                <CardContent className="flex items-center justify-between">
                    <Activity size={24} className="text-green-500" />
                    <div className="ml-1 text-right">
                        <CardTitle className="text-sm">Super Flexi</CardTitle>
                        <p className="text-lg font-bold">{SUPER_FLEXICount}</p>
                        <div className="text-xs">
                            <p>ONGOING: {SUPER_FLEXICounts.ongoing}</p>
                            <p>DONE: {SUPER_FLEXICounts.done}</p>
                            <p>PAID_LEAVE: {SUPER_FLEXICounts.paidLeave}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card
                onClick={() => handleFilterClick('flexi')}
                className={`flex-1 p-2 cursor-pointer border-2 border-yellow-500 transition-transform transform hover:scale-105 ${
                    activeFilter === 'flexi' ? 'bg-yellow-100 dark:bg-yellow-900' : ''
                }`}
                style={{ minHeight: '80px' }} // Set a smaller height for the cards
            >
                <CardContent className="flex items-center justify-between">
                    <Shuffle size={24} className="text-yellow-500" />
                    <div className="ml-1 text-right">
                        <CardTitle className="text-sm">Flexi</CardTitle>
                        <p className="text-lg font-bold">{flexiCount}</p>
                        <div className="text-xs">
                            <p>ONGOING: {flexiCounts.ongoing}</p>
                            <p>DONE: {flexiCounts.done}</p>
                            <p>PAID_LEAVE: {flexiCounts.paidLeave}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}