import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import EmployeeForm from './EmployeeForm';

interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

export default function SearchBar({ searchTerm, setSearchTerm }: SearchBarProps) {
    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleFormSubmit = (_data: any) => {
        // Handle form submission logic here
        setIsFormOpen(false);
    };

    return (
        <div className="flex flex-col space-y-4 mb-4">
            <div className="flex justify-between items-center">
                <Input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-xs"
                />
                <div className="flex gap-2">
                    <Button
                        onClick={() => setIsFormOpen(true)}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 dark:bg-green-500 dark:hover:bg-green-600 flex items-center"
                    >
                        <Plus size={16} className="mr-2" />
                        Add Employee
                    </Button>
                </div>
            </div>
            <EmployeeForm isOpen={isFormOpen} onSubmit={handleFormSubmit} onClose={() => setIsFormOpen(false)} />
        </div>
    );
}