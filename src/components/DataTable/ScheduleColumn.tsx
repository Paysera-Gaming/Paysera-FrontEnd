export interface TSchedule {
	id: number;
	role: string;
	scheduleId: number;
	departmentId: number;
	updatedAt: Date;
	createdAt: Date;
	scheduleType: 'FIXED' | 'SUPER_FLEXI' | 'FLEXI';
	startTime: Date;
	endTime: Date;
	limitWorkHoursDay: number;
	allowedOvertime: boolean;
	lunchStartTime: Date;
	lunchEndTime: Date;
}
import { ArrowUpDown } from 'lucide-react';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '../ui/button';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import EditSchedule from '../TeamLeadComponents/DialogForms/EditSchedule';
import RemoveScheduleDialog from '../TeamLeadComponents/DialogForms/RemoveSchedule';
import { formatDate } from './DataColumns';
import { Badge } from '../ui/badge';

export const scheduleColumns: ColumnDef<TSchedule>[] = [
	{
		accessorKey: 'id',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					ID
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},

	{
		accessorKey: 'role',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Role
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: 'scheduleId',
		header: 'Schedule ID',
	},
	{
		accessorKey: 'createdAt',
		header: 'Created At',
		cell: ({ row }) => {
			return formatDate(row.getValue('createdAt'));
		},
	},
	{
		accessorKey: 'updatedAt',
		header: 'Updated At',
		cell: ({ row }) => {
			return formatDate(row.getValue('updatedAt'));
		},
	},
	{
		accessorKey: 'scheduleType',
		header: 'Schedule Type',
	},
	{
		accessorKey: 'startTime',
		header: 'Start Time',
		cell: ({ row }) => {
			return formatDate(row.getValue('startTime'));
		},
	},
	{
		accessorKey: 'endTime',
		header: 'End Time',
		cell: ({ row }) => {
			return formatDate(row.getValue('endTime'));
		},
	},

	{
		accessorKey: 'limitWorkHoursDay',
		header: 'Work Hours Limit',
	},

	{
		accessorKey: 'allowedOvertime',
		header: 'Allowed Overtime',
		cell: ({ row }) => {
			const isAllowed: boolean = row.getValue('allowedOvertime');

			return (
				<Badge
					variant={row.getValue('allowedOvertime') ? 'default' : 'destructive'}
				>
					{isAllowed ? 'Yes' : 'No'}
				</Badge>
			);
		},
	},

	{
		accessorKey: 'lunchStartTime',
		header: 'Lunch Start Time',
		cell: ({ row }) => {
			return formatDate(row.getValue('lunchStartTime'));
		},
	},

	{
		accessorKey: 'lunchEndTime',
		header: 'Lunch End Time',
		cell: ({ row }) => {
			return formatDate(row.getValue('lunchEndTime'));
		},
	},

	// action
	{
		id: 'actions',
		cell: ({ row }) => {
			const employee = row.original;

			return (
				// try to make this drop down into a stupid standalone
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4"></MoreHorizontal>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="start">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>

						<DropdownMenuSeparator />

						<DropdownMenu>
							<EditSchedule employeeRole={employee.role}></EditSchedule>
						</DropdownMenu>

						<DropdownMenuItem asChild>
							<RemoveScheduleDialog></RemoveScheduleDialog>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
