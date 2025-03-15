import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getEmployeeDetails } from "@/components/AuditorComponents/EmployeeAuditor/api";
import { getAttendanceList } from "@/components/AuditorComponents/AttendanceAuditor/api";
import type { Employee } from "@/components/AuditorComponents/EmployeeAuditor/types";
import type { Attendance } from "@/components/AuditorComponents/AttendanceAuditor/types";
import { useUserStore } from '@/stores/userStore'; // Import the user store

interface EmployeeListDialogProps {
  isOpen: boolean;
  onClose: () => void;
  employees: Employee[];
  title: string;
}

const EmployeeListDialog: React.FC<EmployeeListDialogProps> = ({
  isOpen,
  onClose,
  employees,
  title,
}) => {
  const [detailedEmployees, setDetailedEmployees] = useState<Employee[]>([]);
  const [attendanceData, setAttendanceData] = useState<Attendance[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const user = useUserStore.getState().getUser(); // Get the logged-in user
  const departmentId = user?.departmentId; // Get the department ID of the logged-in user

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      const detailedEmployees = await Promise.all(
        employees.map(async (employee) => {
          const detailedEmployee = await getEmployeeDetails(employee.id);
          return detailedEmployee;
        })
      );
      setDetailedEmployees(detailedEmployees);
    };

    const fetchAttendanceData = async () => {
      if (departmentId) {
        const attendanceData = await getAttendanceList(departmentId);
        setAttendanceData(attendanceData);
      } else {
        console.error("Invalid department ID");
      }
    };

    if (isOpen && departmentId) {
      fetchEmployeeDetails();
      fetchAttendanceData();
    }
  }, [isOpen, employees, departmentId]);

  const getEmployeeStatus = (employeeId: number) => {
    const attendance = attendanceData.find(
      (att) => att.employee.id === employeeId
    );
    return attendance?.status === "ONGOING" ? "Online" : "Offline";
  };

  const filteredEmployees = detailedEmployees.filter((employee) => {
    const status = getEmployeeStatus(employee.id);
    return (
      employee.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedStatus ? status === selectedStatus : true)
    );
  });

  const admins = filteredEmployees.filter((emp) => emp.accessLevel === "ADMIN");
  const teamLeaders = filteredEmployees.filter(
    (emp) => emp.accessLevel === "TEAM_LEADER"
  );
  const regularEmployees = filteredEmployees.filter(
    (emp) => emp.accessLevel === "EMPLOYEE"
  );

  const renderTable = (employees: Employee[], showDepartment: boolean) => (
    <ScrollArea className="h-[300px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-sm">Status</TableHead>
            <TableHead className="text-sm">Username</TableHead>
            <TableHead className="text-sm">Name</TableHead>
            {showDepartment && (
              <TableHead className="text-sm">Department</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell className="text-sm">
                <span
                  className={`px-2 py-1 rounded-full text-white ${
                    getEmployeeStatus(employee.id) === "Online"
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                >
                  {getEmployeeStatus(employee.id)}
                </span>
              </TableCell>
              <TableCell className="text-sm">
                <strong>{employee.username}</strong>
              </TableCell>
              <TableCell className="text-sm">
                {employee.firstName} {employee.lastName}
              </TableCell>
              {showDepartment && (
                <TableCell className="text-sm">
                  {employee.departmentName
                    ? employee.departmentName
                    : "No Department"}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        aria-describedby="employee-list-dialog-description"
        className="max-w-4xl"
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription id="employee-list-dialog-description">
            Detailed list of employees.
          </DialogDescription>
        </DialogHeader>
        <div className="flex mb-2 space-x-2">
          <Input
            type="text"
            placeholder="Search by username"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
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
              <DropdownMenuItem onSelect={() => setSelectedStatus("Online")}>
                Online
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setSelectedStatus("Offline")}>
                Offline
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex mb-2 space-x-4">
          <p className="text-sm">
            <strong>Filters:</strong>
          </p>
          <p className="text-sm">
            Status: <strong>{selectedStatus || "All"}</strong>
          </p>
        </div>
        <Tabs defaultValue="admin">
          <TabsList className="flex justify-between">
            <TabsTrigger value="admin" className="flex-1">
              Admin ({admins.length})
            </TabsTrigger>
            <TabsTrigger value="team_leader" className="flex-1">
              Team Leader ({teamLeaders.length})
            </TabsTrigger>
            <TabsTrigger value="employee" className="flex-1">
              Employee ({regularEmployees.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="admin">{renderTable(admins, false)}</TabsContent>
          <TabsContent value="team_leader">
            {renderTable(teamLeaders, false)}
          </TabsContent>
          <TabsContent value="employee">
            {renderTable(regularEmployees, false)}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeListDialog;