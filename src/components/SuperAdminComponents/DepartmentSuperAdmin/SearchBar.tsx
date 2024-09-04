import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import AddDepartmentDialog from './AddDepartmentDialog';
import AddTeamMembersDialog from './AddTeamMembersDialog';

interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

export default function SearchBar({ searchTerm, setSearchTerm }: SearchBarProps) {
    const [isDepartmentFormOpen, setIsDepartmentFormOpen] = useState(false);
    const [isTeamMembersFormOpen, setIsTeamMembersFormOpen] = useState(false);

    const handleDepartmentFormSubmit = (_department: { name: string; teamLeader: string; teamMembers: string[] }) => {
        // Handle department form submission
        setIsDepartmentFormOpen(false);
    };

    const handleTeamMembersFormSubmit = (_teamMembers: { name: string; department: string }[]) => {
        // Handle team members form submission
        setIsTeamMembersFormOpen(false);
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
                    <Button onClick={() => setIsDepartmentFormOpen(true)}>
                        <Plus size={16} />
                        Add Department
                    </Button>
                    <Button onClick={() => setIsTeamMembersFormOpen(true)}>
                        <Plus size={16} />
                        Add Team Members
                    </Button>
                </div>
            </div>
            <AddDepartmentDialog
                isOpen={isDepartmentFormOpen}
                onClose={() => setIsDepartmentFormOpen(false)}
                onAdd={handleDepartmentFormSubmit}
            />
            <AddTeamMembersDialog
                isOpen={isTeamMembersFormOpen}
                onClose={() => setIsTeamMembersFormOpen(false)}
                onAdd={handleTeamMembersFormSubmit}
            />
        </div>
    );
}