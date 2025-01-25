import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Activity } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { getAttendanceList } from "@/components/SuperAdminComponents/AttendanceSuperAdmin/api"
import { getEmployeeList } from "@/components/SuperAdminComponents/EmployeeSuperAdmin/api"
import type { Attendance } from "@/components/SuperAdminComponents/AttendanceSuperAdmin/types"
import type { Employee } from "@/components/SuperAdminComponents/EmployeeSuperAdmin/types"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"

function RecentActivitiesTable({ tableData }: { tableData: Attendance[] }) {
  const sortedData = tableData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const renderedList = sortedData.map((data) => {
    const parsedDate = new Date(data.date)
    const formattedDate = parsedDate.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })
    const formattedTime = parsedDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    return (
      <TableRow key={data.id}>
        <TableCell>{data.employee.username}</TableCell>
        <TableCell>{formattedDate}</TableCell>
        <TableCell>{formattedTime}</TableCell>
        <TableCell>{data.timeTotal} hours</TableCell>
      </TableRow>
    )
  })

  return (
    <Table className="text-base">
      <TableHeader>
        <TableRow>
          <TableHead>Username</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Total Hours</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{renderedList}</TableBody>
    </Table>
  )
}

function EmployeeListTable({ tableData }: { tableData: Employee[] }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAccessLevel, setSelectedAccessLevel] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")

  const filteredData = tableData.filter(
    (employee) =>
      employee.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedAccessLevel ? employee.accessLevel === selectedAccessLevel : true) &&
      (selectedStatus ? (selectedStatus === "Online" ? employee.isActive : !employee.isActive) : true),
  )

  const sortedData = filteredData.sort((a, b) => b.id - a.id)

  const renderedList = sortedData.map((employee) => (
    <TableRow key={employee.id}>
      <TableCell>{employee.username}</TableCell>
      <TableCell>{employee.accessLevel}</TableCell>
      <TableCell>
        <div className="flex items-center space-x-1">
          <div className={`w-2 h-2 rounded-full ${employee.isActive ? "bg-green-600" : "bg-red-600"}`}></div>
          <span>{employee.isActive ? "Online" : "Offline"}</span>
        </div>
      </TableCell>
    </TableRow>
  ))

  return (
    <>
      <div className="flex mb-4 space-x-2">
        <Input
          type="text"
          placeholder="Search by username"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="p-2 text-base w-48">
              Access Level
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64">
            <DropdownMenuItem onSelect={() => setSelectedAccessLevel("")}>All</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setSelectedAccessLevel("SUPER_ADMIN")}>Super Admin</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setSelectedAccessLevel("ADMIN")}>Admin</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setSelectedAccessLevel("TEAM_LEADER")}>Team Leader</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setSelectedAccessLevel("EMPLOYEE")}>Employee</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="p-2 text-base w-48">
              Status
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64">
            <DropdownMenuItem onSelect={() => setSelectedStatus("")}>All</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setSelectedStatus("Online")}>Online</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setSelectedStatus("Offline")}>Offline</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Table className="text-base">
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Access Level</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{renderedList}</TableBody>
      </Table>
    </>
  )
}

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
  const [selectedOption, setSelectedOption] = useState("Employee")
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

  if (isLoadingAttendance || isLoadingEmployee) return <SkeletonCard />

  const handleRetry = () => {
    if (attendanceError) refetchAttendance()
    if (employeeError) refetchEmployee()
  }

  if (attendanceError || employeeError) {
    return (
      <Card className="flex-1 col-span-2 p-3">
        <CardHeader className="flex flex-col md:flex-row items-center justify-between relative">
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

  const handleDropdownChange = (value: string) => {
    setSelectedOption(value)
  }

  const title = selectedOption === "Paid Leave" ? "Paid Leave Record" : "Employee Record"

  return (
    <Card className={`flex-1 col-span-2 p-4 ${className}`}>
      <CardHeader className="flex flex-col md:flex-row items-center justify-between relative">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <Activity size={"1.8rem"} className="absolute top-2 right-2" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="mt-2 md:mt-0 p-2 text-base w-48">
              Select Option
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64">
            <DropdownMenuItem onSelect={() => handleDropdownChange("Paid Leave")}>Paid Leave</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleDropdownChange("Employee")}>Employee</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="mt-3">
        <ScrollArea className="h-[300px]">
          {selectedOption === "Paid Leave" ? (
            <RecentActivitiesTable tableData={paidLeaveData} />
          ) : (
            employeeData && <EmployeeListTable tableData={employeeData} />
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

