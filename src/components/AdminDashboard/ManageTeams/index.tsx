import React, { useState } from 'react';
import AddEditTeamDialog from './AddEditTeamDialog';
import TeamsTable from './TeamsTable';
import TeamStats from './TeamStats';
import SheetComponent from '../SheetComponent';
import { initialTeams } from './teamData';

const ManageTeams = () => {
  const [teams, setTeams] = useState(initialTeams);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState({ id: null, name: '', Department: '', teamLeaderEmail: '', members: [] });
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleDeleteTeams = (teamId) => {
    setTeams(teams.filter((team) => team.id !== teamId));
  };

  const handleSort = (key) => {
    const sortedTeams = [...teams].sort((a, b) => a[key].localeCompare(b[key]));
    setTeams(sortedTeams);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredTeams = teams.filter((team) => 
    team.name.toLowerCase().includes(searchQuery) || 
    team.Department.toLowerCase().includes(searchQuery)
  );

  const totalTeams = teams.length;
  const totalDepartments = new Set(teams.map(team => team.Department)).size;

  return (
    <div>
      <h1 className="text-3xl font-semibold text-center mb-6">Manage Teams</h1>
      <TeamStats totalTeams={totalTeams} totalDepartments={totalDepartments} />
      <div className="flex justify-between items-center mb-4 px-6">
        <div className="flex items-center space-x-4">
          <button onClick={handleAddTeam} className="bg-green-500 text-white px-4 py-2 rounded shadow-md hover:bg-green-600">
            Add Team
          </button>
          <input
            type="text"
            placeholder="Search by Team Leader or Department..."
            className="border rounded p-2 w-64"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      <TeamsTable
        className="relative w-full overflow-auto bg-white rounded-lg shadow-md px-6"
        paginatedData={filteredTeams} // Pass the filtered teams
        handleEditTeam={handleEditTeam}
        handleDeleteTeams={handleDeleteTeams}
        handleSort={handleSort}
      />
      
      <AddEditTeamDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        selectedTeam={selectedTeam}
        setSelectedTeam={setSelectedTeam}
        handleSaveTeam={handleSaveTeam}
      />
      <SheetComponent />
    </div>
  );
};

export default ManageTeams;
