// src/components/AdminDashboard/ManageTeams.tsx

import React, { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import SheetComponent from './SheetComponent'; // Ensure this path is correct

const calculateTotalHours = (startTime: string, endTime: string) => {
  if (!startTime || !endTime) return 'N/A';

  const [startHour, startMinute, startPeriod] = startTime.split(/[: ]/);
  const [endHour, endMinute, endPeriod] = endTime.split(/[: ]/);

  let startHours = parseInt(startHour);
  let endHours = parseInt(endHour);

  if (startPeriod === 'PM' && startHours !== 12) startHours += 12;
  if (endPeriod === 'PM' && endHours !== 12) endHours += 12;
  if (startPeriod === 'AM' && startHours === 12) startHours = 0;
  if (endPeriod === 'AM' && endHours === 12) endHours = 0;

  const startTimeInMinutes = startHours * 60 + parseInt(startMinute);
  const endTimeInMinutes = endHours * 60 + parseInt(endMinute);

  const totalMinutes = endTimeInMinutes - startTimeInMinutes;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}h ${minutes}m`;
};

const ManageTeams = () => {
  const initialData = [
    { id: 1, name: 'Ken Smith', company: 'Tech Company', teamLeaderEmail: 'ken99@yahoo.com', teamStartTime: '09:00 AM', teamEndTime: '06:00 PM', status: 'Done' },
    { id: 2, name: 'Abe Johnson', company: 'Call Company', teamLeaderEmail: 'abe45@gmail.com', teamStartTime: '10:00 AM', teamEndTime: '07:00 PM', status: 'Done' },
    { id: 3, name: 'Monserrat Lee', company: 'Tech Company', teamLeaderEmail: 'monserrat44@gmail.com', teamStartTime: '08:30 AM', teamEndTime: '05:30 PM', status: 'Ongoing' },
    { id: 4, name: 'Silas Parker', company: 'Call Company', teamLeaderEmail: 'silas22@gmail.com', teamStartTime: '08:00 AM', teamEndTime: '05:00 PM', status: 'Ongoing' },
  ];

  const [data, setData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAddTeams = () => {
    const newTeams = {
      id: data.length + 1,
      name: 'New Team',
      company: 'Company Name',
      teamLeaderEmail: 'email@example.com',
      teamStartTime: '09:00 AM',
      teamEndTime: '06:00 PM',
      status: 'Ongoing',
    };
    setData([...data, newTeams]);
  };

  const handleDeleteTeams = (id: number) => {
    setData(data.filter(team => team.id !== id));
  };

  const filteredData = data.filter((record) =>
    record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <SheetComponent />
      <h2 className="text-2xl font-semibold mb-6 text-center">Manage Teams</h2>
      <div className="flex items-center mb-6 space-x-4">
        <Button
          onClick={handleAddTeams}
          className="bg-green-500 text-white hover:bg-green-600"
        >
          Add New Team
        </Button>
        <div className="flex-grow flex items-center">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
            className="border rounded p-2 w-64" // Adjust width here
          />
        </div>
      </div>
      <Table className="w-full border-collapse">
        <TableCaption>Details of teams and their statuses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Team Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Team Leader Email</TableHead>
            <TableHead>Team Start Time</TableHead>
            <TableHead>Team End Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total Hours</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((team) => (
            <TableRow key={team.id}>
              <TableCell>{team.name}</TableCell>
              <TableCell>{team.company}</TableCell>
              <TableCell>{team.teamLeaderEmail}</TableCell>
              <TableCell>{team.teamStartTime}</TableCell>
              <TableCell>{team.teamEndTime}</TableCell>
              <TableCell>{team.status}</TableCell>
              <TableCell>{calculateTotalHours(team.teamStartTime, team.teamEndTime)}</TableCell>
              <TableCell className="flex space-x-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button
                        onClick={() => handleDeleteTeams(team.id)}
                        className="bg-red-500 text-white hover:bg-red-600"
                      >
                        Delete
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete Team</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button className="bg-blue-500 text-white hover:bg-blue-600">
                        Edit
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Edit Team</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageTeams;
