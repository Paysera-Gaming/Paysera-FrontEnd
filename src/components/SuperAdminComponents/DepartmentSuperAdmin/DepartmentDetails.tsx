import React from 'react';
import { Department, Employee } from './api';

interface DepartmentDetailsProps {
  department: Department;
  onBack: () => void;
}

const DepartmentDetails: React.FC<DepartmentDetailsProps> = ({ department, onBack }) => {
  return (
    <div className="container mx-auto p-4 dark:text-white">
      <button
        onClick={onBack}
        className="mb-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-800"
      >
        Back
      </button>
      <h1 className="text-2xl font-bold mb-4">{department.name}</h1>
      <p className="mb-2">
        Leader: {department.Leader ? `${department.Leader.firstName} ${department.Leader.lastName}` : 'No Leader Assigned'}
      </p>
      <ul className="list-disc pl-5">
        {department.Employees && department.Employees.length > 0 ? (
          department.Employees.map((employee: Employee) => (
            <li key={employee.id}>
              {employee.firstName} {employee.lastName} - {employee.role === 'Team Leader' ? 'Team Leader' : employee.role}
            </li>
          ))
        ) : (
          <li>No Employees</li>
        )}
      </ul>
    </div>
  );
};

export default DepartmentDetails;