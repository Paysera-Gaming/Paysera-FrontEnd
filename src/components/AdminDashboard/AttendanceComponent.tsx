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

  if (parseInt(hours) >= 9) {
    return "Leave";
  } else if (calculateTotalHours(part1EndTime, lunchEndTime).includes("h")) {
    return "Lunch";
  } else {
    return "On Job";
  }
};

// Function to determine the styling for situation
const getSituationStyle = (situation) => {
  switch (situation) {
    case "Leave":
      return "bg-red-500 text-white"; // Change color to red
    case "On Job":
      return "bg-green-500 text-white"; // Change color to green
    case "Lunch":
      return "bg-blue-500 text-white"; // Add case for lunch with blue color
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
    case "Lunch":
      return "Worker is on lunch break."; // Add tooltip for lunch
    default:
      return "Unknown situation.";
  }
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
    {
      name: "Davis, Carol",
      type: "Fixed",
      date: "2023-08-01",
      part1StartTime: "09:30 AM",
      part1EndTime: "01:30 PM",
      lunchStartTime: "01:30 PM",
      lunchEndTime: "02:30 PM",
      part2StartTime: "02:30 PM",
      part2EndTime: "06:30 PM",
    },
    {
      name: "Miller, Frank",
      type: "Flexible",
      date: "2023-08-01",
      part1StartTime: "07:00 AM",
      part1EndTime: "11:00 AM",
      lunchStartTime: "11:00 AM",
      lunchEndTime: "12:00 PM",
      part2StartTime: "12:00 PM",
      part2EndTime: "04:00 PM",
    },
    {
      name: "Wilson, Grace",
      type: "Open",
      date: "2023-08-01",
      part1StartTime: "10:00 AM",
      part1EndTime: "02:00 PM",
      lunchStartTime: "02:00 PM",
      lunchEndTime: "03:00 PM",
      part2StartTime: "03:00 PM",
      part2EndTime: "07:00 PM",
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
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        if (dateA < dateB) return direction === "ascending" ? -1 : 1;
        if (dateA > dateB) return direction === "ascending" ? 1 : -1;
        return 0;
      } else {
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
      }
    });

    setData(sortedData);
  };

  const filteredData = data
    .filter((row) => {
      const searchMatch =
        row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.type.toLowerCase().includes(searchQuery.toLowerCase());
      const typeMatch = filterType ? row.type === filterType : true;
      const situation = determineSituation(
        row.part1EndTime,
        row.lunchStartTime,
        row.lunchEndTime,
        row.part2EndTime
      );
      const situationMatch = filterSituation ? situation === filterSituation : true;
      return searchMatch && typeMatch && situationMatch;
    })
    .map((row, index) => {
      const situation = determineSituation(
        row.part1EndTime,
        row.lunchStartTime,
        row.lunchEndTime,
        row.part2EndTime
      );

      return (
        <TableRow key={index}>
          <TableCell className="font-medium">{row.name}</TableCell>
          <TableCell>{row.type}</TableCell>
          <TableCell>{row.date}</TableCell>
          <TableCell>{row.part1StartTime}</TableCell>
          {isMinimized ? null : (
            <>
              <TableCell>{row.part1EndTime}</TableCell>
              <TableCell>{row.lunchStartTime}</TableCell>
              <TableCell>{row.lunchEndTime}</TableCell>
              <TableCell>{row.part2StartTime}</TableCell>
            </>
          )}
          <TableCell>{row.part2EndTime}</TableCell>
          <TableCell>{calculateTotalHours(row.part1StartTime, row.part2EndTime)}</TableCell>
          <TableCell>
            <Tooltip label={getSituationTooltip(situation)} placement="top">
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${getSituationStyle(situation)}`}>
                {situation}
              </span>
            </Tooltip>
          </TableCell>
        </TableRow>
      );
    });

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleFilterSituationChange = (e) => {
    setFilterSituation(e.target.value);
  };

  const handleMinimizeClick = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <input
          type="text"
          placeholder="Search by name or type"
          value={searchQuery}
          onChange={handleSearch}
          className="mr-2 rounded-md border p-2"
        />
        <select
          value={filterType}
          onChange={handleFilterTypeChange}
          className="mr-2 rounded-md border p-2"
        >
          <option value="">Filter by Type</option>
          <option value="Fixed">Fixed</option>
          <option value="Flexible">Flexible</option>
          <option value="Open">Open</option>
        </select>
        <select
          value={filterSituation}
          onChange={handleFilterSituationChange}
          className="mr-2 rounded-md border p-2"
        >
          <option value="">Filter by Situation</option>
          <option value="On Job">On Job</option>
          <option value="Lunch">Lunch</option>
          <option value="Leave">Leave</option>
        </select>
        <button
          onClick={handleMinimizeClick}
          className="ml-2 rounded-md bg-blue-500 p-2 text-white"
        >
          {isMinimized ? "Maximize" : "Minimize"}
        </button>
      </div>

      <Table className="min-w-full border">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => handleSort("name")}>Name</TableHead>
            <TableHead onClick={() => handleSort("type")}>Type</TableHead>
            <TableHead onClick={() => handleSort("date")}>Date</TableHead>
            <TableHead onClick={() => handleSort("part1StartTime")}>
              Part 1 Start Time
            </TableHead>
            {isMinimized ? null : (
              <>
                <TableHead onClick={() => handleSort("part1EndTime")}>
                  Part 1 End Time
                </TableHead>
                <TableHead onClick={() => handleSort("lunchStartTime")}>
                  Lunch Start Time
                </TableHead>
                <TableHead onClick={() => handleSort("lunchEndTime")}>
                  Lunch End Time
                </TableHead>
                <TableHead onClick={() => handleSort("part2StartTime")}>
                  Part 2 Start Time
                </TableHead>
              </>
            )}
            <TableHead onClick={() => handleSort("part2EndTime")}>
              Part 2 End Time
            </TableHead>
            <TableHead>Total Hours</TableHead>
            <TableHead>Situation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{filteredData}</TableBody>
      </Table>
    </div>
  );
}
