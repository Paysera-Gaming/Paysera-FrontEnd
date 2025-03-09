import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import SearchBar from "./SearchBar";
import SummaryCards from "./SummaryCards";
import EmployeeTable from "./EmployeeTable";
import EmployeeForm from "./EmployeeForm";
import EmployeeEdit from "./EmployeeEdit";
import { Employee, EmployeeCounts, getEmployeeCounts } from "./types"; // Import the shared Employee type and getEmployeeCounts function
import { axiosInstance } from "@/api";

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

const fetchEmployees = async (): Promise<Employee[]> => {
  const response = await axiosInstance.get("/api/employee");
  return response.data;
};

const fetchAttendance = async (): Promise<Attendance[]> => {
  const response = await axiosInstance.get("/api/attendance");
  return response.data;
};

const EmployeeList: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: employees = [], error } = useQuery<Employee[], Error>({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("overall");
  const [accessLevel, setAccessLevel] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
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

  useEffect(() => {
    const teamLeadersWithoutDepartment = employees.filter(
      (emp) => emp.accessLevel === "TEAM_LEADER" && emp.departmentId === null
    );
    const auditorsWithoutDepartment = employees.filter(
      (emp) => emp.accessLevel === "AUDITOR" && emp.departmentId === null
    );

    console.log("Team Leaders without a department:", teamLeadersWithoutDepartment);
    console.log("Auditors without a department:", auditorsWithoutDepartment);
  }, [employees]);

  const addEmployeeMutation = useMutation({
    mutationFn: (newEmployee: Employee) =>
      axiosInstance.post("/api/employee", {
        ...newEmployee,
        middleName: newEmployee.middleName || "", // Handle optional middle name
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  const editEmployeeMutation = useMutation({
    mutationFn: (updatedEmployee: Employee) =>
      axiosInstance.put(`/api/employee/${updatedEmployee.id}`, {
        ...updatedEmployee,
        middleName: updatedEmployee.middleName || "", // Handle optional middle name
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleFormSubmit = (newEmployee: Employee) => {
    addEmployeeMutation.mutate(newEmployee);
    setIsFormOpen(false);
  };

  const handleEditSubmit = (values: {
    accessLevel?:
      | "EMPLOYEE"
      | "TEAM_LEADER"
      | "ADMIN"
      | "AUDITOR"
      | "SUPER_AUDITOR";
    username?: string;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    isAllowedRequestOvertime?: boolean;
  }) => {
    if (selectedEmployee) {
      const updatedEmployee: Employee = {
        ...selectedEmployee,
        ...values,
      };
      editEmployeeMutation.mutate(updatedEmployee);
      setIsEditOpen(false);
      setSelectedEmployee(null);
    }
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
      <EmployeeForm
        onSubmit={handleFormSubmit}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
      {selectedEmployee && (
        <EmployeeEdit
          onSubmit={handleEditSubmit}
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          employee={selectedEmployee}
        />
      )}
    </div>
  );
};

export default EmployeeList;