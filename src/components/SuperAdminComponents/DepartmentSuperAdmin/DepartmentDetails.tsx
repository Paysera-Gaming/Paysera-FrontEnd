"use client"

import * as React from "react"
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  filterFns,
} from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Department, Employee } from './api';

interface DepartmentDetailsProps {
  department: Department;
  onBack: () => void;
}

const DepartmentDetails: React.FC<DepartmentDetailsProps> = ({ department, onBack }) => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = React.useState<string>("")

  const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: 'lastName',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: 'firstName',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          First Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => (
        <div>{row.original.role === 'Team Leader' ? 'Team Leader' : row.original.role}</div>
      ),
    },
  ];

  const table = useReactTable({
    data: department.Employees || [],
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter,
    },
    globalFilterFn: filterFns.includesString,
  });

  return (
    <div className="container mx-auto p-4 dark:text-white">
      <div className="flex justify-start items-center mb-4 space-x-4">
        <Input
          placeholder="Filter by first name, last name, or role..."
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
        <Button
          onClick={onBack}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-800"
        >
          Back
        </Button>
      </div>
      <h1 className="text-2xl font-bold mb-4">{department.name}</h1>
      <div className="flex justify-between mb-2">
        <p>
          Leader: {department.Leader ? `${department.Leader.firstName} ${department.Leader.lastName}` : 'No Leader Assigned'}
        </p>
        <p>
          Total Employees: {department.Employees?.length || 0}
        </p>
      </div>
      <div className="rounded-md border border-gray-200 dark:border-gray-700 dark:bg-transparent">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-700 dark:text-gray-300">Last Name</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300">First Name</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300">Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-300">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-300">
                  No Employees
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DepartmentDetails;