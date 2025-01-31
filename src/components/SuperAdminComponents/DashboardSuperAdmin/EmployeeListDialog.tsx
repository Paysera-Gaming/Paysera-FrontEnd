import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import type { Employee } from "@/components/SuperAdminComponents/EmployeeSuperAdmin/types";

interface EmployeeListDialogProps {
  isOpen: boolean;
  onClose: () => void;
  employees: Employee[];
}

const EmployeeListDialog: React.FC<EmployeeListDialogProps> = ({ isOpen, onClose, employees }) => {
  const admins = employees.filter(emp => emp.accessLevel === 'ADMIN');
  const teamLeaders = employees.filter(emp => emp.accessLevel === 'TEAM_LEADER');
  const regularEmployees = employees.filter(emp => emp.accessLevel === 'EMPLOYEE');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>All Employees</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="admin">
          <TabsList className="flex justify-between">
            <TabsTrigger value="admin" className="flex-1">Admin</TabsTrigger>
            <TabsTrigger value="team_leader" className="flex-1">Team Leader</TabsTrigger>
            <TabsTrigger value="employee" className="flex-1">Employee</TabsTrigger>
          </TabsList>
          <TabsContent value="admin">
            {admins.map((employee) => (
              <div key={employee.id}>
                <strong>{employee.username}</strong> - {employee.firstName} {employee.lastName}
              </div>
            ))}
          </TabsContent>
          <TabsContent value="team_leader">
            {teamLeaders.map((employee) => (
              <div key={employee.id}>
                <strong>{employee.username}</strong> - {employee.firstName} {employee.lastName}
              </div>
            ))}
          </TabsContent>
          <TabsContent value="employee">
            {regularEmployees.map((employee) => (
              <div key={employee.id}>
                <strong>{employee.username}</strong> - {employee.firstName} {employee.lastName}
              </div>
            ))}
          </TabsContent>
        </Tabs>
        <DialogClose>Close</DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeListDialog;