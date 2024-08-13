import React, { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import SheetComponent from './SheetComponent';

const Employee = () => {
  const initialData = [
    { id: 1, lastName: 'Smith', firstName: 'Ken', middleName: 'A.', status: 'Active', team: 'Tech Department', role: 'Developer', email: 'ken99@yahoo.com', type: 'Fixed' },
    { id: 2, lastName: 'Johnson', firstName: 'Abe', middleName: 'B.', status: 'Inactive', team: 'Call Department', role: 'Support', email: 'abe45@gmail.com', type: 'Flexible' },
    { id: 3, lastName: 'Lee', firstName: 'Monserrat', middleName: 'C.', status: 'Active', team: 'Tech Department', role: 'Lead Developer', email: 'monserrat44@gmail.com', type: 'Super Flexible' },
    { id: 4, lastName: 'Parker', firstName: 'Silas', middleName: 'D.', status: 'Active', team: 'Call Department', role: 'Manager', email: 'silas22@gmail.com', type: 'Fixed' },
  ];

  const [data, setData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setIsDialogOpen(true);
  };

  const handleSaveEmployee = () => {
    setData(data.map((emp) => (emp.id === selectedEmployee.id ? selectedEmployee : emp)));
    setIsDialogOpen(false);
  };

  const handleDeleteEmployee = (id) => {
    setData(data.filter(emp => emp.id !== id));
  };

  const filteredData = data.filter((record) =>
    record.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.team.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <SheetComponent />
      <h2 className="text-2xl font-semibold mb-6 text-center">Employee List</h2>
      <div className="flex items-center mb-6 space-x-4">
        <div className="flex-grow">
          <Input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
            className="border rounded p-2 w-64 max-w-full"
          />
        </div>
      </div>

      <Table className="w-full border-collapse">
        <TableCaption>Details of employees and their statuses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center border-x">Full Name</TableHead>
            <TableHead className="text-center border-x">Status</TableHead>
            <TableHead className="text-center border-x">Team & Role</TableHead>
            <TableHead className="text-center border-x">Type</TableHead>
            <TableHead className="text-center border-x">Email</TableHead>
            <TableHead className="text-center border-x">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell className="text-center border-x">
                {`${employee.lastName}, ${employee.firstName} ${employee.middleName}`}
              </TableCell>
              <TableCell className="text-center border-x">
                <span className={`inline-block w-3 h-3 mr-2 rounded-full ${employee.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                {employee.status}
              </TableCell>
              <TableCell className="text-center border-x">
                {employee.team} - {employee.role}
              </TableCell>
              <TableCell className="text-center border-x">{employee.type}</TableCell>
              <TableCell className="text-center border-x">{employee.email}</TableCell>
              <TableCell className="text-center border-x space-x-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={() => handleEditEmployee(employee)}
                        className="bg-blue-500 text-white hover:bg-blue-600"
                      >
                        Edit
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Edit Employee</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Button
                  onClick={() => handleDeleteEmployee(employee.id)}
                  className="bg-red-500 text-white hover:bg-red-600"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
            <DialogDescription>Manage the employee details here.</DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="last-name">Last Name</label>
              <Input
                id="last-name"
                value={selectedEmployee?.lastName || ''}
                onChange={(e) => setSelectedEmployee({ ...selectedEmployee, lastName: e.target.value })}
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="first-name">First Name</label>
              <Input
                id="first-name"
                value={selectedEmployee?.firstName || ''}
                onChange={(e) => setSelectedEmployee({ ...selectedEmployee, firstName: e.target.value })}
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="middle-name">Middle Name</label>
              <Input
                id="middle-name"
                value={selectedEmployee?.middleName || ''}
                onChange={(e) => setSelectedEmployee({ ...selectedEmployee, middleName: e.target.value })}
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="team">Team</label>
              <Input
                id="team"
                value={selectedEmployee?.team || ''}
                onChange={(e) => setSelectedEmployee({ ...selectedEmployee, team: e.target.value })}
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="role">Role</label>
              <Input
                id="role"
                value={selectedEmployee?.role || ''}
                onChange={(e) => setSelectedEmployee({ ...selectedEmployee, role: e.target.value })}
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="type">Type</label>
              <Select
                id="type"
                value={selectedEmployee?.type || 'Fixed'}
                onValueChange={(value) => setSelectedEmployee({ ...selectedEmployee, type: value })}
              >
                <SelectTrigger className="border p-2 rounded w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fixed">Fixed</SelectItem>
                  <SelectItem value="Flexible">Flexible</SelectItem>
                  <SelectItem value="Super Flexible">Super Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                value={selectedEmployee?.email || ''}
                onChange={(e) => setSelectedEmployee({ ...selectedEmployee, email: e.target.value })}
                className="border p-2 rounded w-full"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4 space-x-4">
            <Button onClick={() => setIsDialogOpen(false)} className="bg-gray-500 text-white hover:bg-gray-600">Cancel</Button>
            <Button onClick={handleSaveEmployee} className="bg-blue-500 text-white hover:bg-blue-600">Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Employee;
