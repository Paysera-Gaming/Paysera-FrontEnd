import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Leader, addDepartment, updateDepartment, updateDepartmentLeader, Department } from './api';

interface DepartmentFormProps {
  editingDepartment: Department | null;
  setEditingDepartment: (department: Department | null) => void;
  teamLeaders: Leader[];
  departments: Department[];
}

const DepartmentForm: React.FC<DepartmentFormProps> = ({ editingDepartment, setEditingDepartment, teamLeaders, departments }) => {
  const queryClient = useQueryClient();
  const [departmentName, setDepartmentName] = useState('');
  const [departmentLeaderId, setDepartmentLeaderId] = useState<number | null>(null);

  useEffect(() => {
    if (editingDepartment) {
      setDepartmentName(editingDepartment.name);
      setDepartmentLeaderId(editingDepartment.leaderId);
    } else {
      setDepartmentName('');
      setDepartmentLeaderId(null);
    }
  }, [editingDepartment]);

  const addDepartmentMutation = useMutation({
    mutationFn: addDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
  });

  const updateDepartmentMutation = useMutation({
    mutationFn: updateDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
  });

  const updateDepartmentLeaderMutation = useMutation({
    mutationFn: updateDepartmentLeader,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!departmentName || departmentLeaderId === null) {
      alert('Please provide both department name and leader ID.');
      return;
    }

    if (editingDepartment) {
      updateDepartmentMutation.mutate({
        id: editingDepartment.id,
        name: departmentName,
      });
      updateDepartmentLeaderMutation.mutate({
        id: editingDepartment.id,
        leaderId: departmentLeaderId,
      });
      setEditingDepartment(null);
    } else {
      addDepartmentMutation.mutate({ name: departmentName, leaderId: departmentLeaderId });
    }

    setDepartmentName('');
    setDepartmentLeaderId(null);
  };

  // Filter out team leaders who are already assigned to other departments
  const availableTeamLeaders = teamLeaders.filter((leader) => {
    return !departments.some((department) => department.leaderId === leader.id && department.id !== editingDepartment?.id);
  });

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <input
          type="text"
          placeholder="Department Name"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
      </div>
      <div className="mb-2">
        <select
          value={departmentLeaderId ?? ''}
          onChange={(e) => setDepartmentLeaderId(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        >
          <option value="" disabled>Select Team Leader</option>
          {availableTeamLeaders.map((leader: Leader) => (
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
          onClick={() => setEditingDepartment(null)}
          className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-800"
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default DepartmentForm;