import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import AddDepartmentDialog from './AddDepartmentDialog';
import AddTeamMembersDialog from './AddTeamMembersDialog';

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isDepartmentFormOpen, setIsDepartmentFormOpen] = useState(false);
    const [isTeamMembersFormOpen, setIsTeamMembersFormOpen] = useState(false);

    const handleDepartmentFormSubmit = (_department: { name: string; teamLeader: string; teamMembers: string[] }) => {
        // Handle department form submission
    };

    const handleTeamMembersFormSubmit = (_teamMembers: { name: string; department: string }[]) => {
        // Handle team members form submission
    };

    return (
        <div className="flex items-center justify-between">
            <Input
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