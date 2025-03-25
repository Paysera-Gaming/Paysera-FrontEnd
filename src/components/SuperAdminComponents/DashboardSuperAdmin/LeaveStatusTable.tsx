import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAttendanceList } from "@/components/SuperAdminComponents/AttendanceSuperAdmin/api";
import type { Attendance } from "@/components/SuperAdminComponents/AttendanceSuperAdmin/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

const LeaveStatusTable: React.FC<{ selectedLeaveStatus: string }> = ({
  selectedLeaveStatus,
}) => {
  const { data: attendanceData, isLoading, error } = useQuery<Attendance[]>({
    queryKey: ["attendanceData"],
    queryFn: getAttendanceList,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [leaveStatus, setLeaveStatus] = useState(selectedLeaveStatus);

  if (isLoading) {
    return (
      <div className="flex-1 col-span-2 p-4">
        <Skeleton className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 col-span-2 p-4">
        <p className="text-red-500">Failed to load data. Please try again.</p>
      </div>
    );
  }

  const filteredData =
    attendanceData?.filter(
      (attendance) =>
        (leaveStatus === "ALL" || attendance.RequestLeaveStatus === leaveStatus) &&
        attendance.employee.username
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    ) || [];

  const renderedList = filteredData.map((attendance) => (
    <TableRow key={attendance.id}>
      <TableCell className="p-4">{attendance.employee.username}</TableCell>
      <TableCell className="p-4">
        {format(new Date(attendance.date), "MMMM dd, yyyy")}
      </TableCell>
      <TableCell className="p-4">{attendance.RequestLeaveStatus}</TableCell>
    </TableRow>
  ));

  return (
    <>
      <div className="flex mb-4 space-x-2 p-4 items-center">
        {/* Search Bar */}
        <Input
          type="text"
          placeholder="Search by username"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />

        {/* Leave Status Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="p-2 text-base w-48">
              {leaveStatus === "ALL" ? "All Leave Statuses" : leaveStatus}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64">
            <DropdownMenuItem onSelect={() => setLeaveStatus("ALL")}>
              All
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setLeaveStatus("APPROVED_BY_TEAM_LEADER")}>
              Approved by Team Leader
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setLeaveStatus("PENDING")}>
              Pending
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setLeaveStatus("REJECTED_BY_TEAM_LEADER")}>
              Rejected by Team Leader
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="p-4">
        <Table className="text-base">
          <TableHeader>
            <TableRow>
              <TableHead className="p-4">Username</TableHead>
              <TableHead className="p-4">Date</TableHead>
              <TableHead className="p-4">Leave Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {renderedList.length > 0 ? (
              renderedList
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center p-4">
                  <div className="text-foreground">
                    <p className="font-semibold">No leave records found.</p>
                    <p className="text-sm">
                      Please adjust your filters or try a different search term.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default LeaveStatusTable;