import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Tooltip } from "@chakra-ui/react";
import { UserIcon, ClockIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import { CalendarComponent } from "@/components/AdminDashboard/CalendarComponent";

// Function to calculate total hours between two times
const calculateTotalHours = (startTime: string, endTime: string): number => {
  const start = new Date(`1970-01-01T${startTime}Z`);
  const end = new Date(`1970-01-01T${endTime}Z`);
  return (end.getTime() - start.getTime()) / (1000 * 60 * 60);
};

// Function to determine the situation based on the timings
const determineSituation = (
  part1EndTime: string,
  lunchStartTime: string,
  lunchEndTime: string,
  part2EndTime: string
): string => {
  const now = new Date().getHours();
  const lunchStart = parseInt(lunchStartTime.split(":")[0]);
  const lunchEnd = parseInt(lunchEndTime.split(":")[0]);
  const part1End = parseInt(part1EndTime.split(":")[0]);
  const part2End = parseInt(part2EndTime.split(":")[0]);

  if (now >= lunchStart && now < lunchEnd) return "Lunch";
  if (now >= part1End && now < part2End) return "On Job";
  return "Leave";
};

// Function to get the style for the situation badge
const getSituationStyle = (situation: string): string => {
  switch (situation) {
    case "On Job":
      return "bg-green-100 text-green-800";
    case "Lunch":
      return "bg-blue-100 text-blue-800";
    case "Leave":
      return "bg-red-100 text-red-800";
    default:
      return "";
  }
};

// Function to get the tooltip text for the situation badge
const getSituationTooltip = (situation: string): string => {
  switch (situation) {
    case "On Job":
      return "Employee is currently working.";
    case "Lunch":
      return "Employee is on lunch break.";
    case "Leave":
      return "Employee is on leave.";
    default:
      return "";
  }
};

// Example initial data
const initialData = [
  {
    name: "John Doe",
    type: "Fixed",
    date: "2024-08-17",
    part1StartTime: "09:00",
    part1EndTime: "12:00",
    lunchStartTime: "12:00",
    lunchEndTime: "13:00",
    part2EndTime: "18:00",
  },
  {
    name: "Jane Smith",
    type: "Flexible",
    date: "2024-08-17",
    part1StartTime: "08:00",
    part1EndTime: "11:00",
    lunchStartTime: "11:00",
    lunchEndTime: "12:00",
    part2EndTime: "17:00",
  },
  // Add more data as needed
];

export function TableComponent() {
  const [data, setData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterSituation, setFilterSituation] = useState("");

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle type filter change
  const handleFilterTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value);
  };

  // Handle situation filter change
  const handleFilterSituationChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilterSituation(e.target.value);
  };

  // Filter data based on search and filter criteria
  const filteredData = data.filter((row) => {
    const matchesSearch =
      row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType ? row.type === filterType : true;
    const situation = determineSituation(
      row.part1EndTime,
      row.lunchStartTime,
      row.lunchEndTime,
      row.part2EndTime
    );
    const matchesSituation = filterSituation
      ? situation === filterSituation
      : true;

    return matchesSearch && matchesType && matchesSituation;
  });

  // Calculate the situation counts for the summary section
  const situationCounts = {
    "On Job": filteredData.filter(
      (row) =>
        determineSituation(
          row.part1EndTime,
          row.lunchStartTime,
          row.lunchEndTime,
          row.part2EndTime
        ) === "On Job"
    ).length,
    "Lunch": filteredData.filter(
      (row) =>
        determineSituation(
          row.part1EndTime,
          row.lunchStartTime,
          row.lunchEndTime,
          row.part2EndTime
        ) === "Lunch"
    ).length,
    "Leave": filteredData.filter(
      (row) =>
        determineSituation(
          row.part1EndTime,
          row.lunchStartTime,
          row.lunchEndTime,
          row.part2EndTime
        ) === "Leave"
    ).length,
  };

  return (
    <div className="p-4">
      {/* Filters and Search */}
      <div className="mb-4 flex items-center">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by Name or Type"
          className="mr-2 rounded-md border p-2 text-sm"
        />
        <select
          value={filterType}
          onChange={handleFilterTypeChange}
          className="mr-2 rounded-md border p-2 text-sm"
        >
          <option value="">Filter by Type</option>
          <option value="Fixed">Fixed</option>
          <option value="Flexible">Flexible</option>
          <option value="Super Flexible">Super Flexible</option>
        </select>
        <select
          value={filterSituation}
          onChange={handleFilterSituationChange}
          className="mr-2 rounded-md border p-2 text-sm"
        >
          <option value="">Filter by Situation</option>
          <option value="On Job">On Job</option>
          <option value="Lunch">Lunch</option>
          <option value="Leave">Leave</option>
        </select>
        <div className="ml-2">
          <CalendarComponent />
        </div>
      </div>

      {/* Summary Section */}
      <div className="mb-4 grid grid-cols-3 gap-2">
        <div className="p-2 bg-green-100 border border-green-300 rounded shadow-sm text-center">
          <div className="flex items-center justify-center mb-1">
            <UserIcon className="w-6 h-6 text-green-600" />
            <p className="text-4xl font-bold ml-2">{situationCounts["On Job"]}</p>
          </div>
          <p className="text-lg font-medium text-green-600">On Job</p>
        </div>
        <div className="p-2 bg-blue-100 border border-blue-300 rounded shadow-sm text-center">
          <div className="flex items-center justify-center mb-1">
            <ClockIcon className="w-6 h-6 text-blue-600" />
            <p className="text-4xl font-bold ml-2">{situationCounts["Lunch"]}</p>
          </div>
          <p className="text-lg font-medium text-blue-600">Lunch</p>
        </div>
        <div className="p-2 bg-red-100 border border-red-300 rounded shadow-sm text-center">
          <div className="flex items-center justify-center mb-1">
            <ShieldCheckIcon className="w-6 h-6 text-red-600" />
            <p className="text-4xl font-bold ml-2">{situationCounts["Leave"]}</p>
          </div>
          <p className="text-lg font-medium text-red-600">Leave</p>
        </div>
      </div>

      {/* Table */}
      <Table className="min-w-full border">
        <thead>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>End Time</TableHead>
            <TableHead>Total Work Hours</TableHead>
            <TableHead>Total Lunch Hours</TableHead>
            <TableHead>Total Hours</TableHead>
            <TableHead>Situation</TableHead>
          </TableRow>
        </thead>
        <TableBody>
          {filteredData.map((row, index) => {
            const totalWorkHours =
              calculateTotalHours(row.part1StartTime, row.part1EndTime) +
              calculateTotalHours(row.lunchEndTime, row.part2EndTime);
            const totalLunchHours = calculateTotalHours(
              row.lunchStartTime,
              row.lunchEndTime
            );
            const totalHours = totalWorkHours + totalLunchHours;

            const situation = determineSituation(
              row.part1EndTime,
              row.lunchStartTime,
              row.lunchEndTime,
              row.part2EndTime
            );

            return (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.part1StartTime}</TableCell>
                <TableCell>{row.part2EndTime}</TableCell>
                <TableCell>{totalWorkHours.toFixed(2)} hours</TableCell>
                <TableCell>{totalLunchHours.toFixed(2)} hours</TableCell>
                <TableCell>{totalHours.toFixed(2)} hours</TableCell>
                <TableCell>
                  <Tooltip label={getSituationTooltip(situation)}>
                    <span
                      className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getSituationStyle(
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
    </div>
  );
}
