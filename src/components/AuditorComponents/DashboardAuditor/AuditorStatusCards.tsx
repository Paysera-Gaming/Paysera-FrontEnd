import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { fetchEmployees } from "@/utils/fetchEmployees";
import { fetchDepartments } from "@/components/AuditorComponents/DepartmentAuditor/api";
import { getAttendanceList } from "@/components/AuditorComponents/AttendanceAuditor/api";
import type { Employee } from "@/components/AuditorComponents/EmployeeAuditor/types";
import type { Department } from "@/components/AuditorComponents/DepartmentAuditor/api";
import type { Attendance } from "@/components/AuditorComponents/AttendanceAuditor/types";
import { Building } from "lucide-react";
import EmployeeListDialog from "./EmployeeListDialog";
import { useUserStore } from '@/stores/userStore'; // Import the user store

type EmployeesStatusCardsProps = {
  className?: string;
};

export default function EmployeesStatusCards({
  className,
}: EmployeesStatusCardsProps) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [attendanceData, setAttendanceData] = useState<Attendance[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState<string>("");

  const user = useUserStore.getState().getUser(); // Get the logged-in user
  const departmentId = user?.departmentId; // Get the department ID of the logged-in user

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeeData = await fetchEmployees();
        setEmployees(employeeData.filter(emp => emp.departmentId === departmentId));

        const departmentData = await fetchDepartments();
        setDepartments(departmentData);

        if (departmentId) {
          const attendanceData = await getAttendanceList(departmentId);
          setAttendanceData(attendanceData);
        } else {
          console.error("Invalid department ID");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (departmentId) {
      fetchData();
    }
  }, [departmentId]);

  const totalEmployees = employees.length;
  const totalDepartments = departments.length;
  const onlineCount = attendanceData.filter(
    (attendance) => attendance.status === "ONGOING"
  ).length;
  const offlineCount = totalEmployees - onlineCount;

  const handleDialogOpen = (title: string) => {
    setDialogTitle(title);
    setIsDialogOpen(true);
  };

  return (
    <>
      <Card className={`col-span-1 relative p-4 ${className}`}>
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-semibold">
            Paysera Status
          </CardTitle>
          <Building size={"1.8rem"} />
        </CardHeader>
        <CardContent className="flex flex-col space-y-2 mt-2">
          <div
            className="flex items-center space-x-1 cursor-pointer"
            onClick={() => handleDialogOpen("Total Employees")}
          >
            <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
            <p className="text-x2">Total Employees: {totalEmployees}</p>
          </div>
          <div
            className="flex items-center space-x-1 cursor-pointer"
            onClick={() => handleDialogOpen("Total Departments")}
          >
            <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
            <p className="text-x2">Total Departments: {totalDepartments}</p>
          </div>
          <div className="flex justify-between space-x-1">
            <div
              className="flex items-center space-x-1 cursor-pointer"
              onClick={() => handleDialogOpen("Online Employees")}
            >
              <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              <p className="text-x2">Online: {onlineCount}</p>
            </div>
            <div
              className="flex items-center space-x-1 cursor-pointer"
              onClick={() => handleDialogOpen("Offline Employees")}
            >
              <div className="w-3 h-3 bg-red-600 rounded-full"></div>
              <p className="text-x2">Offline: {offlineCount}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <EmployeeListDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        employees={employees}
        title={dialogTitle}
      />
    </>
  );
}