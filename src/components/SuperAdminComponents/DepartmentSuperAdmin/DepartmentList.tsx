import { useState } from 'react';
import SearchBar from './SearchBar';
import SummaryCards from './SummaryCards';
import DepartmentTable from './DepartmentTable';
import AddDepartmentDialog from './AddDepartmentDialog';
import { toast } from 'sonner';

const sampleDepartments = [
    {
        id: 1,
        name: 'Human Resources',
        totalTeams: 3,
        teams: [
            { id: 1, name: 'Recruitment', teamLeader: { firstName: 'Alice', lastName: 'Brown', middleName: 'T' }, members: 5 },
            { id: 2, name: 'Training', teamLeader: { firstName: 'Bob', lastName: 'Smith', middleName: 'R' }, members: 4 },
            { id: 3, name: 'Employee Relations', teamLeader: { firstName: 'Charlie', lastName: 'Davis', middleName: 'L' }, members: 6 },
        ],
    },
    {
        id: 2,
        name: 'Finance',
        totalTeams: 2,
        teams: [
            { id: 1, name: 'Accounts', teamLeader: { firstName: 'David', lastName: 'Evans', middleName: 'M' }, members: 3 },
            { id: 2, name: 'Payroll', teamLeader: { firstName: 'Ella', lastName: 'White', middleName: 'A' }, members: 4 },
        ],
    },
];

export default function DepartmentList() {
    const [departments, setDepartments] = useState(sampleDepartments);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

    const filteredDepartments = departments.filter(dept =>
        dept.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalDepartments = departments.length;
    const totalTeams = departments.reduce((sum, dept) => sum + dept.totalTeams, 0);

    const handleAddDepartment = (newDepartment: { name: string; teamLeader: string; teamMembers: string[] }) => {
        // You can handle the addition logic here if needed
        console.log('New Department:', newDepartment);
        toast.success('Department added successfully!');
    };

    return (
        <div className="p-4 space-y-4">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onAddDepartment={() => setIsAddDialogOpen(true)} />
            <SummaryCards
                totalDepartments={totalDepartments}
                totalTeams={totalTeams}
            />
            {filteredDepartments.length > 0 ? (
                <DepartmentTable departments={filteredDepartments} />
            ) : (
                <div className="text-center text-gray-500 dark:text-gray-400">
                    No departments found.
                </div>
            )}
            <AddDepartmentDialog
                isOpen={isAddDialogOpen}
                onClose={() => setIsAddDialogOpen(false)}
                onAdd={handleAddDepartment}
            />
        </div>
    );
}