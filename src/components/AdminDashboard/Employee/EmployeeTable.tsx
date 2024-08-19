import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { UserIcon, ClockIcon, UsersIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { handleSort } from './EmployeeActions'; 

const EmployeeTable = ({ data, setSelectedEmployee, setIsDialogOpen, handleDeleteEmployee }) => {
  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setIsDialogOpen(true);
  };

  return (
    <Table className="w-full border-collapse">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center border-x cursor-pointer" onClick={() => handleSort('lastName')}>
            <UserIcon className="w-5 h-5 inline mr-2" /> Full Name
          </TableHead>
          <TableHead className="text-center border-x cursor-pointer" onClick={() => handleSort('status')}>
            <ClockIcon className="w-5 h-5 inline mr-2" /> Status
          </TableHead>
          <TableHead className="text-center border-x cursor-pointer" onClick={() => handleSort('team')}>
            <UsersIcon className="w-5 h-5 inline mr-2" /> Team & Role
          </TableHead>
          <TableHead className="text-center border-x cursor-pointer" onClick={() => handleSort('type')}>
            <ShieldCheckIcon className="w-5 h-5 inline mr-2" /> Type
          </TableHead>
          <TableHead className="text-center border-x">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(employee => (
          <TableRow key={employee.id}>
            <TableCell className="text-center border-x">{`${employee.lastName}, ${employee.firstName} ${employee.middleName}`}</TableCell>
            <TableCell className="text-center border-x">{employee.status}</TableCell>
            <TableCell className="text-center border-x">{employee.team} - {employee.role}</TableCell>
            <TableCell className="text-center border-x">{employee.type}</TableCell>
            <TableCell className="text-center border-x space-x-2">
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={() => handleEditEmployee(employee)}
          className="bg-blue-500 text-white hover:bg-blue-600" // Add hover:bg-blue-600 for hover effect
        >
          Edit
        </Button>
      </TooltipTrigger>
      <TooltipContent>Edit Employee</TooltipContent>
    </Tooltip>
  </TooltipProvider>
  <Button
    onClick={() => handleDeleteEmployee(employee.id)}
    className="bg-red-500 text-white hover:bg-red-600" // Add hover:bg-red-600 for hover effect
  >
    Delete
  </Button>
</TableCell>

          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default EmployeeTable;
