import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchDepartments, fetchTeamLeaders, deleteDepartment, Department, Leader } from './api';
import DepartmentForm from './DepartmentForm';
import DepartmentDetails from './DepartmentDetails';
import SearchBar from './SearchBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Eye, Edit, Trash } from 'lucide-react';

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

  const deleteDepartmentMutation = useMutation({
    mutationFn: deleteDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
      toast.success('Successfully deleted the department');
    },
    onError: () => {
      toast.error('Error deleting the department');
    },
  });

  const handleEditDepartment = (department: Department) => {
    setEditingDepartment(department);
  };

  const handleDeleteDepartment = (department: Department) => {
    setSelectedDepartment(department);
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedDepartment) {
      deleteDepartmentMutation.mutate(selectedDepartment.id);
      setIsDialogOpen(false);
    }
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
      <div className="flex justify-between items-center mb-4">
        <div style={{ width: '33%' }}>
          <SearchBar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
        </div>
        <DepartmentForm
          editingDepartment={editingDepartment}
          setEditingDepartment={setEditingDepartment}
          teamLeaders={teamLeaders}
          departments={departments}
        />
      </div>
      {departments.length === 0 ? (
        <div className="text-center py-4">
          No Department found.
        </div>
      ) : (
        <>
          {filteredDepartments.length > 0 ? (
            <Card>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white dark:bg-transparent">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">Name</th>
                        <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">Leader</th>
                        <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">Members</th>
                        <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDepartments.map((department: Department) => (
                        <tr key={department.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                          <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 dark:bg-transparent">{department.name}</td>
                          <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 dark:bg-transparent">
                            {department.Leader ? `${department.Leader.firstName} ${department.Leader.lastName}` : 'No Leader Assigned'}
                          </td>
                          <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 dark:bg-transparent">
                            {department.Employees && department.Employees.length > 0 ? (
                              <>
                                {department.Employees.slice(0, 3).map((employee) => (
                                  <span key={employee.id} className="block">
                                    {employee.firstName} {employee.lastName}
                                  </span>
                                ))}
                                {department.Employees.length > 3 && <span>etc.</span>}
                              </>
                            ) : (
                              <span>No Employees</span>
                            )}
                          </td>
                          <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 dark:bg-transparent">
                            <Button
                              onClick={() => handleViewDepartment(department)}
                              variant="outline"
                              className="mr-2"
                            >
                              <Eye className="w-4 h-4 mr-1" /> View
                            </Button>
                            <Button
                              onClick={() => handleEditDepartment(department)}
                              variant="outline"
                              className="mr-2"
                            >
                              <Edit className="w-4 h-4 mr-1" /> Edit
                            </Button>
                            <Button
                              onClick={() => handleDeleteDepartment(department)}
                              variant="outline"
                            >
                              <Trash className="w-4 h-4 mr-1" /> Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="text-center py-4">
              No results found for "{searchQuery}".
            </div>
          )}
        </>
      )}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedDepartment?.name}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DepartmentList;