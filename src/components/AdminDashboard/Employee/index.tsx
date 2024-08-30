import React, { useState, useEffect } from 'react';
import EmployeeTable from './EmployeeTable';
import EmployeeDialog from './EmployeeDialog';
import EmployeeSummary from './EmployeeSummary';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import ConfirmationDialog from './ConfirmationDialog'; // Import the confirmation dialog
import axios from 'axios'; // Import Axios for API requests

// Define the Employee type
type Employee = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  middleName: string;
  accessLevel: string;
  isActive: boolean;
  departmentId: number | null;
  role: string;
};

const EmployeeComponent = () => {
  const [data, setData] = useState<Employee[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null); // Use Employee type
  const [sortConfig, setSortConfig] = useState<{ key: keyof Employee; direction: "ascending" | "descending" }>({ key: 'lastName', direction: 'ascending' } as { key: keyof Employee; direction: "ascending" | "descending" });
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false); // State for confirmation dialog
  const [employeeToDelete, setEmployeeToDelete] = useState<number | null>(null); // Employee ID to delete

  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    // Fetch data using Axios
    axios.get('https://192.168.3.50:8080/api/employee')
      .then(response => {
        // Set the employee data from the response
        setData(response.data);
        console.log(response.data);
      })
      .catch(error => {
        // Handle any errors
        console.log(error);
        alert('An error occurred while fetching the data');
      });
  }, []); // Empty array means this runs once when the component mounts

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = data.filter((record) =>
    (record.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.username.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (statusFilter !== "all" ? record.isActive.toString() === statusFilter : true) &&
    (typeFilter !== "all" ? record.accessLevel === typeFilter : true)
  );

  const handleSaveEmployee = (updatedEmployee: Employee) => {
    if (updatedEmployee.id === 0) {
      // Create new employee
      const newEmployee = { ...updatedEmployee, id: data.length + 1 };
      setData([...data, newEmployee]);
    } else {
      // Update existing employee
      setData(data.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp));
    }
    setIsDialogOpen(false);
  };

  const confirmDeleteEmployee = (id: number) => {
    setData(data.filter(emp => emp.id !== id));
    setIsConfirmationOpen(false);
  };

  const handleDeleteEmployee = (id: number) => {
    setEmployeeToDelete(id);
    setIsConfirmationOpen(true); // Open confirmation dialog
  };

  const handleStatusFilterChange = (status: string) => {
    setStatusFilter((prevStatus) => (prevStatus === status ? "all" : status));
  };

  // Updated employee counters based on filtered data
  const employeeCounters = {
    totalActive: filteredData.filter(emp => emp.isActive).length,
    activeAdmin: filteredData.filter(emp => emp.isActive && emp.accessLevel === 'ADMIN').length,
    activeUser: filteredData.filter(emp => emp.isActive && emp.accessLevel === 'USER').length,

    totalInactive: filteredData.filter(emp => !emp.isActive).length,
    inactiveAdmin: filteredData.filter(emp => !emp.isActive && emp.accessLevel === 'ADMIN').length,
    inactiveUser: filteredData.filter(emp => !emp.isActive && emp.accessLevel === 'USER').length,
  };

  return (
    <div className="dashboard-container">
      <header className="header">
        <div className="header-left">
          <h1>Employee Dashboard</h1>
          <p className="header-subtitle">View and manage employee information</p>
        </div>
      </header>

      <main className="main-content container mx-auto p-11">
        <div className="flex items-center mb-0 space-x-3">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
            className="border rounded p-1.5 w-36 max-w-full"
          />
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value)}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="true">Active</SelectItem>
              <SelectItem value="false">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={typeFilter}
            onValueChange={(value) => setTypeFilter(value)}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Access Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="ADMIN">Admin</SelectItem>
              <SelectItem value="USER">User</SelectItem>
            </SelectContent>
          </Select>
          <button
            onClick={() => {
              setSelectedEmployee({ id: 0, username: '', firstName: '', lastName: '', middleName: '', accessLevel: 'USER', isActive: true, departmentId: null, role: '' });
              setIsDialogOpen(true);
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Create Employee
          </button>
        </div>

        <EmployeeSummary
          {...employeeCounters}
          onStatusFilterChange={handleStatusFilterChange} // Pass the filter change handler
        />

        <EmployeeTable
          data={filteredData}
          setSelectedEmployee={setSelectedEmployee} // Adjusted to match the type
          setIsDialogOpen={setIsDialogOpen}
          handleDeleteEmployee={handleDeleteEmployee}
          setSortConfig={sortConfig}
          sortConfig={setSortConfig}
          setData={setData}
        />

        <EmployeeDialog
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          selectedEmployee={selectedEmployee}
          setSelectedEmployee={setSelectedEmployee}
          handleSaveEmployee={handleSaveEmployee}
        />

        <ConfirmationDialog
          isOpen={isConfirmationOpen}
          onClose={() => setIsConfirmationOpen(false)}
          onConfirm={() => employeeToDelete !== null && confirmDeleteEmployee(employeeToDelete)}
          message="Are you sure you want to delete this employee?"
        />
      </main>
    </div>
  );
};

export default EmployeeComponent;