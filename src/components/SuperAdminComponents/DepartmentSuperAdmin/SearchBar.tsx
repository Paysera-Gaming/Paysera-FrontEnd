import { Dispatch, SetStateAction, useState } from 'react';
import { Department } from './types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import AddDepartmentDialog from './AddDepartmentDialog';

interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: Dispatch<SetStateAction<string>>;
    departments: Department[];
    setFilteredDepartments: Dispatch<SetStateAction<Department[]>>;
}

export default function SearchBar({ searchTerm, setSearchTerm, departments, setFilteredDepartments }: SearchBarProps) {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);
        const filtered = departments.filter(department =>
            department.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredDepartments(filtered);
    };

    const handleAddDepartment = () => {
        // Handle add department logic here
        setIsAddDialogOpen(false);
    };

    return (
        <div className="flex flex-col space-y-4 mb-4">
            <div className="flex justify-between items-center">
                <Input
                    type="text"
                    placeholder="Search departments..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full max-w-xs"
                />
                <div className="flex gap-2">
                    <Button onClick={() => setIsAddDialogOpen(true)}>
                        <Plus size={16} />
                        Add Department
                    </Button>
                </div>
            </div>
            <AddDepartmentDialog
                isOpen={isAddDialogOpen}
                onClose={() => setIsAddDialogOpen(false)}
                onAdd={handleAddDepartment}
            />
        </div>
    );
}