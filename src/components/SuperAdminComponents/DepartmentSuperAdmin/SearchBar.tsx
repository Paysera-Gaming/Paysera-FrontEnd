import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import AddDepartmentDialog from './AddDepartmentDialog';
import { Department } from './types'; // Import the Department type

interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    departments: Department[]; // Add departments to the props
    setFilteredDepartments: (departments: Department[]) => void; // Add a setter for filtered departments
}

export default function SearchBar({ searchTerm, setSearchTerm, departments, setFilteredDepartments }: SearchBarProps) {
    const [isDepartmentFormOpen, setIsDepartmentFormOpen] = useState(false);

    const handleAddDepartment = () => {
        // Handle department form submission
        setIsDepartmentFormOpen(false);
    };

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        const filtered = departments.filter(department => {
            const matchesDepartmentName = department.name.toLowerCase().includes(term.toLowerCase());
            const matchesTeamLeader = department.teams.some(team => 
                team.teamLeader && `${team.teamLeader.firstName} ${team.teamLeader.lastName}`.toLowerCase().includes(term.toLowerCase())
            );
            const matchesTeamMembers = department.teams.some(team => 
                team.members.some(member => 
                    `${member.firstName} ${member.lastName}`.toLowerCase().includes(term.toLowerCase())
                )
            );
            return matchesDepartmentName || matchesTeamLeader || matchesTeamMembers;
        });
        setFilteredDepartments(filtered);
    };

    return (
        <div className="flex flex-col space-y-4 mb-4">
            <div className="flex justify-between items-center">
                <Input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full max-w-xs"
                />
                <div className="flex gap-2">
                    <Button onClick={() => setIsDepartmentFormOpen(true)}>
                        <Plus size={16} />
                        Add Department
                    </Button>
                </div>
            </div>
            <AddDepartmentDialog
                isOpen={isDepartmentFormOpen}
                onClose={() => setIsDepartmentFormOpen(false)}
                onAdd={handleAddDepartment}
            />
        </div>
    );
}