    import React from 'react';
    import axios from 'axios';
    import { useQuery, UseQueryResult } from '@tanstack/react-query';
    import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
    import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
    
    const apiBase = import.meta.env.VITE_BASE_API;
    
    interface Attendance {
      id: number;
      employeeId: number;
      date: string;
      status: string;
      scheduleType: string;
      timeIn: string;
      timeOut: string;
      timeHoursWorked: number | null;
      overTimeTotal: number | null;
      timeTotal: number;
      lunchTimeIn: string;
      lunchTimeOut: string;
      lunchTimeTotal: number;
      createdAt: string;
      updatedAt: string;
      employee: {
        id: number;
        username: string;
        firstName: string;
        lastName: string;
        middleName: string;
        role: string;
        accessLevel: string;
        isActive: boolean;
      };
    }
    
    const getAttendanceList = async (): Promise<Attendance[]> => {
      const response = await axios.get(`${apiBase}/api/attendance`);
      return response.data;
    };
    
    const formatDate = (dateString: string) => {
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      };
      return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
    };
    
    const formatTime = (timeString: string) => {
      const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
      };
      return new Intl.DateTimeFormat('en-US', options).format(new Date(timeString));
    };
    
    const calculateWorkTimeTotal = (timeIn: string, timeOut: string, lunchTimeTotal: number) => {
      const timeInDate = new Date(timeIn);
      const timeOutDate = new Date(timeOut);
      const workTimeMs = timeOutDate.getTime() - timeInDate.getTime() - lunchTimeTotal * 60 * 60 * 1000;
      const workTimeHours = workTimeMs / (1000 * 60 * 60);
      return workTimeHours.toFixed(2); // Format to 2 decimal places
    };
    
    const AttendanceList: React.FC = () => {
      const { data: attendanceList, isLoading, error }: UseQueryResult<Attendance[], Error> = useQuery({
        queryKey: ['attendanceList'],
        queryFn: getAttendanceList,
        refetchInterval: 5000,
      });
    
      const columns: ColumnDef<Attendance>[] = [
        {
          accessorKey: 'employee.firstName',
          header: 'First Name',
        },
        {
          accessorKey: 'employee.lastName',
          header: 'Last Name',
        },
        {
          accessorKey: 'date',
          header: 'Date',
          cell: ({ row }) => formatDate(row.original.date),
        },
        {
          accessorKey: 'status',
          header: 'Status',
        },
        {
          accessorKey: 'scheduleType',
          header: 'Schedule Type',
        },
        {
          accessorKey: 'timeIn',
          header: 'Time In',
          cell: ({ row }) => formatTime(row.original.timeIn),
        },
        {
          accessorKey: 'lunchTimeIn',
          header: 'Lunch Time In',
          cell: ({ row }) => formatTime(row.original.lunchTimeIn),
        },
        {
          accessorKey: 'lunchTimeOut',
          header: 'Lunch Time Out',
          cell: ({ row }) => formatTime(row.original.lunchTimeOut),
        },
        {
          accessorKey: 'timeHoursWorked',
          header: 'Work Time Total',
          cell: ({ row }) => calculateWorkTimeTotal(row.original.timeIn, row.original.timeOut, row.original.lunchTimeTotal),
        },
        {
          accessorKey: 'lunchTimeTotal',
          header: 'Lunch Time Total',
        },
        {
          accessorKey: 'timeOut',
          header: 'Time Out',
          cell: ({ row }) => formatTime(row.original.timeOut),
        },
        {
          accessorKey: 'overTimeTotal',
          header: 'Overtime Total',
        },
        {
          accessorKey: 'timeTotal',
          header: 'Total Time',
        },
      ];
    
      const table = useReactTable({
        data: attendanceList || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
      });
    
      if (isLoading) return <div>Loading...</div>;
      if (error) return <div>Error loading attendance list</div>;
    
      return (
        <div className="w-full">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      );
    };
    
    export default AttendanceList;