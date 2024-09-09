import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	SortingState,
	getSortedRowModel,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	VisibilityState,
	useReactTable,
} from '@tanstack/react-table';

import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Button } from '../ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	addButton: React.ReactNode;
	searchQuery: string;
}
export function DataTable<TData, TValue>({
	columns,
	data,
	addButton,
	searchQuery,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});

	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	);
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),

		state: {
			sorting,
			columnVisibility,
			columnFilters,
		},
	});

	return (
		<div className="w-full flex justify-center items-center flex-col">
			<div className="w-full flex justify-between items-center py-4">
				<Input
					placeholder="Filter By ID"
					value={
						(table.getColumn(searchQuery)?.getFilterValue() as string) ?? ''
					}
					onChange={(event) =>
						table.getColumn(searchQuery)?.setFilterValue(event.target.value)
					}
					className="max-w-xs"
				/>
				<div>
					{/* <AddEmployee></AddEmployee> */}
					{addButton}
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

			<ScrollArea className=" 2xl:w-[1600px] md:w-[500px] lg:w-[950px] lg:h-[300px] md:h-[250px]  whitespace-nowrap rounded-md border">
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
				<ScrollBar orientation="horizontal" />
			</ScrollArea>

			<div className="w-full flex items-center justify-end space-x-2">
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
