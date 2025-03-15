import React from 'react';
import { Department, Employee } from './api';

interface DepartmentItemProps {
  department: Department;
  onView: (department: Department) => void;
  onEdit: (department: Department) => void;
  onDelete: (id: number) => void;
}

const DepartmentItem: React.FC<DepartmentItemProps> = ({ department, onView, onEdit, onDelete }) => {
  return (
    <li className="mb-4 p-4 border border-gray-300 rounded dark:border-gray-700 dark:text-white">
      <h2 className="text-xl font-semibold">{department.name}</h2>
      <p className="mb-2">
        Leader: {department.Leader ? `${department.Leader.firstName} ${department.Leader.lastName}` : 'No Leader Assigned'}
      </p>
      <ul className="list-disc pl-5">
        {department.Employees && department.Employees.length > 0 ? (
          <>
            {department.Employees.slice(0, 3).map((employee: Employee) => (
              <li key={employee.id}>
                {employee.firstName} {employee.lastName} - {employee.role === 'Team Leader' ? 'Team Leader' : employee.role}
              </li>
            ))}
            {department.Employees.length > 3 && <li>etc.</li>}
          </>
        ) : (
          <li>No Employees</li>
        )}
      </ul>
      <button
        onClick={() => onView(department)}
        className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800"
      >
        View
      </button>
      <button
        onClick={() => onEdit(department)}
        className="mt-2 ml-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 dark:bg-yellow-700 dark:hover:bg-yellow-800"
      >
        Edit
      </button>
      <button
        onClick={() => onDelete(department.id)}
        className="mt-2 ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800"
      >
        Delete
      </button>
    </li>
  );
};

export default DepartmentItem;