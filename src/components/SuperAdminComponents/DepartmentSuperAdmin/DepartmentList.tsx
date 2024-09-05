import { useState } from 'react';
import SearchBar from './SearchBar';
import SummaryCards from './SummaryCards';
import DepartmentTable from './DepartmentTable';
import AddDepartmentDialog from './AddDepartmentDialog';
import EditDepartmentDialog from './EditDepartmentDialog';
import sampleDepartments from './sampleDepartments';

type Department = {
    id: number;
    name: string;
    totalTeams: number;
    teams: Team[];
};

type Team = {
    id: number;
    name: string;
    teamLeader: {
        firstName: string;
        lastName: string;
        middleName?: string;
    };
    members: number;
    schedule: {
        startHour: string;
        startMinute: string;
        startPeriod: string;
        endHour: string;
        endMinute: string;
        endPeriod: string;
    };
};

export default function DepartmentList() {
    const [departments] = useState(sampleDepartments);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
    const [viewData, setViewData] = useState<{ department: Department; team: Team } | null>(null);

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

    const handleEditClick = (department: Department) => {
        setSelectedDepartment(department);
        setIsEditDialogOpen(true);
    };

    const handleViewClick = (departmentId: number, teamId: number) => {
        const department = departments.find(dept => dept.id === departmentId);
        if (department) {
            const team = department.teams.find(team => team.id === teamId);
            if (team) {
                setViewData({ department, team });
            }
        }
    };

    return (
        <div className="p-4 space-y-4">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <SummaryCards
                totalDepartments={totalDepartments}
                totalTeams={totalTeams}
            />
            {filteredDepartments.length > 0 ? (
                <DepartmentTable
                    departments={filteredDepartments}
                    onEditClick={handleEditClick}
                    onViewClick={handleViewClick}
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
                onEdit={handleEditDepartment}
                department={selectedDepartment}
            />
            {viewData && (
                <div className="p-4 bg-white shadow rounded">
                    <h2 className="text-xl font-bold">{viewData.department.name}</h2>
                    <p>Total Teams: {viewData.department.totalTeams}</p>
                    <div>
                        <div key={viewData.team.id}>
                            <h3 className="text-lg font-semibold">{viewData.team.name}</h3>
                            <p>Team Leader: {viewData.team.teamLeader.firstName} {viewData.team.teamLeader.lastName}</p>
                            <p>Members: {viewData.team.members}</p>
                            <p>Schedule: {viewData.team.schedule.startHour}:{viewData.team.schedule.startMinute} {viewData.team.schedule.startPeriod} - {viewData.team.schedule.endHour}:{viewData.team.schedule.endMinute} {viewData.team.schedule.endPeriod}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}