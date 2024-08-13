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
import { Tooltip } from "@chakra-ui/react";

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
const determineStatus = (part1EndTime, lunchStartTime, lunchEndTime, part2EndTime) => {
  const totalHours = calculateTotalHours("09:00 AM", part2EndTime);
  const [hours] = totalHours.split("h ");
  if (parseInt(hours) >= 8) {
    return "Done";
  } else {
    return "Ongoing";
  }
};

// Determine situation based on the total hours worked
const determineSituation = (part1EndTime, lunchStartTime, lunchEndTime, part2EndTime, status) => {
  const totalHours = calculateTotalHours("09:00 AM", part2EndTime);
  const [hours] = totalHours.split("h ");
  if (parseInt(hours) >= 8 && status === "Done") {
    return "Leave";
  } else if (status === "Lunch") {
    return "Lunch";
  } else {
    return "On Job";
  }
};

// Function to determine the styling for status and situation
const getStatusStyle = (status) => {
  switch (status) {
    case "Done":
      return "bg-green-500 text-white";
    case "Lunch":
      return "bg-blue-500 text-white";
    case "On Job":
    case "Ongoing":
      return "bg-orange-500 text-white";
    case "Leave":
      return "bg-red-500 text-white";
    default:
      return "bg-gray-300 text-black";
  }
};

