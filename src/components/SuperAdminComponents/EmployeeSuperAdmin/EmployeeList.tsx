import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import SearchBar from './SearchBar';
import SummaryCards from './SummaryCards';
import EmployeeTable from './EmployeeTable';
import EmployeeForm from './EmployeeForm';
import EmployeeEdit from './EmployeeEdit';
import { Employee } from './types'; // Import the shared Employee type

const fetchEmployees = async (): Promise<Employee[]> => {
  const response = await axios.get(import.meta.env.VITE_BASE_API + '/api/employee');
  return response.data;
};

const EmployeeList: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: employees = [], error } = useQuery<Employee[], Error>({
    queryKey: ['employees'],
    queryFn: fetchEmployees,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('overall');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const addEmployeeMutation = useMutation({
    mutationFn: (newEmployee: Employee) => axios.post(import.meta.env.VITE_BASE_API + '/api/employee', {
      ...newEmployee,
      middleName: newEmployee.middleName || "", // Handle optional middle name
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
  });

  const editEmployeeMutation = useMutation({
    mutationFn: (updatedEmployee: Employee) => axios.put(`${import.meta.env.VITE_BASE_API}/api/employee/${updatedEmployee.id}`, {
      ...updatedEmployee,
      middleName: updatedEmployee.middleName || "", // Handle optional middle name
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
  });

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleFormSubmit = (newEmployee: Employee) => {
    addEmployeeMutation.mutate(newEmployee);
    setIsFormOpen(false);
  };

  const handleEditSubmit = (updatedEmployee: Employee) => {
    editEmployeeMutation.mutate(updatedEmployee);
    setIsEditOpen(false);
    setSelectedEmployee(null);
  };

  const filteredEmployees = employees
    .filter((emp: Employee) => {
      if (activeFilter === 'online') {
        return emp.isActive;
      } else if (activeFilter === 'offline') {
        return !emp.isActive;
      }
      return true;
    })
    .filter((emp: Employee) =>
      emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (emp.middleName && emp.middleName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      emp.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const overallCount = employees.length;
  const onlineCount = employees.filter((emp: Employee) => emp.isActive).length;
  const offlineCount = overallCount - onlineCount;

  return (
    <div className="p-4 space-y-4">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <SummaryCards
        overallCount={overallCount}
        onlineCount={onlineCount}
        offlineCount={offlineCount}
        activeFilter={activeFilter}
        handleFilterClick={handleFilterClick}
      />
      {error ? (
        <p>{error.message}</p>
      ) : filteredEmployees.length > 0 ? (
        <EmployeeTable employees={filteredEmployees} />
      ) : (
        <div className="text-center text-gray-500 dark:text-gray-400">
          {searchTerm
            ? `No results found for "${searchTerm}".`
            : `No ${activeFilter !== 'overall' ? activeFilter : ''} employees found.`}
        </div>
      )}
      <EmployeeForm onSubmit={handleFormSubmit} isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
      {selectedEmployee && (
        <EmployeeEdit
          onSubmit={handleEditSubmit}
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          employee={selectedEmployee}
        />
      )}
    </div>
  );
};

export default EmployeeList;