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

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '../ui/badge';
import { TPersonalSchedule, TWeekDaysArray } from '@/api/PersonalScheduleAPI';
import { Button } from '../ui/button';

function formatDate(date: Date): string {
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
	const day = String(date.getDate()).padStart(2, '0');
	const year = date.getFullYear();

	return `${month}-${day}-${year}`;
}

export default function personalScheduleColumn(): ColumnDef<TPersonalSchedule>[] {
	return [
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
			accessorKey: 'Employee.lastName',
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
				const employee = row.original.Employee;
				return `${employee.lastName}  ${employee.firstName}`;
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
			accessorKey: 'day',
			header: 'Days',
			cell: ({ row }) => {
				const lookUpDay = {
					MONDAY: 'Mon',
					TUESDAY: 'Tues',
					WEDNESDAY: 'Wed',
					THURSDAY: 'Thurs',
					FRIDAY: 'Fri',
					SATURDAY: 'Sat',
					SUNDAY: 'Sun',
				};

				const days = row.getValue('day') as TWeekDaysArray;
				const dayBadges = days.map((day) => {
					return <Badge className="mx-1">{lookUpDay[day]}</Badge>;
				});
				return <div> {dayBadges} </div>;
			},
		},

		{
			accessorKey: 'Schedule.startTime',
			header: 'Time Starts At',
			cell: ({ row }) => {
				const date = row.getValue('Schedule_startTime');
				return format(new Date(date as string), 'HH:mm');
			},
		},
		{
			accessorKey: 'Schedule.endTime',
			header: 'Time Ends At',
			cell: ({ row }) => {
				const date = row.getValue('Schedule_endTime');
				return format(new Date(date as string), 'HH:mm');
			},
		},
		{
			accessorKey: 'createdAt',
			header: 'Created At',
			cell: ({ row }) => {
				const date = row.getValue('createdAt');
				return formatDate(new Date(date as string));
			},
		},
		{
			accessorKey: 'updatedAt',
			header: 'Last Update',
			cell: ({ row }) => {
				const date = row.getValue('updatedAt');
				return formatDate(new Date(date as string));
			},
		},

		// action
		{
			id: 'actions',
			cell: ({ row }) => {
				// const RefRemoveDialog = forwardRef(RemoveScheduleDialog);
				// const RefEditSchedule = forwardRef(EditSchedule);

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
								{/* <ScheduleContext.Provider value={row.original}>
									<RefEditSchedule></RefEditSchedule>
								</ScheduleContext.Provider> */}
								amazing
							</DropdownMenuItem>

							<DropdownMenuItem asChild>
								{/* <ScheduleContext.Provider value={row.original}>
									<RefRemoveDialog></RefRemoveDialog>
								</ScheduleContext.Provider> */}
								amazing 2
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				);
			},
		},
	];
}
