import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { formatDate } from './DataColumns';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '../ui/button';
import { TAttendance } from '@/api/AttendanceAPI';

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
		header: 'Time Worked total (in hours)',
		cell: ({ row }) => {
			const timeTotal = row.getValue('timeTotal');

			if (timeTotal != null) {
				const roundedTimeTotal = Number((timeTotal as number).toFixed(2));
				return roundedTimeTotal;
			}
			return null;
		},
	},
	// {
	// 	accessorKey: 'lunchTimeIn',
	// 	header: ({ column }) => {
	// 		return (
	// 			<Button
	// 				variant="ghost"
	// 				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
	// 			>
	// 				Lunch Time In
	// 				<ArrowUpDown className="ml-2 h-4 w-4" />
	// 			</Button>
	// 		);
	// 	},
	// 	cell: ({ row }) => {
	// 		return dateToHours(new Date(row.getValue('lunchTimeIn')));
	// 	},
	// },
	// {
	// 	accessorKey: 'lunchTimeOut',
	// 	header: ({ column }) => {
	// 		return (
	// 			<Button
	// 				variant="ghost"
	// 				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
	// 			>
	// 				Lunch Time Out
	// 				<ArrowUpDown className="ml-2 h-4 w-4" />
	// 			</Button>
	// 		);
	// 	},
	// 	cell: ({ row }) => {
	// 		return dateToHours(new Date(row.getValue('lunchTimeOut')));
	// 	},
	// },
	// {
	// 	accessorKey: 'lunchTimeTotal',
	// 	header: 'Lunch Time Total',
	// },
	// {
	// 	accessorKey: 'overTimeTotal',
	// 	header: 'Over Time Total',
	// },

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
