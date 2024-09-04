'use client';

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
} from '@tanstack/react-table';

import { DatePicker } from '../TeamLeadComponents/AttendancePage/DatePicker';
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
	const table = useReactTable({
		data,
		columns,
		getSortedRowModel: getSortedRowModel(),
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			sorting,
			columnFilters,
		},
	});

	return (
		<div className="w-full flex items-center justify-center flex-col gap-4 mt-1">
			<div className="w-full flex items-center justify-between">
				<div className="flex items-center justify-center">
					<DatePicker></DatePicker>
					<Button className="ml-4">Search</Button>
				</div>
				<Input
					placeholder="Filter Employee via ID..."
					value={(table.getColumn('userID')?.getFilterValue() as string) ?? ''}
					onChange={(event) =>
						table.getColumn('userID')?.setFilterValue(event.target.value)
					}
					className="w-[220px]"
				/>
			</div>

			<ScrollArea className=" md:w-[500px] lg:w-[950px] lg:h-[300px] md:h-[250px]  whitespace-nowrap rounded-md border">
				<Table>
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
