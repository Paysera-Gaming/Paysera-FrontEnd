import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const statusColors: { [key: string]: string } = {
  Active: 'bg-green-500',
  Offline: 'bg-gray-500', // Now includes both 'Offline' and 'Leave'
};

const EmployeeTable = ({ data, setSelectedEmployee, setIsDialogOpen, handleDeleteEmployee }: { data: any[], setSelectedEmployee: (employee: any) => void, setIsDialogOpen: (isOpen: boolean) => void, handleDeleteEmployee: (id: number) => void }) => {
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

  const handleSort = (key: string) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...data].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const handleEditEmployee = (employee: any) => {
    setSelectedEmployee(employee);
    setIsDialogOpen(true);
  };

  const getStatusDisplay = (status: string) => {
    if (status === 'Lunch') return 'Active';
    if (status === 'Leave') return 'Offline';
    return status;
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
            onClick={() => handleSort('status')}
          >
            Status {sortConfig.key === 'status' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
          </TableHead>
          <TableHead
            className="text-center border-x cursor-pointer"
            onClick={() => handleSort('team')}
          >
            Team & Role {sortConfig.key === 'team' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
          </TableHead>
          <TableHead
            className="text-center border-x cursor-pointer"
            onClick={() => handleSort('type')}
          >
            Type {sortConfig.key === 'type' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
          </TableHead>
          <TableHead className="text-center border-x">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedData.map(employee => {
          // Adjust the status and color based on Lunch and Leave
          const displayStatus = getStatusDisplay(employee.status);
          const statusColor = statusColors[displayStatus] || 'bg-gray-500'; // Default to gray if no match

          return (
            <TableRow key={employee.id}>
              <TableCell className="text-left border-x flex items-center space-x-2">
                <span className={`inline-block w-3 h-3 rounded-full ${statusColor}`}></span>
                <span>{`${employee.lastName}, ${employee.firstName} ${employee.middleName}`}</span>
              </TableCell>
              <TableCell className="text-center border-x">
                <div className="flex items-center justify-center space-x-2">
                  <span>{displayStatus}</span> {/* Display adjusted status */}
                </div>
              </TableCell>
              <TableCell className="text-center border-x">{employee.team} - {employee.role}</TableCell>
              <TableCell className="text-center border-x">{employee.type}</TableCell>
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
                <Button
                  onClick={() => handleDeleteEmployee(employee.id)}
                  className="bg-red-500 text-white hover:bg-red-700"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default EmployeeTable;
