import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';

interface AttendanceSummaryCardsProps {
    overallCount: number;
    fixedCount: number;
    superFlexiCount: number;
    flexiCount: number;
    activeFilter: string;
    handleFilterClick: (filter: string) => void;
}

export default function AttendanceSummaryCards({
    overallCount,
    fixedCount,
    superFlexiCount,
    flexiCount,
    activeFilter,
    handleFilterClick,
}: AttendanceSummaryCardsProps) {
    return (
        <div className="flex flex-wrap gap-4 mb-4">
            <Card
                onClick={() => handleFilterClick('overall')}
                className={`flex-1 p-4 cursor-pointer border-2 border-gray-500 transition-transform transform hover:scale-105 ${
                    activeFilter === 'overall' ? 'bg-gray-100 dark:bg-gray-900' : ''
                }`}
                style={{ minHeight: '100px' }} // Set a smaller height for the cards
            >
                <CardContent className="flex items-center justify-between">
                    <Clock size={32} className="text-gray-500" />
                    <div className="ml-2 text-right">
                        <CardTitle className="text-xl">Overall</CardTitle>
                        <p className="text-2xl font-bold">{overallCount}</p>
                    </div>
                </CardContent>
            </Card>

            <Card
                onClick={() => handleFilterClick('fixed')}
                className={`flex-1 p-4 cursor-pointer border-2 border-blue-500 transition-transform transform hover:scale-105 ${
                    activeFilter === 'fixed' ? 'bg-blue-100 dark:bg-blue-900' : ''
                }`}
                style={{ minHeight: '100px' }} // Set a smaller height for the cards
            >
                <CardContent className="flex items-center justify-between">
                    <Clock size={32} className="text-blue-500" />
                    <div className="ml-2 text-right">
                        <CardTitle className="text-xl">Fixed</CardTitle>
                        <p className="text-2xl font-bold">{fixedCount}</p>
                    </div>
                </CardContent>
            </Card>

            <Card
                onClick={() => handleFilterClick('superFlexi')}
                className={`flex-1 p-4 cursor-pointer border-2 border-green-500 transition-transform transform hover:scale-105 ${
                    activeFilter === 'superFlexi' ? 'bg-green-100 dark:bg-green-900' : ''
                }`}
                style={{ minHeight: '100px' }} // Set a smaller height for the cards
            >
                <CardContent className="flex items-center justify-between">
                    <Clock size={32} className="text-green-500" />
                    <div className="ml-2 text-right">
                        <CardTitle className="text-xl">Super Flexi</CardTitle>
                        <p className="text-2xl font-bold">{superFlexiCount}</p>
                    </div>
                </CardContent>
            </Card>

            <Card
                onClick={() => handleFilterClick('flexi')}
                className={`flex-1 p-4 cursor-pointer border-2 border-yellow-500 transition-transform transform hover:scale-105 ${
                    activeFilter === 'flexi' ? 'bg-yellow-100 dark:bg-yellow-900' : ''
                }`}
                style={{ minHeight: '100px' }} // Set a smaller height for the cards
            >
                <CardContent className="flex items-center justify-between">
                    <Clock size={32} className="text-yellow-500" />
                    <div className="ml-2 text-right">
                        <CardTitle className="text-xl">Flexi</CardTitle>
                        <p className="text-2xl font-bold">{flexiCount}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}