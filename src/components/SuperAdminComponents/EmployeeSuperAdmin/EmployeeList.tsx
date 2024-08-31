import { SetStateAction, useState } from 'react';
import SearchBar from './SearchBar';
import SummaryCards from './SummaryCards';
import EmployeeTable from './EmployeeTable';

const sampleEmployees = [
    { id: 1, firstName: 'John', lastName: 'Doe', middleName: 'M', isActive: true, department: 'HR', role: 'Manager' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', middleName: 'A', isActive: false, department: 'Finance', role: 'Analyst' },
    { id: 3, firstName: 'Emily', lastName: 'Johnson', middleName: 'R', isActive: true, department: 'IT', role: 'Developer' },
];

export default function EmployeeList() {
    const [employees] = useState(sampleEmployees);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('overall');

    const handleFilterClick = (filter: SetStateAction<string>) => {
        setActiveFilter(filter);
    };

    const filteredEmployees = employees
        .filter((emp) => {
            if (activeFilter === 'online') {
                return emp.isActive;
            } else if (activeFilter === 'offline') {
                return !emp.isActive;
            }
            return true; // 'overall' filter shows all employees
        })
        .filter((emp) =>
            emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.middleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.role.toLowerCase().includes(searchTerm.toLowerCase())
        );

    const overallCount = employees.length;
    const onlineCount = employees.filter((emp) => emp.isActive).length;
    const offlineCount = overallCount - onlineCount;

    return (
        <div className="p-4 space-y-4">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <SummaryCards
                overallCount={overallCount}
                onlineCount={onlineCount}
                offlineCount={offlineCount}
                activeFilter={activeFilter}
                handleFilterClick={handleFilterClick}
            />
            <EmployeeTable employees={filteredEmployees} />
        </div>
    );
}