import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { formatDate } from './DataColumns';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '../ui/button';
import { TAttendance } from '@/api/AttendanceAPI';

function dateToHours(date: Date) {
	return format(date, 'HH:mm');
}

//  overtime approval
// isAllowedOvertime: boolean;
// isRequestingOvertime: boolean;
// isRejectedOvertime: boolean;

// overtime
// limitOvertime: number;
// date: string;
// status: string;
// timeIn: string;
// timeOut: string;
// timeHoursWorked: number;
// overTimeTotal: number;
// timeTotal: number;

//

export const overtimeRequestColumns: ColumnDef<TAttendance>[] = [
	{
		accessorKey: 'employee.lastName',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Employee
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const employee = row.original.employee;
			return `${employee.lastName}  ${employee.firstName}`;
		},
	},

	{
		accessorKey: 'timeIn',
		header: 'Time Starts At',
		cell: ({ row }) => {
			const date = row.original.timeOut;
			return format(new Date(date as string), 'HH:mm') ?? 'NAH';
		},
	},
	{
		accessorKey: 'timeOut',
		header: 'Time Ends At',
		cell: ({ row }) => {
			const date = row.original.timeIn;
			return format(new Date(date as string), 'HH:mm') ?? 'NAH';
		},
	},

	{
		accessorKey: 'status',
		header: 'Attendance Status',
	},

	{ accessorKey: 'limitOvertime', header: 'Requested Hours To Work' },
	{
		accessorKey: 'timeHoursWorked',
		header: 'Hours Worked (No overtime calculated)',
	},

	{
		header: 'Created At',
		cell: ({ row }) => {
			const date = row.original.createdAt;
			return formatDate(new Date(date as string));
		},
	},
	{
		header: 'Last Update',
		cell: ({ row }) => {
			const date = row.original.updatedAt;
			return formatDate(new Date(date as string));
		},
	},
	{
		id: 'requests',
		header: 'Handle Request',
		// do apporval post here
	},
];
