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
import EditRole from '../TeamLeadComponents/DialogForms/EditRole';
import RemoveDialog from '../TeamLeadComponents/DialogForms/RemovalDialog';
import { deleteEmployee, TEmployee } from '@/api/EmployeeAPI';
import { useUserStore } from '@/stores/userStore';

export function formatDate(date: Date): string {
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
	const day = String(date.getDate()).padStart(2, '0');
	const year = date.getFullYear();

	return `${month}-${day}-${year}`;
}

export const employeeColumns: ColumnDef<TEmployee>[] = [
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
		accessorKey: 'username',
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
		accessorKey: 'lastName',
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
		accessorKey: 'firstName',

		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					First Name
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: 'middleName',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Middle Name
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{ accessorKey: 'role', header: 'Role' },

	{
		id: 'actions',
		cell: ({ row }) => {
			const employee = row.original;
			const user = useUserStore.getState().getUser();
			const departmentId = user?.departmentId;

			if (departmentId == undefined) {
				throw new Error('No Department Id Found');
			}
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
							<EditRole employeeInfo={employee}></EditRole>
						</DropdownMenuItem>

						<DropdownMenuItem asChild>
							<RemoveDialog
								deleteRequest={deleteEmployee}
								employeeID={row.original.id}
								departmentId={departmentId}
							></RemoveDialog>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
