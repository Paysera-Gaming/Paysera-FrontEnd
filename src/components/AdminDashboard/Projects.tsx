import React, { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import SheetComponent from 'C:/Users/Admin/Paysera-FrontEnd/src/components/AdminDashboard/SheetComponent.tsx';

const calculateTotalHours = (startTime, endTime) => {
  const [startHour, startMinute, startPeriod] = startTime.split(/[: ]/);
  const [endHour, endMinute, endPeriod] = endTime.split(/[: ]/);

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

const Projects = () => {
  const initialProjects = [
    { id: 1, name: 'Project Alpha', type: 'Development', startDate: '01-01-2024', part1StartTime: '09:00 AM', part2EndTime: '06:00 PM', status: 'Completed' },
    { id: 2, name: 'Project Beta', type: 'Design', startDate: '15-01-2024', part1StartTime: '10:00 AM', part2EndTime: '07:00 PM', status: 'In Progress' },
    { id: 3, name: 'Project Gamma', type: 'Research', startDate: '20-01-2024', part1StartTime: '08:30 AM', part2EndTime: '05:30 PM', status: 'Not Started' },
    { id: 4, name: 'Project Delta', type: 'Testing', startDate: '25-01-2024', part1StartTime: '08:00 AM', part2EndTime: '05:00 PM', status: 'In Progress' },
  ];

  const [projects, setProjects] = useState(initialProjects);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddProject = () => {
    const newProject = {
      id: projects.length + 1,
      name: 'New Project',
      type: 'Type',
      startDate: '01-02-2024',
      part1StartTime: '09:00 AM',
      part2EndTime: '06:00 PM',
      status: 'Not Started',
    };
    setProjects([...projects, newProject]);
  };

  const handleDeleteProject = (id) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <SheetComponent />
      <h2 style={{ fontSize: '24px', marginBottom: '20px', textAlign: 'center' }}>Projects List</h2>
      <div className="mb-4 flex space-x-4">
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className={`p-2 border rounded ${isMinimized ? 'bg-blue-500 text-white hover:bg-blue-700' : 'bg-blue-500 text-white hover:bg-blue-700'}`}
        >
          {isMinimized ? "Maximize Table" : "Minimize Table"}
        </button>

        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearch}
          className="p-2 border rounded"
        />

        <button
          onClick={handleAddProject}
          className="p-2 border rounded bg-green-500 text-white hover:bg-green-700"
        >
          Add New Project
        </button>
      </div>
      <Table className="border-collapse border border-gray-300">
        <TableCaption>Details of ongoing and completed projects.</TableCaption>
        <TableHeader>
          <TableRow className="border border-gray-300">
            <TableHead className="border border-gray-300">Name</TableHead>
            <TableHead className="border border-gray-300">Type</TableHead>
            <TableHead className="border border-gray-300">Start Date</TableHead>
            <TableHead className="border border-gray-300">Part 1 Start Time</TableHead>
            {!isMinimized && (
              <>
                <TableHead className="border border-gray-300">Part 2 End Time</TableHead>
              </>
            )}
            <TableHead className="border border-gray-300">Status</TableHead>
            <TableHead className="border border-gray-300">Total Hours</TableHead>
            <TableHead className="border border-gray-300">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProjects.map((project) => (
            <TableRow key={project.id} className="border border-gray-300">
              <TableCell className="border border-gray-300">{project.name}</TableCell>
              <TableCell className="border border-gray-300">{project.type}</TableCell>
              <TableCell className="border border-gray-300">{project.startDate}</TableCell>
              <TableCell className="border border-gray-300">{project.part1StartTime}</TableCell>
              {!isMinimized && (
                <TableCell className="border border-gray-300">{project.part2EndTime}</TableCell>
              )}
              <TableCell className="border border-gray-300">{project.status}</TableCell>
              <TableCell className="border border-gray-300">
                {calculateTotalHours(project.part1StartTime, project.part2EndTime)}
              </TableCell>
              <TableCell className="border border-gray-300">
                <button
                  onClick={() => handleDeleteProject(project.id)}
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

export default Projects;
