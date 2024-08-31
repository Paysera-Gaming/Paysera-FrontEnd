import { useState } from 'react';
import SearchBar from './SearchBar';
import SummaryCards from './SummaryCards';
import DepartmentTable from './DepartmentTable';

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
    const [departments] = useState(sampleDepartments);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredDepartments = departments.filter(dept =>
        dept.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalDepartments = departments.length;
    const totalTeams = departments.reduce((sum, dept) => sum + dept.totalTeams, 0);

    return (
        <div className="p-4 space-y-4">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
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
        </div>
    );
}
