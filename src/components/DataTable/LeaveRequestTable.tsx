import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
	SortingState,
	getSortedRowModel,
	getFilteredRowModel,
	ColumnFiltersState,
	getPaginationRowModel,
	VisibilityState,
} from '@tanstack/react-table';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import React from 'react';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '../ui/input';
import useConfirmationStore from '@/stores/GlobalAlertStore.ts';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
	putAttendance,
	TAttendance,
	TPutRequestBody,
} from '@/api/AttendanceAPI';

interface DataTableProps {
	columns: ColumnDef<TAttendance, unknown>[];
	data: TAttendance[];
}

export function LeaveRequestTable({ columns, data }: DataTableProps) {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	);

	const queryClient = useQueryClient();

	const { openConfirmation, closeConfirmation } = useConfirmationStore();

	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});

	const table = useReactTable({
		data,
		columns,
		getSortedRowModel: getSortedRowModel(),
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	const handleOvertimeMutation = useMutation({
		mutationFn: (body: TPutRequestBody) =>
			putAttendance({
				id: body.id,
				RequestLeaveStatus: body.RequestLeaveStatus,
			}),
		onError: (error) => {
			toast.error('An Error has occured please check the logs');
			console.log(error);
		},
	});

	function approveMutationSelecetedOvertime() {
		table.getFilteredSelectedRowModel().rows.forEach((row) => {
			handleOvertimeMutation.mutate(
				{
					id: row.original.employeeId,
					RequestLeaveStatus: 'APPROVED_BY_TEAM_LEADER',
				},
				{
					onSuccess: () => {
						queryClient.invalidateQueries({ queryKey: ['AttendanceToday'] });
						queryClient.invalidateQueries({ queryKey: ['Attendance'] });
						toast.success('Approved selected');
						table.resetRowSelection();
					},
				}
			);
		});
		closeConfirmation();
	}
	function rejectMutationSelecetedOvertime() {
		table.getFilteredSelectedRowModel().rows.forEach((row) => {
			handleOvertimeMutation.mutate(
				{
					id: row.original.employeeId,
					RequestLeaveStatus: 'REJECTED_BY_TEAM_LEADER',
				},
				{
					onSuccess: () => {
						queryClient.invalidateQueries({ queryKey: ['AttendanceToday'] });
						queryClient.invalidateQueries({ queryKey: ['Attendance'] });
						toast.success('Approved selected');
						table.resetRowSelection();
					},
				}
			);
		});
		closeConfirmation();
	}

	return (
		<div className=" w-full flex items-center justify-center flex-col gap-4 mt-1">
			<div className="w-full flex items-center justify-between">
				<div className="flex items-center justify-center gap-2">
					<Input
						placeholder="Filter Employee via Last Name"
						value={
							(table
								.getColumn('employee_lastName')
								?.getFilterValue() as string) ?? ''
						}
						onChange={(event) =>
							table
								.getColumn('employee_lastName')
								?.setFilterValue(event.target.value)
						}
						className="w-[220px]"
					/>

					<div className="flex items-center justify-cent er gap-2">
						<Button
							variant={'default'}
							onClick={() => {
								openConfirmation({
									title:
										"Are you sure you want to accept these people's overtime?",
									description:
										'By clicking Approve you are approving the overtime of these employees.',
									actionLabel: 'Approve',
									cancelLabel: 'Cancel',
									onAction: () => {
										approveMutationSelecetedOvertime();
									},
									onCancel: () => {
										closeConfirmation();
									},
								});
							}}
						>
							Approve Selected
						</Button>
						<Button
							variant={'destructive'}
							onClick={() => {
								openConfirmation({
									title:
										"Are you sure you want to reject these people's overtime?",
									description:
										'By clicking reject you are rejecting the overtime of the selected employees.',
									actionLabel: 'Approve',
									cancelLabel: 'Cancel',
									onAction: () => {
										rejectMutationSelecetedOvertime();
									},
									onCancel: () => {
										closeConfirmation();
									},
								});
							}}
						>
							Reject Selected{' '}
						</Button>
					</div>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" className="ml-auto">
								View
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							{table
								.getAllColumns()
								.filter((column) => column.getCanHide())
								.map((column) => {
									return (
										<DropdownMenuCheckboxItem
											key={column.id}
											className="capitalize"
											checked={column.getIsVisible()}
											onCheckedChange={(value) =>
												column.toggleVisibility(!!value)
											}
										>
											{column.id}
										</DropdownMenuCheckboxItem>
									);
								})}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>

			<ScrollArea className="2xl:w-[1500px] md:w-[500px] lg:w-[950px] 2xl:h-[500px] h-[280px] whitespace-nowrap rounded-md border">
				<Table className="relative min-w-full ">
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
														// eslint-disable-next-line no-mixed-spaces-and-tabs
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
				<ScrollBar orientation="horizontal"></ScrollBar>
			</ScrollArea>
			<div className="w-full flex items-center justify-end space-x-2 py-4">
				<div className="flex w-[100px] items-center justify-center text-sm font-medium">
					Page {table.getState().pagination.pageIndex + 1} of{' '}
					{table.getPageCount()}
				</div>
				<div className="flex-1 text-sm text-muted-foreground">
					{table.getFilteredSelectedRowModel().rows.length} of{' '}
					{table.getFilteredRowModel().rows.length} row(s) selected.
				</div>

				<Button
					variant="outline"
					size="sm"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					Previous
				</Button>
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					Next
				</Button>
			</div>
		</div>
	);
}
