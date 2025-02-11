import type React from "react";
import { useState } from "react";
import { flexRender, useReactTable, type ColumnDef, getCoreRowModel, type Cell } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Attendance } from "./types";
import { format } from "date-fns";
import AttendanceActions from "./AttendanceActions";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
  if (!date) return "";
  return format(date, "HH:mm"); // 24-hour format
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
  const totalPages = Math.max(1, Math.ceil(data.length / recordsPerPage));

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderCellValue = (cell: Cell<Attendance, unknown>) => {
    const value = cell.getValue();
    if (value === null || value === undefined) {
      return "";
    }
    if (typeof value === "string" && (value === "7:30 AM" || value === "07:30 AM")) {
      return "0.00";
    }
    if (
      cell.column.id === "timeIn" ||
      cell.column.id === "lunchTimeIn" ||
      cell.column.id === "lunchTimeOut" ||
      cell.column.id === "timeOut"
    ) {
      return typeof value === "string" || typeof value === "number" ? formatTime(new Date(value)) : "";
    }
    if (cell.column.id === "status" && value === "PAID_LEAVE") {
      return "PAID LEAVE";
    }
    return typeof value === "number" ? formatNumber(value) : flexRender(cell.column.columnDef.cell, cell.getContext());
  };

  return (
    <Card className="w-full">
      <CardContent className="p-0">
        <div className="rounded-md border min-w-[1100px] mx-auto overflow-x-auto">
          <Table className="w-full text-sm">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="w-[calc(100%/columns.length)] text-sm">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {!dateRange?.from || !dateRange?.to ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center text-gray-500 text-sm">
                    Please select a start date and end date to view attendance records.
                  </TableCell>
                </TableRow>
              ) : currentRecords.length ? (
                currentRecords.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {table
                      .getRowModel()
                      .rows.slice(indexOfFirstRecord, indexOfLastRecord)[rowIndex].getVisibleCells()
                      .map((cell) => (
                        <TableCell key={cell.id} className="w-[calc(100%/columns.length)] text-sm">
                          {renderCellValue(cell)}
                        </TableCell>
                      ))}
                    <TableCell className="w-[calc(100%/columns.length)] text-sm">
                      <AttendanceActions attendance={row} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center text-gray-500 text-sm">
                    {searchQuery ? (
                      <>
                        No results found for "{searchQuery}".
                        <br />
                        No employee attendance records found for {formattedFromDate} to {formattedToDate} for{" "}
                        {activeFilter} schedule type.
                        <br />
                        Please select a different date range to view previous attendance records.
                      </>
                    ) : (
                      <>
                        No employee attendance records found for {formattedFromDate} to {formattedToDate} for{" "}
                        {activeFilter} schedule type.
                        <br />
                        Please select a different date range to view previous attendance records.
                      </>
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-center items-center px-2 py-4 border-t">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || totalPages === 0}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm font-medium">
              {totalPages > 0 ? `Page ${currentPage} of ${totalPages}` : "No pages"}
            </div>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceTable;