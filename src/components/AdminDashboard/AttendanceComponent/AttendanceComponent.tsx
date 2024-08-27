import React, { useState } from "react";
import { Filters } from "@/components/AdminDashboard/Filters";
import { AttendanceTable } from "@/components/AdminDashboard/AttendanceTable";
import * as XLSX from "xlsx"; // For Excel export

interface AttendanceData {
  id: number;
  name: string;
  type: string;
  situation: string;
  date: string;
}

export const AttendanceComponent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterSituation, setFilterSituation] = useState("");
  const [attendanceData, setAttendanceData] = useState<AttendanceData[]>([
    {
      id: 1,
      name: "John Doe",
      type: "Fixed",
      situation: "On Job",
      date: "2024-08-27",
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

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(attendanceData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "AttendanceData");
    XLSX.writeFile(workbook, "AttendanceData.xlsx");
  };

  const filteredData = attendanceData.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = filterType ? item.type === filterType : true;
    const matchesSituation = filterSituation
      ? item.situation === filterSituation
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
        handleFilterSituationChange={handleFilterSituationChange}
        handleExportToExcel={handleExportToExcel}
      />
      <AttendanceTable data={filteredData} />
    </div>
  );
};
