import type React from "react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Edit2, Trash2, Circle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import EmployeeEdit from "./EmployeeEdit";
import { useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/api";
import axios from "axios";
import type { Employee } from "./types"; // Updated import

interface EmployeeTableProps {
  employees: Employee[];
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees }) => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 5;

  const handleDeleteClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDialogOpen(true);
  };

  const handleEditClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsEditDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedEmployee) return;

    try {
      await axiosInstance.delete(`/api/employee/${selectedEmployee.id}`);
      toast.success(
        `Successfully deleted ${selectedEmployee.firstName} ${selectedEmployee.lastName}`
      );
      setIsDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    } catch (error) {
      toast.error("Error deleting the employee.");
      console.error("Error deleting the employee:", error);
    }
  };

  const handleEditSubmit = async (values: Partial<Employee>) => {
    if (!selectedEmployee) return;

    try {
      await axiosInstance.put(`/api/employee/${selectedEmployee.id}`, values);
      setIsEditDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        // Log error details returned from the server
        console.error("Error editing the employee:", error.response.data);
        toast.error(
          "Error editing the employee: " +
            (error.response.data.message || "Unknown error")
        );
      } else {
        console.error("Error editing the employee:", error);
        toast.error("Error editing the employee.");
      }
    }
  };

  const formatAccessLevel = (accessLevel: string) => {
    return accessLevel.replace(/_/g, " ");
  };

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );
  const totalPages = Math.ceil(employees.length / employeesPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Full Name</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Access Level</TableHead>
              <TableHead>Allowed Overtime</TableHead> {/* Moved this line */}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentEmployees.map((emp) => (
              <TableRow key={emp.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Circle
                      size={16}
                      color={
                        emp.attendanceStatus === "ONGOING" ? "green" : "red"
                      }
                      fill={
                        emp.attendanceStatus === "ONGOING" ? "green" : "red"
                      }
                    />
                    {`${emp.lastName}, ${emp.firstName} ${
                      emp.middleName || ""
                    }`}
                  </div>
                </TableCell>
                <TableCell>{emp.username}</TableCell>
                <TableCell>
                  {emp.attendanceStatus === "ONGOING" ? "Online" : "Offline"}
                </TableCell>
                <TableCell>{formatAccessLevel(emp.accessLevel)}</TableCell>
                <TableCell>
                  {emp.isAllowedRequestOvertime ? "Yes" : "No"}{" "}
                  {/* Moved this line */}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditClick(emp)}
                    >
                      <Edit2 size={16} />
                      Edit
                    </Button>
                    {emp.accessLevel !== "ADMIN" && (
                      <Button
                        variant="outline"
                        size="sm"
                        color="red"
                        onClick={() => handleDeleteClick(emp)}
                      >
                        <Trash2 size={16} />
                        Delete
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-center items-center px-2 py-4 border-t">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || totalPages === 0}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm font-medium">
              {totalPages > 0
                ? `Page ${currentPage} of ${totalPages}`
                : "No pages"}
            </div>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedEmployee?.firstName}{" "}
              {selectedEmployee?.lastName}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {selectedEmployee && (
        <EmployeeEdit
          key={selectedEmployee.id}
          employee={selectedEmployee}
          onSubmit={handleEditSubmit}
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
        />
      )}
    </Card>
  );
};

export default EmployeeTable;
