import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    onAddDepartment: () => void;
}

export default function SearchBar({ searchTerm, setSearchTerm, onAddDepartment }: SearchBarProps) {
    return (
        <div className="flex justify-between items-center mb-4">
            <Input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full max-w-xs"
            />
            <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={onAddDepartment}>
                    <Plus size={16} />
                    Add Department
                </Button>
            </div>
        </div>
    );
}