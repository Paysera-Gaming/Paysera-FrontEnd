import React, { useState } from "react";
import { Filters } from "./Filters";
import { AttendanceTable } from "./AttendanceTable";

interface AttendanceData {
  name: string;
  type: string;
  date: string;
  part1StartTime: string;
  part1EndTime: string;
  lunchStartTime: string;
  lunchEndTime: string;
  part2EndTime: string;
}

export const AttendanceComponent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterSituation, setFilterSituation] = useState("");
  const [attendanceData] = useState<AttendanceData[]>([
    {
      name: "John Doe",
      type: "Fixed",
      date: "2024-08-27",
      part1StartTime: "08:00",
      part1EndTime: "12:00",
      lunchStartTime: "12:00",
      lunchEndTime: "13:00",
      part2EndTime: "17:00",
    },
    // Add more data as required
  ]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value);
  };

  const handleFilterSituationChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilterSituation(e.target.value);
  };

  const filteredData = attendanceData.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = filterType ? item.type === filterType : true;

    // Situation filtering logic might depend on additional conditions
    // Assuming filterSituation logic here matches how it's defined/used
    const matchesSituation = filterSituation
      ? item.type === filterSituation
      : true;

    return matchesSearch && matchesType && matchesSituation;
  });

  return (
    <div>
      <Filters
        searchQuery={searchQuery}
        filterType={filterType}
        filterSituation={filterSituation}
        handleSearch={handleSearch}
        handleFilterTypeChange={handleFilterTypeChange}
        handleFilterSituationChange={handleFilterSituationChange} handleExportToExcel={function (): void {
          throw new Error("Function not implemented.");
        } }      />
      {/* Pass `filteredData` as a prop to `AttendanceTable` */}
      <AttendanceTable filteredData={filteredData} />
    </div>
  );
};
