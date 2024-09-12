import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';

interface AttendanceSummaryCardsProps {
    overallCount: number;
    fixedCount: number;
    superFlexiCount: number;
    flexiCount: number;
    activeFilter: string;
    handleFilterClick: (filter: string) => void;
    overallCounts: { break: number; done: number; unpaidLeave: number; paidLeave: number; ongoing: number };
    fixedCounts: { break: number; done: number; unpaidLeave: number; paidLeave: number; ongoing: number };
    superFlexiCounts: { break: number; done: number; unpaidLeave: number; paidLeave: number; ongoing: number };
    flexiCounts: { break: number; done: number; unpaidLeave: number; paidLeave: number; ongoing: number };
}

export default function AttendanceSummaryCards({
    overallCount,
    fixedCount,
    superFlexiCount,
    flexiCount,
    activeFilter,
    handleFilterClick,
    overallCounts,
    fixedCounts,
    superFlexiCounts,
    flexiCounts,
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
                        <div className="text-sm">
                            <p>BREAK: {overallCounts.break}</p>
                            <p>DONE: {overallCounts.done}</p>
                            <p>UNPAID_LEAVE: {overallCounts.unpaidLeave}</p>
                            <p>PAID_LEAVE: {overallCounts.paidLeave}</p>
                            <p>ONGOING: {overallCounts.ongoing}</p>
                        </div>
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
                        <div className="text-sm">
                            <p>BREAK: {fixedCounts.break}</p>
                            <p>DONE: {fixedCounts.done}</p>
                            <p>UNPAID_LEAVE: {fixedCounts.unpaidLeave}</p>
                            <p>PAID_LEAVE: {fixedCounts.paidLeave}</p>
                            <p>ONGOING: {fixedCounts.ongoing}</p>
                        </div>
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
                        <div className="text-sm">
                            <p>BREAK: {superFlexiCounts.break}</p>
                            <p>DONE: {superFlexiCounts.done}</p>
                            <p>UNPAID_LEAVE: {superFlexiCounts.unpaidLeave}</p>
                            <p>PAID_LEAVE: {superFlexiCounts.paidLeave}</p>
                            <p>ONGOING: {superFlexiCounts.ongoing}</p>
                        </div>
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
                        <div className="text-sm">
                            <p>BREAK: {flexiCounts.break}</p>
                            <p>DONE: {flexiCounts.done}</p>
                            <p>UNPAID_LEAVE: {flexiCounts.unpaidLeave}</p>
                            <p>PAID_LEAVE: {flexiCounts.paidLeave}</p>
                            <p>ONGOING: {flexiCounts.ongoing}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}