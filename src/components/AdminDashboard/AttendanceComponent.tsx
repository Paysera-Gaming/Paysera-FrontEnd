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

// Function to calculate total hours from Part 1 Start to Part 2 End
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

// Determine situation based on the total hours worked
const determineSituation = (part1EndTime, lunchStartTime, lunchEndTime, part2EndTime) => {
  const totalHours = calculateTotalHours("09:00 AM", part2EndTime);
  const [hours] = totalHours.split("h ");
  
  if (parseInt(hours) >= 8) {
    return "Leave";
  } else {
    return "On Job";
  }
};

// Function to determine the styling for situation
const getSituationStyle = (situation) => {
  switch (situation) {
    case "Leave":
      return "bg-green-500 text-white";
    case "On Job":
      return "bg-orange-500 text-white";
    default:
      return "bg-gray-300 text-black";
  }
};

// Function to determine the tooltip text for situation
const getSituationTooltip = (situation) => {
  switch (situation) {
    case "Leave":
      return "The worker has left.";
    case "On Job":
      return "Work is ongoing.";
    default:
      return "Unknown situation.";
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
    },
  ];

  const [data, setData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [filterType, setFilterType] = useState("");
  const [filterSituation, setFilterSituation] = useState("");
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
      if (key === "name" || key === "type") {
        if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
        if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
        return 0;
      } else if (key === "date") {
        return compareDates(a, b, direction);
      } else {
        return compareTimes(a, b, key, direction);
      }
    });

    setData(sortedData);
  };

  const filteredData = data
    .filter((row) =>
      row.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((row) =>
      filterType ? row.type.toLowerCase() === filterType.toLowerCase() : true
    )
    .filter((row) =>
      filterSituation
        ? determineSituation(
            row.part1EndTime,
            row.lunchStartTime,
            row.lunchEndTime,
            row.part2EndTime
          )
            .toLowerCase()
            .includes(filterSituation.toLowerCase())
        : true
    );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearch}
          className="border p-2 rounded"
        />
        <div className="flex space-x-4">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Filter by Type</option>
            <option value="Fixed">Fixed</option>
            <option value="Flexible">Flexible</option>
            <option value="Open">Open</option>
          </select>
          <select
            value={filterSituation}
            onChange={(e) => setFilterSituation(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Filter by Situation</option>
            <option value="On Job">On Job</option>
            <option value="Leave">Leave</option>
          </select>
        </div>
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isMinimized ? "Expand" : "Minimize"}
        </button>
      </div>

      {!isMinimized ? (
        <Table className="w-full bg-white rounded-lg shadow-lg">
          <TableCaption>Employee Work Status Table</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead onClick={() => handleSort("name")}>Name</TableHead>
              <TableHead onClick={() => handleSort("type")}>Type</TableHead>
              <TableHead onClick={() => handleSort("date")}>Date</TableHead>
              <TableHead onClick={() => handleSort("part1StartTime")}>
                Part 1 Start
              </TableHead>
              <TableHead onClick={() => handleSort("part1EndTime")}>
                Part 1 End
              </TableHead>
              <TableHead onClick={() => handleSort("lunchStartTime")}>
                Lunch Start
              </TableHead>
              <TableHead onClick={() => handleSort("lunchEndTime")}>
                Lunch End
              </TableHead>
              <TableHead onClick={() => handleSort("part2StartTime")}>
                Part 2 Start
              </TableHead>
              <TableHead onClick={() => handleSort("part2EndTime")}>
                Part 2 End
              </TableHead>
              <TableHead onClick={() => handleSort("totalHours")}>
                Total Hours
              </TableHead>
              <TableHead>Situation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((row, index) => {
              const situation = determineSituation(
                row.part1EndTime,
                row.lunchStartTime,
                row.lunchEndTime,
                row.part2EndTime
              );
              const totalHours = calculateTotalHours(
                row.part1StartTime,
                row.part2EndTime
              );

              return (
                <TableRow key={index}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.part1StartTime}</TableCell>
                  <TableCell>{row.part1EndTime}</TableCell>
                  <TableCell>{row.lunchStartTime}</TableCell>
                  <TableCell>{row.lunchEndTime}</TableCell>
                  <TableCell>{row.part2StartTime}</TableCell>
                  <TableCell>{row.part2EndTime}</TableCell>
                  <TableCell>{totalHours}</TableCell>
                  <TableCell>
                    <Tooltip label={getSituationTooltip(situation)}>
                      <span
                        className={`px-2 py-1 rounded ${getSituationStyle(
                          situation
                        )}`}
                      >
                        {situation}
                      </span>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        <Table className="w-full bg-white rounded-lg shadow-lg">
          <TableCaption>Employee Work Status (Minimized)</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead onClick={() => handleSort("name")}>Name</TableHead>
              <TableHead onClick={() => handleSort("type")}>Type</TableHead>
              <TableHead onClick={() => handleSort("date")}>Date</TableHead>
              <TableHead onClick={() => handleSort("part1StartTime")}>
                Part 1 Start
              </TableHead>
              <TableHead onClick={() => handleSort("part2EndTime")}>
                Part 2 End
              </TableHead>
              <TableHead onClick={() => handleSort("totalHours")}>
                Total Hours
              </TableHead>
              <TableHead>Situation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((row, index) => {
              const situation = determineSituation(
                row.part1EndTime,
                row.lunchStartTime,
                row.lunchEndTime,
                row.part2EndTime
              );
              const totalHours = calculateTotalHours(
                row.part1StartTime,
                row.part2EndTime
              );

              return (
                <TableRow key={index}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.part1StartTime}</TableCell>
                  <TableCell>{row.part2EndTime}</TableCell>
                  <TableCell>{totalHours}</TableCell>
                  <TableCell>
                    <Tooltip label={getSituationTooltip(situation)}>
                      <span
                        className={`px-2 py-1 rounded ${getSituationStyle(
                          situation
                        )}`}
                      >
                        {situation}
                      </span>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

