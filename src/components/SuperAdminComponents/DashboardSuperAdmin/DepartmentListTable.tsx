import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Department } from "@/components/SuperAdminComponents/DepartmentSuperAdmin/api";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function DepartmentListTable({ tableData }: { tableData: Department[] }) {
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

  const handleRowClick = (department: Department) => {
    setSelectedDepartment(department);
  };

  const renderedList = tableData.map((department) => (
    <TableRow key={department.id} onClick={() => handleRowClick(department)} className="cursor-pointer">
      <TableCell>{department.name}</TableCell>
      <TableCell>{department.Leader ? `${department.Leader.firstName} ${department.Leader.lastName}` : 'No Leader Assigned'}</TableCell>
      <TableCell>{department.Employees ? department.Employees.length : 0}</TableCell>
    </TableRow>
  ));

  return (
    <>
      <Table className="text-base">
        <TableHeader>
          <TableRow>
            <TableHead>Department Name</TableHead>
            <TableHead>Leader</TableHead>
            <TableHead>Employee Count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{renderedList}</TableBody>
      </Table>

      {selectedDepartment && (
        <Dialog open={!!selectedDepartment} onOpenChange={() => setSelectedDepartment(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">{selectedDepartment.name}</DialogTitle>
              <DialogDescription className="space-y-4">
                <div className="flex flex-col space-y-1">
                  <span className="font-semibold">Leader:</span>
                  <span>{selectedDepartment.Leader ? `${selectedDepartment.Leader.firstName} ${selectedDepartment.Leader.lastName}` : 'No Leader Assigned'}</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="font-semibold">Employees:</span>
                  <ul className="list-disc list-inside">
                    {selectedDepartment.Employees?.map((employee) => (
                      <li key={employee.id}>
                        {employee.firstName} {employee.lastName} ({employee.role})
                      </li>
                    ))}
                  </ul>
                </div>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setSelectedDepartment(null)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default DepartmentListTable;