import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Function to calculate total hours
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

// Determine status based on the end time and current time
const determineStatus = (endTime) => {
  const currentTime = new Date();
  const [endHour, endMinute, endPeriod] = endTime.split(/[: ]/);
  let endHours = parseInt(endHour);

  if (endPeriod === "PM" && endHours !== 12) endHours += 12;
  if (endPeriod === "AM" && endHours === 12) endHours = 0;

  const endTimeInMinutes = endHours * 60 + parseInt(endMinute);
  const currentTimeInMinutes =
    currentTime.getHours() * 60 + currentTime.getMinutes();

  return currentTimeInMinutes > endTimeInMinutes ? "Done" : "Ongoing";
};

const compareDates = (a, b, direction) => {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  if (dateA < dateB) return direction === "ascending" ? -1 : 1;
  if (dateA > dateB) return direction === "ascending" ? 1 : -1;
  return 0;
};

const compareTimes = (a, b, key, direction) => {
  const [hourA, minuteA, periodA] = a[key].split(/[: ]/);
  const [hourB, minuteB, periodB] = b[key].split(/[: ]/);

  let timeA = parseInt(hourA);
  let timeB = parseInt(hourB);

  if (periodA === "PM" && timeA !== 12) timeA += 12;
  if (periodB === "PM" && timeB !== 12) timeB += 12;
  if (periodA === "AM" && timeA === 12) timeA = 0;
  if (periodB === "AM" && timeB === 12) timeB = 0;

  const totalMinutesA = timeA * 60 + parseInt(minuteA);
  const totalMinutesB = timeB * 60 + parseInt(minuteB);

  if (totalMinutesA < totalMinutesB) return direction === "ascending" ? -1 : 1;
  if (totalMinutesA > totalMinutesB) return direction === "ascending" ? 1 : -1;
  return 0;
};

export function TableComponent() {
  const initialData = [
    {
      name: "John Doe",
      type: "Fixed",
      date: "2023-08-01",
      startTime: "09:00 AM",
      endTime: "05:00 PM",
      status: "On Job",
    },
    {
      name: "Jane Smith",
      type: "Flexible",
      date: "2023-08-02",
      startTime: "10:00 AM",
      endTime: "06:30 PM",
      status: "Lunch",
    },
    {
      name: "Alice Johnson",
      type: "Open",
      date: "2023-08-01",
      startTime: "08:30 AM",
      endTime: "04:30 PM",
      status: "On Job",
    },
  ];

  const [data, setData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [filterType, setFilterType] = useState("");
  const [filterSituation, setFilterSituation] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedData = [...data].sort((a, b) => {
      if (key === "name" || key === "type" || key === "status") {
        if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
        if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
        return 0;
      } else if (key === "date") {
        return compareDates(a, b, direction);
      } else if (key === "startTime" || key === "endTime") {
        return compareTimes(a, b, key, direction);
      }
      return 0;
    });

    setData(sortedData);
  };

  const handleFilterType = (e) => {
    setFilterType(e.target.value);
  };

  const handleFilterSituation = (e) => {
    setFilterSituation(e.target.value);
  };

  const handleFilterStatus = (e) => {
    setFilterStatus(e.target.value);
  };

  const filteredData = data
    .filter((record) =>
      record.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((record) => {
      if (!filterType) return true;
      return record.type === filterType;
    })
    .filter((record) => {
      if (!filterSituation) return true;
      return record.status === filterSituation;
    })
    .filter((record) => {
      if (!filterStatus) return true;
      return determineStatus(record.endTime) === filterStatus;
    });

  return (
    <div>
      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded"
        />
        <select value={filterType} onChange={handleFilterType} className="p-2 border border-gray-300 rounded">
          <option value="">All Types</option>
          <option value="Fixed">Fixed</option>
          <option value="Flexible">Flexible</option>
          <option value="Open">Open</option>
        </select>
        <select value={filterSituation} onChange={handleFilterSituation} className="p-2 border border-gray-300 rounded">
          <option value="">All Situations</option>
          <option value="On Job">On Job</option>
          <option value="Lunch">Lunch</option>
        </select>
        <select value={filterStatus} onChange={handleFilterStatus} className="p-2 border border-gray-300 rounded">
          <option value="">All Statuses</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <Table className="table">
        <TableCaption>Attendance Records</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]" onClick={() => handleSort("name")}>
              Name
              {sortConfig.key === "name" &&
                (sortConfig.direction === "ascending" ? " ↑" : " ↓")}
            </TableHead>
            <TableHead onClick={() => handleSort("type")}>
              Type of Attendance
              {sortConfig.key === "type" &&
                (sortConfig.direction === "ascending" ? " ↑" : " ↓")}
            </TableHead>
            <TableHead onClick={() => handleSort("date")}>
              Date
              {sortConfig.key === "date" &&
                (sortConfig.direction === "ascending" ? " ↑" : " ↓")}
            </TableHead>
            <TableHead onClick={() => handleSort("startTime")}>
              Start Time
              {sortConfig.key === "startTime" &&
                (sortConfig.direction === "ascending" ? " ↑" : " ↓")}
            </TableHead>
            <TableHead onClick={() => handleSort("endTime")}>
              End Time
              {sortConfig.key === "endTime" &&
                (sortConfig.direction === "ascending" ? " ↑" : " ↓")}
            </TableHead>
            <TableHead>Total Hours</TableHead>
            <TableHead>Situation</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((record, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{record.name}</TableCell>
              <TableCell>{record.type}</TableCell>
              <TableCell>{record.date}</TableCell>
              <TableCell>{record.startTime}</TableCell>
              <TableCell>{record.endTime}</TableCell>
              <TableCell>
                {calculateTotalHours(record.startTime, record.endTime)}
              </TableCell>
              <TableCell>{record.status}</TableCell>
              <TableCell className="text-right">
                <span
                  className={`status ${determineStatus(record.endTime).toLowerCase()}`}
                >
                  {determineStatus(record.endTime)}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
