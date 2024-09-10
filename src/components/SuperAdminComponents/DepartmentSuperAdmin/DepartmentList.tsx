import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchDepartments, fetchTeamLeaders, deleteDepartment, Department, Leader, Employee } from './api';
import DepartmentForm from './DepartmentForm';

const DepartmentList: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: departments = [] } = useQuery<Department[]>({
    queryKey: ['departments'],
    queryFn: fetchDepartments,
  });
  const { data: teamLeaders = [] } = useQuery<Leader[]>({
    queryKey: ['teamLeaders'],
    queryFn: fetchTeamLeaders,
  });

  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);

  const deleteDepartmentMutation = useMutation({
    mutationFn: deleteDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
  });

  const handleEditDepartment = (department: Department) => {
    setEditingDepartment(department);
  };

  const handleDeleteDepartment = (id: number) => {
    deleteDepartmentMutation.mutate(id);
  };

  return (
    <div className="container mx-auto p-4 dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Department List</h1>
      <DepartmentForm
        editingDepartment={editingDepartment}
        setEditingDepartment={setEditingDepartment}
        teamLeaders={teamLeaders}
        departments={departments}
      />
      <ul>
        {departments.map((department: Department) => (
          <li key={department.id} className="mb-4 p-4 border border-gray-300 rounded dark:border-gray-700">
            <h2 className="text-xl font-semibold">{department.name}</h2>
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
            <button
              onClick={() => handleEditDepartment(department)}
              className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 dark:bg-yellow-700 dark:hover:bg-yellow-800"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteDepartment(department.id)}
              className="mt-2 ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DepartmentList;