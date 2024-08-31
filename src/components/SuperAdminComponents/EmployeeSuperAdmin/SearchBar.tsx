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
                    <Button onClick={() => setIsFormOpen(true)}>
                        <Plus size={16} />
                        Add Employee
                    </Button>
                </div>
            </div>
            {isFormOpen && <EmployeeForm onSubmit={handleFormSubmit} />}
        </div>
    );
}