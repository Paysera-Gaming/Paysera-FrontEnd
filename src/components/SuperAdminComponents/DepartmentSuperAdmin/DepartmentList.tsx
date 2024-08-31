import { useState } from 'react';
import SearchBar from './SearchBar';
import SummaryCards from './SummaryCards';
import DepartmentTable from './DepartmentTable';

const sampleDepartments = [
    {
        id: 1,
        name: 'HR',
        teams: [
            {
                id: 1,
                name: 'Recruitment',
                leader: { id: 1, firstName: 'Alice', lastName: 'Johnson', middleName: 'A' },
                members: [
                    { id: 2, firstName: 'Bob', lastName: 'Smith', middleName: 'B' },
                    { id: 3, firstName: 'Charlie', lastName: 'Brown', middleName: 'C' },
                    { id: 4, firstName: 'David', lastName: 'Lee', middleName: 'D' },
                ],
            },
            // Add more teams as needed
        ],
    },
    {
        id: 2,
        name: 'IT',
        teams: [
            {
                id: 2,
                name: 'Development',
                leader: { id: 5, firstName: 'Eve', lastName: 'Doe', middleName: 'E' },
                members: [
                    { id: 6, firstName: 'Frank', lastName: 'Miller', middleName: 'F' },
                    { id: 7, firstName: 'Grace', lastName: 'Williams', middleName: 'G' },
                    { id: 8, firstName: 'Hank', lastName: 'Anderson', middleName: 'H' },
                ],
            },
            // Add more teams as needed
        ],
    },
];

export default function DepartmentList() {
    const [departments] = useState(sampleDepartments);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('overall');

    const handleFilterClick = (filter: string) => {
        setActiveFilter(filter);
    };

    const filteredDepartments = departments.filter((dept) => {
        return dept.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const totalDepartments = departments.length;
    const totalTeams = departments.reduce((acc, dept) => acc + dept.teams.length, 0);

    return (
        <div className="p-4 space-y-4">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <SummaryCards
                totalDepartments={totalDepartments}
                totalTeams={totalTeams}
                activeFilter={activeFilter}
                handleFilterClick={handleFilterClick}
            />
            {filteredDepartments.length > 0 ? (
                <DepartmentTable departments={filteredDepartments} />
            ) : (
                <div className="text-center text-gray-500 dark:text-gray-400">
                    {searchTerm
                        ? `No results found for "${searchTerm}".`
                        : `No departments found.`}
                </div>
            )}
        </div>
    );
}
