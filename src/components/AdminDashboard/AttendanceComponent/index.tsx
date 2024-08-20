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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value);
  };

  const handleFilterSituationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterSituation(e.target.value);
  };

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

  const calculateSituationCounts = () => {
    const situationCounts = {
      "On Job": { Fixed: 0, Flexible: 0, SuperFlexible: 0 },
      "Lunch": { Fixed: 0, Flexible: 0, SuperFlexible: 0 },
      "Leave": { Fixed: 0, Flexible: 0, SuperFlexible: 0 },
    };

    filteredData.forEach((row) => {
      const situation = determineSituation(
        row.part1EndTime,
        row.lunchStartTime,
        row.lunchEndTime,
        row.part2EndTime
      );

      if (row.type === "Fixed") situationCounts[situation].Fixed += 1;
      else if (row.type === "Flexible") situationCounts[situation].Flexible += 1;
      else if (row.type === "Super Flexible") situationCounts[situation].SuperFlexible += 1;
    });

    return situationCounts;
  };

  const situationCounts = calculateSituationCounts();

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
