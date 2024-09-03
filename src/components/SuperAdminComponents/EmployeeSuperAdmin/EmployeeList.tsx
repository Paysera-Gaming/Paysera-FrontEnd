import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EmployeeTable from './EmployeeTable'; // Import the EmployeeTable component

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

  return (
    <div>
      <h1>Employee List</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <EmployeeTable employees={employees} /> // Use the EmployeeTable component
      )}
    </div>
  );
};

export default EmployeeList;