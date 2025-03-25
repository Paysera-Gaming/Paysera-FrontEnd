"use client"

import type React from "react"
import { useState, useEffect, useMemo } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getAttendanceList, updateLeaveRequestStatus } from "@/components/SuperAdminComponents/AttendanceSuperAdmin/api"
import type { Attendance } from "@/components/SuperAdminComponents/AttendanceSuperAdmin/types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { Check, X, Loader2 } from "lucide-react"
import type { AxiosError } from "axios"
// import { toast } from "@/components/ui/use-toast"

// Define the allowed statuses
const ALLOWED_STATUSES = ["APPROVED_BY_TEAM_LEADER", "APPROVED_BY_ADMIN", "REJECTED_BY_ADMIN"]

const LeaveStatusTable: React.FC<{ selectedLeaveStatus: string }> = ({ selectedLeaveStatus }) => {
  const queryClient = useQueryClient()

  const {
    data: attendanceData,
    isLoading,
    error,
  } = useQuery<Attendance[]>({
    queryKey: ["attendanceData"],
    queryFn: getAttendanceList,
  })

  const [searchTerm, setSearchTerm] = useState("")
  // Default to showing only team leader approved requests
  const [leaveStatus, setLeaveStatus] = useState(
    selectedLeaveStatus === "ALL"
      ? "APPROVED_BY_TEAM_LEADER"
      : ALLOWED_STATUSES.includes(selectedLeaveStatus)
        ? selectedLeaveStatus
        : "APPROVED_BY_TEAM_LEADER",
  )
  const [processingIds, setProcessingIds] = useState<number[]>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Clear error message after 5 seconds
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [errorMessage])

  // Mutation for updating leave request status
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: "APPROVED_BY_ADMIN" | "REJECTED_BY_ADMIN" }) =>
      updateLeaveRequestStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attendanceData"] })
    },
    onError: (error: Error | AxiosError) => {
      console.error("Error updating leave status:", error)
      setErrorMessage(`Failed to update status: ${error.message || "Unknown error"}`)
    },
    onSettled: (_, __, variables) => {
      setProcessingIds((prev) => prev.filter((id) => id !== variables.id))
    },
  })

  // Map for formalizing leave status labels
  const leaveStatusLabels: Record<string, string> = {
    ALL: "All Allowed Statuses",
    APPROVED_BY_TEAM_LEADER: "Approved by Team Leader",
    APPROVED_BY_ADMIN: "Approved by Admin",
    REJECTED_BY_ADMIN: "Rejected by Admin",
  }

  // Handle approve action
  const handleApprove = (id: number) => {
    setProcessingIds((prev) => [...prev, id])
    setErrorMessage(null)
    updateStatusMutation.mutate({ id, status: "APPROVED_BY_ADMIN" })
  }

  // Handle reject action
  const handleReject = (id: number) => {
    setProcessingIds((prev) => [...prev, id])
    setErrorMessage(null)
    updateStatusMutation.mutate({ id, status: "REJECTED_BY_ADMIN" })
  }

  // Check if a leave request can be actioned by admin - only team leader approved requests
  const canBeActionedByAdmin = (status: string): boolean => {
    return status === "APPROVED_BY_TEAM_LEADER"
  }

  // Filter data to only include allowed statuses
  const filteredAttendanceData = useMemo(() => {
    if (!attendanceData) return []

    return attendanceData.filter((attendance) => ALLOWED_STATUSES.includes(attendance.RequestLeaveStatus))
  }, [attendanceData])

  if (isLoading) {
    return (
      <div className="flex-1 col-span-2 p-4">
        <Skeleton className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex-1 col-span-2 p-4">
        <p className="text-red-500">Failed to load data. Please try again.</p>
      </div>
    )
  }

  // Apply status filter and search filter
  const displayData =
    filteredAttendanceData.filter(
      (attendance) =>
        (leaveStatus === "ALL" || attendance.RequestLeaveStatus === leaveStatus) &&
        attendance.employee.username.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || []

  const renderedList = displayData.map((attendance) => {
    const canAction = canBeActionedByAdmin(attendance.RequestLeaveStatus)
    const isProcessing = processingIds.includes(attendance.id)

    return (
      <TableRow key={attendance.id}>
        <TableCell className="p-4">{attendance.employee.username}</TableCell>
        <TableCell className="p-4">{format(new Date(attendance.date), "MMMM dd, yyyy")}</TableCell>
        <TableCell className="p-4">
          {leaveStatusLabels[attendance.RequestLeaveStatus] || attendance.RequestLeaveStatus}
        </TableCell>
        <TableCell className="p-4">
          {canAction && (
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="bg-green-50 hover:bg-green-100 text-green-600 border-green-200"
                onClick={() => handleApprove(attendance.id)}
                disabled={isProcessing}
              >
                {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4 mr-1" />}
                Approve
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-red-50 hover:bg-red-100 text-red-600 border-red-200"
                onClick={() => handleReject(attendance.id)}
                disabled={isProcessing}
              >
                {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4 mr-1" />}
                Reject
              </Button>
            </div>
          )}
        </TableCell>
      </TableRow>
    )
  })

  return (
    <>
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 mb-4 mx-4 rounded-md">
          <p className="font-semibold">Error</p>
          <p>{errorMessage}</p>
        </div>
      )}

      <div className="flex mb-4 space-x-2 p-4 items-center">
        {/* Search Bar */}
        <Input
          type="text"
          placeholder="Search by username"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />

        {/* Leave Status Dropdown - Only show allowed statuses */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="p-2 text-base w-64">
              {leaveStatusLabels[leaveStatus] || leaveStatus}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-72">
            <DropdownMenuItem onSelect={() => setLeaveStatus("ALL")}>{leaveStatusLabels["ALL"]}</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setLeaveStatus("APPROVED_BY_TEAM_LEADER")}>
              {leaveStatusLabels["APPROVED_BY_TEAM_LEADER"]}
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setLeaveStatus("APPROVED_BY_ADMIN")}>
              {leaveStatusLabels["APPROVED_BY_ADMIN"]}
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setLeaveStatus("REJECTED_BY_ADMIN")}>
              {leaveStatusLabels["REJECTED_BY_ADMIN"]}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="p-4">
        <Table className="text-base">
          <TableHeader>
            <TableRow>
              <TableHead className="p-4">Username</TableHead>
              <TableHead className="p-4">Date</TableHead>
              <TableHead className="p-4">Leave Status</TableHead>
              <TableHead className="p-4">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {renderedList.length > 0 ? (
              renderedList
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center p-4">
                  <div className="text-foreground">
                    <p className="font-semibold">No leave records found.</p>
                    <p className="text-sm">Please adjust your filters or try a different search term.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

export default LeaveStatusTable

