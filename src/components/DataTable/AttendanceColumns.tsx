import { ColumnDef } from '@tanstack/react-table';
export type Payment = {
	userID: string;
	fName: string;
	lName: string;
	mName: string;
	role: string;
	timeIn: string;
	timeOut: string;
	lunchTimeIn: Date;
	lunchTimeOut: Date;
	lunchTimeTotal: number;
	timeHoursWorked: number;
	overTimeTotal: number;
	timeTotal: number;
	createdAt: Date;
	updatedAt: Date;
};

export const columns: ColumnDef<Payment>[] = [
	{
		accessorKey: 'userID',
		header: 'Username',
	},

	{
		accessorKey: 'lName',
		header: 'Last Name',
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
		header: 'Time-In',
	},
	{
		accessorKey: 'timeOut',
		header: 'Time-Out',
	},
	{
		accessorKey: 'TimeTotal',
		header: 'Time Worked total',
	},
	{
		accessorKey: 'lunchTimeIn',
		header: 'Lunch Time-In',
	},
	{
		accessorKey: 'lunchTimeOut',
		header: 'Lunch Time-Out',
	},
	{
		accessorKey: 'lunchTimeTotal',
		header: 'Lunch Time Total',
	},
	{
		accessorKey: 'overTimeTotal',
		header: 'Over Time Total',
	},

	// 	createdAt: Date;
	// updatedAt: Date;
	{ accessorKey: 'updatedAt', header: 'Updated At' },
];
