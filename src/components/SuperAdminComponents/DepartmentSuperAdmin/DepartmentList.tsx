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
  const [viewingDepartment, setViewingDepartment] = useState<Department | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleViewDepartment = (department: Department) => {
    setViewingDepartment(department);
  };

  const handleBackToList = () => {
    setViewingDepartment(null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredDepartments = departments.filter((department) => {
    const searchLower = searchQuery.toLowerCase();
    const departmentNameMatch = department.name.toLowerCase().includes(searchLower);
    const leaderMatch = department.Leader
      ? `${department.Leader.firstName} ${department.Leader.lastName}`.toLowerCase().includes(searchLower)
      : false;
    const membersMatch = department.Employees
      ? department.Employees.some((employee) =>
          `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchLower)
        )
      : false;
    return departmentNameMatch || leaderMatch || membersMatch;
  });

  if (viewingDepartment) {
    return (
      <div className="container mx-auto p-4 dark:text-white">
        <button
          onClick={handleBackToList}
          className="mb-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-800"
        >
          Back
        </button>
        <h1 className="text-2xl font-bold mb-4">{viewingDepartment.name}</h1>
        <p className="mb-2">
          Leader: {viewingDepartment.Leader ? `${viewingDepartment.Leader.firstName} ${viewingDepartment.Leader.lastName}` : 'No Leader Assigned'}
        </p>
        <ul className="list-disc pl-5">
          {viewingDepartment.Employees && viewingDepartment.Employees.length > 0 ? (
            viewingDepartment.Employees.map((employee: Employee) => (
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
  }

  return (
    <div className="container mx-auto p-4 dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Department List</h1>
      <DepartmentForm
        editingDepartment={editingDepartment}
        setEditingDepartment={setEditingDepartment}
        teamLeaders={teamLeaders}
        departments={departments}
      />
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by department name, leader, or members"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
      </div>
      <ul>
        {filteredDepartments.map((department: Department) => (
          <li key={department.id} className="mb-4 p-4 border border-gray-300 rounded dark:border-gray-700">
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
              onClick={() => handleViewDepartment(department)}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800"
            >
              View
            </button>
            <button
              onClick={() => handleEditDepartment(department)}
              className="mt-2 ml-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 dark:bg-yellow-700 dark:hover:bg-yellow-800"
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