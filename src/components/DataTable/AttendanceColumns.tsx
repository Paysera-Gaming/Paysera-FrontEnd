import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { formatDate } from './DataColumns';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '../ui/button';
export type TAttendanceColumn = {
	userID: string;
	fName: string;
	lName: string;
	mName: string;
	role: string;
	timeIn: Date;
	timeOut: Date;
	lunchTimeIn: Date;
	lunchTimeOut: Date;
	lunchTimeTotal: number;
	timeHoursWorked: number;
	overTimeTotal: number;
	timeTotal: number;
	createdAt: Date;
	updatedAt: Date;
};

function dateToHours(date: Date) {
	return format(date, 'HH:mm');
}

export const attendanceColumns: ColumnDef<TAttendanceColumn>[] = [
	{
		accessorKey: 'userID',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Username
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},

	{
		accessorKey: 'lName',
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
		accessorKey: 'fName',
		header: 'First Name',
	},
	{
		accessorKey: 'mName',
		header: 'Niddle Name',
	},
	{ accessorKey: 'role', header: 'role' },
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
			return dateToHours(row.getValue('timeIn'));
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
			return dateToHours(row.getValue('timeOut'));
		},
	},
	{
		accessorKey: 'timeTotal',
		header: 'Time Worked total',
	},
	{
		accessorKey: 'lunchTimeIn',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Lunch Time In
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			return dateToHours(row.getValue('lunchTimeIn'));
		},
	},
	{
		accessorKey: 'lunchTimeOut',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Lunch Time Out
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			return dateToHours(row.getValue('lunchTimeOut'));
		},
	},
	{
		accessorKey: 'lunchTimeTotal',
		header: 'Lunch Time Total',
	},
	{
		accessorKey: 'overTimeTotal',
		header: 'Over Time Total',
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
			return formatDate(row.getValue('updatedAt'));
		},
	},
];
