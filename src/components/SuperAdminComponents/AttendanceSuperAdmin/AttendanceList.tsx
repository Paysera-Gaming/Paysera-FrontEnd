import { useState } from 'react';
import { DatePickerDemo } from './DatePickerDemo';
import { SummaryCard } from './SummaryCard';
import { AttendanceTable } from './AttendanceTable';
import { Users, UserCheck, Coffee, Clock } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import SearchBar from './SearchBar'; // Import the new SearchBar component
import { exportToExcel } from './ExcelExport'; // Import the new exportToExcel function

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
    const [typeFilter, setTypeFilter] = useState('all');

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
        .filter((att) => {
            if (typeFilter === 'Fixed') {
                return att.type === 'Fixed';
            } else if (typeFilter === 'Flexible') {
                return att.type === 'Flexible';
            } else if (typeFilter === 'Super Flexible') {
                return att.type === 'Super Flexible';
            }
            return true; // Show all records if no type filter is selected
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
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> {/* Use the new SearchBar component */}
                <DatePickerDemo /> {/* Calendar Button moved next to the search bar */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
                            Filter
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white dark:bg-gray-800 dark:text-white shadow-lg rounded-md mt-2">
                        <DropdownMenuItem onSelect={() => setTypeFilter('all')} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                            All
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setTypeFilter('Fixed')} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                            Fixed
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setTypeFilter('Flexible')} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                            Flexible
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setTypeFilter('Super Flexible')} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                            Super Flexible
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                    Filtered: {typeFilter !== 'all' ? typeFilter : 'All'}
                </span>
                <button
                    onClick={() => exportToExcel(filteredAttendance, 'attendance')}
                    className="ml-auto px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
                >
                    Export as Excel
                </button>
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
                    outlineColor="border-blue-500" // Outline color for Overall
                    activeColor="bg-blue-100 dark:bg-blue-900" // Active color for Overall
                />
                <SummaryCard
                    title="On Job"
                    count={onJobCount}
                    typeCounts={situationTypeCounts.onJob}
                    icon={<UserCheck size={32} className="text-green-500" />}
                    active={activeFilter === 'onJob'}
                    onClick={() => setActiveFilter('onJob')}
                    outlineColor="border-green-500" // Outline color for On Job
                    activeColor="bg-green-100 dark:bg-green-900" // Active color for On Job
                />
                <SummaryCard
                    title="Lunch"
                    count={lunchCount}
                    typeCounts={situationTypeCounts.lunch}
                    icon={<Coffee size={32} className="text-yellow-500" />}
                    active={activeFilter === 'lunch'}
                    onClick={() => setActiveFilter('lunch')}
                    outlineColor="border-yellow-500" // Outline color for Lunch
                    activeColor="bg-yellow-100 dark:bg-yellow-900" // Active color for Lunch
                />
                <SummaryCard
                    title="Leave"
                    count={leaveCount}
                    typeCounts={situationTypeCounts.leave}
                    icon={<Clock size={32} className="text-red-500" />}
                    active={activeFilter === 'leave'}
                    onClick={() => setActiveFilter('leave')}
                    outlineColor="border-red-500" // Outline color for Leave
                    activeColor="bg-red-100 dark:bg-red-900" // Active color for Leave
                />
            </div>

            {/* Attendance Table */}
            {filteredAttendance.length > 0 ? (
                <AttendanceTable attendanceData={filteredAttendance} />
            ) : (
                <div className="text-center text-gray-500 dark:text-gray-400">
                    {searchTerm
                        ? `No results found for "${searchTerm}".`
                        : `No ${typeFilter !== 'all' ? typeFilter : 'All'} employees are ${activeFilter !== 'overall' ? activeFilter : 'available'}.`}
                </div>
            )}
        </div>
    );
}