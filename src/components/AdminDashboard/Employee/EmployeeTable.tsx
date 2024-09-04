import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const statusColors: { [key: string]: string } = {
  Online: 'bg-green-500',
  Inactive: 'bg-gray-500',
  Leave: 'bg-red-500',
  Lunch: 'bg-orange-500',
  Offline: 'bg-gray-500'
};

type Employee = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  middleName: string;
  accessLevel: 'ADMIN' | 'EMPLOYEE' | 'TEAM_LEADER';
  isActive: boolean;
  departmentId: number | null;
  role: string;
};

interface EmployeeTableProps {
  data: Employee[];
  setSelectedEmployee: (employee: Employee | null) => void;
  setIsDialogOpen: (isOpen: boolean) => void;
  handleDeleteEmployee: (id: number) => void;
  sortConfig: { key: keyof Employee | '', direction: 'ascending' | 'descending' | '' };
  setSortConfig: React.Dispatch<React.SetStateAction<{ key: keyof Employee | '', direction: 'ascending' | 'descending' | '' }>>;
  setData: React.Dispatch<React.SetStateAction<Employee[]>>;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  data,
  setSelectedEmployee,
  setIsDialogOpen,
  handleDeleteEmployee,
  sortConfig,
  setSortConfig,
  setData,
}) => {

  const handleSort = (key: keyof Employee) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortConfig.key !== '' && a[sortConfig.key]! < b[sortConfig.key]!) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (sortConfig.key !== '' && a[sortConfig.key]! > b[sortConfig.key]!) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const handleEditEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDialogOpen(true);
  };

  const updateEmployeeStatus = (employee: Employee) => {
    let updatedStatus = employee.isActive ? "Inactive" : "Online";

    if (employee.isActive ) {
      updatedStatus = "Offline";
    } else {
      updatedStatus = "Online";
    }

    const updatedEmployee = { ...employee, status: updatedStatus };
    setData(prevData =>
      prevData.map(emp =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      )
    );
  };

  return (
    <Table className="w-full border-collapse">
      <TableHeader>
        <TableRow>
          <TableHead
            className="text-left border-x cursor-pointer"
            onClick={() => handleSort('lastName')}
          >
            Full Name {sortConfig.key === 'lastName' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
          </TableHead>
          <TableHead
            className="text-center border-x cursor-pointer"
            onClick={() => handleSort('isActive')}
          >
            Status {sortConfig.key === 'isActive' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
          </TableHead>
          <TableHead
            className="text-center border-x cursor-pointer"
            onClick={() => handleSort('departmentId')}
          >
            Team & Role {sortConfig.key === '' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
          </TableHead>
          <TableHead
            className="text-center border-x cursor-pointer"
            onClick={() => handleSort('accessLevel')}
          >
            Type {sortConfig.key === 'accessLevel' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
          </TableHead>
          <TableHead className="text-center border-x">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedData.map(employee => (
          <TableRow key={employee.id}>
            <TableCell className="text-left border-x flex items-center space-x-2">
              <span className={`inline-block w-3 h-3 rounded-full ${statusColors[employee.isActive ? 'Online' : 'Inactive']}`}></span>
              <span>{`${employee.lastName}, ${employee.firstName} ${employee.middleName}`}</span>
            </TableCell>
            <TableCell className="text-center border-x">
              <div className="flex items-center justify-center space-x-2">
                <span>{employee.isActive ? 'Online' : 'Inactive'}</span>
              </div>
            </TableCell>
            <TableCell className="text-center border-x">{employee.departmentId} - {employee.role}</TableCell>
            <TableCell className="text-center border-x">{employee.accessLevel}</TableCell>
            <TableCell className="text-center border-x space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => handleEditEmployee(employee)}
                      className="bg-blue-500 text-white hover:bg-blue-700"
                    >
                      Edit
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Edit Employee</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => {
                        updateEmployeeStatus(employee);
                        handleDeleteEmployee(employee.id);
                      }}
                      className="bg-red-500 text-white hover:bg-red-700"
                    >
                      Delete
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Delete Employee</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default EmployeeTable;