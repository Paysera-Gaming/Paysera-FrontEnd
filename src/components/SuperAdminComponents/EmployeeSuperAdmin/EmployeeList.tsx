import React, { useEffect, useState, SetStateAction } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import SummaryCards from './SummaryCards';
import EmployeeTable from './EmployeeTable';

interface Employee {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  middleName: string;
  accessLevel: string;
  isActive: boolean;
  departmentId: number;
  role: string;
}

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('overall');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('https://192.168.110.6:8080/api/employee');
        console.log('API Response:', response.data); // Log the response to verify its structure
        if (Array.isArray(response.data)) {
          setEmployees(response.data);
        } else {
          console.error('Unexpected response format:', response.data);
          setError('Unexpected response format');
        }
      } catch (error) {
        console.error('Error fetching employee data:', error);
        setError('Error fetching employee data');
      }
    };

    fetchEmployees();
  }, []);

  const handleFilterClick = (filter: SetStateAction<string>) => {
    setActiveFilter(filter);
  };

  const filteredEmployees = employees
    .filter((emp) => {
      if (activeFilter === 'online') {
        return emp.isActive;
      } else if (activeFilter === 'offline') {
        return !emp.isActive;
      }
      return true; // 'overall' filter shows all employees
    })
    .filter((emp) =>
      emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.middleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.departmentId.toString().includes(searchTerm.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const overallCount = employees.length;
  const onlineCount = employees.filter((emp) => emp.isActive).length;
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
        <p>{error}</p>
      ) : filteredEmployees.length > 0 ? (
        <EmployeeTable employees={filteredEmployees} />
      ) : (
        <div className="text-center text-gray-500 dark:text-gray-400">
          {searchTerm
            ? `No results found for "${searchTerm}".`
            : `No ${activeFilter !== 'overall' ? activeFilter : ''} employees found.`}
        </div>
      )}
    </div>
  );
};

export default EmployeeList;