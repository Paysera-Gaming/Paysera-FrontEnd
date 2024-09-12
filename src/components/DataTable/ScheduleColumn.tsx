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

export const ScheduleContext = createContext<TSchedule | undefined>(undefined);
// overhaul the schedule interface

// {
//   "id": 0,
//   "scheduleId": 0,
//   "name": "IT Department Schedule AM",
//   "Schedule": {
//     "id": 0,
//     "day": "MONDAY",
//     "name": "string",
//     "description": "string",
//     "scheduleType": "FIXED",
//     "fixedStartTime": "2024-09-12T09:57:54.680Z",
//     "fixedEndTime": "2024-09-12T09:57:54.680Z",
//     "flexStartTime": "2024-09-12T09:57:54.680Z",
//     "flexEndTime": "2024-09-12T09:57:54.680Z",
//     "limitWorkHoursDay": 0,
//     "allowedOvertime": true,
//     "lunchStartTime": "2024-09-12T09:57:54.680Z",
//     "lunchEndTime": "2024-09-12T09:57:54.680Z",
//     "isDepartmentSchedule": true,
//     "isTemplateBased": true,
//     "DepartmentSchedule": [
//       "string"
//     ],
//     "updatedAt": "2024-09-12T09:57:54.680Z",
//     "createdAt": "2024-09-12T09:57:54.680Z"
//   },
//   "departmentId": 0,
//   "updatedAt": "2024-09-12T09:57:54.680Z",
//   "createdAt": "2024-09-12T09:57:54.680Z"
// }

export interface TSchedule {
	id: number;
	role: string;
	name: string;
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

	joe: { name: string; age: number };
}

// eslint-disable-next-line react-refresh/only-export-components
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
		accessorKey: 'name',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Name
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
							<ScheduleContext.Provider value={row.original}>
								<RefEditSchedule></RefEditSchedule>
							</ScheduleContext.Provider>
						</DropdownMenuItem>

						<DropdownMenuItem asChild>
							<RefRemoveDialog></RefRemoveDialog>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
