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
import { PaginationComponent } from './PaginationComponent'; // Adjust the path if needed
import { UsersIcon, BuildingOfficeIcon } from '@heroicons/react/24/solid';

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
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page

  // Calculate totals
  const totalTeams = data.length;
  const uniqueDepartments = [...new Set(data.map(team => team.Department))];
  const totalDepartments = uniqueDepartments.length;

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
    setCurrentPage(1); // Reset to first page on search
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

  // Pagination logic
  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-6">
      <SheetComponent />
      <h2 className="text-2xl font-semibold mb-6 text-center">Manage Teams</h2>
      
{/* Statistics Section */}
<div className="flex justify-center mb-6 space-x-4">
  {/* Total Teams */}
  <div className="flex-1 p-4 bg-blue-100 border border-blue-300 rounded-md text-center shadow-sm">
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center mb-2">
        <UsersIcon className="w-8 h-8 text-blue-600" /> {/* Larger icon */}
        <p className="text-4xl font-bold text-black ml-2">{totalTeams}</p> {/* Larger count */}
      </div>
      <h3 className="text-lg font-semibold text-blue-600">Total Teams</h3> {/* Label below */}
    </div>
  </div>
  
  {/* Total Departments */}
  <div className="flex-1 p-4 bg-green-100 border border-green-300 rounded-md text-center shadow-sm">
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center mb-2">
        <BuildingOfficeIcon className="w-8 h-8 text-green-600" /> {/* Larger icon */}
        <p className="text-4xl font-bold text-black ml-2">{totalDepartments}</p> {/* Larger count */}
      </div>
      <h3 className="text-lg font-semibold text-green-600">Total Departments</h3> {/* Label below */}
    </div>
  </div>
</div>




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
            <TableHead className="text-center border-x">
              Team Members
            </TableHead>
            <TableHead className="text-center border-x">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.length > 0 ? (
            paginatedData.map((team) => (
              <TableRow key={team.id}>
                <TableCell className="text-center border-x">{team.name}</TableCell>
                <TableCell className="text-center border-x">{team.Department}</TableCell>
                <TableCell className="text-center border-x">{team.teamLeaderEmail}</TableCell>
                <TableCell className="text-center border-x">{team.members.join(', ')}</TableCell>
                <TableCell className="text-center border-x">
                  <div className="space-x-2">
                    <Button
                      onClick={() => handleEditTeam(team)}
                      className="bg-blue-500 text-white hover:bg-blue-600"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDeleteTeams(team.id)}
                      className="bg-red-500 text-white hover:bg-red-600"
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="text-center border-x" colSpan={5}>
                No teams found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination Component */}
      <PaginationComponent
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedTeam.id <= data.length ? "Edit Team" : "Add New Team"}
            </DialogTitle>
            <DialogDescription>
              Fill out the form below to {selectedTeam.id <= data.length ? "edit the" : "add a new"} team.
            </DialogDescription>
          </DialogHeader>

          <div className="mb-4">
            <label className="block font-semibold">Team Leader Name:</label>
            <Input
              type="text"
              value={selectedTeam.name}
              onChange={(e) => setSelectedTeam({ ...selectedTeam, name: e.target.value })}
              className="border rounded p-2 w-full"
              placeholder="Last Name, First Name Middle Name"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <label className="block font-semibold">Department:</label>
            <Input
              type="text"
              value={selectedTeam.Department}
              onChange={(e) => setSelectedTeam({ ...selectedTeam, Department: e.target.value })}
              className="border rounded p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold">Team Leader Email:</label>
            <Input
              type="email"
              value={selectedTeam.teamLeaderEmail}
              onChange={(e) => setSelectedTeam({ ...selectedTeam, teamLeaderEmail: e.target.value })}
              className="border rounded p-2 w-full"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label className="block font-semibold">Team Members:</label>
            <div className="flex items-center space-x-2 mb-2">
              <Input
                type="text"
                value={newMember}
                onChange={(e) => setNewMember(e.target.value)}
                className="border rounded p-2 w-full"
                placeholder="Add a new member"
              />
              <Button
                onClick={handleAddMember}
                className="bg-green-500 text-white hover:bg-green-600"
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap">
              {selectedTeam.members.map((member, index) => (
                <div
                  key={index}
                  className="bg-gray-200 rounded-full px-4 py-2 mb-2 mr-2 flex items-center space-x-2"
                >
                  <span>{member}</span>
                  <button
                    onClick={() => handleDeleteMember(member)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              onClick={() => setIsDialogOpen(false)}
              className="bg-gray-500 text-white hover:bg-gray-600"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveTeam}
              className="bg-green-500 text-white hover:bg-green-600"
            >
              Save Team
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageTeams;
