import React, { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import SheetComponent from 'C:/Users/Admin/Paysera-FrontEnd/src/components/AdminDashboard/SheetComponent.tsx';

const calculateTotalHours = (teamStartTime, teamEndTime) => {
  const [startHour, startMinute, startPeriod] = teamStartTime.split(/[: ]/);
  const [endHour, endMinute, endPeriod] = teamEndTime.split(/[: ]/);

  let startHours = parseInt(startHour);
  let endHours = parseInt(endHour);

  if (startPeriod === "PM" && startHours !== 12) startHours += 12;
  if (endPeriod === "PM" && endHours !== 12) endHours += 12;
  if (startPeriod === "AM" && startHours === 12) startHours = 0;
  if (endPeriod === "AM" && endHours === 12) endHours = 0;

  const startTimeInMinutes = startHours * 60 + parseInt(startMinute);
  const endTimeInMinutes = endHours * 60 + parseInt(endMinute);

  const totalMinutes = endTimeInMinutes - startTimeInMinutes;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}h ${minutes}m`;
};

const ManageTeams = () => {
  const initialData = [
    { id: 1, name: 'Ken Smith', company: 'Tech Company', email: 'ken99@yahoo.com', teamStartTime: '09:00 AM', teamEndTime: '06:00 PM', status: 'Done' },
    { id: 2, name: 'Abe Johnson', company: 'Call Company', email: 'abe45@gmail.com', teamStartTime: '10:00 AM', teamEndTime: '07:00 PM', status: 'Done' },
    { id: 3, name: 'Monserrat Lee', company: 'Tech Company', email: 'monserrat44@gmail.com', teamStartTime: '08:30 AM', teamEndTime: '05:30 PM', status: 'Ongoing' },
    { id: 4, name: 'Silas Parker', company: 'Call Company', email: 'silas22@gmail.com', teamStartTime: '08:00 AM', teamEndTime: '05:00 PM', status: 'Ongoing' },
  ];

  const [data, setData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddTeams = () => {
    const newTeam = {
      id: data.length + 1,
      name: 'New Team',
      company: 'Company Name',
      email: 'email@example.com',
      teamStartTime: '09:00 AM',
      teamEndTime: '06:00 PM',
      status: 'Ongoing',
    };
    setData([...data, newTeam]);
  };

  const handleDeleteTeams = (id) => {
    setData(data.filter((team) => team.id !== id));
  };

  const handleEditTeam = (id) => {
    const teamToEdit = data.find((team) => team.id === id);
    if (teamToEdit) {
      // Add logic to edit the team details here.
      console.log("Edit team:", teamToEdit);
    }
  };

  const filteredData = data.filter((record) =>
    record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <SheetComponent />
      <h2 style={{ fontSize: '24px', marginBottom: '20px', textAlign: 'center' }}>Manage Teams</h2>
      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          placeholder="Search by team name or company"
          value={searchQuery}
          onChange={handleSearch}
          className="p-2 border rounded"
        />

        <button
          onClick={handleAddTeams}
          className="p-2 border rounded bg-green-500 text-white hover:bg-green-700"
        >
          Add New Team
        </button>
      </div>
      <Table className="border-collapse border border-gray-300">
        <TableCaption>Details of teams and their members.</TableCaption>
        <TableHeader>
          <TableRow className="border border-gray-300">
            <TableHead className="border border-gray-300">Team Name</TableHead>
            <TableHead className="border border-gray-300">Company</TableHead>
            <TableHead className="border border-gray-300">Email</TableHead>
            <TableHead className="border border-gray-300">Team Start Time</TableHead>
            <TableHead className="border border-gray-300">Team End Time</TableHead>
            <TableHead className="border border-gray-300">Status</TableHead>
            <TableHead className="border border-gray-300">Total Hours</TableHead>
            <TableHead className="border border-gray-300">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((team) => (
            <TableRow key={team.id} className="border border-gray-300">
              <TableCell className="border border-gray-300">{team.name}</TableCell>
              <TableCell className="border border-gray-300">{team.company}</TableCell>
              <TableCell className="border border-gray-300">{team.email}</TableCell>
              <TableCell className="border border-gray-300">{team.teamStartTime}</TableCell>
              <TableCell className="border border-gray-300">{team.teamEndTime}</TableCell>
              <TableCell className="border border-gray-300">{team.status}</TableCell>
              <TableCell className="border border-gray-300">
                {calculateTotalHours(team.teamStartTime, team.teamEndTime)}
              </TableCell>
              <TableCell className="border border-gray-300 flex space-x-2">
                <button
                  onClick={() => handleEditTeam(team.id)}
                  className="p-2 border rounded bg-blue-500 text-white hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTeams(team.id)}
                  className="p-2 border rounded bg-red-500 text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageTeams;
