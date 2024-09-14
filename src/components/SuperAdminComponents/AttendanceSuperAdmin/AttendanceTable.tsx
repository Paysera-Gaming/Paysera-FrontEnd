import React from 'react';
import { flexRender, useReactTable, ColumnDef, getCoreRowModel } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Attendance } from './types';
import { format } from 'date-fns';
import AttendanceActions from './AttendanceActions';

interface AttendanceTableProps {
  data: Attendance[];
  columns: ColumnDef<Attendance>[];
  dateRange: { from: Date | undefined; to: Date | undefined } | undefined;
  activeFilter: string;
  searchQuery: string;
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({ data, columns, dateRange, activeFilter, searchQuery }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const formattedFromDate = dateRange?.from ? format(dateRange.from, "LLL dd, y") : "N/A";
  const formattedToDate = dateRange?.to ? format(dateRange.to, "LLL dd, y") : "N/A";

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {!dateRange?.from || !dateRange?.to ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center text-gray-500">
                Please select a start date and end date to view attendance records.
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                <TableCell>
                  <AttendanceActions attendance={row.original} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center text-gray-500">
                {searchQuery ? (
                  <>
                    No results found for "{searchQuery}".<br />
                    No employee attendance records found for {formattedFromDate} to {formattedToDate} for {activeFilter} schedule type.<br />
                    Please select a different date range to view previous attendance records.
                  </>
                ) : (
                  <>
                    No employee attendance records found for {formattedFromDate} to {formattedToDate} for {activeFilter} schedule type.<br />
                    Please select a different date range to view previous attendance records.
                  </>
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AttendanceTable;