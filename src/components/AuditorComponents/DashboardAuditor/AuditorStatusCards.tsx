import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { fetchEmployees } from "@/utils/fetchEmployees";
import type { Employee } from "@/components/AuditorComponents/EmployeeAuditor/types";
import { Building } from "lucide-react";
import EmployeeListDialog from "./EmployeeListDialog";
import { useUserStore } from "@/stores/userStore"; // Import the user store
import { getDepartmentDetails } from "@/components/AuditorComponents/EmployeeAuditor/api";

type EmployeesStatusCardsProps = {
  className?: string;
};

export default function EmployeesStatusCards({
  className,
}: EmployeesStatusCardsProps) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState<string>("");
  const [departmentName, setDepartmentName] = useState<string>("Unknown Department");

  const user = useUserStore.getState().getUser(); // Get the logged-in user
  const departmentId = user?.departmentId; // Get the department ID of the logged-in user

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeeData = await fetchEmployees();
        setEmployees(employeeData.filter((emp) => emp.departmentId === departmentId));

        // Fetch department details to get the department name
        if (departmentId) {
          const department = await getDepartmentDetails(departmentId);
          setDepartmentName(department?.name || "Unknown Department");
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
  const onlineCount = employees.filter((emp) => emp.attendanceStatus === "ONGOING").length;
  const offlineCount = totalEmployees - onlineCount;

  const handleDialogOpen = (type: "Total Employees" | "Online Employees" | "Offline Employees") => {
    setDialogTitle(`${type} in ${departmentName}`); // Set the dialog title with department name
    setIsDialogOpen(true);
  };

  return (
    <>
      <Card className={`col-span-1 relative p-4 ${className}`}>
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-semibold">Department Status</CardTitle>
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