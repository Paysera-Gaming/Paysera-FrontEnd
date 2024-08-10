import React, { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import SheetComponent from 'C:/Users/Admin/Paysera-FrontEnd/src/components/AdminDashboard/SheetComponent.tsx';

// Utility function to calculate total hours
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

// YourTeam component
const YourTeam = () => {
  const initialData = [
    { id: 1, name: 'Ken Smith', role: 'Project Manager', email: 'ken99@yahoo.com', part1StartTime: '09:00 AM', part1EndTime: '01:00 PM', lunchStartTime: '01:00 PM', lunchEndTime: '02:00 PM', part2StartTime: '02:00 PM', part2EndTime: '06:00 PM', status: 'Done' },
    { id: 2, name: 'Abe Johnson', role: 'Developer', email: 'abe45@gmail.com', part1StartTime: '10:00 AM', part1EndTime: '02:00 PM', lunchStartTime: '02:00 PM', lunchEndTime: '03:00 PM', part2StartTime: '03:00 PM', part2EndTime: '07:00 PM', status: 'Done' },
    { id: 3, name: 'Monserrat Lee', role: 'Designer', email: 'monserrat44@gmail.com', part1StartTime: '08:30 AM', part1EndTime: '12:30 PM', lunchStartTime: '12:30 PM', lunchEndTime: '01:30 PM', part2StartTime: '01:30 PM', part2EndTime: '05:30 PM', status: 'Ongoing' },
    { id: 4, name: 'Silas Parker', role: 'QA Engineer', email: 'silas22@gmail.com', part1StartTime: '08:00 AM', part1EndTime: '12:00 PM', lunchStartTime: '12:00 PM', lunchEndTime: '01:00 PM', part2StartTime: '01:00 PM', part2EndTime: '05:00 PM', status: 'Ongoing' },
  ];

  const [data, setData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = data.filter((record) =>
    record.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <SheetComponent /> {/* Importing the SheetComponent */}
      <h2 style={{ fontSize: '24px', marginBottom: '20px', textAlign: 'center' }}>Your Team</h2>
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
      </div>
      <Table className="border-collapse border border-gray-300">
        <TableCaption>Your team members' details.</TableCaption>
        <TableHeader>
          <TableRow className="border border-gray-300">
            <TableHead className="border border-gray-300">ID</TableHead>
            <TableHead className="border border-gray-300">Name</TableHead>
            <TableHead className="border border-gray-300">Role</TableHead>
            <TableHead className="border border-gray-300">Email</TableHead>
            <TableHead className="border border-gray-300">Start Time</TableHead>
            {!isMinimized && (
              <>
                <TableHead className="border border-gray-300">End Time</TableHead>
                <TableHead className="border border-gray-300">Lunch Start Time</TableHead>
                <TableHead className="border border-gray-300">Lunch End Time</TableHead>
                <TableHead className="border border-gray-300">Second Half Start Time</TableHead>
              </>
            )}
            <TableHead className="border border-gray-300">Second Half End Time</TableHead>
            <TableHead className="border border-gray-300">Status</TableHead>
            <TableHead className="border border-gray-300">Total Hours</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((member) => (
            <TableRow key={member.id} className="border border-gray-300">
              <TableCell className="border border-gray-300">{member.id}</TableCell>
              <TableCell className="border border-gray-300">{member.name}</TableCell>
              <TableCell className="border border-gray-300">{member.role}</TableCell>
              <TableCell className="border border-gray-300">{member.email}</TableCell>
              <TableCell className="border border-gray-300">{member.part1StartTime}</TableCell>
              {!isMinimized && (
                <>
                  <TableCell className="border border-gray-300">{member.part1EndTime}</TableCell>
                  <TableCell className="border border-gray-300">{member.lunchStartTime}</TableCell>
                  <TableCell className="border border-gray-300">{member.lunchEndTime}</TableCell>
                  <TableCell className="border border-gray-300">{member.part2StartTime}</TableCell>
                </>
              )}
              <TableCell className="border border-gray-300">{member.part2EndTime}</TableCell>
              <TableCell className="border border-gray-300">{member.status}</TableCell>
              <TableCell className="border border-gray-300">
                {calculateTotalHours(member.part1StartTime, member.part2EndTime)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default YourTeam;
    