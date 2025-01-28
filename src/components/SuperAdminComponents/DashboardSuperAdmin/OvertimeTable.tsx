    import React, { useState } from "react";
    import { useQuery } from "@tanstack/react-query";
    import { getAttendanceList } from "@/components/SuperAdminComponents/AttendanceSuperAdmin/api";
    import type { Attendance } from "@/components/SuperAdminComponents/AttendanceSuperAdmin/types";
    import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
    import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
    import { Button } from "@/components/ui/button";
    import { Input } from "@/components/ui/input";
    import { Skeleton } from "@/components/ui/skeleton";
    import { format } from "date-fns";
    
    const OvertimeTable: React.FC = () => {
      const { data: attendanceData, isLoading, error } = useQuery<Attendance[]>({
        queryKey: ["attendanceData"],
        queryFn: getAttendanceList,
      });
    
      const [searchTerm, setSearchTerm] = useState("");
      const [selectedAccessLevel, setSelectedAccessLevel] = useState("");
    
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
          (selectedAccessLevel ? attendance.employee.accessLevel === selectedAccessLevel : true) &&
          attendance.overTimeTotal !== null && attendance.overTimeTotal > 0
      ) || [];
    
      const renderedList = filteredData.map((attendance) => (
        <TableRow key={attendance.id}>
          <TableCell className="p-4">{attendance.employee.username}</TableCell>
          <TableCell className="p-4">{format(new Date(attendance.date), "MMMM dd, yyyy")}</TableCell>
          <TableCell className="p-4">{attendance.overTimeTotal?.toFixed(2)}</TableCell>
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
                  Access Level
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64">
                <DropdownMenuItem onSelect={() => setSelectedAccessLevel("")}>All</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setSelectedAccessLevel("EMPLOYEE")}>Employee</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setSelectedAccessLevel("TEAM_LEADER")}>Team Leader</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setSelectedAccessLevel("ADMIN")}>Admin</DropdownMenuItem>
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