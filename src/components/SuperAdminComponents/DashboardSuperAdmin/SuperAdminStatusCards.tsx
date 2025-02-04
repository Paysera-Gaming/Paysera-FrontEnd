import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { fetchEmployees } from "@/utils/fetchEmployees";
import { fetchDepartments } from "@/components/SuperAdminComponents/DepartmentSuperAdmin/api";
import type { Employee } from "@/components/SuperAdminComponents/EmployeeSuperAdmin/types";
import type { Department } from "@/components/SuperAdminComponents/DepartmentSuperAdmin/api";
import { Building } from "lucide-react";
import EmployeeListDialog from "./EmployeeListDialog";

type EmployeesStatusCardsProps = {
  className?: string;
};

export default function EmployeesStatusCards({ className }: EmployeesStatusCardsProps) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeeData = await fetchEmployees();
        setEmployees(employeeData);

        const departmentData = await fetchDepartments();
        setDepartments(departmentData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const totalEmployees = employees.length;
  const totalDepartments = departments.length;
  const onlineCount = employees.filter((emp: Employee) => emp.isActive).length;
  const offlineCount = totalEmployees - onlineCount;

  const handleDialogOpen = (title: string) => {
    setDialogTitle(title);
    setIsDialogOpen(true);
  };

  return (
    <>
      <Card className={`col-span-1 relative p-4 ${className}`}>
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-semibold">Paysera Status</CardTitle>
          <Building size={"1.8rem"} />
        </CardHeader>
        <CardContent className="flex flex-col space-y-2 mt-2">
          <div className="flex items-center space-x-1 cursor-pointer" onClick={() => handleDialogOpen('Total Employees')}>
            <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
            <p className="text-x2">Total Employees: {totalEmployees}</p>
          </div>
          <div className="flex items-center space-x-1 cursor-pointer" onClick={() => handleDialogOpen('Total Departments')}>
            <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
            <p className="text-x2">Total Departments: {totalDepartments}</p>
          </div>
          <div className="flex justify-between space-x-1">
            <div className="flex items-center space-x-1 cursor-pointer" onClick={() => handleDialogOpen('Online Employees')}>
              <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              <p className="text-x2">Online: {onlineCount}</p>
            </div>
            <div className="flex items-center space-x-1 cursor-pointer" onClick={() => handleDialogOpen('Offline Employees')}>
              <div className="w-3 h-3 bg-red-600 rounded-full"></div>
              <p className="text-x2">Offline: {offlineCount}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <EmployeeListDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} employees={employees} title={dialogTitle} />
    </>
  );
}