import React, { useState, useEffect } from 'react';
import EmployeeTable from './EmployeeTable';
import EmployeeDialog from './EmployeeDialog';
import EmployeeSummary from './EmployeeSummary';
import { sampleEmployees } from './sampleData';
import SheetComponent from '../SheetComponent';
import { PaginationComponent } from '../PaginationComponent';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

const Employee = () => {
  const [data, setData] = useState(sampleEmployees);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'lastName', direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 5;

  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setCurrentTime(formattedTime);
    };

    const intervalId = setInterval(updateClock, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const filteredData = data.filter((record) =>
    (record.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.team.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (statusFilter !== "all" ? record.status === statusFilter : true) &&
    (typeFilter !== "all" ? record.type === typeFilter : true)
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

  // Updated employee counters based on filtered data
// Updated employee counters based on filtered data
const employeeCounters = {
  totalActive: filteredData.filter(emp => emp.status === 'Active').length,
  activeFixed: filteredData.filter(emp => emp.status === 'Active' && emp.type === 'Fixed').length,
  activeFlexible: filteredData.filter(emp => emp.status === 'Active' && emp.type === 'Flexible').length,
  activeSuperFlexible: filteredData.filter(emp => emp.status === 'Active' && emp.type === 'Super Flexible').length,

  totalOnLunch: filteredData.filter(emp => emp.status === 'Lunch').length,
  lunchFixed: filteredData.filter(emp => emp.status === 'Lunch' && emp.type === 'Fixed').length,
  lunchFlexible: filteredData.filter(emp => emp.status === 'Lunch' && emp.type === 'Flexible').length,
  lunchSuperFlexible: filteredData.filter(emp => emp.status === 'Lunch' && emp.type === 'Super Flexible').length,

  totalOnLeave: filteredData.filter(emp => emp.status === 'Leave').length,
  leaveFixed: filteredData.filter(emp => emp.status === 'Leave' && emp.type === 'Fixed').length,
  leaveFlexible: filteredData.filter(emp => emp.status === 'Leave' && emp.type === 'Flexible').length,
  leaveSuperFlexible: filteredData.filter(emp => emp.status === 'Leave' && emp.type === 'Super Flexible').length,

  totalOffline: filteredData.filter(emp => emp.status === 'Offline').length,
  offlineFixed: filteredData.filter(emp => emp.status === 'Offline' && emp.type === 'Fixed').length,
  offlineFlexible: filteredData.filter(emp => emp.status === 'Offline' && emp.type === 'Flexible').length,
  offlineSuperFlexible: filteredData.filter(emp => emp.status === 'Offline' && emp.type === 'Super Flexible').length,
};


  return (
    <div className="dashboard-container">
      <header className="header">
        <div className="header-left">
          <h1>Employee Dashboard</h1>
          <p className="header-subtitle">View and manage employee information</p>
        </div>
        <div className="header-right">
          <SheetComponent /> {/* Profile component */}
          <div className="current-time">{currentTime}</div>
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
      <SelectItem value="Active">Active</SelectItem>
      <SelectItem value="Offline">Offline</SelectItem>
      <SelectItem value="Lunch">On Lunch</SelectItem>
      <SelectItem value="Leave">On Leave</SelectItem>
    </SelectContent>
  </Select>
  <Select
    value={typeFilter}
    onValueChange={(value) => setTypeFilter(value)}
  >
    <SelectTrigger className="w-32">
      <SelectValue placeholder="Type" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="all">All Types</SelectItem>
      <SelectItem value="Fixed">Fixed</SelectItem>
      <SelectItem value="Flexible">Flexible</SelectItem>
      <SelectItem value="Super Flexible">Super Flexible</SelectItem>
    </SelectContent>
  </Select>
</div>


        <EmployeeSummary {...employeeCounters} />

        <EmployeeTable
          data={paginatedData}
          setSelectedEmployee={setSelectedEmployee}
          setIsDialogOpen={setIsDialogOpen}
          handleDeleteEmployee={handleDeleteEmployee}
          sortConfig={sortConfig}
          setSortConfig={setSortConfig}
          setData={setData}
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
      </main>
    </div>
  );
};

export default Employee;