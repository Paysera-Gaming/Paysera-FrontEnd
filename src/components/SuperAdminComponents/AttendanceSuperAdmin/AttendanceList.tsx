import { useState } from 'react';
import { DatePickerDemo } from './DatePickerDemo';
import { SummaryCard } from './SummaryCard';
import { AttendanceTable } from './AttendanceTable';
import { Users, UserCheck, Coffee, Clock } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import SearchBar from './SearchBar'; // Import the new SearchBar component
import { exportToExcel } from './ExcelExport'; // Import the new exportToExcel function
import { DateRange } from 'react-day-picker';

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
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
    const [isFilterEmpty, setIsFilterEmpty] = useState(false);
    const [isSearchEmpty, setIsSearchEmpty] = useState(false);

    // Filter attendance data based on selected filter, search term, and date range
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
        )
        .filter((att) => {
            if (!dateRange?.from) return true;
            const attDate = new Date(att.date);
            return attDate >= dateRange.from && (!dateRange.to || attDate <= dateRange.to);
        });

    // Check if the filtered attendance data is empty
    const isEmpty = filteredAttendance.length === 0;
    if (isEmpty !== isFilterEmpty) {
        setIsFilterEmpty(isEmpty);
    }

    // Check if the search results are empty
    const isSearchResultEmpty = !!searchTerm && filteredAttendance.length === 0;
    if (isSearchResultEmpty !== isSearchEmpty) {
        setIsSearchEmpty(isSearchResultEmpty);
    }

    // Calculate summary counts based on filtered attendance data
    const overallCount = filteredAttendance.length;
    const onJobCount = filteredAttendance.filter((att) => att.situation === 'On Job').length;
    const lunchCount = filteredAttendance.filter((att) => att.situation === 'Lunch').length;
    const leaveCount = filteredAttendance.filter((att) => att.situation === 'Leave').length;

    const typeCounts = {
        Fixed: filteredAttendance.filter((att) => att.type === 'Fixed').length,
        Flexible: filteredAttendance.filter((att) => att.type === 'Flexible').length,
        'Super Flexible': filteredAttendance.filter((att) => att.type === 'Super Flexible').length,
    };

    // Calculate counts for each situation type based on filtered attendance data
    const situationTypeCounts = {
        onJob: {
            Fixed: filteredAttendance.filter((att) => att.situation === 'On Job' && att.type === 'Fixed').length,
            Flexible: filteredAttendance.filter((att) => att.situation === 'On Job' && att.type === 'Flexible').length,
            'Super Flexible': filteredAttendance.filter((att) => att.situation === 'On Job' && att.type === 'Super Flexible').length,
        },
        lunch: {
            Fixed: filteredAttendance.filter((att) => att.situation === 'Lunch' && att.type === 'Fixed').length,
            Flexible: filteredAttendance.filter((att) => att.situation === 'Lunch' && att.type === 'Flexible').length,
            'Super Flexible': filteredAttendance.filter((att) => att.situation === 'Lunch' && att.type === 'Super Flexible').length,
        },
        leave: {
            Fixed: filteredAttendance.filter((att) => att.situation === 'Leave' && att.type === 'Fixed').length,
            Flexible: filteredAttendance.filter((att) => att.situation === 'Leave' && att.type === 'Flexible').length,
            'Super Flexible': filteredAttendance.filter((att) => att.situation === 'Leave' && att.type === 'Super Flexible').length,
        }
    };

    return (
        <div className="p-4 space-y-4">
            <div className="flex items-center gap-2 mb-4">
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> {/* Use the new SearchBar component */}
                <DatePickerDemo onSubmit={setDateRange} /> {/* Pass the setDateRange function to DatePickerDemo */}
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
                    onClick={() => {
                        const startDate = dateRange?.from || new Date(); // Use the start date from the date range or the current date if not set
                        const endDate = dateRange?.to || new Date(); // Use the end date from the date range or the current date if not set
                        exportToExcel(filteredAttendance, 'paysera', startDate, endDate);
                    }}
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

            {/* Attendance Table or Error Message */}
            {isFilterEmpty ? (
                <div className="text-center text-gray-500 dark:text-gray-400">
                    {isSearchEmpty
                        ? `No results found for "${searchTerm}".`
                        : dateRange?.from && dateRange?.to
                        ? `No employees are present from ${dateRange.from.toLocaleDateString()} to ${dateRange.to.toLocaleDateString()}.`
                        : dateRange?.from
                        ? `No employees are present on ${dateRange.from.toLocaleDateString()}.`
                        : `No employees are present for the selected date range.`}
                </div>
            ) : (
                <AttendanceTable attendanceData={filteredAttendance} />
            )}
        </div>
    );
}