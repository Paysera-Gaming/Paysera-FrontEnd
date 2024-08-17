// src/components/AdminDashboard/Employee/Employee.tsx

import React, { useState } from 'react';
import EmployeeTable from './EmployeeTable';
import EmployeeDialog from './EmployeeDialog';
import EmployeeSummary from './EmployeeSummary';
import { sampleEmployees } from './sampleData'; // Updated import
import SheetComponent from '../SheetComponent';
import { PaginationComponent } from '../PaginationComponent';

const Employee = () => {
  const [data, setData] = useState(sampleEmployees); // Updated initial data
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'lastName', direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 5;

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const filteredData = data.filter((record) =>
    record.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.team.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveEmployee = (updatedEmployee) => {
    setData(data.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp));
    setIsDialogOpen(false);
  };

  const handleDeleteEmployee = (id) => {
    setData(data.filter(emp => emp.id !== id));
  };

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const employeeCounters = {
    totalActive: data.filter(emp => emp.status === 'Active').length,
    totalOnLunch: data.filter(emp => emp.status === 'Lunch').length,
    totalOnLeave: data.filter(emp => emp.status === 'Leave').length,
    totalOffline: data.filter(emp => emp.status === 'Offline').length,
  };

  return (
    <div className="container mx-auto p-6">
      <SheetComponent />
      <h2 className="text-2xl font-semibold mb-6 text-center">Employee List</h2>
      <EmployeeSummary {...employeeCounters} />
      <div className="flex items-center mb-6 space-x-4">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearch}
          className="border rounded p-2 w-64 max-w-full"
        />
      </div>
      <EmployeeTable
        data={paginatedData}
        setSelectedEmployee={setSelectedEmployee}
        setIsDialogOpen={setIsDialogOpen}
        handleDeleteEmployee={handleDeleteEmployee}
      />
      <div className="flex justify-center mt-4">
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
      <EmployeeDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        selectedEmployee={selectedEmployee}
        setSelectedEmployee={setSelectedEmployee}
        handleSaveEmployee={handleSaveEmployee}
      />
    </div>
  );
};

export default Employee;
