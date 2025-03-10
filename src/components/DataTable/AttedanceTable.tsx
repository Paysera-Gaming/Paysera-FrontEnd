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

import { DatePicker } from '../TeamLeadComponents/AttendancePage/DatePicker';
import React, { useEffect } from 'react';

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
interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function AttendanceTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	);
	const [selectedDate, setDate] = React.useState<string>();
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
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
		state: {
			sorting,
			columnFilters,
			columnVisibility,
		},
	});

	function checkDate(date: string) {
		setDate(date);
	}

	useEffect(() => {
		console.log(selectedDate);
		if (selectedDate) {
			table.getColumn('createdAt')?.setFilterValue(selectedDate);
		}
	}, [selectedDate, table]);

	return (
		<div className=" w-full flex items-center justify-center flex-col gap-4 mt-1">
			<div className="w-full flex items-center justify-between">
				<div className="flex items-center justify-center">
					<DatePicker updateParentState={checkDate}></DatePicker>
					<Button
						variant="outline"
						onClick={() => {
							table.getColumn('createdAt')?.setFilterValue('');
						}}
						className="ml-3"
					>
						Reset
					</Button>
				</div>

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
