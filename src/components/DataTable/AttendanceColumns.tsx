import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { formatDate } from './DataColumns';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '../ui/button';
import { TAttendance } from '@/api/AttendanceAPI';
import { Badge } from '../ui/badge';

function dateToHours(date: Date) {
	return format(date, 'HH:mm');
}

export const attendanceColumns: ColumnDef<TAttendance>[] = [
	{
		accessorKey: 'employeeId',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Employee ID
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},

	{
		accessorKey: 'employee.lastName',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Last Name
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: 'employee.firstName',
		header: 'First Name',
	},
	{
		accessorKey: 'employee.middleName',
		header: 'Middle Name',
	},
	{ accessorKey: 'employee.role', header: 'role' },
	{
		accessorKey: 'timeIn',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Time-In
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			return dateToHours(new Date(row.getValue('timeIn')));
		},
	},
	{
		accessorKey: 'timeOut',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Time-Out
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			return dateToHours(new Date(row.getValue('timeOut')));
		},
	},
	{
		accessorKey: 'timeTotal',
		header: 'Gross Work Hours',
		cell: ({ row }) => {
			const timeTotal = row.getValue('timeTotal');

			if (timeTotal != null) {
				const roundedTimeTotal = Number((timeTotal as number).toFixed(2));
				return roundedTimeTotal;
			}
			return null;
		},
	},

	{
		accessorKey: 'timeHoursWorked',
		header: 'Net Work Hours',
	},

	{
		accessorKey: 'overTimeTotal',
		header: 'Overtime Hours',

		cell: ({ row }) => {
			if (row.original.overTimeTotal == undefined) {
				return 0;
			} else {
				return row.original.overTimeTotal;
			}
		},
	},
	{
		accessorKey: 'isAllowedOvertime',
		header: 'Overtime Approval',
		cell: ({ row }) => {
			if (row.original.isRejectedOvertime == true) {
				return <Badge variant="destructive">Rejected</Badge>;
			} else if (row.original.isAllowedOvertime == true) {
				return <Badge>Approved</Badge>;
			} else return <Badge variant="outline">Pending</Badge>;
		},
	},
	{
		accessorKey: 'status',
		header: 'Attendance Status',
		cell: ({ row }) => {
			return (
				<Badge
					variant={row.original.status == 'DONE' ? 'default' : 'secondary'}
				>
					{row.original.status}
				</Badge>
			);
		},
	},

	{
		accessorKey: 'updatedAt',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Updated At
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			return formatDate(new Date(row.getValue('updatedAt')));
		},
	},
	{
		accessorKey: 'createdAt',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Created At
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			return formatDate(new Date(row.getValue('createdAt')));
		},
	},
];
