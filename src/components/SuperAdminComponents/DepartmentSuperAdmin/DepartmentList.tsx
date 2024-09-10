import React, { useState } from 'react';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Employee {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  middleName: string;
  accessLevel: string;
  isActive: boolean;
  role: string;
}

interface Leader extends Employee {}

interface Department {
  id: number;
  name: string;
  leaderId: number;
  updatedAt: string;
  createdAt: string;
  Employees?: Employee[];
  Leader: Leader | null;
}

const fetchDepartments = async (): Promise<Department[]> => {
  const response = await axios.get(`${import.meta.env.VITE_BASE_API}/api/department`);
  return response.data;
};

const fetchTeamLeaders = async (): Promise<Leader[]> => {
  const response = await axios.get(`${import.meta.env.VITE_BASE_API}/api/employee/team-leader`);
  return response.data;
};

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

  const [newDepartmentName, setNewDepartmentName] = useState('');
  const [newDepartmentLeaderId, setNewDepartmentLeaderId] = useState<number | null>(null);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);

  const addDepartmentMutation = useMutation({
    mutationFn: async (newDepartment: { name: string; leaderId: number }) => {
      const response = await axios.post(`${import.meta.env.VITE_BASE_API}/api/department`, newDepartment);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
  });

  const updateDepartmentMutation = useMutation({
    mutationFn: async (updatedDepartment: { id: number; name: string }) => {
      const response = await axios.put(`${import.meta.env.VITE_BASE_API}/api/department/${updatedDepartment.id}`, { name: updatedDepartment.name });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
  });

  const updateDepartmentLeaderMutation = useMutation({
    mutationFn: async (updatedLeader: { id: number; leaderId: number }) => {
      const response = await axios.put(`${import.meta.env.VITE_BASE_API}/api/department/${updatedLeader.id}/leader`, { leaderId: updatedLeader.leaderId });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
  });

  const deleteDepartmentMutation = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`${import.meta.env.VITE_BASE_API}/api/department/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
  });

  const handleAddDepartment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDepartmentName || newDepartmentLeaderId === null) {
      alert('Please provide both department name and leader ID.');
      return;
    }

    addDepartmentMutation.mutate({ name: newDepartmentName, leaderId: newDepartmentLeaderId });
    setNewDepartmentName('');
    setNewDepartmentLeaderId(null);
  };

  const handleEditDepartment = (department: Department) => {
    setEditingDepartment(department);
    setNewDepartmentName(department.name);
    setNewDepartmentLeaderId(department.leaderId);
  };

  const handleUpdateDepartment = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDepartment && newDepartmentName && newDepartmentLeaderId !== null) {
      updateDepartmentMutation.mutate({
        id: editingDepartment.id,
        name: newDepartmentName,
      });
      updateDepartmentLeaderMutation.mutate({
        id: editingDepartment.id,
        leaderId: newDepartmentLeaderId,
      });
      setEditingDepartment(null);
      setNewDepartmentName('');
      setNewDepartmentLeaderId(null);
    }
  };

  const handleDeleteDepartment = (id: number) => {
    deleteDepartmentMutation.mutate(id);
  };

  return (
    <div className="container mx-auto p-4 dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Department List</h1>
      <form onSubmit={editingDepartment ? handleUpdateDepartment : handleAddDepartment} className="mb-4">
        <div className="mb-2">
          <input
            type="text"
            placeholder="Department Name"
            value={newDepartmentName}
            onChange={(e) => setNewDepartmentName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>
        <div className="mb-2">
          <select
            value={newDepartmentLeaderId ?? ''}
            onChange={(e) => setNewDepartmentLeaderId(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            <option value="" disabled>Select Team Leader</option>
            {teamLeaders.map((leader: Leader) => (
              <option key={leader.id} value={leader.id}>
                {leader.firstName} {leader.lastName}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800">
          {editingDepartment ? 'Update Department' : 'Add Department'}
        </button>
        {editingDepartment && (
          <button
            type="button"
            onClick={() => {
              setEditingDepartment(null);
              setNewDepartmentName('');
              setNewDepartmentLeaderId(null);
            }}
            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-800"
          >
            Cancel
          </button>
        )}
      </form>
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