import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchDepartments, fetchTeamLeaders, deleteDepartment, Department, Leader } from './api';
import DepartmentForm from './DepartmentForm';
import DepartmentItem from './DepartmentItem';
import DepartmentDetails from './DepartmentDetails';
import SearchBar from './SearchBar';

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
      <DepartmentDetails
        department={viewingDepartment}
        onBack={handleBackToList}
      />
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
      <SearchBar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      <ul>
        {filteredDepartments.map((department: Department) => (
          <DepartmentItem
            key={department.id}
            department={department}
            onView={handleViewDepartment}
            onEdit={handleEditDepartment}
            onDelete={handleDeleteDepartment}
          />
        ))}
      </ul>
    </div>
  );
};

export default DepartmentList;