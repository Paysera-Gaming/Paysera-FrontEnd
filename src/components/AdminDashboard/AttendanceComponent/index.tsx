// AttendanceComponent/index.tsx
import React, { useState } from "react";
import { Filters } from "./Filters";
import { Summary } from "./Summary";
import { AttendanceTable } from "./AttendanceTable";
import { determineSituation } from "./helpers";

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

export function AttendanceComponent() {
  const [data, setData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterSituation, setFilterSituation] = useState("");

  // Handle search and filter logic
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value);
  };

  const handleFilterSituationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
    const matchesSituation = filterSituation ? situation === filterSituation : true;

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
      <Filters
        searchQuery={searchQuery}
        filterType={filterType}
        filterSituation={filterSituation}
        handleSearch={handleSearch}
        handleFilterTypeChange={handleFilterTypeChange}
        handleFilterSituationChange={handleFilterSituationChange}
      />
      <Summary situationCounts={situationCounts} />
      <AttendanceTable filteredData={filteredData} />
    </div>
  );
}
