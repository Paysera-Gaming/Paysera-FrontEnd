import { useState } from 'react';
import SearchBar from './SearchBar';
import SummaryCards from './SummaryCards';
import DepartmentTable from './DepartmentTable';
import AddDepartmentDialog from './AddDepartmentDialog';
import EditDepartmentDialog from './EditDepartmentDialog';
import ViewDepartment from './ViewDepartment'; // Import ViewDepartment component
import sampleDepartments from './sampleDepartments';
import { Department, Team, TeamMember } from './types'; // Import interfaces from the types file

export default function DepartmentList() {
    const [departments] = useState<Department[]>(sampleDepartments);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
    const [viewData, setViewData] = useState<{ department: Department; team: Team } | null>(null);
    const [isViewing, setIsViewing] = useState(false); // Add state to manage view mode

    const filteredDepartments = departments.filter(dept =>
        dept.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalDepartments = departments.length;
    const totalTeams = departments.reduce((sum, dept) => sum + dept.totalTeams, 0);

    const handleAddDepartment = (newDepartment: { name: string; teamLeader: string; schedule: string }) => {
        console.log('New Department:', newDepartment);
    };

    const handleEditDepartment = (updatedDepartment: Department) => {
        console.log('Updated Department:', updatedDepartment);
    };

    const handleEditClick = (department: { id: number; name: string; teamLeader: TeamMember | null; teamMembers: TeamMember[] }) => {
        const fullDepartment = departments.find(dept => dept.id === department.id);
        if (fullDepartment) {
            setSelectedDepartment(fullDepartment);
            setIsEditDialogOpen(true);
        }
    };

    const handleViewClick = (departmentId: number, teamId: number) => {
        const department = departments.find(dept => dept.id === departmentId);
        if (department) {
            const team = department.teams.find((team: Team) => team.id === teamId); // Explicitly type `team`
            if (team) {
                setViewData({ department, team });
                setIsViewing(true); // Set view mode to true
            }
        }
    };

    const handleBack = () => {
        setIsViewing(false); // Set view mode to false
    };

    return (
        <div className="p-4 space-y-4">
            {isViewing && viewData ? (
                <ViewDepartment
                    department={viewData.department}
                    team={viewData.team}
                    onBack={handleBack}
                />
            ) : (
                <>
                    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    <SummaryCards
                        totalDepartments={totalDepartments}
                        totalTeams={totalTeams} // Ensure `totalTeams` is correctly typed
                    />
                    {filteredDepartments.length > 0 ? (
                        <DepartmentTable
                            departments={filteredDepartments}
                            onEditClick={handleEditClick}
                            onViewClick={handleViewClick} // Ensure `onViewClick` is correctly typed
                        />
                    ) : (
                        <div className="text-center text-gray-500 dark:text-gray-400">
                            {`No results found for "${searchTerm}"`}
                        </div>
                    )}
                    <AddDepartmentDialog
                        isOpen={isAddDialogOpen}
                        onClose={() => setIsAddDialogOpen(false)}
                        onAdd={handleAddDepartment}
                    />
                    <EditDepartmentDialog
                        isOpen={isEditDialogOpen}
                        onClose={() => setIsEditDialogOpen(false)}
                        onEdit={handleEditDepartment} // Ensure `onEdit` matches expected type
                        department={selectedDepartment} // Ensure `selectedDepartment` matches expected type
                    />
                </>
            )}
        </div>
    );
}