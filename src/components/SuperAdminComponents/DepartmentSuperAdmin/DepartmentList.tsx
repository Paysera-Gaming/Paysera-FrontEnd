import { useState } from 'react';
import SearchBar from './SearchBar';
import SummaryCards from './SummaryCards';
import DepartmentTable from './DepartmentTable';
import AddDepartmentDialog from './AddDepartmentDialog';
import EditDepartmentDialog from './EditDepartmentDialog';

const sampleDepartments = [
    {
        id: 1,
        name: 'Human Resources',
        totalTeams: 3,
        teams: [
            { id: 1, name: 'Recruitment', teamLeader: { firstName: 'Alice', lastName: 'Brown', middleName: 'T' }, members: 5, schedule: { startHour: '8', startMinute: '00', startPeriod: 'AM', endHour: '5', endMinute: '00', endPeriod: 'PM' } },
            { id: 2, name: 'Training', teamLeader: { firstName: 'Bob', lastName: 'Smith', middleName: 'R' }, members: 4, schedule: { startHour: '8', startMinute: '00', startPeriod: 'AM', endHour: '5', endMinute: '00', endPeriod: 'PM' } },
            { id: 3, name: 'Employee Relations', teamLeader: { firstName: 'Charlie', lastName: 'Davis', middleName: 'L' }, members: 6, schedule: { startHour: '8', startMinute: '00', startPeriod: 'AM', endHour: '5', endMinute: '00', endPeriod: 'PM' } },
        ],
    },
    {
        id: 2,
        name: 'Finance',
        totalTeams: 2,
        teams: [
            { id: 1, name: 'Accounts', teamLeader: { firstName: 'David', lastName: 'Evans', middleName: 'M' }, members: 3, schedule: { startHour: '8', startMinute: '00', startPeriod: 'AM', endHour: '5', endMinute: '00', endPeriod: 'PM' } },
            { id: 2, name: 'Payroll', teamLeader: { firstName: 'Ella', lastName: 'White', middleName: 'A' }, members: 4, schedule: { startHour: '8', startMinute: '00', startPeriod: 'AM', endHour: '5', endMinute: '00', endPeriod: 'PM' } },
        ],
    },
];

type Department = {
    id: number;
    name: string;
    teamLeader: string;
    teamMembers: string[];
    schedule: {
        startHour: string;
        startMinute: string;
        startPeriod: string;
        endHour: string;
        endMinute: string;
        endPeriod: string;
    };
};

export default function DepartmentList() {
    console.log(import.meta.env.VITE_BASE_API);
    
    const [departments] = useState(sampleDepartments);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

    const filteredDepartments = departments.filter(dept =>
        dept.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalDepartments = departments.length;
    const totalTeams = departments.reduce((sum, dept) => sum + dept.totalTeams, 0);

    const handleAddDepartment = (newDepartment: { name: string; teamLeader: string; schedule: string }) => {
        // You can handle the addition logic here if needed
        console.log('New Department:', newDepartment);
    };

    const handleEditDepartment = (updatedDepartment: Department) => {
        // You can handle the edit logic here if needed
        console.log('Updated Department:', updatedDepartment);
    };

    const handleEditClick = (department: Department) => {
        setSelectedDepartment(department);
        setIsEditDialogOpen(true);
    };

    return (
        <div className="p-4 space-y-4">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <SummaryCards
                totalDepartments={totalDepartments}
                totalTeams={totalTeams}
            />
            {filteredDepartments.length > 0 ? (
                <DepartmentTable departments={filteredDepartments} onEditClick={handleEditClick} />
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
        </div>
    );
}