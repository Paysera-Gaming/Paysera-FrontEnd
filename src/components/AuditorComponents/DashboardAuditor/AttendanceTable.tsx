import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAttendanceList } from "@/components/AuditorComponents/AttendanceAuditor/api";
import { getEmployeeDetails } from "@/components/AuditorComponents/EmployeeAuditor/api";
import type { Attendance } from "@/components/AuditorComponents/AttendanceAuditor/types";
import type { Employee } from "@/components/AuditorComponents/EmployeeAuditor/types";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EmployeeDialog from "./EmployeeDialog";
import { useUserStore } from '@/stores/userStore'; // Import the user store

const AttendanceTable: React.FC = () => {
  const user = useUserStore.getState().getUser(); // Get the logged-in user
  const departmentId = user?.departmentId; // Get the department ID of the logged-in user

  const {
    data: attendanceData,
    isLoading,
    error,
  } = useQuery<Attendance[]>({
    queryKey: ["attendanceData", departmentId],
    queryFn: () => getAttendanceList(departmentId!), // Pass the department ID to the query function
    enabled: !!departmentId, // Enable the query only if the department ID is available
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAccessLevel, setSelectedAccessLevel] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
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
        (selectedStatus ? attendance.status === selectedStatus : true)
    ) || [];

  const handleRowClick = async (attendance: Attendance) => {
    const employeeDetails = await getEmployeeDetails(attendance.employee.id);
    setSelectedEmployee(employeeDetails);
    setIsDialogOpen(true);
  };

  const renderedList = filteredData.map((attendance) => (
    <TableRow key={attendance.id} onClick={() => handleRowClick(attendance)}>
      <TableCell className="p-4">{attendance.employee.username}</TableCell>
      <TableCell className="p-4">
        {format(new Date(attendance.date), "MMMM dd")}
      </TableCell>
      <TableCell className="p-4">
        {attendance.status.replace("_", " ")}
      </TableCell>
      <TableCell className="p-4">
        {attendance.scheduleType.replace("_", " ")}
      </TableCell>
      <TableCell className="p-4">
        {attendance.timeHoursWorked
          ? attendance.timeHoursWorked.toFixed(2)
          : "Ongoing"}
      </TableCell>
      <TableCell className="p-4">
        {attendance.timeTotal ? attendance.timeTotal.toFixed(2) : "Ongoing"}
      </TableCell>
    </TableRow>
  ));

  const noRecordsMessage = selectedAccessLevel
    ? `No attendance records found for the selected access level: ${selectedAccessLevel
        .replace("_", " ")
        .toLowerCase()}.`
    : "No attendance records found.";

  const totalAttendance = filteredData.length;
  const statusDone = filteredData.filter(
    (attendance) => attendance.status === "DONE"
  ).length;
  const statusOngoing = filteredData.filter(
    (attendance) => attendance.status === "ONGOING"
  ).length;
  const statusPaidLeave = filteredData.filter(
    (attendance) => attendance.status === "PAID_LEAVE"
  ).length;
  const scheduleFixed = filteredData.filter(
    (attendance) => attendance.scheduleType === "FIXED"
  ).length;
  const scheduleFlexi = filteredData.filter(
    (attendance) => attendance.scheduleType === "FLEXI"
  ).length;
  const scheduleSuperFlexi = filteredData.filter(
    (attendance) => attendance.scheduleType === "SUPER_FLEXI"
  ).length;

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="p-2 text-base w-48">
              Status
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64">
            <DropdownMenuItem onSelect={() => setSelectedStatus("")}>
              All
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setSelectedStatus("ONGOING")}>
              Ongoing
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setSelectedStatus("DONE")}>
              Done
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-4 p-4">
        <Card className="m-0 p-4">
          <CardHeader className="p-2">
            <CardTitle className="text-xs font-semibold">
              Overall: {totalAttendance}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <div className="flex flex-col text-xs">
              <span>ONGOING: {statusOngoing}</span>
              <span>DONE: {statusDone}</span>
              <span>PAID LEAVE: {statusPaidLeave}</span>
            </div>
          </CardContent>
        </Card>
        <Card className="m-0 p-4">
          <CardHeader className="p-2">
            <CardTitle className="text-xs font-semibold">
              Fixed: {scheduleFixed}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <div className="flex flex-col text-xs">
              <span>
                ONGOING:{" "}
                {
                  filteredData.filter(
                    (attendance) =>
                      attendance.scheduleType === "FIXED" &&
                      attendance.status === "ONGOING"
                  ).length
                }
              </span>
              <span>
                DONE:{" "}
                {
                  filteredData.filter(
                    (attendance) =>
                      attendance.scheduleType === "FIXED" &&
                      attendance.status === "DONE"
                  ).length
                }
              </span>
              <span>
                PAID LEAVE:{" "}
                {
                  filteredData.filter(
                    (attendance) =>
                      attendance.scheduleType === "FIXED" &&
                      attendance.status === "PAID_LEAVE"
                  ).length
                }
              </span>
            </div>
          </CardContent>
        </Card>
        <Card className="m-0 p-4">
          <CardHeader className="p-2">
            <CardTitle className="text-xs font-semibold">
              Flexi: {scheduleFlexi}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <div className="flex flex-col text-xs">
              <span>
                ONGOING:{" "}
                {
                  filteredData.filter(
                    (attendance) =>
                      attendance.scheduleType === "FLEXI" &&
                      attendance.status === "ONGOING"
                  ).length
                }
              </span>
              <span>
                DONE:{" "}
                {
                  filteredData.filter(
                    (attendance) =>
                      attendance.scheduleType === "FLEXI" &&
                      attendance.status === "DONE"
                  ).length
                }
              </span>
              <span>
                PAID LEAVE:{" "}
                {
                  filteredData.filter(
                    (attendance) =>
                      attendance.scheduleType === "FLEXI" &&
                      attendance.status === "PAID_LEAVE"
                  ).length
                }
              </span>
            </div>
          </CardContent>
        </Card>
        <Card className="m-0 p-4">
          <CardHeader className="p-2">
            <CardTitle className="text-xs font-semibold">
              Super Flexi: {scheduleSuperFlexi}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <div className="flex flex-col text-xs">
              <span>
                ONGOING:{" "}
                {
                  filteredData.filter(
                    (attendance) =>
                      attendance.scheduleType === "SUPER_FLEXI" &&
                      attendance.status === "ONGOING"
                  ).length
                }
              </span>
              <span>
                DONE:{" "}
                {
                  filteredData.filter(
                    (attendance) =>
                      attendance.scheduleType === "SUPER_FLEXI" &&
                      attendance.status === "DONE"
                  ).length
                }
              </span>
              <span>
                PAID LEAVE:{" "}
                {
                  filteredData.filter(
                    (attendance) =>
                      attendance.scheduleType === "SUPER_FLEXI" &&
                      attendance.status === "PAID_LEAVE"
                  ).length
                }
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="p-4">
        <Table className="text-base">
          <TableHeader>
            <TableRow>
              <TableHead className="p-4">Username</TableHead>
              <TableHead className="p-4">Date</TableHead>
              <TableHead className="p-4">Status</TableHead>
              <TableHead className="p-4">Schedule Type</TableHead>
              <TableHead className="p-4">Hours Worked</TableHead>
              <TableHead className="p-4">Total Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {renderedList.length > 0 ? (
              renderedList
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center p-4">
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
        employees={selectedEmployee ? [selectedEmployee] : []}
        title="Employee Details"
      />
    </>
  );
};

export default AttendanceTable;