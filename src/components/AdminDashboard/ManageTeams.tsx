import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import SheetComponent from './SheetComponent'; // Ensure this path is correct

const convertTo24HourFormat = (time) => {
  const [timePart, period] = time.split(' ');
  let [hours, minutes] = timePart.split(':').map(Number);

  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

const convertTo12HourFormat = (time) => {
  if (!time) return '';  // Handle undefined or null time

  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const adjustedHours = hours % 12 || 12;

  return `${adjustedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};


const calculateTotalHours = (startTime, endTime) => {
  if (!startTime || !endTime) return 'N/A';

  const startTimeInMinutes = (parseInt(startTime.split(':')[0]) * 60) + parseInt(startTime.split(':')[1]);
  const endTimeInMinutes = (parseInt(endTime.split(':')[0]) * 60) + parseInt(endTime.split(':')[1]);

  const totalMinutes = endTimeInMinutes - startTimeInMinutes;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}h ${minutes}m`;
};

const ManageTeams = () => {
  const initialData = [
    { id: 1, name: 'Ken Smith', company: 'Tech Company', teamLeaderEmail: 'ken99@yahoo.com', teamStartTime: '09:00', teamEndTime: '18:00', status: 'Done', members: ['Alice', 'Bob'] },
    { id: 2, name: 'Abe Johnson', company: 'Call Company', teamLeaderEmail: 'abe45@gmail.com', teamStartTime: '10:00', teamEndTime: '19:00', status: 'Done', members: ['Charlie'] },
    { id: 3, name: 'Monserrat Lee', company: 'Tech Company', teamLeaderEmail: 'monserrat44@gmail.com', teamStartTime: '08:30', teamEndTime: '17:30', status: 'Ongoing', members: ['Dave', 'Eve'] },
    { id: 4, name: 'Silas Parker', company: 'Call Company', teamLeaderEmail: 'silas22@gmail.com', teamStartTime: '08:00', teamEndTime: '17:00', status: 'Ongoing', members: ['Frank'] },
  ];

  const [data, setData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [newMember, setNewMember] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddTeams = () => {
    setSelectedTeam({
      id: data.length + 1,
      name: '',
      company: '',
      teamLeaderEmail: '',
      teamStartTime: '09:00',
      teamEndTime: '18:00',
      status: 'Ongoing',
      members: [],
    });
    setIsDialogOpen(true);
  };

  const handleEditTeam = (team) => {
    setSelectedTeam({
      ...team,
      teamStartTime: team.teamStartTime,
      teamEndTime: team.teamEndTime,
      members: team.members,
    });
    setIsDialogOpen(true);
  };

  const handleSaveTeam = () => {
    if (selectedTeam.id <= data.length) {
      setData(data.map((team) => (team.id === selectedTeam.id ? selectedTeam : team)));
    } else {
      setData([...data, selectedTeam]);
    }
    setIsDialogOpen(false);
  };

  const handleDeleteTeams = (id) => {
    setData(data.filter(team => team.id !== id));
  };

  const handleAddMember = () => {
    if (newMember) {
      setSelectedTeam({ ...selectedTeam, members: [...selectedTeam.members, newMember] });
      setNewMember("");
    }
  };

  const handleDeleteMember = (member) => {
    setSelectedTeam({ ...selectedTeam, members: selectedTeam.members.filter((m) => m !== member) });
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
            <TableHead>Members</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((team) => (
            <TableRow key={team.id}>
              <TableCell>{team.name}</TableCell>
              <TableCell>{team.company}</TableCell>
              <TableCell>{team.teamLeaderEmail}</TableCell>
              <TableCell>{convertTo12HourFormat(team.teamStartTime)}</TableCell>
              <TableCell>{convertTo12HourFormat(team.teamEndTime)}</TableCell>
              <TableCell>{team.status}</TableCell>
              <TableCell>{calculateTotalHours(team.teamStartTime, team.teamEndTime)}</TableCell>
              <TableCell>{team.members.join(', ')}</TableCell>
              <TableCell className="flex space-x-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
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
                    <TooltipTrigger asChild>
                      <Button
                        onClick={() => handleEditTeam(team)}
                        className="bg-blue-500 text-white hover:bg-blue-600"
                      >
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedTeam?.id ? 'Edit Team' : 'Add New Team'}</DialogTitle>
            <DialogDescription>
              {selectedTeam?.id ? 'Update the team details below:' : 'Enter the new team details below:'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label htmlFor="team-name">Team Name</label>
              <Input
                id="team-name"
                value={selectedTeam?.name || ""}
                onChange={(e) => setSelectedTeam({ ...selectedTeam, name: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="company">Company</label>
              <Input
                id="company"
                value={selectedTeam?.company || ""}
                onChange={(e) => setSelectedTeam({ ...selectedTeam, company: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="team-leader-email">Team Leader Email</label>
              <Input
                id="team-leader-email"
                value={selectedTeam?.teamLeaderEmail || ""}
                onChange={(e) => setSelectedTeam({ ...selectedTeam, teamLeaderEmail: e.target.value })}
              />
            </div>
            <div className="flex space-x-4">
              <div>
                <label htmlFor="team-start-time">Team Start Time</label>
                <Input
                  id="team-start-time"
                  value={convertTo12HourFormat(selectedTeam?.teamStartTime || "")}
                  onChange={(e) => setSelectedTeam({ ...selectedTeam, teamStartTime: convertTo24HourFormat(e.target.value) })}
                />
              </div>
              <div>
                <label htmlFor="team-end-time">Team End Time</label>
                <Input
                  id="team-end-time"
                  value={convertTo12HourFormat(selectedTeam?.teamEndTime || "")}
                  onChange={(e) => setSelectedTeam({ ...selectedTeam, teamEndTime: convertTo24HourFormat(e.target.value) })}
                />
              </div>
            </div>
            <div>
              <label htmlFor="status">Status</label>
              <Select
                value={selectedTeam?.status || "Ongoing"}
                onValueChange={(value) => setSelectedTeam({ ...selectedTeam, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ongoing">Ongoing</SelectItem>
                  <SelectItem value="Done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="members">Add Members</label>
              <div className="flex space-x-2">
                <Input
                  id="members"
                  placeholder="Enter member name"
                  value={newMember}
                  onChange={(e) => setNewMember(e.target.value)}
                />
                <Button onClick={handleAddMember} className="bg-green-500 text-white hover:bg-green-600">Add</Button>
              </div>
              <div className="mt-2">
                {selectedTeam?.members.map((member, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span>{member}</span>
                    <Button onClick={() => handleDeleteMember(member)} className="bg-red-500 text-white hover:bg-red-600">Remove</Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex space-x-4 mt-6">
            <Button onClick={handleSaveTeam} className="bg-blue-500 text-white hover:bg-blue-600">Save</Button>
            <Button onClick={() => setIsDialogOpen(false)} className="bg-gray-500 text-white hover:bg-gray-600">Cancel</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageTeams;
