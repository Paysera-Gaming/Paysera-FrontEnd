import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Middle Name</th>
              <th>Access Level</th>
              <th>Is Active</th>
              <th>Department ID</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(employees) && employees.map(employee => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.username}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.middleName}</td>
                <td>{employee.accessLevel}</td>
                <td>{employee.isActive ? 'Yes' : 'No'}</td>
                <td>{employee.departmentId}</td>
                <td>{employee.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeList;