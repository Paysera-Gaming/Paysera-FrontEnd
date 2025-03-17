import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import SearchBar from "./SearchBar";
import SummaryCards from "./SummaryCards";
import EmployeeTable from "./EmployeeTable";
import { Employee, EmployeeCounts, getEmployeeCounts } from "./types"; // Import the shared Employee type and getEmployeeCounts function
import { axiosInstance } from "@/api";
import { useUserStore } from "@/stores/userStore"; // Import the user store

interface Attendance {
  id: number;
  employeeId: number;
  date: string;
  status: string;
  scheduleType: string;
  timeIn: string;
  timeOut: string | null;
  timeHoursWorked: number;
  overTimeTotal: number;
  timeTotal: number;
  isAllowedOvertime: boolean;
  isRequestingOvertime: boolean;
  isRejectedOvertime: boolean;
  limitOvertime: number;
  lunchTimeTotal: number;
  createdAt: string;
  updatedAt: string;
  employee: {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    middleName: string;
    role: string;
    accessLevel: string;
    isActive: boolean;
  };
}

const fetchEmployees = async (departmentId: number): Promise<Employee[]> => {
  const response = await axiosInstance.get(`/api/employee`);
  const employees: Employee[] = response.data;

  // Filter employees by department and include only employees, team leaders, and auditors
  return employees.filter(
    (emp) =>
      emp.departmentId === departmentId &&
      (emp.accessLevel === "EMPLOYEE" ||
        emp.accessLevel === "TEAM_LEADER" ||
        emp.accessLevel === "AUDITOR")
  );
};

const fetchAttendance = async (): Promise<Attendance[]> => {
  try {
    const response = await axiosInstance.get("/api/attendance");
    return response.data;
  } catch (error) {
    console.error("Error fetching attendance data:", error);
    return [];
  }
};

const EmployeeList: React.FC = () => {
  const user = useUserStore.getState().getUser(); // Get the logged-in user
  const departmentId = user?.departmentId; // Get the department ID of the logged-in user

  const { data: employees = [], error } = useQuery<Employee[], Error>({
    queryKey: ["employees", departmentId],
    queryFn: () => fetchEmployees(departmentId!), // Pass the departmentId to fetchEmployees
    enabled: !!departmentId, // Only fetch if departmentId exists
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("overall");
  const [accessLevel, setAccessLevel] = useState("");
  const [attendanceData, setAttendanceData] = useState<Attendance[]>([]);

  useEffect(() => {
    const fetchAndSetAttendance = async () => {
      try {
        const data = await fetchAttendance();
        setAttendanceData(data);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

    fetchAndSetAttendance();
  }, []);

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  const employeesWithAttendanceStatus = employees.map((emp) => {
    const attendance = attendanceData.find((att) => att.employeeId === emp.id);
    return {
      ...emp,
      attendanceStatus: attendance ? attendance.status : "DONE",
    };
  });

  const filteredEmployees = employeesWithAttendanceStatus
    .filter((emp: Employee) => {
      if (activeFilter === "online") {
        return emp.attendanceStatus === "ONGOING";
      } else if (activeFilter === "offline") {
        return emp.attendanceStatus !== "ONGOING";
      }
      return true;
    })
    .filter(
      (emp: Employee) =>
        emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (emp.middleName &&
          emp.middleName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        emp.username.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((emp: Employee) => {
      if (accessLevel) {
        return emp.accessLevel === accessLevel;
      }
      return true;
    });

  const counts: EmployeeCounts = getEmployeeCounts(
    employeesWithAttendanceStatus
  );

  return (
    <div className="p-4 space-y-4">
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        accessLevel={accessLevel}
        setAccessLevel={setAccessLevel}
      />
      <SummaryCards
        counts={counts}
        activeFilter={activeFilter}
        handleFilterClick={handleFilterClick}
      />
      {error ? (
        <p>{error.message}</p>
      ) : filteredEmployees.length > 0 ? (
        <EmployeeTable employees={filteredEmployees} />
      ) : (
        <div className="text-center text-gray-500 dark:text-gray-400">
          {searchTerm
            ? `No results found for "${searchTerm}".`
            : `No ${
                activeFilter !== "overall" ? activeFilter : ""
              } employees found.`}
        </div>
      )}
    </div>
  );
};

export default EmployeeList;