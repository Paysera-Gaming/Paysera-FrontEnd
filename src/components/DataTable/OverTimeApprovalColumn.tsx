/* eslint-disable react-hooks/rules-of-hooks */
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { formatDate } from './DataColumns';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '../ui/button';
import { TAttendance } from '@/api/AttendanceAPI';
import { useMutation } from '@tanstack/react-query';
import { handleOvertimeRequest, TAcceptOvertime } from '@/api/OvertimeAPI';
import useConfirmationStore from '@/stores/GlobalAlertStore';
import { useState } from 'react';
import { toast } from 'sonner';
import { Badge } from '../ui/badge';

function dateToHours(date: Date) {
	return format(date, 'HH:mm');
}

//  overtime approval
// isAllowedOvertime: boolean;
// isRequestingOvertime: boolean;
// isRejectedOvertime: boolean;

// overtime
// limitOvertime: number;
// date: string;
// status: string;
// timeIn: string;
// timeOut: string;
// timeHoursWorked: number;
// overTimeTotal: number;
// timeTotal: number;

//

export const overtimeRequestColumns: ColumnDef<TAttendance>[] = [
	{
		accessorKey: 'employee.lastName',
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
			const employee = row.original.employee;
			return `${employee.lastName}  ${employee.firstName}`;
		},
	},

	{
		accessorKey: 'timeIn',
		header: 'Time Starts At',
		cell: ({ row }) => {
			const date = row.original.timeOut;
			return format(new Date(date as string), 'HH:mm') ?? 'NAH';
		},
	},
	{
		accessorKey: 'timeOut',
		header: 'Time Ends At',
		cell: ({ row }) => {
			const date = row.original.timeIn;
			return format(new Date(date as string), 'HH:mm') ?? 'NAH';
		},
	},

	{
		accessorKey: 'status',
		header: 'Attendance Status',
	},

	{ accessorKey: 'limitOvertime', header: 'Requested Hours To Work' },
	{
		accessorKey: 'timeHoursWorked',
		header: 'Hours Worked (No overtime calculated)',
	},

	{
		header: 'Created At',
		cell: ({ row }) => {
			const date = row.original.createdAt;
			return formatDate(new Date(date as string));
		},
	},
	{
		header: 'Last Update',
		cell: ({ row }) => {
			const date = row.original.updatedAt;
			return formatDate(new Date(date as string));
		},
	},
	{
		id: 'requests',
		header: 'Handle Request',
		// do apporval post here
		cell: ({ row }) => {
			// eslint-disable-next-line react-hooks/rules-of-hooks
			const mutation = useMutation({
				mutationFn: (body: TAcceptOvertime) =>
					handleOvertimeRequest({
						...body,
					}),
				onSettled: () => {
					setIsDisabled(false);
				},
				onSuccess: () => {
					toast.success('Request handled successfully');
				},
			});
			const { openConfirmation, closeConfirmation } = useConfirmationStore();
			const [isDisabled, setIsDisabled] = useState<boolean>(false);

			if (row.original.isRejectedOvertime == true) {
				return <Badge variant="destructive"> Rejected</Badge>;
			} else {
				return (
					<div className="flex gap-2">
						<Button
							disabled={isDisabled}
							onClick={() => {
								openConfirmation({
									title: `Approve ${row.original.employee.firstName}  ${
										row.original.employee.lastName + "'s"
									} Overtime Request?`,
									description:
										'Are you sure you would like to approve this overtime?',
									cancelLabel: 'Cancel',
									actionLabel: 'Approve Overtime',
									onAction: () => {
										setIsDisabled(true);
										mutation.mutate({
											employeeId: row.original.employeeId,
											isAllowedOvertime: true,
											limitOvertime: row.original.limitOvertime,
											isRejectedOvertime: false,
											timeStamp: new Date(),
										});
									},
									onCancel: () => {
										closeConfirmation();
									},
								});
							}}
						>
							Approve
						</Button>
						<Button
							disabled={isDisabled}
							onClick={() => {
								openConfirmation({
									title: `Reject  ${row.original.employee.firstName}  ${
										row.original.employee.lastName + "'s"
									} Overtime Request?`,
									description:
										'By clicking reject overtime, you are rejecting the overtime of the employee in his attendance?',
									cancelLabel: 'Cancel',
									actionLabel: 'Reject Overtime',
									onAction: () => {
										setIsDisabled(true);
										mutation.mutate({
											employeeId: row.original.employeeId,
											isAllowedOvertime: false,
											limitOvertime: row.original.limitOvertime,
											isRejectedOvertime: true,
											timeStamp: new Date(),
										});
									},
									onCancel: () => {
										closeConfirmation();
									},
								});
							}}
							variant="destructive"
						>
							Reject
						</Button>
					</div>
				);
			}
		},
	},
];
