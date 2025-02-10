import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAttendanceList } from "@/components/SuperAdminComponents/AttendanceSuperAdmin/api";
import { getEmployeeDetails } from "@/components/SuperAdminComponents/EmployeeSuperAdmin/api";
import type { Attendance } from "@/components/SuperAdminComponents/AttendanceSuperAdmin/types";
import type { Employee } from "@/components/SuperAdminComponents/EmployeeSuperAdmin/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { format, isToday } from "date-fns";
import EmployeeDialog from "./EmployeeDialog";

const OvertimeTable: React.FC = () => {
  const {
    data: attendanceData,
    isLoading,
    error,
  } = useQuery<Attendance[]>({
    queryKey: ["attendanceData"],
    queryFn: getAttendanceList,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAccessLevel, setSelectedAccessLevel] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [selectedAttendance, setSelectedAttendance] =
    useState<Attendance | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
        isToday(new Date(attendance.date)) &&
        attendance.employee.username
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) &&
        (selectedAccessLevel
          ? attendance.employee.accessLevel === selectedAccessLevel
          : true) &&
        attendance.overTimeTotal !== null &&
        attendance.overTimeTotal > 0
    ) || [];

  const handleRowClick = async (attendance: Attendance) => {
    const employeeDetails = await getEmployeeDetails(attendance.employee.id);
    setSelectedEmployee(employeeDetails);
    setSelectedAttendance(attendance);
    setIsDialogOpen(true);
  };

  const renderedList = filteredData.map((attendance) => (
    <TableRow key={attendance.id} onClick={() => handleRowClick(attendance)}>
      <TableCell className="p-4">{attendance.employee.username}</TableCell>
      <TableCell className="p-4">
        {format(new Date(attendance.date), "MMMM dd, yyyy")}
      </TableCell>
      <TableCell className="p-4">
        {attendance.overTimeTotal?.toFixed(2)}
      </TableCell>
      <TableCell className="p-4">{attendance.timeTotal.toFixed(2)}</TableCell>
    </TableRow>
  ));

  const noRecordsMessage = selectedAccessLevel
    ? `No overtime records found for the selected access level: ${selectedAccessLevel
        .replace("_", " ")
        .toLowerCase()}.`
    : "No overtime records found.";

  return (
    <>
      <div className="flex mb-4 space-x-2 p-4">
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
            <DropdownMenuItem onSelect={() => setSelectedAccessLevel("")}>
              All
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => setSelectedAccessLevel("EMPLOYEE")}
            >
              Employee
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => setSelectedAccessLevel("TEAM_LEADER")}
            >
              Team Leader
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setSelectedAccessLevel("ADMIN")}>
              Admin
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
              <TableHead className="p-4">Overtime Total</TableHead>
              <TableHead className="p-4">Time Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {renderedList.length > 0 ? (
              renderedList
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center p-4">
                  <div className="text-foreground">
                    <p className="font-semibold">{noRecordsMessage}</p>
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
      <EmployeeDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        employee={selectedEmployee}
        attendance={selectedAttendance}
      />
    </>
  );
};

export default OvertimeTable;
