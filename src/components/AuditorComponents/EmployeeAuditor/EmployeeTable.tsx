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
import { ChevronLeft, ChevronRight, Circle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Employee } from "./types";

interface EmployeeTableProps {
  employees: Employee[];
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 9;

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
              <TableHead>Role</TableHead> {/* Updated to show Role */}
              <TableHead>Allowed Overtime</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentEmployees.map((emp) => (
              <TableRow key={emp.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Circle
                      size={16}
                      color={emp.attendanceStatus === "ONGOING" ? "green" : "red"}
                      fill={emp.attendanceStatus === "ONGOING" ? "green" : "red"}
                    />
                    {`${emp.lastName}, ${emp.firstName} ${emp.middleName || ""}`}
                  </div>
                </TableCell>
                <TableCell>{emp.username}</TableCell>
                <TableCell>
                  {emp.attendanceStatus === "ONGOING" ? "Online" : "Offline"}
                </TableCell>
                <TableCell>{emp.role}</TableCell> {/* Updated to show Role */}
                <TableCell>
                  {emp.isAllowedRequestOvertime ? "Yes" : "No"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-center items-center px-2 py-4 border-t">
          <div className="flex items-center space-x-2">
            <button
              className="h-8 w-8 p-0"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || totalPages === 0}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="text-sm font-medium">
              {totalPages > 0
                ? `Page ${currentPage} of ${totalPages}`
                : "No pages"}
            </div>
            <button
              className="h-8 w-8 p-0"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeTable;