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
import { PaginationComponent } from './PaginationComponent'; // Adjust the path if needed

// Importing icons
import { UserIcon, UsersIcon, ClockIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const Employee = () => {
  const initialData = [
    { id: 1, lastName: 'Smith', firstName: 'Ken', middleName: 'A.', status: 'Active', team: 'Tech Department', role: 'Developer', email: 'ken99@yahoo.com', type: 'Fixed' },
    { id: 2, lastName: 'Johnson', firstName: 'Abe', middleName: 'B.', status: 'Leave', team: 'Call Department', role: 'Support', email: 'abe45@gmail.com', type: 'Flexible' },
    { id: 3, lastName: 'Lee', firstName: 'Monserrat', middleName: 'C.', status: 'Lunch', team: 'Tech Department', role: 'Lead Developer', email: 'monserrat44@gmail.com', type: 'Super Flexible' },
    { id: 4, lastName: 'Parker', firstName: 'Silas', middleName: 'D.', status: 'Offline', team: 'Call Department', role: 'Manager', email: 'silas22@gmail.com', type: 'Fixed' },
    // Add more data as needed
  ];

  const [data, setData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'lastName', direction: 'ascending' });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Number of items per page

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on search
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

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortData = (data, config) => {
    const sortedData = [...data].sort((a, b) => {
      if (a[config.key] < b[config.key]) {
        return config.direction === 'ascending' ? -1 : 1;
      }
      if (a[config.key] > b[config.key]) {
        return config.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    return sortedData;
  };

  const filteredData = data.filter((record) =>
    record.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.team.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedData = sortData(filteredData, sortConfig);

  // Calculate pagination
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Calculate counters
  const totalActive = data.filter(emp => emp.status === 'Active').length;
  const totalOnLunch = data.filter(emp => emp.status === 'Lunch').length;
  const totalOnLeave = data.filter(emp => emp.status === 'Leave').length;
  const totalOffline = data.filter(emp => emp.status === 'Offline').length;

  return (
    <div className="container mx-auto p-6">
      <SheetComponent />
      <h2 className="text-2xl font-semibold mb-6 text-center">Employee List</h2>

{/* Employee Status Summary */}
<div className="grid grid-cols-4 gap-4 mb-6">
  {/* Active Employees */}
  <div className="bg-green-100 p-4 rounded border border-green-300 text-center shadow-sm">
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center mb-2">
        <UserIcon className="w-8 h-8 text-green-600" /> {/* Larger icon */}
        <p className="text-4xl font-bold text-black ml-2">{totalActive}</p> {/* Larger count */}
      </div>
      <h3 className="text-lg font-semibold text-green-600">Active Employees</h3> {/* Label below */}
    </div>
  </div>

  {/* Employees on Lunch */}
  <div className="bg-yellow-100 p-4 rounded border border-yellow-300 text-center shadow-sm">
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center mb-2">
        <ClockIcon className="w-8 h-8 text-yellow-600" /> {/* Larger icon */}
        <p className="text-4xl font-bold text-black ml-2">{totalOnLunch}</p> {/* Larger count */}
      </div>
      <h3 className="text-lg font-semibold text-yellow-600">Employees on Lunch</h3> {/* Label below */}
    </div>
  </div>

  {/* Employees on Leave */}
  <div className="bg-red-100 p-4 rounded border border-red-300 text-center shadow-sm">
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center mb-2">
        <ShieldCheckIcon className="w-8 h-8 text-red-600" /> {/* Larger icon */}
        <p className="text-4xl font-bold text-black ml-2">{totalOnLeave}</p> {/* Larger count */}
      </div>
      <h3 className="text-lg font-semibold text-red-600">Employees on Leave</h3> {/* Label below */}
    </div>
  </div>

  {/* Employees Offline */}
  <div className="bg-gray-100 p-4 rounded border border-gray-300 text-center shadow-sm">
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center mb-2">
        <UsersIcon className="w-8 h-8 text-gray-600" /> {/* Larger icon */}
        <p className="text-4xl font-bold text-black ml-2">{totalOffline}</p> {/* Larger count */}
      </div>
      <h3 className="text-lg font-semibold text-gray-600">Employees Offline</h3> {/* Label below */}
    </div>
  </div>
</div>


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
            <TableHead className="text-center border-x cursor-pointer" onClick={() => handleSort('lastName')}>
              <UserIcon className="w-5 h-5 inline mr-2" />
              Full Name
            </TableHead>
            <TableHead className="text-center border-x cursor-pointer" onClick={() => handleSort('status')}>
              <ClockIcon className="w-5 h-5 inline mr-2" />
              Status
            </TableHead>
            <TableHead className="text-center border-x cursor-pointer" onClick={() => handleSort('team')}>
              <UsersIcon className="w-5 h-5 inline mr-2" />
              Team & Role
            </TableHead>
            <TableHead className="text-center border-x cursor-pointer" onClick={() => handleSort('type')}>
              <ShieldCheckIcon className="w-5 h-5 inline mr-2" />
              Type
            </TableHead>
            <TableHead className="text-center border-x cursor-pointer" onClick={() => handleSort('email')}>
              <ShieldCheckIcon className="w-5 h-5 inline mr-2" />
              Email
            </TableHead>
            <TableHead className="text-center border-x">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell className="text-center border-x">
                {`${employee.lastName}, ${employee.firstName} ${employee.middleName}`}
              </TableCell>
              <TableCell className="text-center border-x">
                <span className={`inline-block w-3 h-3 mr-2 rounded-full ${employee.status === 'Active' ? 'bg-green-500' : employee.status === 'Lunch' ? 'bg-yellow-500' : employee.status === 'Leave' ? 'bg-red-500' : 'bg-gray-500'}`}></span>
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

      <div className="flex justify-center mt-4">
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

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
