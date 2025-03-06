import type React from "react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchDepartments, type Department } from "./api";
import DepartmentDetails from "./DepartmentDetails";
import SearchBar from "./SearchBar";
import DepartmentTable from "./DepartmentTable";

const DepartmentList: React.FC = () => {
  const { data: departments = [] } = useQuery<Department[]>({
    queryKey: ["departments"],
    queryFn: fetchDepartments,
  });

  const [viewingDepartment, setViewingDepartment] = useState<Department | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const departmentsPerPage = 10;

  const handleViewDepartment = (department: Department) => {
    setViewingDepartment(department);
  };

  const handleBackToList = () => {
    setViewingDepartment(null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredDepartments = departments.filter((department) => {
    const searchLower = searchQuery.toLowerCase();
    const departmentNameMatch = department.name.toLowerCase().includes(searchLower);
    const leaderMatch = department.Leader
      ? `${department.Leader.firstName} ${department.Leader.lastName}`.toLowerCase().includes(searchLower)
      : false;
    const membersMatch = department.Employees
      ? department.Employees.some((employee) =>
          `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchLower),
        )
      : false;
    return departmentNameMatch || leaderMatch || membersMatch;
  });

  const indexOfLastDepartment = currentPage * departmentsPerPage;
  const indexOfFirstDepartment = indexOfLastDepartment - departmentsPerPage;
  const currentDepartments = filteredDepartments.slice(indexOfFirstDepartment, indexOfLastDepartment);
  const totalPages = Math.ceil(filteredDepartments.length / departmentsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (viewingDepartment) {
    return <DepartmentDetails department={viewingDepartment} onBack={handleBackToList} />;
  }

  return (
    <div className="w-full py-4 dark:text-white">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center" style={{ width: "33%" }}>
          <SearchBar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
          <div className="text-gray-500 dark:text-gray-400 ml-4">{filteredDepartments.length} Departments</div>
        </div>
      </div>
      <DepartmentTable
        currentDepartments={currentDepartments}
        handleViewDepartment={handleViewDepartment}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default DepartmentList;