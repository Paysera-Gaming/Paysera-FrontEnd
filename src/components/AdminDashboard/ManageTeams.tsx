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
import SheetComponent from './SheetComponent';

const ManageTeams = () => {
  const initialData = [
    { id: 1, name: 'Smith, Ken', Department: 'Tech Department', teamLeaderEmail: 'ken99@yahoo.com', members: ['Alice', 'Bob', 'Charlie', 'David'] },
    { id: 2, name: 'Johnson, Abe', Department: 'Call Department', teamLeaderEmail: 'abe45@gmail.com', members: ['Charlie'] },
    { id: 3, name: 'Lee, Monserrat', Department: 'Tech Department', teamLeaderEmail: 'monserrat44@gmail.com', members: ['Dave', 'Eve'] },
    { id: 4, name: 'Parker, Silas', Department: 'Call Department', teamLeaderEmail: 'silas22@gmail.com', members: ['Frank'] },
  ];

  const [data, setData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState({
    id: null,
    name: '',
    Department: '',
    teamLeaderEmail: '',
    members: [],
  });
  const [newMember, setNewMember] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [errors, setErrors] = useState({ name: '', email: '' });

  // Validation functions
  const isValidName = (name) => {
    const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*(?:, [A-Za-z]+(?: [A-Za-z]+)*)?$/;
    const [lastName, rest] = name.split(', ');
    const [firstName, middleName] = rest ? rest.split(' ') : [];
    return nameRegex.test(name) && lastName && firstName;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const parseFullName = (fullName) => {
    const [lastName, rest] = fullName.split(', ');
    const [firstName, middleName] = rest ? rest.split(' ') : [];
    return { lastName, firstName, middleName: middleName || '' };
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddTeams = () => {
    setSelectedTeam({
      id: data.length + 1,
      name: '',
      Department: '',
      teamLeaderEmail: '',
      members: [],
    });
    setIsDialogOpen(true);
  };

  const handleEditTeam = (team) => {
    setSelectedTeam(team);
    setIsDialogOpen(true);
  };

  const handleSaveTeam = () => {
    let hasErrors = false;
    let nameError = '';
    let emailError = '';

    // Validate name and email
    if (!isValidName(selectedTeam.name)) {
      nameError = 'Please enter the name in the format: Last Name, First Name Middle Name';
      hasErrors = true;
    }
    if (!isValidEmail(selectedTeam.teamLeaderEmail)) {
      emailError = 'Please enter a valid email address';
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors({ name: nameError, email: emailError });
      return;
    }

    setErrors({ name: '', email: '' });

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

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortData = (data, config) => {
    const sortedData = [...data].sort((a, b) => {
      if (a[config.key] < b[config.key]) {
        return config.direction === 'ascending' ? -1 : 1;
      }
      if (a[config.key] > b[config.key]) {
        return config.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    return sortedData;
  };

  const filteredData = data.filter((record) =>
    record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.Department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedData = sortData(filteredData, sortConfig);

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
        <div className="flex-grow">
          <Input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
            className="border rounded p-2 w-64 max-w-full"
          />
        </div>
      </div>

      <Table className="w-full border-collapse">
        <TableCaption>Details of teams and their statuses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead
              className="text-center border-x cursor-pointer"
              onClick={() => handleSort('name')}
            >
              Team Leader Name
            </TableHead>
            <TableHead
              className="text-center border-x cursor-pointer"
              onClick={() => handleSort('Department')}
            >
              Department
            </TableHead>
            <TableHead
              className="text-center border-x cursor-pointer"
              onClick={() => handleSort('teamLeaderEmail')}
            >
              Team Leader Email
            </TableHead>
            <TableHead className="text-center border-x">Members</TableHead>
            <TableHead className="text-center border-x">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((team) => (
            <TableRow key={team.id}>
              <TableCell className="text-center border-x">{team.name}</TableCell>
              <TableCell className="text-center border-x">{team.Department}</TableCell>
              <TableCell className="text-center border-x">{team.teamLeaderEmail}</TableCell>
              <TableCell className="text-center border-x">
                <ul className="list-disc ml-4">
                  {team.members.slice(0, 2).map((member) => (
                    <li key={member}>{member}</li>
                  ))}
                  {team.members.length > 2 && <li>and {team.members.length - 2} more...</li>}
                </ul>
              </TableCell>
              <TableCell className="text-center border-x space-x-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={() => handleEditTeam(team)}
                        className="bg-blue-500 text-white hover:bg-blue-600"
                      >
                        Edit
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Edit Team</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Button
                  onClick={() => handleDeleteTeams(team.id)}
                  className="bg-red-500 text-white hover:bg-red-600"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={(open) => setIsDialogOpen(open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedTeam.id ? 'Edit Team' : 'Add New Team'}</DialogTitle>
            <DialogDescription>Fill in the details below.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="team-name">Team Leader Name</label>
              <Input
                id="team-name"
                value={selectedTeam?.name || ''}
                onChange={(e) => setSelectedTeam({ ...selectedTeam, name: e.target.value })}
                className="border p-2 rounded w-full"
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="Department">Department</label>
              <Input
                id="Department"
                value={selectedTeam?.Department || ''}
                onChange={(e) => setSelectedTeam({ ...selectedTeam, Department: e.target.value })}
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="team-leader-email">Team Leader Email</label>
              <Input
                id="team-leader-email"
                value={selectedTeam?.teamLeaderEmail || ''}
                onChange={(e) => setSelectedTeam({ ...selectedTeam, teamLeaderEmail: e.target.value })}
                className="border p-2 rounded w-full"
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="members">Members</label>
              <div className="grid grid-cols-2 gap-4">
                {selectedTeam?.members.map((member, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <span>{member}</span>
                    <Button
                      onClick={() => handleDeleteMember(member)}
                      className="bg-red-500 text-white hover:bg-red-600"
                    >
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2 mt-2">
                <Input
                  value={newMember}
                  onChange={(e) => setNewMember(e.target.value)}
                  placeholder="Add new member"
                  className="border p-2 rounded w-full"
                />
                <Button
                  onClick={handleAddMember}
                  className="bg-green-500 text-white hover:bg-green-600"
                >
                  Add
                </Button>
              </div>
            </div>
            <Button
              onClick={handleSaveTeam}
              className="bg-blue-500 text-white hover:bg-blue-600 mt-4"
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageTeams;
