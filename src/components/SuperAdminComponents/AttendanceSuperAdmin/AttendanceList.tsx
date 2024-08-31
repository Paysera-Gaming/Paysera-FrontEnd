import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { DatePickerDemo } from './DatePickerDemo';
import { SummaryCard } from './SummaryCard';
import { AttendanceTable } from './AttendanceTable';
import { Users, UserCheck, Coffee, Clock } from 'lucide-react';

// Sample data for demonstration
const sampleAttendance = [
    {
        id: 1,
        fullName: 'Doe, John M',
        type: 'Fixed',
        date: '2024-08-31',
        startTime: '09:00 AM',
        endTime: '06:00 PM',
        workHours: 8,
        lunchHours: 1,
        totalHours: 9,
        situation: 'On Job',
    },
    {
        id: 2,
        fullName: 'Smith, Jane A',
        type: 'Flexible',
        date: '2024-08-31',
        startTime: '08:30 AM',
        endTime: '05:30 PM',
        workHours: 7.5,
        lunchHours: 1,
        totalHours: 8.5,
        situation: 'Lunch',
    },
    {
        id: 3,
        fullName: 'Johnson, Emily R',
        type: 'Super Flexible',
        date: '2024-08-31',
        startTime: '10:00 AM',
        endTime: '07:00 PM',
        workHours: 7,
        lunchHours: 1,
        totalHours: 8,
        situation: 'Leave',
    },
];

export default function AttendanceList() {
    const [attendanceData] = useState(sampleAttendance);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('overall');

    // Filter attendance data based on selected filter and search term
    const filteredAttendance = attendanceData
        .filter((att) => {
            if (activeFilter === 'onJob') {
                return att.situation === 'On Job';
            } else if (activeFilter === 'lunch') {
                return att.situation === 'Lunch';
            } else if (activeFilter === 'leave') {
                return att.situation === 'Leave';
            }
            return true; // Show all records if the overall filter is selected
        })
        .filter((att) =>
            att.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            att.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            att.situation.toLowerCase().includes(searchTerm.toLowerCase())
        );

    // Calculate summary counts
    const overallCount = attendanceData.length;
    const onJobCount = attendanceData.filter((att) => att.situation === 'On Job').length;
    const lunchCount = attendanceData.filter((att) => att.situation === 'Lunch').length;
    const leaveCount = attendanceData.filter((att) => att.situation === 'Leave').length;

    const typeCounts = {
        Fixed: attendanceData.filter((att) => att.type === 'Fixed').length,
        Flexible: attendanceData.filter((att) => att.type === 'Flexible').length,
        'Super Flexible': attendanceData.filter((att) => att.type === 'Super Flexible').length,
    };

    // Calculate counts for each situation type
    const situationTypeCounts = {
        onJob: {
            Fixed: attendanceData.filter((att) => att.situation === 'On Job' && att.type === 'Fixed').length,
            Flexible: attendanceData.filter((att) => att.situation === 'On Job' && att.type === 'Flexible').length,
            'Super Flexible': attendanceData.filter((att) => att.situation === 'On Job' && att.type === 'Super Flexible').length,
        },
        lunch: {
            Fixed: attendanceData.filter((att) => att.situation === 'Lunch' && att.type === 'Fixed').length,
            Flexible: attendanceData.filter((att) => att.situation === 'Lunch' && att.type === 'Flexible').length,
            'Super Flexible': attendanceData.filter((att) => att.situation === 'Lunch' && att.type === 'Super Flexible').length,
        },
        leave: {
            Fixed: attendanceData.filter((att) => att.situation === 'Leave' && att.type === 'Fixed').length,
            Flexible: attendanceData.filter((att) => att.situation === 'Leave' && att.type === 'Flexible').length,
            'Super Flexible': attendanceData.filter((att) => att.situation === 'Leave' && att.type === 'Super Flexible').length,
        }
    };

    return (
        <div className="p-4 space-y-4">
            <div className="flex items-center gap-2 mb-4">
                <Input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-xs"
                />
                <DatePickerDemo /> {/* Calendar Button moved next to the search bar */}
            </div>

            {/* Summary Cards with Filter Functionality */}
            <div className="flex gap-4 mb-4">
                <SummaryCard
                    title="Overall"
                    count={overallCount}
                    typeCounts={typeCounts}
                    icon={<Users size={32} className="text-blue-500" />}
                    active={activeFilter === 'overall'}
                    onClick={() => setActiveFilter('overall')}
                />
                <SummaryCard
                    title="On Job"
                    count={onJobCount}
                    typeCounts={situationTypeCounts.onJob}
                    icon={<UserCheck size={32} className="text-green-500" />}
                    active={activeFilter === 'onJob'}
                    onClick={() => setActiveFilter('onJob')}
                />
                <SummaryCard
                    title="Lunch"
                    count={lunchCount}
                    typeCounts={situationTypeCounts.lunch}
                    icon={<Coffee size={32} className="text-yellow-500" />}
                    active={activeFilter === 'lunch'}
                    onClick={() => setActiveFilter('lunch')}
                />
                <SummaryCard
                    title="Leave"
                    count={leaveCount}
                    typeCounts={situationTypeCounts.leave}
                    icon={<Clock size={32} className="text-red-500" />}
                    active={activeFilter === 'leave'}
                    onClick={() => setActiveFilter('leave')}
                />
            </div>

            {/* Attendance Table */}
            <AttendanceTable attendanceData={filteredAttendance} />
        </div>
    );
}