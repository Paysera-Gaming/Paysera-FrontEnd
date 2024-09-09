import { Dispatch, SetStateAction } from 'react';
import { Department } from './types';

interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: Dispatch<SetStateAction<string>>;
    departments: Department[];
    setFilteredDepartments: Dispatch<SetStateAction<Department[]>>;
}

export default function SearchBar({ searchTerm, setSearchTerm, departments, setFilteredDepartments }: SearchBarProps) {
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);
        const filtered = departments.filter(department =>
            department.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredDepartments(filtered);
    };

    return (
        <div className="mb-4">
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search departments..."
                className="w-full p-2 border border-gray-300 rounded"
            />
        </div>
    );
}