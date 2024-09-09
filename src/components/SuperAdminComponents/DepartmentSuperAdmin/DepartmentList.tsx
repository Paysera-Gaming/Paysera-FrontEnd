import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import SummaryCards from './SummaryCards';
import DepartmentTable from './DepartmentTable';
import AddDepartmentDialog from './AddDepartmentDialog';
import EditDepartmentDialog from './EditDepartmentDialog';
import ViewDepartment from './ViewDepartment';
import { Department } from './types';

export default function DepartmentList() {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredDepartments, setFilteredDepartments] = useState<Department[]>([]);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
    const [viewData, setViewData] = useState<{ department: Department } | null>(null);
    const [isViewing, setIsViewing] = useState(false);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_API}/api/department`);
                setDepartments(response.data);
                setFilteredDepartments(response.data);
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
        };

        fetchDepartments();
    }, []);

    const totalDepartments = departments.length;

    const handleAddDepartment = async (newDepartment: { name: string; teamLeader: string }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_API}/api/department`, newDepartment);
            const addedDepartment = response.data;
            setDepartments(prevDepartments => [...prevDepartments, addedDepartment]);
            setFilteredDepartments(prevDepartments => [...prevDepartments, addedDepartment]);
        } catch (error) {
            console.error('Error adding department:', error);
        }
    };

    const handleEditDepartment = async (updatedDepartment: Department) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_BASE_API}/api/department/${updatedDepartment.id}`, updatedDepartment);
            const updatedDepartments = departments.map(dept => dept.id === updatedDepartment.id ? response.data : dept);
            setDepartments(updatedDepartments);
            setFilteredDepartments(updatedDepartments);
        } catch (error) {
            console.error('Error editing department:', error);
        }
    };

    const handleDeleteDepartment = async (departmentId: number) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BASE_API}/api/department/${departmentId}`);
            const updatedDepartments = departments.filter(dept => dept.id !== departmentId);
            setDepartments(updatedDepartments);
            setFilteredDepartments(updatedDepartments);
        } catch (error) {
            console.error('Error deleting department:', error);
        }
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
                    department={viewData.department}
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