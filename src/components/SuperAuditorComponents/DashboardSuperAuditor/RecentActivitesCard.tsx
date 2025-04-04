"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useQuery } from "@tanstack/react-query"
import { getAttendanceList } from "@/components/SuperAdminComponents/AttendanceSuperAdmin/api"
import type { Attendance } from "@/components/SuperAdminComponents/AttendanceSuperAdmin/types"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Activity } from "lucide-react"
import RecentActivitiesTable from "./RecentActivitiesTable"
import OvertimeTable from "./OvertimeTable" // Import OvertimeTable
import LeaveStatusTable from "./LeaveStatusTable" // Import LeaveStatusTable

const SkeletonCard: React.FC = () => {
  return (
    <Card className="flex-1 col-span-2 p-2">
      <CardHeader className="flex flex-col md:flex-row items-center justify-between p-2">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-6 w-32 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
        <Skeleton className="h-8 w-24 rounded bg-gray-200 dark:bg-gray-700 mt-2 md:mt-0" />
      </CardHeader>
      <CardContent className="mt-2 p-2">
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
  const [selectedOption, setSelectedOption] = useState("Attendance")

  const {
    data: attendanceData,
    isLoading: isLoadingAttendance,
    error: attendanceError,
    refetch: refetchAttendance,
  } = useQuery<Attendance[]>({
    queryKey: ["attendanceData"],
    queryFn: getAttendanceList,
  })

  if (isLoadingAttendance) return <SkeletonCard />

  const handleRetry = () => {
    if (attendanceError) refetchAttendance()
  }

  if (attendanceError) {
    return (
      <Card className="flex-1 col-span-2 p-2">
        <CardHeader className="flex flex-row items-center justify-between relative p-2">
          <CardTitle className="text-base font-semibold">Error</CardTitle>
          <Activity size={"1.8rem"} className="absolute top-2 right-2" />
        </CardHeader>
        <CardContent className="mt-2 p-2">
          <div className="text-center">
            <p className="text-red-500">Failed to load data. Please try again.</p>
            <Button onClick={handleRetry} className="mt-2">
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const handleDropdownChange = (value: string) => {
    setSelectedOption(value)
  }

  const subtitle =
    selectedOption === "Leave Status"
      ? "Leave Status Record"
      : selectedOption === "Attendance"
        ? "Attendance Record"
        : "Overtime Record"

  return (
    <Card className={`flex-1 col-span-2 p-2 ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between relative p-2">
        <div>
          <CardTitle className="text-xl font-semibold">Recent Activity</CardTitle>
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
              <DropdownMenuItem onSelect={() => handleDropdownChange("Leave Status")}>Leave Status</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleDropdownChange("Attendance")}>Attendance</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleDropdownChange("Overtime")}>Overtime</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Activity size={"1.8rem"} />
        </div>
      </CardHeader>
      <CardContent className="mt-2 p-2">
        <ScrollArea className="h-[400px]">
          {selectedOption === "Leave Status" ? (
            <LeaveStatusTable selectedLeaveStatus="APPROVED_BY_TEAM_LEADER" />
          ) : selectedOption === "Attendance" ? (
            <RecentActivitiesTable tableData={attendanceData || []} />
          ) : selectedOption === "Overtime" ? (
            <OvertimeTable />
          ) : (
            <p>Invalid selection</p>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

