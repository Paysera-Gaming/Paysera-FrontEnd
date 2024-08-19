// AttendanceComponent/Filters.tsx
import React from "react";
import { CalendarComponent } from "@/components/AdminDashboard/CalendarComponent";

interface FiltersProps {
  searchQuery: string;
  filterType: string;
  filterSituation: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFilterTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleFilterSituationChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Filters: React.FC<FiltersProps> = ({
  searchQuery,
  filterType,
  filterSituation,
  handleSearch,
  handleFilterTypeChange,
  handleFilterSituationChange
}) => (
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
);