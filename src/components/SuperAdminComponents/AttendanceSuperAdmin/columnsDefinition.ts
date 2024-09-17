import { ColumnDef } from '@tanstack/react-table';
import { Attendance } from './types';
import { formatDate, formatTime, calculateWorkTimeTotal } from './utils';

export const columns: ColumnDef<Attendance>[] = [
	{
		accessorKey: 'employee.firstName',
		header: 'First Name',
	},
	{
		accessorKey: 'employee.lastName',
		header: 'Last Name',
	},
	{
		accessorKey: 'date',
		header: 'Date',
		cell: ({ row }) => formatDate(row.original.date),
	},
	{
		accessorKey: 'status',
		header: 'Status',
	},
	{
		accessorKey: 'scheduleType',
		header: 'Schedule Type',
	},
	{
		accessorKey: 'timeIn',
		header: 'Time In',
		cell: ({ row }) => formatTime(row.original.timeIn),
	},
	{
		accessorKey: 'lunchTimeIn',
		header: 'Lunch Time In',
		cell: ({ row }) => formatTime(row.original.lunchTimeIn),
	},
	{
		accessorKey: 'lunchTimeOut',
		header: 'Lunch Time Out',
		cell: ({ row }) => formatTime(row.original.lunchTimeOut),
	},
	{
		accessorKey: 'timeOut',
		header: 'Time Out',
		cell: ({ row }) => formatTime(row.original.timeOut),
	},
	{
		accessorKey: 'lunchTimeTotal',
		header: 'Lunch Time Total',
	},
	{
		accessorKey: 'timeHoursWorked',
		header: 'Work Time Total',
		cell: ({ row }) =>
			calculateWorkTimeTotal(
				row.original.timeIn,
				row.original.timeOut,
				row.original.lunchTimeTotal
			),
	},
	{
		accessorKey: 'overTimeTotal',
		header: 'Overtime Total',
	},
	{
		accessorKey: 'timeTotal',
		header: 'Total Time',
	},
];
