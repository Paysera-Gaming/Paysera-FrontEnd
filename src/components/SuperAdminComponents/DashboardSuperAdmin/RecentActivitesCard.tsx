import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useQuery } from "@tanstack/react-query"
import { getAttendanceList } from "@/components/SuperAdminComponents/AttendanceSuperAdmin/api"
import { getEmployeeList } from "@/components/SuperAdminComponents/EmployeeSuperAdmin/api"
import { fetchDepartments } from "@/components/SuperAdminComponents/DepartmentSuperAdmin/api"
import type { Attendance } from "@/components/SuperAdminComponents/AttendanceSuperAdmin/types"
import type { Employee } from "@/components/SuperAdminComponents/EmployeeSuperAdmin/types"
import type { Department } from "@/components/SuperAdminComponents/DepartmentSuperAdmin/api"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Activity } from "lucide-react"
import RecentActivitiesTable from "./RecentActivitiesTable"
import EmployeeListTable from "./EmployeeListTable"
import DepartmentListTable from "./DepartmentListTable"

const SkeletonCard: React.FC = () => {
  return (
    <Card className="flex-1 col-span-2 p-3">
      <CardHeader className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-6 w-32 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
        <Skeleton className="h-8 w-24 rounded bg-gray-200 dark:bg-gray-700 mt-2 md:mt-0" />
      </CardHeader>
      <CardContent className="mt-3">
        <ScrollArea className="h-[180px]">
          <div className="space-y-2">
            <Skeleton className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

interface RecentActivitiesCardProps {
  className?: string
}

export default function RecentActivitiesCard({ className }: RecentActivitiesCardProps) {
  const [selectedOption, setSelectedOption] = useState("Overtime")
  const {
    data: attendanceData,
    isLoading: isLoadingAttendance,
    error: attendanceError,
    refetch: refetchAttendance,
  } = useQuery<Attendance[]>({
    queryKey: ["attendanceData"],
    queryFn: getAttendanceList,
  })

  const {
    data: employeeData,
    isLoading: isLoadingEmployee,
    error: employeeError,
    refetch: refetchEmployee,
  } = useQuery<Employee[]>({
    queryKey: ["employeeData"],
    queryFn: getEmployeeList,
  })

  const {
    data: departmentData,
    isLoading: isLoadingDepartment,
    error: departmentError,
    refetch: refetchDepartment,
  } = useQuery<Department[]>({
    queryKey: ["departmentData"],
    queryFn: fetchDepartments,
  })

  if (isLoadingAttendance || isLoadingEmployee || isLoadingDepartment) return <SkeletonCard />

  const handleRetry = () => {
    if (attendanceError) refetchAttendance()
    if (employeeError) refetchEmployee()
    if (departmentError) refetchDepartment()
  }

  if (attendanceError || employeeError || departmentError) {
    return (
      <Card className="flex-1 col-span-2 p-3">
        <CardHeader className="flex flex-row items-center justify-between relative">
          <CardTitle className="text-base font-semibold">Error</CardTitle>
          <Activity size={"1.8rem"} className="absolute top-2 right-2" />
        </CardHeader>
        <CardContent className="mt-3">
          <div className="text-center">
            <p className="text-red-500">Failed to load data. Please try again.</p>
            <Button onClick={handleRetry} className="mt-3">
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const paidLeaveData = Array.isArray(attendanceData)
    ? attendanceData.filter((attendance: Attendance) => attendance.status === "PAID_LEAVE")
    : []

  const overtimeData = Array.isArray(attendanceData)
    ? attendanceData.filter((attendance: Attendance) => attendance.status === "OVERTIME")
    : []

  const handleDropdownChange = (value: string) => {
    setSelectedOption(value)
  }

  const subtitle =
    selectedOption === "Paid Leave"
      ? "Paid Leave Record"
      : selectedOption === "Department"
      ? "Department Record"
      : selectedOption === "Overtime"
      ? "Overtime Record"
      : "Employee Record"

  return (
    <Card className={`flex-1 col-span-2 p-4 ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between relative">
        <div>
          <CardTitle className="text-2xl font-semibold">Recent Activity</CardTitle>
          <p className="text-lg font-medium">{subtitle}</p>
        </div>
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="p-2 text-base w-32">
                Select Option
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64">
              <DropdownMenuItem onSelect={() => handleDropdownChange("Paid Leave")}>Paid Leave</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleDropdownChange("Employee")}>Employee</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleDropdownChange("Department")}>Department</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleDropdownChange("Overtime")}>Overtime</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Activity size={"1.8rem"} />
        </div>
      </CardHeader>
      <CardContent className="mt-3">
        <ScrollArea className="h-[500px]">
          {selectedOption === "Paid Leave" ? (
            <RecentActivitiesTable tableData={paidLeaveData} />
          ) : selectedOption === "Department" ? (
            departmentData && <DepartmentListTable tableData={departmentData} />
          ) : selectedOption === "Overtime" ? (
            <RecentActivitiesTable tableData={overtimeData} />
          ) : (
            employeeData && <EmployeeListTable tableData={employeeData} />
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}