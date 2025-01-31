import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area"; // Import ScrollArea
import type { Employee } from "@/components/SuperAdminComponents/EmployeeSuperAdmin/types";

interface EmployeeListDialogProps {
  isOpen: boolean;
  onClose: () => void;
  employees: Employee[];
  title: string; // Added title prop
}

const EmployeeListDialog: React.FC<EmployeeListDialogProps> = ({ isOpen, onClose, employees, title }) => {
  const admins = employees.filter(emp => emp.accessLevel === 'ADMIN');
  const teamLeaders = employees.filter(emp => emp.accessLevel === 'TEAM_LEADER');
  const regularEmployees = employees.filter(emp => emp.accessLevel === 'EMPLOYEE');

  const renderTable = (employees: Employee[]) => (
    <ScrollArea className="h-[300px]"> {/* Ensure ScrollArea is scrollable */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-sm">Status</TableHead>
            <TableHead className="text-sm">Username</TableHead>
            <TableHead className="text-sm">Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell className="text-sm">
                <span className={`px-2 py-1 rounded-full text-white ${employee.isActive ? 'bg-green-600' : 'bg-red-600'}`}>
                  {employee.isActive ? 'Online' : 'Offline'}
                </span>
              </TableCell>
              <TableCell className="text-sm">
                <strong>{employee.username}</strong>
              </TableCell>
              <TableCell className="text-sm">
                {employee.firstName} {employee.lastName}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle> {/* Updated to use title prop */}
        </DialogHeader>
        <Tabs defaultValue="admin">
          <TabsList className="flex justify-between">
            <TabsTrigger value="admin" className="flex-1">Admin</TabsTrigger>
            <TabsTrigger value="team_leader" className="flex-1">Team Leader</TabsTrigger>
            <TabsTrigger value="employee" className="flex-1">Employee</TabsTrigger>
          </TabsList>
          <TabsContent value="admin">
            {renderTable(admins)}
          </TabsContent>
          <TabsContent value="team_leader">
            {renderTable(teamLeaders)}
          </TabsContent>
          <TabsContent value="employee">
            {renderTable(regularEmployees)}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeListDialog;