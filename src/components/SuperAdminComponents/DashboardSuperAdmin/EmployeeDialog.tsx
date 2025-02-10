import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Employee } from "@/components/SuperAdminComponents/EmployeeSuperAdmin/types";
import type { Attendance } from "@/components/SuperAdminComponents/AttendanceSuperAdmin/types";

interface EmployeeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee | null;
  attendance: Attendance | null;
}

const EmployeeDialog: React.FC<EmployeeDialogProps> = ({
  isOpen,
  onClose,
  employee,
  attendance,
}) => {
  if (!employee || !attendance) return null;

  const attendanceStatus =
    attendance.status === "ONGOING" ? "Active" : "Offline";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent aria-describedby="employee-dialog-description">
        <DialogHeader>
          <DialogTitle>Employee Information</DialogTitle>
          <DialogDescription id="employee-dialog-description">
            Detailed information about the employee.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[300px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-sm">Field</TableHead>
                <TableHead className="text-sm">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-sm">
                  <strong>Username:</strong>
                </TableCell>
                <TableCell className="text-sm">{employee.username}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-sm">
                  <strong>First Name:</strong>
                </TableCell>
                <TableCell className="text-sm">{employee.firstName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-sm">
                  <strong>Last Name:</strong>
                </TableCell>
                <TableCell className="text-sm">{employee.lastName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-sm">
                  <strong>Middle Name:</strong>
                </TableCell>
                <TableCell className="text-sm">{employee.middleName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-sm">
                  <strong>Role:</strong>
                </TableCell>
                <TableCell className="text-sm">{employee.role}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-sm">
                  <strong>Access Level:</strong>
                </TableCell>
                <TableCell className="text-sm">
                  {employee.accessLevel}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-sm">
                  <strong>Department:</strong>
                </TableCell>
                <TableCell className="text-sm">
                  {employee.departmentName}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-sm">
                  <strong>Attendance Status:</strong>
                </TableCell>
                <TableCell className="text-sm">{attendanceStatus}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </ScrollArea>
        <DialogClose>Close</DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeDialog;