// Function to determine the tooltip text for status and situation
const getStatusTooltip = (status) => {
  switch (status) {
    case "Done":
      return "The work for the day is complete.";
    case "Lunch":
      return "Currently on lunch break.";
    case "On Job":
    case "Ongoing":
      return "Work is ongoing.";
    case "Leave":
      return "The worker has left.";
    default:
      return "Unknown status.";
  }
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
      name: "Doe, John",
      type: "Fixed",
      date: "2023-08-01",
      part1StartTime: "09:00 AM",
      part1EndTime: "01:00 PM",
      lunchStartTime: "01:00 PM",
      lunchEndTime: "02:00 PM",
      part2StartTime: "02:00 PM",
      part2EndTime: "06:00 PM",
      status: "Done",
    },
    {
      name: "Smith, Jane",
      type: "Flexible",
      date: "2023-08-02",
      part1StartTime: "10:00 AM",
      part1EndTime: "02:00 PM",
      lunchStartTime: "02:00 PM",
      lunchEndTime: "03:00 PM",
      part2StartTime: "03:00 PM",
      part2EndTime: "07:00 PM",
      status: "Done",
    },
    {
      name: "Johnson, Alice",
      type: "Open",
      date: "2023-08-01",
      part1StartTime: "08:30 AM",
      part1EndTime: "12:30 PM",
      lunchStartTime: "12:30 PM",
      lunchEndTime: "01:30 PM",
      part2StartTime: "01:30 PM",
      part2EndTime: "05:30 PM",
      status: "Ongoing",
    },
    {
      name: "Brown, Bob",
      type: "Fixed",
      date: "2023-08-01",
      part1StartTime: "08:00 AM",
      part1EndTime: "12:00 PM",
      lunchStartTime: "12:00 PM",
      lunchEndTime: "01:00 PM",
      part2StartTime: "01:00 PM",
      part2EndTime: "05:00 PM",
      status: "Ongoing",
    },
  ];

  const [data, setData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [filterType, setFilterType] = useState("");
  const [filterSituation, setFilterSituation] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);

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
      } else if (key === "part1StartTime" || key === "part1EndTime" || key === "lunchStartTime" || key === "lunchEndTime" || key === "part2StartTime" || key === "part2EndTime") {
        return compareTimes(a, b, key, direction);
      } else if (key === "totalHours") {
        const totalHoursA = calculateTotalHours(a.part1StartTime, a.part2EndTime);
        const totalHoursB = calculateTotalHours(b.part1StartTime, b.part2EndTime);
        return direction === "ascending" ? totalHoursA.localeCompare(totalHoursB) : totalHoursB.localeCompare(totalHoursA);
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
    .filter((record) => {
      const matchesSearch = record.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType ? record.type === filterType : true;
      const matchesSituation = filterSituation ? determineSituation(record.part1EndTime, record.lunchStartTime, record.lunchEndTime, record.part2EndTime, record.status) === filterSituation : true;
      const matchesStatus = filterStatus ? record.status === filterStatus : true;

      return matchesSearch && matchesType && matchesSituation && matchesStatus;
    });

  return (
    <div>
      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by name"
          className="border border-gray-300 p-2 rounded"
        />
        <select value={filterType} onChange={handleFilterType} className="border border-gray-300 p-2 rounded">
          <option value="">All Types</option>
          <option value="Fixed">Fixed</option>
          <option value="Flexible">Flexible</option>
          <option value="Open">Open</option>
        </select>
        <select value={filterSituation} onChange={handleFilterSituation} className="border border-gray-300 p-2 rounded">
          <option value="">All Situations</option>
          <option value="On Job">On Job</option>
          <option value="Leave">Leave</option>
          <option value="Lunch">Lunch</option>
        </select>
        <select value={filterStatus} onChange={handleFilterStatus} className="border border-gray-300 p-2 rounded">
          <option value="">All Statuses</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Done">Done</option>
        </select>
        <button onClick={() => setIsMinimized(!isMinimized)} className="bg-blue-500 text-white p-2 rounded">
          {isMinimized ? "Expand" : "Minimize"}
        </button>
      </div>

      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => handleSort("name")}>
              Name
              {sortConfig.key === "name" && (sortConfig.direction === "ascending" ? " ▲" : " ▼")}
            </TableHead>
            <TableHead onClick={() => handleSort("type")}>
              Type
              {sortConfig.key === "type" && (sortConfig.direction === "ascending" ? " ▲" : " ▼")}
            </TableHead>
            <TableHead onClick={() => handleSort("date")}>
              Date
              {sortConfig.key === "date" && (sortConfig.direction === "ascending" ? " ▲" : " ▼")}
            </TableHead>
            <TableHead onClick={() => handleSort("part1StartTime")}>
              Start Time
              {sortConfig.key === "part1StartTime" && (sortConfig.direction === "ascending" ? " ▲" : " ▼")}
            </TableHead>
            {!isMinimized && (
              <>
                <TableHead onClick={() => handleSort("part1EndTime")}>
                  End Time
                  {sortConfig.key === "part1EndTime" && (sortConfig.direction === "ascending" ? " ▲" : " ▼")}
                </TableHead>
                <TableHead onClick={() => handleSort("lunchStartTime")}>
                  Lunch Start Time
                  {sortConfig.key === "lunchStartTime" && (sortConfig.direction === "ascending" ? " ▲" : " ▼")}
                </TableHead>
                <TableHead onClick={() => handleSort("lunchEndTime")}>
                  Lunch End Time
                  {sortConfig.key === "lunchEndTime" && (sortConfig.direction === "ascending" ? " ▲" : " ▼")}
                </TableHead>
                <TableHead onClick={() => handleSort("part2StartTime")}>
                  Start Time
                  {sortConfig.key === "part2StartTime" && (sortConfig.direction === "ascending" ? " ▲" : " ▼")}
                </TableHead>
              </>
            )}
            <TableHead onClick={() => handleSort("part2EndTime")}>
              End Time
              {sortConfig.key === "part2EndTime" && (sortConfig.direction === "ascending" ? " ▲" : " ▼")}
            </TableHead>
            <TableHead>
              Status
            </TableHead>
            <TableHead>
              Situation
            </TableHead>
            <TableHead onClick={() => handleSort("totalHours")}>
              Total Hours
              {sortConfig.key === "totalHours" && (sortConfig.direction === "ascending" ? " ▲" : " ▼")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((record, index) => (
            <TableRow key={index}>
              <TableCell className="border-l">{record.name}</TableCell>
              <TableCell className="border-l">{record.type}</TableCell>
              <TableCell className="border-l">{record.date}</TableCell>
              <TableCell className="border-l">{record.part1StartTime}</TableCell>
              {!isMinimized && (
                <>
                  <TableCell className="border-l">{record.part1EndTime}</TableCell>
                  <TableCell className="border-l">{record.lunchStartTime}</TableCell>
                  <TableCell className="border-l">{record.lunchEndTime}</TableCell>
                  <TableCell className="border-l">{record.part2StartTime}</TableCell>
                </>
              )}
              <TableCell className="border-l">{record.part2EndTime}</TableCell>
              <TableCell className="border-l">
                <Tooltip label={getStatusTooltip(record.status)} placement="top">
                  <span className={`inline-block rounded-full h-6 w-6 ${getStatusStyle(record.status)} text-center leading-6`}>
                    {record.status[0]}
                  </span>
                </Tooltip>
              </TableCell>
              <TableCell className="border-l">
                <Tooltip label={getStatusTooltip(determineSituation(record.part1EndTime, record.lunchStartTime, record.lunchEndTime, record.part2EndTime, record.status))} placement="top">
                  <span className={`inline-block rounded-full h-6 w-6 ${getStatusStyle(determineSituation(record.part1EndTime, record.lunchStartTime, record.lunchEndTime, record.part2EndTime, record.status))} text-center leading-6`}>
                    {determineSituation(record.part1EndTime, record.lunchStartTime, record.lunchEndTime, record.part2EndTime, record.status)[0]}
                  </span>
                </Tooltip>
              </TableCell>
              <TableCell className="border-l">
                {calculateTotalHours(record.part1StartTime, record.part2EndTime)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
