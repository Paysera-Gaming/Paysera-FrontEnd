    import React, { useState } from "react";
    import { useQuery } from "@tanstack/react-query";
    import { getAttendanceList } from "@/components/SuperAdminComponents/AttendanceSuperAdmin/api";
    import type { Attendance } from "@/components/SuperAdminComponents/AttendanceSuperAdmin/types";
    import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
    import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
    import { Button } from "@/components/ui/button";
    import { Input } from "@/components/ui/input";
    import { Skeleton } from "@/components/ui/skeleton";
    
    const OvertimeTable: React.FC = () => {
      const { data: attendanceData, isLoading, error } = useQuery<Attendance[]>({
        queryKey: ["attendanceData"],
        queryFn: getAttendanceList,
      });
    
      const [searchTerm, setSearchTerm] = useState("");
      const [selectedStatus, setSelectedStatus] = useState("");
    
      if (isLoading) {
        return (
          <div className="flex-1 col-span-2">
            <Skeleton className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        );
      }
    
      if (error) {
        return (
          <div className="flex-1 col-span-2">
            <p className="text-red-500">Failed to load data. Please try again.</p>
          </div>
        );
      }
    
      const filteredData = attendanceData?.filter(
        (attendance) =>
          attendance.employee.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (selectedStatus ? (selectedStatus === "Online" ? attendance.employee.isActive : !attendance.employee.isActive) : true) &&
          attendance.calculatedOverTime
      ) || [];
    
      const renderedList = filteredData.map((attendance) => (
        <TableRow key={attendance.id}>
          <TableCell className="p-4">{attendance.employee.username}</TableCell>
          <TableCell className="p-4">{attendance.date}</TableCell>
          <TableCell className="p-4">{attendance.overTimeTotal}</TableCell>
        </TableRow>
      ));
    
      return (
        <>
          <div className="flex mb-4 space-x-2">
            <Input
              type="text"
              placeholder="Search by username"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="p-2 text-base w-48">
                  Status
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64">
                <DropdownMenuItem onSelect={() => setSelectedStatus("")}>All</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setSelectedStatus("Online")}>Online</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setSelectedStatus("Offline")}>Offline</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Table className="text-base">
            <TableHeader>
              <TableRow>
                <TableHead className="p-4">Username</TableHead>
                <TableHead className="p-4">Date</TableHead>
                <TableHead className="p-4">Overtime Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>{renderedList}</TableBody>
          </Table>
        </>
      );
    };
    
    export default OvertimeTable;