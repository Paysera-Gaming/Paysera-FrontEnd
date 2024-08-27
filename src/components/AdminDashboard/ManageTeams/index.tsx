import React, { useState, useEffect } from 'react';
import AddEditTeamDialog from './AddEditTeamDialog';
import TeamsTable from './TeamsTable';
import TeamStats from './TeamStats';
import SheetComponent from '../SheetComponent';
import { initialTeams } from './teamData';
import { PaginationComponent } from '../PaginationComponent'; // Assuming you have this component
import ConfirmationDialog from './ConfirmationDialog'; // Import the new dialog component

const ManageTeams = () => {
  const [teams, setTeams] = useState(initialTeams);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false); // State for confirmation dialog
  const [selectedTeam, setSelectedTeam] = useState({ id: null, name: '', Department: '', teamLeaderEmail: '', members: [] });
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // Add pagination state
  const pageSize = 5; // Number of items per page

  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setCurrentTime(formattedTime);
    };

    const intervalId = setInterval(updateClock, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleAddTeam = () => {
    setSelectedTeam({ id: null, name: '', Department: '', teamLeaderEmail: '', members: [] });
    setIsDialogOpen(true);
  };

  const handleEditTeam = (team) => {
    setSelectedTeam(team);
    setIsDialogOpen(true);
  };

  const handleSaveTeam = () => {
    if (selectedTeam.id) {
      setTeams(teams.map((team) => (team.id === selectedTeam.id ? selectedTeam : team)));
    } else {
      setTeams([...teams, { ...selectedTeam, id: teams.length + 1 }]);
    }
  };

  const openConfirmationDialog = (teamId) => {
    setSelectedTeam(teams.find(team => team.id === teamId) || { id: null, name: '', Department: '', teamLeaderEmail: '', members: [] });
    setIsConfirmationDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedTeam.id) {
      setTeams(teams.filter((team) => team.id !== selectedTeam.id));
    }
    setIsConfirmationDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setIsConfirmationDialogOpen(false);
  };

  const handleSort = (key) => {
    const sortedTeams = [...teams].sort((a, b) => a[key].localeCompare(b[key]));
    setTeams(sortedTeams);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
    setCurrentPage(1); // Reset to first page on search
  };

  const filteredTeams = teams.filter((team) => 
    team.name.toLowerCase().includes(searchQuery) || 
    team.Department.toLowerCase().includes(searchQuery)
  );

  const totalTeams = teams.length;
  const totalDepartments = new Set(teams.map(team => team.Department)).size;

  const totalPages = Math.ceil(filteredTeams.length / pageSize); // Calculate total pages
  const paginatedTeams = filteredTeams.slice((currentPage - 1) * pageSize, currentPage * pageSize); // Paginate teams

  return (
    <div className="dashboard-container">
      <header className="header">
        <div className="header-left">
          <h1>Team Management Dashboard</h1>
          <p className="header-subtitle">Manage and organize your teams effectively</p>
        </div>
        <div className="header-right">
          <SheetComponent /> {/* Profile component */}
          <div className="current-time">{currentTime}</div>
        </div>
      </header>
      
      <main className="main-content container mx-auto p-12">
        <div className="flex justify-between items-center mb-4 px-6">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search by Team Leader or Department..."
              className="border rounded p-2 w-64"
              value={searchQuery}
              onChange={handleSearch}
            />
            <button onClick={handleAddTeam} className="bg-green-500 text-white px-4 py-2 rounded shadow-md hover:bg-green-600">
              Add Team
            </button>
          </div>
        </div>
        
        {/* Team Stats */}
        <TeamStats totalTeams={totalTeams} totalDepartments={totalDepartments} />

        <TeamsTable
          className="relative w-full overflow-auto bg-white rounded-lg shadow-md px-12"
          paginatedData={paginatedTeams} // Pass the paginated teams
          handleEditTeam={handleEditTeam}
          handleDeleteTeams={openConfirmationDialog} // Pass the function to open the confirmation dialog
          handleSort={handleSort}
        />
        
        {/* Pagination Component */}
        <div className="flex justify-center mt-4">
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
        
        <AddEditTeamDialog
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          selectedTeam={selectedTeam}
          setSelectedTeam={setSelectedTeam}
          handleSaveTeam={handleSaveTeam}
        />
        
        <ConfirmationDialog
          isOpen={isConfirmationDialogOpen}
          message={`Are you sure you want to delete the team "${selectedTeam.name}"?`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      </main>
    </div>
  );
};

export default ManageTeams;
