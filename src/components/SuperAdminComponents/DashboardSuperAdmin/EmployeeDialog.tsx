import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import type { Employee } from "@/components/SuperAdminComponents/EmployeeSuperAdmin/types";

interface EmployeeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee | null;
}

const EmployeeDialog: React.FC<EmployeeDialogProps> = ({ isOpen, onClose, employee }) => {
  if (!employee) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Employee Information</DialogTitle>
          <DialogDescription>
            <div>
              <strong>Username:</strong> {employee.username}
            </div>
            <div>
              <strong>First Name:</strong> {employee.firstName}
            </div>
            <div>
              <strong>Last Name:</strong> {employee.lastName}
            </div>
            <div>
              <strong>Middle Name:</strong> {employee.middleName}
            </div>
            <div>
              <strong>Role:</strong> {employee.role}
            </div>
            <div>
              <strong>Access Level:</strong> {employee.accessLevel}
            </div>
            <div>
              <strong>Department:</strong> {employee.departmentName}
            </div>
            <div>
              <strong>Status:</strong> {employee.isActive ? "Active" : "Inactive"}
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogClose>Close</DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeDialog;