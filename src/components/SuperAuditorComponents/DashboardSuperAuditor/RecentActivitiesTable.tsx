import { useState } from "react";
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
import { getEmployeeDetails } from "@/components/SuperAdminComponents/EmployeeSuperAdmin/api";
import type { Attendance } from "@/components/SuperAdminComponents/AttendanceSuperAdmin/types";
import type { Employee } from "@/components/SuperAdminComponents/EmployeeSuperAdmin/types";
import { isToday } from "date-fns";
import EmployeeDialog from "./EmployeeDialog";

function RecentActivitiesTable({ tableData }: { tableData: Attendance[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAccessLevel, setSelectedAccessLevel] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [selectedAttendance, setSelectedAttendance] =
    useState<Attendance | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredData = tableData.filter(
    (data) =>
      isToday(new Date(data.date)) &&
      data.employee.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedAccessLevel
        ? selectedAccessLevel === "ADMIN"
          ? ["SUPER_ADMIN", "ADMIN"].includes(data.employee.accessLevel)
          : data.employee.accessLevel === selectedAccessLevel
        : true)
  );

  const sortedData = filteredData.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handleRowClick = async (attendance: Attendance) => {
    const employeeDetails = await getEmployeeDetails(attendance.employee.id);
    setSelectedEmployee(employeeDetails);
    setSelectedAttendance(attendance);
    setIsDialogOpen(true);
  };

  const renderedList = sortedData.map((data) => {
    const parsedDate = new Date(data.date);
    const formattedDate = parsedDate.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return (
      <TableRow key={data.id} onClick={() => handleRowClick(data)}>
        <TableCell className="p-4">{data.employee.username}</TableCell>
        <TableCell className="p-4">{formattedDate}</TableCell>
      </TableRow>
    );
  });

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
            <DropdownMenuItem onSelect={() => setSelectedAccessLevel("ADMIN")}>
              Super Admin
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => setSelectedAccessLevel("TEAM_LEADER")}
            >
              Team Leader
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => setSelectedAccessLevel("EMPLOYEE")}
            >
              Employee
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
            </TableRow>
          </TableHeader>
          <TableBody>{renderedList}</TableBody>
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
}

export default RecentActivitiesTable;
