import React, { useState } from 'react';
import { flexRender, useReactTable, ColumnDef, getCoreRowModel } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Attendance } from './types';
import { format } from 'date-fns';
import AttendanceActions from './AttendanceActions';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface AttendanceTableProps {
  data: Attendance[];
  columns: ColumnDef<Attendance>[];
  dateRange: { from: Date | undefined; to: Date | undefined } | undefined;
  activeFilter: string;
  searchQuery: string;
}

const formatNumber = (value: number) => {
  return value.toFixed(2);
};

const formatTime = (date: Date | null) => {
  if (!date) return '';
  return format(date, 'HH:mm'); // 24-hour format
};

const AttendanceTable: React.FC<AttendanceTableProps> = ({ data, columns, dateRange, activeFilter, searchQuery }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const formattedFromDate = dateRange?.from ? format(dateRange.from, "LLL dd, y") : "N/A";
  const formattedToDate = dateRange?.to ? format(dateRange.to, "LLL dd, y") : "N/A";

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(data.length / recordsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderCellValue = (cell: any) => {
    const value = cell.getValue();
    if (value === null || value === undefined) {
      return '';
    }
    if (typeof value === 'string' && (value === '7:30 AM' || value === '07:30 AM')) {
      return '0.00';
    }
    if (cell.column.id === 'timeIn' || cell.column.id === 'lunchTimeIn' || cell.column.id === 'lunchTimeOut' || cell.column.id === 'timeOut') {
      return formatTime(new Date(value));
    }
    return typeof value === 'number' ? formatNumber(value) : flexRender(cell.column.columnDef.cell, cell.getContext());
  };

  return (
    <div className="rounded-md border" style={{ maxWidth: '1100px', margin: '0 auto', overflowX: 'auto' }}>
      <Table style={{ width: '100%', fontSize: '12px' }}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} style={{ width: `${100 / columns.length}%`, fontSize: '12px' }}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {!dateRange?.from || !dateRange?.to ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center text-gray-500" style={{ fontSize: '12px' }}>
                Please select a start date and end date to view attendance records.
              </TableCell>
            </TableRow>
          ) : currentRecords.length ? (
            currentRecords.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {table.getRowModel().rows[rowIndex].getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} style={{ width: `${100 / columns.length}%`, fontSize: '12px' }}>
                    {renderCellValue(cell)}
                  </TableCell>
                ))}
                <TableCell style={{ width: `${100 / columns.length}%`, fontSize: '12px' }}>
                  <AttendanceActions attendance={row} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center text-gray-500" style={{ fontSize: '12px' }}>
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
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" onClick={() => handlePageChange(currentPage - 1)} />
          </PaginationItem>
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink href="#" isActive={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext href="#" onClick={() => handlePageChange(currentPage + 1)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default AttendanceTable;