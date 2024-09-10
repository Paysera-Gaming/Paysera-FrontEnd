import { useState } from 'react';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import SearchBar from './SearchBar';
import SummaryCards from './SummaryCards';
import DepartmentTable from './DepartmentTable';
import AddDepartmentDialog from './AddDepartmentDialog';
import EditDepartmentDialog from './EditDepartmentDialog';
import ViewDepartment from './ViewDepartment';
import { Department } from './types';

const fetchDepartments = async (): Promise<Department[]> => {
    const response = await axios.get(`${import.meta.env.VITE_BASE_API}/api/department`);
    return response.data;
};

export default function DepartmentList() {
    const queryClient = useQueryClient();
    const { data: departments = [] } = useQuery<Department[]>({
        queryKey: ['departments'],
        queryFn: fetchDepartments,
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredDepartments, setFilteredDepartments] = useState<Department[]>(departments);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
    const [viewData, setViewData] = useState<{ department: Department } | null>(null);
    const [isViewing, setIsViewing] = useState(false);

    const addDepartmentMutation = useMutation({
        mutationFn: (newDepartment: { name: string; teamLeader: string }) => 
            axios.post(`${import.meta.env.VITE_BASE_API}/api/department`, newDepartment),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['departments'] });
        },
    });

    const editDepartmentMutation = useMutation({
        mutationFn: (updatedDepartment: Department) => 
            axios.put(`${import.meta.env.VITE_BASE_API}/api/department/${updatedDepartment.id}`, updatedDepartment),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['departments'] });
        },
    });

    const deleteDepartmentMutation = useMutation({
        mutationFn: (departmentId: number) => 
            axios.delete(`${import.meta.env.VITE_BASE_API}/api/department/${departmentId}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['departments'] });
        },
    });

    const totalDepartments = departments.length;

    const handleAddDepartment = (newDepartment: { name: string; teamLeader: string }) => {
        addDepartmentMutation.mutate(newDepartment);
        setIsAddDialogOpen(false);
    };

    const handleEditDepartment = (updatedDepartment: Department) => {
        editDepartmentMutation.mutate(updatedDepartment);
        setIsEditDialogOpen(false);
    };

    const handleDeleteDepartment = (departmentId: number) => {
        deleteDepartmentMutation.mutate(departmentId);
    };

    const handleEditClick = (department: { id: number; name: string }) => {
        const fullDepartment = departments.find(dept => dept.id === department.id);
        if (fullDepartment) {
            setSelectedDepartment(fullDepartment);
            setIsEditDialogOpen(true);
        }
    };

    const handleViewClick = async (departmentId: number) => {
        try {
            const departmentResponse = await axios.get(`${import.meta.env.VITE_BASE_API}/api/department/${departmentId}`);
            setViewData({ department: departmentResponse.data });
            setIsViewing(true);
        } catch (error) {
            console.error('Error fetching department and team:', error);
        }
    };

    const handleBack = () => {
        setIsViewing(false);
    };

    return (
        <div className="p-4 space-y-4">
            {isViewing && viewData ? (
                <ViewDepartment
                    departmentId={viewData.department.id}
                    onBack={handleBack}
                />
            ) : (
                <>
                    <SearchBar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        departments={departments}
                        setFilteredDepartments={setFilteredDepartments}
                    />
                    <SummaryCards
                        totalDepartments={totalDepartments}
                    />
                    {filteredDepartments.length > 0 ? (
                        <DepartmentTable
                            departments={filteredDepartments}
                            onEditClick={handleEditClick}
                            onViewClick={handleViewClick}
                            onDeleteClick={handleDeleteDepartment}
                        />
                    ) : (
                        <div className="text-center text-gray-500 dark:text-gray-400">
                            {`No results found for "${searchTerm}"`}
                        </div>
                    )}
                    <AddDepartmentDialog
                        isOpen={isAddDialogOpen}
                        onClose={() => setIsAddDialogOpen(false)}
                        onAdd={handleAddDepartment}
                        departmentId={selectedDepartment?.id ?? 0} // Provide a default value
                    />
                    <EditDepartmentDialog
                        isOpen={isEditDialogOpen}
                        onClose={() => setIsEditDialogOpen(false)}
                        onEdit={handleEditDepartment}
                        department={selectedDepartment}
                    />
                </>
            )}
        </div>
    );
}