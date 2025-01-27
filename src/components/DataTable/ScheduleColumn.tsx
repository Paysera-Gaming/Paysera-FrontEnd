import { ArrowUpDown } from 'lucide-react';
import { createContext, forwardRef } from 'react';
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
import { TDepartmentSchedules } from '@/api/ScheduleAPI';
import { format } from 'date-fns';
export const ScheduleContext = createContext<TDepartmentSchedules | undefined>(
	undefined
);

function dateToHours(date: Date) {
	return format(date, 'HH:mm');
}
// overhaul the schedule interface

// eslint-disable-next-line react-refresh/only-export-components
export const scheduleColumns: ColumnDef<TDepartmentSchedules>[] = [
	{
		accessorKey: 'name',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Schedule Name
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: 'Schedule.scheduleType',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Schedule Type
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
		accessorKey: 'Schedule.startTime',
		header: 'Start Time',
		cell: ({ row }) => {
			return dateToHours(new Date(row.getValue('Schedule_startTime')));
		},
	},
	{
		accessorKey: 'Schedule.endTime',
		header: 'End Time',
		cell: ({ row }) => {
			return dateToHours(new Date(row.getValue('Schedule_endTime')));
		},
	},

	{
		accessorKey: 'Schedule.limitWorkHoursDay',
		header: 'Work Hours Limit',
	},

	{
		accessorKey: 'Schedule.allowedOvertime',
		header: 'Allowed Overtime',
		cell: ({ row }) => {
			const isAllowed: boolean = row.getValue('Schedule_allowedOvertime');

			return (
				<Badge
					variant={
						row.getValue('Schedule_allowedOvertime') ? 'default' : 'destructive'
					}
				>
					{isAllowed ? 'Yes' : 'No'}
				</Badge>
			);
		},
	},

	// {
	// 	accessorKey: 'Schedule.lunchStartTime',
	// 	header: 'Lunch Start Time',
	// 	cell: ({ row }) => {
	// 		return dateToHours(new Date(row.getValue('Schedule_lunchStartTime')));
	// 	},
	// },

	// {
	// 	accessorKey: 'Schedule.lunchEndTime',
	// 	header: 'Lunch End Time',
	// 	cell: ({ row }) => {
	// 		return dateToHours(new Date(row.getValue('Schedule_lunchEndTime')));
	// 	},
	// },
	{
		accessorKey: 'createdAt',
		header: 'Created At',
		cell: ({ row }) => {
			return formatDate(new Date(row.getValue('createdAt')));
		},
	},
	{
		accessorKey: 'updatedAt',
		header: 'Updated At',
		cell: ({ row }) => {
			return formatDate(new Date(row.getValue('updatedAt')));
		},
	},

	// action
	{
		id: 'actions',
		cell: ({ row }) => {
			const RefRemoveDialog = forwardRef(RemoveScheduleDialog);
			const RefEditSchedule = forwardRef(EditSchedule);
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

						<DropdownMenuItem asChild>
							<ScheduleContext.Provider value={'BOOBS'}>
								<RefEditSchedule></RefEditSchedule>
							</ScheduleContext.Provider>
						</DropdownMenuItem>

						<DropdownMenuItem asChild>
							<ScheduleContext.Provider value={'BOOVS'}>
								<RefRemoveDialog></RefRemoveDialog>
							</ScheduleContext.Provider>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
